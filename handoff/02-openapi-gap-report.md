# Orbiton OpenAPI Gap Report (Legacy `src/`)

Date: 2026-03-26

## Purpose
This report summarizes the high-impact gaps between the current backend behavior and the provided OpenAPI specification.

## High-impact mismatches

### 1) Route path mismatches
- **Resumes**:
  - Implemented: `/resumes/upload`, `/resumes/my`
  - Spec listed: `/resumes`, `/resumes/me`
- **Applications**:
  - Implemented: `POST /applications/:driveId`, `GET /applications/mine`, `PATCH /applications/optout/:applicationId`
  - Spec listed: `POST /applications`, `GET /applications/me`, `PATCH /applications/{id}`
- **Rounds**:
  - Implemented: `POST /rounds/result`
  - Spec listed: `POST /rounds/{id}/results`
- **Offers**:
  - Implemented: `PATCH /offers/:id/respond`
  - Spec listed: `PATCH /offers/{id}`

### 2) Request/response contract drift
- Auth responses are not fully standardized to one schema shape.
- Error payload shape differs from documented `ErrorResponse` in multiple handlers.
- Some request bodies are under-specified in spec relative to code expectations.

### 3) Enum and state drift
- `Application.status` includes backend values that are not captured in spec (example: `SELECTED`).

### 4) Authorization semantics not fully documented
- Role restrictions exist in code but are not consistently annotated at operation-level in OpenAPI.
- Object ownership constraints are insufficient in some student-facing operations and should be explicitly modeled in redesign notes.

## Recommended baseline for `src2`
1. Use OpenAPI as implementation contract and generate validation/middleware from it.
2. Freeze canonical enum sets in one location and reference them from both code and spec.
3. Enforce consistent response envelope globally.
4. Add role annotations (via description or `x-roles`) for each protected operation.
