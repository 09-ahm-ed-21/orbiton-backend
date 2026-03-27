# Orbiton `src2` Priority Backlog

Date: 2026-03-26

## P0 — Must complete first

1. **Scaffold `src2/` architecture**
   - Recreate modular domain boundaries.
   - Add shared middleware and centralized error handling.

2. **OpenAPI alignment pass**
   - Normalize all route paths to exact spec.
   - Define exact request/response schemas for each operation.

3. **Auth + authorization foundation**
   - JWT auth middleware with explicit failure modes.
   - Role middleware and object ownership checks.

4. **Response envelope standardization**
   - Global success/error format consistency.

5. **Validation layer**
   - Schema validation for all mutating routes.

## P1 — High value next

1. **Enum/state normalization**
   - Consolidate status constants and reflect in OpenAPI.

2. **Module migration in sequence**
   - Auth -> Students -> Drives -> Applications -> Rounds -> Offers -> Resumes -> Admin.

3. **Test harness**
   - Service unit tests and route integration tests.

4. **Data access hardening**
   - Transaction boundaries for multi-step updates.
   - Better error surfaces around persistence operations.

## P2 — Stabilization and polish

1. **Observability**
   - Structured logging and correlation ids.

2. **Operational docs**
   - Runbooks, environment setup, seed scripts.

3. **Performance + resilience review**
   - Review sync file I/O and bottlenecks.

## Definition of done (for each module)
- Endpoints match OpenAPI paths exactly.
- Request/response schemas validated and documented.
- Role and ownership rules implemented.
- Unit + integration tests pass.
- Traceability entry updated.
