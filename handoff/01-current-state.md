# Orbiton Backend Handoff — Current State Snapshot

Date: 2026-03-26

## Scope of this snapshot
This document captures the current implementation state of the legacy `src/` backend so a new implementation can begin in `src2/` without losing context.

## What is in place

### Architecture
- Node.js + Express backend using modular layering:
  - `routes` -> `controller` -> `service` -> `repository`
- JWT authentication middleware and role checks exist.
- PostgreSQL is used for primary transactional data.
- MongoDB is used for parsed resume artifacts.

### Implemented module areas
- Auth (register, login, request reset, reset password)
- Student profile management
- Resume upload and listing
- Drives lifecycle (create/read/update/status)
- Applications (apply, list mine, opt out)
- Rounds (create, record result)
- Offers (issue, respond)
- Admin test route

### Strengths worth carrying into `src2`
- Clear modular decomposition by domain.
- Separation of business rules inside services.
- Use of repositories to isolate persistence operations.
- Domain-centric route grouping under `/api/v1/*`.

## Known quality gaps in legacy `src/`
- OpenAPI path/contract mismatches across several modules.
- Response envelope inconsistency (`success/data` not uniform, error shape varies).
- Missing ownership checks in selected student-scoped operations.
- Incomplete request validation coverage.
- Enum drift between documented values and runtime values.

## Migration posture
Treat `src/` as reference-only and non-authoritative. For `src2/`, prefer OpenAPI-first implementation and harden correctness/security from the start.
