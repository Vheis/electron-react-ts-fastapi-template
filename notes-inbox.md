# Notes Inbox

This file is a temporary capture buffer for fast notes while working in this repository. It is expected to be reviewed regularly, with durable repo-specific knowledge moved into `docs/` and broader reusable knowledge promoted into a separate central notes system when appropriate.

Rough free text is acceptable here. Structured entries are preferred when possible, but incomplete notes, pasted commands, and extra context are allowed if they help preserve useful detail.

## Entry Template

## YYYY-MM-DD — Title

**Category:**  
**Type:**  
**Keep in repo docs?:** yes/no  
**Promote to central notes?:** yes/no  
**Suggested local destination:** docs/workflows.md / docs/repo-map.md / docs/known-issues.md / none  
**Suggested central destination:** software-engineering/... / ai-llm-engineering/... / data/... / platform-infra/... / architecture/... / workflows-playbooks/... / none  
**Source / Context:**  
**Status:** captured

### Problem / Question
...

### Solution / Insight
...

### Why it matters
...

### Evidence / Commands / Links
...

### Freeform notes
Any rough notes, extra implementation details, pasted snippets, context, or unfinished thoughts.

### Cleanup later
- integrate locally
- promote centrally
- both
- leave for now

## 2026-03-08 — Backend tests fail because local venv is stale

**Category:** tooling  
**Type:** debugging discovery  
**Keep in repo docs?:** yes  
**Promote to central notes?:** yes  
**Suggested local destination:** docs/known-issues.md  
**Suggested central destination:** workflows-playbooks/python-environments  
**Source / Context:** `scripts/run-backend-tests.ps1`, existing repo guidance, backend test workflow  
**Status:** captured

### Problem / Question
Why do backend tests sometimes fail immediately on a fresh machine even though the repo contains `backend/venv/`?

### Solution / Insight
The checked-in virtual environment may reference a Python installation path that does not exist locally. Recreate `backend/venv/` and reinstall `backend/requirements.txt` before relying on backend test commands.

### Why it matters
This is a repeatable onboarding and validation failure. Capturing it once saves time and prevents false debugging trails.

### Evidence / Commands / Links
- `npm run test:backend`
- `npm run verify:full`
- `scripts/run-backend-tests.ps1`

### Freeform notes
The PowerShell helper already tries `backend\venv\Scripts\python.exe`, then `py -3`, then `python`. If the venv exists but points at a missing base interpreter, the message is easy to misread as a test failure instead of an environment problem.

### Cleanup later
- both

## 2026-03-08 — API requests require the Electron app secret header

**Category:** backend  
**Type:** implementation note  
**Keep in repo docs?:** yes  
**Promote to central notes?:** no  
**Suggested local destination:** docs/workflows.md  
**Suggested central destination:** none  
**Source / Context:** `backend/app/app.py`, `backend/app/config/config.py`  
**Status:** captured

### Problem / Question
Why do direct backend requests return `403 Forbidden` during local debugging?

### Solution / Insight
The FastAPI middleware rejects non-`OPTIONS` requests unless the `x-app-secret` header matches `SECRET_KEY` from `backend/app/config/config.py`.

### Why it matters
This is repo-specific behavior that affects API testing, debugging, and any future client integrations.

### Evidence / Commands / Links
- `backend/app/app.py`
- `backend/app/config/config.py`
- `backend/app/test_app.py`

### Freeform notes
Durable repo-specific notes belong in `docs/`. Keep the raw capture here until the workflow or known issue wording is stable.

### Cleanup later
- integrate locally
