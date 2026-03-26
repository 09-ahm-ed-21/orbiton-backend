# `src2` Rewrite Rules (Do/Don't)

Date: 2026-03-26

## Objective
Build `src2/` as a clean, production-grade rewrite using proven strengths from legacy `src/` while eliminating identified defects.

## Do (carry forward)
- Keep modular domain decomposition.
- Keep separation of concerns across route/controller/service/repository.
- Keep JWT auth and role-aware access model.
- Keep PG as transactional system of record.
- Keep Mongo for resume parse artifacts where flexibility is needed.

## Do (new mandatory standards)
- OpenAPI is the source of truth; implementation follows spec exactly.
- Use one consistent success/error envelope.
- Enforce schema validation on every mutating endpoint.
- Enforce ownership checks for student-scoped resources.
- Keep enum definitions centralized and shared between code/spec.

## Don’t
- Don’t introduce undocumented routes or payload fields.
- Don’t return ad-hoc error shapes per controller.
- Don’t duplicate business constants across files.
- Don’t accept role-only checks where ownership checks are required.
- Don’t ship a module without contract and integration tests.

## Suggested migration order
1. Core app skeleton + middleware
2. Auth
3. Students
4. Drives
5. Applications
6. Rounds
7. Offers
8. Resumes
9. Admin and final hardening

## Acceptance gate before merge
- OpenAPI lint/validation passes.
- Test suite passes for touched module.
- Traceability mapping updated (requirement -> endpoint -> test).
