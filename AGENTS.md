# Repository Guidelines

## Project Structure & Module Organization
`src/` contains the React renderer. Keep page-level UI in `src/pages/`, reusable UI in `src/components/`, hooks in `src/hooks/`, helpers in `src/lib/`, and static assets in `src/assets/`. Electron process code lives in `electron/` (`main.ts`, `preload.ts`). The FastAPI backend lives in `backend/app/`, with routers under `backend/app/api/` and configuration in `backend/app/config/`. Build artifacts are generated into `dist/` and `dist-electron/`; do not edit them. Treat `backend/venv/` as local-only.

## Build, Test, and Development Commands
Run `npm install` once for frontend dependencies. Create and activate a Python virtual environment in `backend/`, then install `backend/requirements.txt`.

- `npm run dev`: starts Vite and the FastAPI backend together for local Electron development.
- `npm run dev-frontend`: runs the renderer only.
- `npm run dev-backend`: starts `uvicorn app.app:app --reload` on `127.0.0.1:8000`.
- `npm run build`: builds renderer, packages the backend with PyInstaller, and creates the Electron app.
- `npm run lint`: runs ESLint on all `ts` and `tsx` files.
- `npm run preview`: previews the production renderer bundle.

## Coding Style & Naming Conventions
Use TypeScript for frontend code and Python for backend code. Follow the existing style: semicolons in TypeScript, 2-space indentation in React files, and 4-space indentation in Python. Name React components with `PascalCase`, hooks with `useCamelCase`, utilities with `camelCase`, and page folders in lowercase, for example `src/pages/home/home.tsx`. Prefer small routers in `backend/app/api/` over growing `app.py`.

## Testing Guidelines
There is no automated test suite configured yet. Before opening a PR, run `npm run lint`, verify `npm run dev` launches both processes, and manually test the main flows: backend fetches, theme switching, and Electron shell actions. When adding tests later, place frontend tests beside the feature or under `src/__tests__/`, and keep backend tests under `backend/tests/`.

## Commit & Pull Request Guidelines
Recent history uses short, imperative subjects such as `Add click toggle support for theme selector trigger`. Follow that pattern, keep commits focused, and avoid mixing frontend, Electron, and backend refactors in one commit unless they are tightly coupled. PRs should include a clear summary, linked issue if applicable, manual test notes, and screenshots or short recordings for UI changes.

## Security & Configuration Tips
Backend requests require the `x-app-secret` header configured in `backend/app/config/config.py`. Do not commit real secrets, packaged binaries, or local virtual environment files.
