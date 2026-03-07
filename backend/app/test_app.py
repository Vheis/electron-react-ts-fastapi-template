import sys
import unittest
from pathlib import Path

from fastapi import HTTPException
from starlette.requests import Request
from starlette.responses import JSONResponse

BACKEND_ROOT = Path(__file__).resolve().parents[1]
if str(BACKEND_ROOT) not in sys.path:
    sys.path.insert(0, str(BACKEND_ROOT))

from app.api.data import read_data
from app.api.root import read_root
from app.app import app, verify_secret_header
from app.config.config import SECRET_KEY


async def empty_receive():
    return {"type": "http.request", "body": b"", "more_body": False}


def make_request(method="GET", headers=None):
    normalized_headers = headers or {}
    raw_headers = [
        (header.lower().encode("latin-1"), value.encode("latin-1"))
        for header, value in normalized_headers.items()
    ]

    scope = {
        "type": "http",
        "http_version": "1.1",
        "method": method,
        "path": "/data/",
        "raw_path": b"/data/",
        "query_string": b"",
        "headers": raw_headers,
        "client": ("127.0.0.1", 5000),
        "server": ("127.0.0.1", 8000),
        "scheme": "http",
    }

    return Request(scope, receive=empty_receive)


class EndpointContractTests(unittest.IsolatedAsyncioTestCase):
    async def test_root_endpoint_returns_expected_payload(self):
        self.assertEqual(await read_root(), {"message": "Hello World"})

    async def test_data_endpoint_returns_expected_payload(self):
        self.assertEqual(
            await read_data(), {"message": "Hello from the Data Endpoint"}
        )


class SecretHeaderMiddlewareTests(unittest.IsolatedAsyncioTestCase):
    async def test_allows_request_with_expected_secret_header(self):
        request = make_request(headers={"x-app-secret": SECRET_KEY})
        call_next_was_used = False

        async def call_next(_request):
            nonlocal call_next_was_used
            call_next_was_used = True
            return JSONResponse({"ok": True})

        response = await verify_secret_header(request, call_next)

        self.assertTrue(call_next_was_used)
        self.assertEqual(response.status_code, 200)

    async def test_rejects_request_without_expected_secret_header(self):
        request = make_request()

        async def call_next(_request):
            return JSONResponse({"ok": True})

        with self.assertRaises(HTTPException) as context:
            await verify_secret_header(request, call_next)

        self.assertEqual(context.exception.status_code, 403)
        self.assertEqual(context.exception.detail, "Forbidden")

    async def test_options_request_skips_secret_header_check(self):
        request = make_request(method="OPTIONS")
        call_next_was_used = False

        async def call_next(_request):
            nonlocal call_next_was_used
            call_next_was_used = True
            return JSONResponse({"ok": True})

        response = await verify_secret_header(request, call_next)

        self.assertTrue(call_next_was_used)
        self.assertEqual(response.status_code, 200)


class RouteRegistrationTests(unittest.TestCase):
    def test_root_route_is_registered(self):
        self.assertTrue(
            any(route.path == "/" and "GET" in route.methods for route in app.routes)
        )

    def test_data_route_is_registered(self):
        self.assertTrue(
            any(route.path == "/data/" and "GET" in route.methods for route in app.routes)
        )
