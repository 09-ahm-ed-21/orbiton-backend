# Page Spec — TPO Proposals & Drive Management

**Routes:**
- `/tpo/recruiter-proposals`
- `/tpo/recruiter-proposals/:proposalId`
- `/tpo/drives`
- `/tpo/drives/new`
- `/tpo/drives/:driveId`
- `/tpo/drives/:driveId/rounds`
- `/tpo/drives/:driveId/applicants`

## Objectives
- Enforce recruiter proposal -> TPO approval workflow.
- Provide full lifecycle control over drives.

## Proposal Actions
- Approve
- Reject
- Request changes

## Drive Actions
- Edit draft
- Publish drive
- Configure rounds
- Record outcomes
- Trigger offers

## Controls
- Audit trail per approval decision.
- Mandatory reason field for rejection/request changes.
