# Workflows

## Local Setup
- Install frontend dependencies from the repo root with `npm install`.
- Create a backend virtual environment on Windows with `cd backend`, `py -m venv venv`.
- Create a backend virtual environment on macOS/Linux with `cd backend`, `python3 -m venv venv`.
- Activate the environment on Windows with `venv\Scripts\activate`.
- Activate the environment on macOS/Linux with `source venv/bin/activate`.
- Install backend dependencies with `pip install -r requirements.txt`.
- Return to the repo root before running npm scripts.
- Keep the backend venv active when using `npm run dev`, `npm run dev-backend`, or `npm run build` so `uvicorn` and `pyinstaller` resolve correctly.
- If `backend\venv\Scripts\python.exe` points to a missing interpreter, recreate `backend/venv/` instead of debugging test failures first.

## Run / Development Commands
- `npm run dev`: start FastAPI and Vite together for local Electron development.
- `npm run dev-frontend`: run the renderer only; useful for UI or Tailwind work that does not need the Electron shell.
- `npm run dev-backend`: run `uvicorn app.app:app --reload --host 127.0.0.1 --port 8000` from `backend/`.
- `npm run preview`: preview the built renderer bundle.
- `npm run build`: build the renderer, package the backend with PyInstaller, then create the Electron installer via Electron Builder.

## Validation Commands
- `npm run verify:sandbox`: default validation in constrained environments.
- `npm run lint`: ESLint for `ts` and `tsx`.
- `npm run typecheck`: main TypeScript typecheck.
- `npm run typecheck:node`: Node-side TypeScript typecheck.
- `npm run test:backend`: backend tests via the PowerShell helper.
- `npm run verify:full`: full validation when a working Python install is available.
- `npm run build`: useful when a change could affect packaging, preload behavior, or the PyInstaller/Electron handoff.

## Debugging Workflow
1. Reproduce the issue with the smallest relevant command.
2. Capture raw findings in `notes-inbox.md` while details are fresh.
3. For renderer issues, start with `src/routes.tsx`, `src/pages/home/home.tsx`, and `src/index.css`.
4. For theme issues, inspect `src/lib/theme.ts` and `src/hooks/useSystemPrefersDark.ts`.
5. For backend request failures, inspect `src/hooks/useAxios.ts` and `backend/app/app.py` before assuming the route is broken.
6. For Electron bridge issues, keep `electron/preload.ts`, `electron/electron-env.d.ts`, and renderer usage of `window.electron` in sync.
7. For packaged-only failures, inspect `electron/main.ts`, `backend/main.spec`, and `electron-builder.json5`, then validate with `npm run build`.
8. Promote repeatable findings into `docs/known-issues.md`, `docs/repo-map.md`, or this file once confirmed.

## Delivery Workflow
1. Make the smallest coherent change.
2. Run `npm run verify:sandbox` at minimum.
3. Run `npm run verify:full` when backend validation is relevant and Python is usable.
4. Run `npm run build` when packaging, preload APIs, or backend executable startup paths were touched.
5. Update existing docs when behavior, commands, structure, or known issues change.
6. Keep commits focused and use short imperative commit messages.

## Recurring Repo-Specific Habits And Conventions
- Use the `@/` alias for renderer imports instead of long relative paths.
- The renderer currently uses `createHashRouter`; route changes belong in `src/routes.tsx`.
- `useAxios` is the expected client for backend calls from the renderer because it already carries the required header.
- When you add a new preload API, update both `electron/preload.ts` and `electron/electron-env.d.ts`.
- Prefer small backend routers in `backend/app/api/` over expanding `app.py`.
- Keep durable repo notes in `docs/`; keep rough capture in `notes-inbox.md`.
- Mark uncertainty explicitly instead of guessing in repo docs.
- Do not edit generated build output in `dist/`, `dist-electron/`, `backend/dist/`, or `release/`.
