# Repository Guidance

## Purpose
This file is the entry point for project-specific guidance for both humans and AI coding agents working in this repository.

This repo contains project-specific code and documentation for an Electron + React + TypeScript desktop UI paired with a FastAPI backend.

## Documentation Flow
- Capture quick lessons learned, debugging discoveries, and useful implementation notes in [notes-inbox.md](notes-inbox.md) first.
- Move durable repo-specific knowledge into [docs/workflows.md](docs/workflows.md), [docs/repo-map.md](docs/repo-map.md), or [docs/known-issues.md](docs/known-issues.md).
- Reusable knowledge that is not specific to this repo may later be promoted into a separate central "AI Engineer Notes" knowledge base outside this repository.
- Prefer updating existing documentation instead of creating duplicate files.
- Preserve useful context, keep notes concise, and mark uncertainty clearly.
- Do not delete documentation unless explicitly asked.

## Core Commands
- Frontend setup: `npm install`
- Backend setup on Windows: `cd backend`, `py -m venv venv`, `venv\Scripts\activate`, `pip install -r requirements.txt`
- Backend setup on macOS/Linux: `cd backend`, `python3 -m venv venv`, `source venv/bin/activate`, `pip install -r requirements.txt`
- Full local dev: `npm run dev`
- Renderer-only dev: `npm run dev-frontend`
- Backend-only dev: `npm run dev-backend`
- Lint: `npm run lint`
- App typecheck: `npm run typecheck`
- Node-side typecheck: `npm run typecheck:node`
- Sandbox-safe validation: `npm run verify:sandbox`
- Backend tests: `npm run test:backend`
- Full validation: `npm run verify:full`
- Packaging build: `npm run build`
- Renderer preview: `npm run preview`

## Major Repo Areas
- `src/main.tsx`: renderer bootstrap; applies the stored or system theme before rendering the router.
- `src/routes.tsx`: current `createHashRouter` definition with the root route.
- `src/pages/home/home.tsx`: current demo page; fetches backend data, drives theme selection, sends notifications, and opens the guide link.
- `src/components/`: reusable UI, including `theme-selector.tsx`, `account-menu.tsx`, and `components/ui/` shadcn-style primitives.
- `src/hooks/useAxios.ts`: shared axios client for `http://127.0.0.1:8000` with the required `x-app-secret` header.
- `src/lib/theme.ts`: theme resolution, persistence, and media-query helpers.
- `electron/main.ts`: Electron lifecycle, BrowserWindow creation, and packaged backend process spawning.
- `electron/preload.ts` and `electron/electron-env.d.ts`: the `window.electron` bridge for notifications and external links.
- `backend/app/app.py`: FastAPI app, CORS setup, secret-header middleware, and router registration.
- `backend/app/api/`: sample backend routers for `/` and `/data/`.
- `backend/app/config/config.py`: backend secret header and origin settings.
- `backend/app/test_app.py`: current unittest coverage for routes and secret-header middleware.
- `scripts/run-backend-tests.ps1`: backend test runner with `venv`, `py -3`, and `python` fallback logic.
- `docs/` and `notes-inbox.md`: lightweight repo documentation and temporary note capture.

## Documentation Targets
- `notes-inbox.md`: temporary capture buffer for raw or partially processed notes.
- `docs/repo-map.md`: stable map of structure, entry points, config, and test locations.
- `docs/workflows.md`: repeatable setup, run, validation, debugging, and delivery steps.
- `docs/known-issues.md`: persistent repo-specific traps, recurring failures, and caveats.

## Coding Style And Naming Conventions
Use TypeScript for frontend code and Python for backend code. Follow the existing style: semicolons in TypeScript, 2-space indentation in React files, and 4-space indentation in Python. Use `PascalCase` for React components, `useCamelCase` for hooks, `camelCase` for utilities, and lowercase page folders such as `src/pages/home/home.tsx`. Keep renderer imports on the `@/` alias where possible, and prefer small routers in `backend/app/api/` over growing `backend/app/app.py`.

## Documentation Check Requirement
When implementing or changing a feature that depends on a third-party library or framework, use Context7 to check the current official documentation before writing code. Treat Context7 as the default source for API usage, lifecycle expectations, recommended patterns, and version-sensitive behavior. If the relevant docs are unavailable through Context7, state that clearly and use the best available primary source instead.

## Testing Guidelines
Use `npm run verify:sandbox` as the default automated check in constrained environments where the frontend dev server cannot boot. For a fuller pass on a machine with a working Python install, run `npm run verify:full`. Backend tests currently live in `backend/app/test_app.py`; keep future backend tests alongside that file unless the repo is later reorganized. Future frontend tests should live beside the feature or under `src/__tests__/`.

If `backend\venv\Scripts\python.exe` reports `No Python at ...`, the checked-in virtual environment is pointing to a missing base interpreter. Recreate `backend/venv/` and reinstall `backend/requirements.txt` before relying on `npm run test:backend` or `npm run verify:full`.

## Runtime And Packaging Notes
- Keep the backend venv active when running `npm run dev` or any backend build step so `uvicorn` and `pyinstaller` are on `PATH`.
- Manual backend requests must include the `x-app-secret` header from `backend/app/config/config.py`; the renderer gets this automatically through `src/hooks/useAxios.ts`.
- When adding preload APIs, update both `electron/preload.ts` and `electron/electron-env.d.ts`.
- Do not edit generated output under `dist/`, `dist-electron/`, `backend/dist/`, or `release/`.

## Commit And Pull Request Guidelines
Recent history uses short, imperative subjects such as `Add click toggle support for theme selector trigger`. Follow that pattern, keep commits focused, and avoid mixing frontend, Electron, and backend refactors in one commit unless they are tightly coupled. PRs should include a clear summary, linked issue if applicable, manual test notes, and screenshots or short recordings for UI changes.

## Security And Configuration Tips
Backend requests require the `x-app-secret` header configured in `backend/app/config/config.py`. Do not commit real secrets, packaged binaries, or local virtual environment files.
