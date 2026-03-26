# Architecture Decisions for Orbiton `src2`

Date: 2026-03-26

## ADR-1: Keep modular domain structure
**Decision**: Use per-domain modules with route/controller/service/repository split.

**Why**:
- Improves maintainability and onboarding.
- Keeps business logic testable in service layer.
- Prevents framework concerns from leaking into core logic.

## ADR-2: OpenAPI-first contract
**Decision**: OpenAPI is authoritative for route paths, payloads, and response envelopes.

**Why**:
- Eliminates contract drift.
- Enables deterministic integration testing.
- Supports auto-validation and client generation.

## ADR-3: PostgreSQL + MongoDB dual-store retained (with strict boundaries)
**Decision**:
- PostgreSQL remains source for transactional/relational records.
- MongoDB remains for flexible resume parsing artifacts.

**Why**:
- Aligns with current domain model needs.
- Preserves useful capability already prototyped.

## ADR-4: Security baseline hardening
**Decision**:
- Centralize authn/authz enforcement.
- Add object-level ownership checks in all student-scoped mutations.
- Standardize error handling and status mapping.

**Why**:
- Current gaps are high-risk and impact correctness and trust.

## ADR-5: Shared contract primitives
**Decision**:
- Define reusable schemas for `StandardResponse`, `ErrorResponse`, and enums.
- Reference from all endpoints.

**Why**:
- Prevents endpoint-by-endpoint divergence.

## ADR-6: Test strategy
**Decision**:
- Unit tests for service logic.
- Integration tests for route contracts and role controls.
- Contract tests against OpenAPI.

**Why**:
- Ensures rewrite quality and demonstrable traceability for final evaluation.
