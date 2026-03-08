# Repo Map

## What This Repository Does
This repository is a desktop app template that combines:
- Electron for the desktop shell.
- React + TypeScript for the renderer UI.
- FastAPI for the local backend service.
- PyInstaller and Electron Builder for production packaging.

The current demo route renders a landing page that fetches data from the FastAPI backend, supports theme selection, exposes a styled account menu, sends native notifications through the preload bridge, and opens an external guide link.

## Top-Level Layout
- `src/`: renderer app code.
- `electron/`: Electron main process, preload bridge, and renderer type declarations.
- `backend/`: FastAPI source, test file, PyInstaller spec, requirements, and local venv.
- `scripts/`: utility scripts, currently the backend test runner.
- `public/`: development-time static assets such as `electron.svg`.
- `docs/`: durable repo docs.
- `notes-inbox.md`: temporary note capture buffer.
- `README.md`, `package.json`, `vite.config.ts`, `tsconfig*.json`, `electron-builder.json5`, `components.json`: root-level setup and build config.

## Renderer
- `src/main.tsx`: bootstraps React, resolves the stored or system theme, and mounts `RouterProvider`.
- `src/routes.tsx`: defines the current hash-router table; today it maps `/` to `HomePage`.
- `src/pages/home/home.tsx`: the current demo screen; it fetches `/data`, renders the theme selector and account menu, and uses `window.electron` APIs.
- `src/components/theme-selector.tsx`: theme dropdown for `light`, `dark`, and `system`.
- `src/components/account-menu.tsx`: styled account menu example.
- `src/components/ui/`: shared button and switch primitives.
- `src/hooks/useAxios.ts`: shared axios client with base URL `http://127.0.0.1:8000` and the repo secret header.
- `src/hooks/useSystemPrefersDark.ts`: subscribes to the browser color-scheme media query.
- `src/lib/theme.ts`: theme preference persistence and resolution.
- `src/lib/utils.ts`: shared `cn()` helper for `clsx` and `tailwind-merge`.
- `src/assets/`: logo and avatar assets used by the current UI.
- `src/index.css`: Tailwind v4 styles and app-level design tokens.

## Electron Shell
- `electron/main.ts`: creates the BrowserWindow, loads Vite in development or `dist/index.html` in production, and spawns the packaged backend executable from `backend/dist/main`.
- `electron/preload.ts`: exposes `window.electron.sendNotification()` and `window.electron.openExternal()`.
- `electron/electron-env.d.ts`: keeps the renderer-side TypeScript definitions in sync with the preload bridge.

## Backend
- `backend/app/app.py`: creates the FastAPI app, adds permissive CORS, enforces `x-app-secret`, and includes the sample routers.
- `backend/app/main.py`: backend entry point used by PyInstaller.
- `backend/app/api/root.py`: `GET /`
- `backend/app/api/data.py`: `GET /data/`
- `backend/app/config/config.py`: `SECRET_KEY` and `ALLOWED_ORIGINS`
- `backend/app/test_app.py`: unittest-based route and middleware coverage.

## Build, Packaging, And Config
- `package.json`: npm scripts and frontend dependencies.
- `vite.config.ts`: Vite config, `@` path alias, Tailwind plugin, and Electron plugin setup.
- `tsconfig.json` and `tsconfig.node.json`: TypeScript settings.
- `components.json`: shadcn/ui generator aliases and CSS configuration.
- `electron-builder.json5`: Electron packaging configuration; includes `backend/dist/main` as an extra resource and writes installers to `release/${version}`.
- `backend/main.spec`: PyInstaller spec for the backend bundle.
- Build outputs:
  - `dist/`: renderer production bundle
  - `dist-electron/`: compiled Electron main and preload output
  - `backend/dist/main/`: packaged backend executable and support files
  - `release/${version}/`: Electron installer output

## Tests
- `backend/app/test_app.py`: current backend API and middleware tests.
- `scripts/run-backend-tests.ps1`: backend test runner with interpreter fallback logic.
- Frontend tests: not yet present; add future tests beside features or under `src/__tests__/`.

## Documentation
- `AGENTS.md`: repo guidance and documentation flow.
- `notes-inbox.md`: temporary note capture buffer.
- `docs/repo-map.md`: stable structure map.
- `docs/workflows.md`: repeatable working patterns.
- `docs/known-issues.md`: persistent repo-specific issues and traps.
