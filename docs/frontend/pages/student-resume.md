# Page Spec — Student Resume Workspace

**Route family:**
- `/student/resume`
- `/student/resume/manual-edit`
- `/student/resume/upload-parse`
- `/student/resume/review-parsed`

## Objectives
- Make manual structured resume entry primary.
- Treat parser output as editable prefill.

## Flows
1. Manual entry flow
   - Education
   - Skills
   - Experience
   - Projects
   - Certifications
2. Upload + parse flow
   - Upload file
   - Parse result review
   - Accept/edit fields
3. Export structured one-page resume (later enhancement)

## Guardrails
- Accept non-normalized input, but flag severe invalidities.
- Never overwrite manual fields silently.
