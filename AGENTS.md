# Repository Guidelines

## Project Structure & Module Organization
`src/` contains the React renderer. Keep page-level UI in `src/pages/`, reusable UI in `src/components/`, hooks in `src/hooks/`, helpers in `src/lib/`, and static assets in `src/assets/`. Electron process code lives in `electron/` (`main.ts`, `preload.ts`). The FastAPI backend lives in `backend/app/`, with routers under `backend/app/api/` and configuration in `backend/app/config/`. Build artifacts are generated into `dist/` and `dist-electron/`; do not edit them. Treat `backend/venv/` as local-only.

## Build, Test, and Development Commands
Run `npm install` once for frontend dependencies. Create and activate a Python virtual environment in `backend/`, then install `backend/requirements.txt`.

- `npm run dev`: starts Vite and the FastAPI backend together for local Electron development.
- `npm run dev-frontend`: runs the renderer only.
- `npm run dev-backend`: starts `uvicorn app.app:app --reload` on `127.0.0.1:8000`.
- `npm run build`: builds renderer, packages the backend with PyInstaller, and creates the Electron app.
- `npm run typecheck`: runs the main TypeScript typecheck for `src/` and `electron/`.
- `npm run typecheck:node`: typechecks the Vite Node-side config.
- `npm run lint`: runs ESLint on all `ts` and `tsx` files.
- `npm run test:backend`: runs backend API and middleware tests through `scripts/run-backend-tests.ps1`.
- `npm run verify:sandbox`: runs the sandbox-safe verification stack: lint plus both TypeScript typechecks.
- `npm run verify:full`: runs `verify:sandbox` and then the backend tests.
- `npm run preview`: previews the production renderer bundle.

## Coding Style & Naming Conventions
Use TypeScript for frontend code and Python for backend code. Follow the existing style: semicolons in TypeScript, 2-space indentation in React files, and 4-space indentation in Python. Name React components with `PascalCase`, hooks with `useCamelCase`, utilities with `camelCase`, and page folders in lowercase, for example `src/pages/home/home.tsx`. Prefer small routers in `backend/app/api/` over growing `app.py`.

## Documentation Check Requirement
When implementing or changing a feature that depends on a third-party library or framework, use Context7 to check the current official documentation before writing code. Treat Context7 as the default source for API usage, lifecycle expectations, recommended patterns, and version-sensitive behavior. If the relevant docs are unavailable through Context7, state that clearly and use the best available primary source instead.

## Testing Guidelines
Use `npm run verify:sandbox` as the default automated check in constrained environments where the frontend dev server cannot boot. For a fuller pass on a machine with a working Python install, run `npm run verify:full`. Backend tests currently live in `backend/app/test_app.py` because that path is writable in the sandbox; keep future backend tests alongside that file unless the repo is later reorganized. Future frontend tests should live beside the feature or under `src/__tests__/`.

If `backend\venv\Scripts\python.exe` reports `No Python at ...`, the checked-in virtual environment is pointing to a missing base interpreter. Recreate `backend/venv/` and reinstall `backend/requirements.txt` before relying on `npm run test:backend` or `npm run verify:full`.

## Commit & Pull Request Guidelines
Recent history uses short, imperative subjects such as `Add click toggle support for theme selector trigger`. Follow that pattern, keep commits focused, and avoid mixing frontend, Electron, and backend refactors in one commit unless they are tightly coupled. PRs should include a clear summary, linked issue if applicable, manual test notes, and screenshots or short recordings for UI changes.

## Security & Configuration Tips
Backend requests require the `x-app-secret` header configured in `backend/app/config/config.py`. Do not commit real secrets, packaged binaries, or local virtual environment files.
