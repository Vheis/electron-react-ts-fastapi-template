# Known Issues

This file is for persistent or repeating repo-specific issues, caveats, and traps. Do not use it for temporary rough notes; capture those in [notes-inbox.md](../notes-inbox.md) first.

## Template
### Issue
...

### Symptoms
...

### Cause
...

### Workaround
...

### Long-term fix
...

## Broken Checked-In Backend Virtual Environment
### Issue
`backend\venv\Scripts\python.exe` can point to a missing base interpreter.

### Symptoms
- `npm run test:backend` fails with `No Python at ...`
- `npm run verify:full` fails before or during backend tests

### Cause
The checked-in virtual environment was created against a local Python installation path that does not exist on the current machine.

### Workaround
Recreate `backend/venv/` with a local Python install and reinstall `backend/requirements.txt`. The test runner can also fall back to `py -3` or `python` if available.

### Long-term fix
Avoid relying on a committed virtual environment. Document local setup clearly and treat `backend/venv/` as disposable machine-local state.

## Backend Requests Return 403 Without The App Secret Header
### Issue
Direct requests to the FastAPI backend fail unless they include the expected `x-app-secret` header.

### Symptoms
- Requests to `http://127.0.0.1:8000/` or `http://127.0.0.1:8000/data/` return `403 Forbidden`
- The renderer works, but manual requests from Postman, curl, or ad hoc scripts fail

### Cause
`backend/app/app.py` uses middleware to reject all non-`OPTIONS` requests whose `x-app-secret` header does not match `SECRET_KEY` in `backend/app/config/config.py`.

### Workaround
Use `src/hooks/useAxios.ts` from the renderer, or include the header manually when debugging the backend outside the app.

### Long-term fix
Keep the header requirement documented and centralized. If the auth model changes later, update the middleware, shared client setup, and docs together.
