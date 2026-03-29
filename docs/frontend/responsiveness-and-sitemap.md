# Orbiton Frontend Responsiveness & Sitemap Standard

**Version:** 1.0  
**Date:** 2026-03-29  
**Owner:** Product + Frontend Team

## Purpose
This document defines:
1. Responsiveness and cross-platform standards for Orbiton.
2. The initial sitemap for Student-first and TPO-first rollout.
3. A page implementation order to start building screens immediately.

## Responsiveness Standards (Mandatory)

### Breakpoints
Use these breakpoints consistently across all pages/components:
- `xs`: 0–479px (small phones)
- `sm`: 480–767px (phones)
- `md`: 768–1023px (tablets)
- `lg`: 1024–1279px (laptops)
- `xl`: 1280px+ (desktops)

### Layout Principles
- Mobile-first implementation.
- Fluid containers with max-width constraints.
- No horizontal overflow on any page.
- Avoid fixed widths for primary layout blocks.
- Use responsive spacing and typography tokens.

### Interaction Standards
- Minimum touch target: 44x44px.
- Forms must be usable one-handed on mobile.
- Sticky actions on mobile for critical flows (Apply, Save, Submit).
- Keyboard navigation and visible focus states required.

### Data Display Standards
- Tables must have a mobile fallback (cards/stacked rows).
- Long text truncation + tooltip/expand.
- Status labels must wrap gracefully.
- Empty state and error state required for every data view.

### Performance Standards
- Lazy-load non-critical routes.
- Optimize images/icons.
- Keep route JS bundles lean.
- Avoid heavy client-side processing on low-end devices.

### Accessibility Standards
- Semantic HTML.
- Proper form labels + validation messages.
- Color contrast compliant.
- Screen-reader-friendly headings and landmark regions.

## Cross-Platform Support Matrix
Target support (v1):
- Desktop: Chrome, Edge, Firefox, Safari (latest 2 major versions)
- Mobile: Android Chrome (latest 2), iOS Safari (latest 2)
- Tablet: iPad Safari + Android Chrome

## PR Quality Gate (Definition of Done Add-on)
Every frontend PR must include:
1. Screenshots: mobile (`sm`), tablet (`md`), desktop (`lg/xl`)
2. No overflow verification
3. Keyboard/focus check
4. Form validation UX check
5. Loading/empty/error states verified

## Orbiton Sitemap (Initial)

### Public
- `/` — Landing page
- `/about` — Platform overview
- `/contact` — Contact/support
- `/auth/login`
- `/auth/register`
- `/auth/forgot-password`
- `/auth/reset-password`
- `/auth/verify-otp` (MFA / email OTP)

### Student Portal
- `/student/dashboard`
- `/student/profile`
- `/student/resume`
  - `/student/resume/manual-edit`
  - `/student/resume/upload-parse`
  - `/student/resume/review-parsed`
- `/student/drives`
- `/student/drives/:driveId`
- `/student/applications`
- `/student/applications/:applicationId`
- `/student/offers`
- `/student/offers/:offerId`
- `/student/notifications`
- `/student/settings`

### TPO Portal
- `/tpo/dashboard`
- `/tpo/recruiter-proposals`
- `/tpo/recruiter-proposals/:proposalId`
- `/tpo/drives`
- `/tpo/drives/new`
- `/tpo/drives/:driveId`
- `/tpo/drives/:driveId/rounds`
- `/tpo/drives/:driveId/applicants`
- `/tpo/offers`
- `/tpo/analytics`
- `/tpo/notifications`
- `/tpo/settings`

### Recruiter (Scaffold now, expand later)
- `/recruiter/dashboard`
- `/recruiter/proposals`
- `/recruiter/proposals/new`
- `/recruiter/proposals/:proposalId`
- `/recruiter/candidates`
- `/recruiter/offers`

## Build Order

### Phase A — Core UI Foundation
1. App shell (header/sidebar/topbar)
2. Design tokens (colors, type, spacing)
3. Shared components (buttons, inputs, cards, badges, tables)
4. Auth screens

### Phase B — Student MVP Screens
1. Student dashboard
2. Student profile
3. Resume manual form
4. Drive listing + detail
5. Applications
6. Offers + respond flow
7. Notifications

### Phase C — TPO MVP Screens
1. TPO dashboard
2. Recruiter proposal review queue
3. Drive create/publish workflow
4. Round management
5. Offer oversight
6. Basic analytics views

## Domain Semantics (Current)
- Offer statuses: `OFFERED`, `ACCEPTED`, `DECLINED`, `TIMED_OUT` (display label can be “Expired”).
- Recruiters can propose drives; TPO confirms and publishes.
- Student opt-out is allowed at any stage. Post-round and post-offer opt-out triggers escalation workflows.

## Next Action
Create low-fidelity wireframes for:
1. Landing page
2. Student dashboard + resume flow
3. TPO dashboard + proposal review flow

After wireframes are approved, begin page implementation with mock data contracts.
