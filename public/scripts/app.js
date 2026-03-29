const app = document.getElementById('app');

const page = (title, subtitle, body) => `
  <section>
    <h1 class="page-title">${title}</h1>
    <p class="page-subtitle">${subtitle}</p>
    ${body}
  </section>
`;

const routes = {
  '/': () => `
    <section class="hero">
      <h1>ORBITON</h1>
      <p class="subtitle">An AI-enabled end-to-end digital platform for institutional placements management</p>
      <div class="actions">
        <a class="btn" href="/auth/register">Get Started</a>
        <a class="btn secondary" href="/auth/login">Sign In</a>
      </div>
    </section>
    <section style="margin-top:24px" class="grid cols-3">
      <article class="card"><h3>Student Portal</h3><p>Maintain profile, resume, projects and certifications. View eligible opportunities and apply online.</p><a class="btn secondary" href="/student/dashboard">Open Student Portal</a></article>
      <article class="card"><h3>Recruiter Portal</h3><p>Propose internship/job drives with criteria, screen applicants and collaborate with TPO for publication.</p><a class="btn secondary" href="/recruiter/dashboard">Open Recruiter Portal</a></article>
      <article class="card"><h3>TPO Dashboard</h3><p>Approve proposals, monitor all rounds, handle offer workflow and placement escalations.</p><a class="btn secondary" href="/tpo/dashboard">Open TPO Dashboard</a></article>
    </section>
  `,

  '/about': () => page('About Orbiton', 'The better way to coordinate students, recruiters and placement officers.', `
    <div class="card">
      <p>Orbiton is a web-based platform centered around student placement lifecycle management, including profile readiness, drive management, round outcomes and final offers.</p>
      <p>Primary v1 focus: Student + TPO flows. Recruiter and Faculty surfaces are scaffolded.</p>
    </div>
  `),

  '/contact': () => page('Contact', 'Reach support and placement office.', `
    <div class="card"><ul class="clean"><li>Email: support@orbiton.local</li><li>Placement Office: +91-0000000000</li><li>SLA: 24–48 hours</li></ul></div>
  `),

  '/auth/login': () => authPage('Login'),
  '/auth/register': () => authPage('Register'),
  '/auth/forgot-password': () => authPage('Forgot Password'),
  '/auth/reset-password': () => authPage('Reset Password'),
  '/auth/verify-otp': () => authPage('Verify Email OTP'),

  '/student/dashboard': () => page('Student Dashboard', 'Placement progress at a glance.', `
    <div class="kpis">
      <div class="kpi"><div class="kpi-value">82%</div><div class="kpi-label">Profile Completeness</div></div>
      <div class="kpi"><div class="kpi-value">5</div><div class="kpi-label">Applications</div></div>
      <div class="kpi"><div class="kpi-value">2</div><div class="kpi-label">Active Rounds</div></div>
      <div class="kpi"><div class="kpi-value">1</div><div class="kpi-label">Offer</div></div>
    </div>
    <div class="grid cols-2" style="margin-top:16px">
      <article class="card"><h3>Quick Actions</h3><div class="actions"><a class="btn" href="/student/profile">Update Profile</a><a class="btn" href="/student/resume">Resume Workspace</a><a class="btn" href="/student/drives">Browse Drives</a></div></article>
      <article class="card"><h3>Upcoming</h3><ul class="clean"><li>Aptitude Round - Apr 2</li><li>Technical Interview - Apr 4</li><li>HR Round - Apr 7</li></ul></article>
    </div>
  `),

  '/student/profile': () => page('Student Profile', 'Academic and personal details for eligibility checks.', `
    <div class="card">
      <ul class="clean"><li>Full Name</li><li>Department</li><li>Program</li><li>Year of Study</li><li>CGPA</li><li>Backlog Count</li></ul>
      <div class="actions" style="margin-top:12px"><button class="btn">Save Profile</button></div>
    </div>
  `),

  '/student/resume': () => page('Resume Workspace', 'Manual-first structured resume with parser-assisted prefill.', resumeBody()),
  '/student/resume/manual-edit': () => page('Resume Manual Edit', 'Education, Skills, Experience, Projects and Certifications forms.', resumeBody()),
  '/student/resume/upload-parse': () => page('Upload & Parse Resume', 'Upload document and prefill structured sections.', resumeBody()),
  '/student/resume/review-parsed': () => page('Review Parsed Resume', 'Accept/edit parser output before final save.', resumeBody()),

  '/student/drives': () => page('Student Drives', 'Explore eligible opportunities and apply.', `
    <div class="card"><h3>Filters</h3><p>Department, Package, Location, Employment Type.</p></div>
    <div class="grid cols-2" style="margin-top:14px">
      <article class="card"><h3>Drive A</h3><p>Eligibility: CGPA 7.5+, CSE/ECE</p><a class="btn secondary" href="/student/drives/drive-a">View Details</a></article>
      <article class="card"><h3>Drive B</h3><p>Eligibility: CGPA 6.5+, Any Dept</p><a class="btn secondary" href="/student/drives/drive-b">View Details</a></article>
    </div>
  `),

  '/student/applications': () => page('My Applications', 'Track status across all applied drives.', appOfferBody()),
  '/student/offers': () => page('My Offers', 'Respond to active offers.', appOfferBody()),

  '/student/notifications': () => page('Notifications', 'System updates and placement office messages.', `
    <div class="card"><ul class="clean"><li>Your round result is published.</li><li>New drive opened for your department.</li><li>Placement office meeting reminder.</li></ul></div>
  `),

  '/student/settings': () => page('Settings', 'Account preferences and communication options.', `
    <div class="card"><ul class="clean"><li>Email notifications</li><li>MFA preferences</li><li>Password management</li></ul></div>
  `),

  '/tpo/dashboard': () => page('TPO Dashboard', 'Placement operations command center.', `
    <div class="kpis">
      <div class="kpi"><div class="kpi-value">14</div><div class="kpi-label">Pending Proposals</div></div>
      <div class="kpi"><div class="kpi-value">8</div><div class="kpi-label">Active Drives</div></div>
      <div class="kpi"><div class="kpi-value">23</div><div class="kpi-label">Round Updates</div></div>
      <div class="kpi"><div class="kpi-value">4</div><div class="kpi-label">Escalations</div></div>
    </div>
    <div class="actions" style="margin-top:14px"><a class="btn" href="/tpo/recruiter-proposals">Review Proposals</a><a class="btn" href="/tpo/drives">Manage Drives</a></div>
  `),

  '/tpo/recruiter-proposals': () => page('Recruiter Proposals', 'Approve, reject or request changes.', proposalBody()),
  '/tpo/drives': () => page('Drive Management', 'Create drafts, publish drives and monitor timeline.', drivesManageBody()),
  '/tpo/drives/new': () => page('Create Drive', 'Configure eligibility, timeline and publication state.', drivesManageBody()),
  '/tpo/offers': () => page('Offer Oversight', 'Track offer decisions and exceptions.', appOfferBody()),
  '/tpo/analytics': () => page('Analytics', 'Department and batch-wise outcome trends.', analyticsBody()),
  '/tpo/notifications': () => page('TPO Notifications', 'Operational alerts and escalations.', alertsBody()),
  '/tpo/settings': () => page('TPO Settings', 'Policy controls and notification preferences.', settingsBody()),

  '/recruiter/dashboard': () => page('Recruiter Dashboard', 'Scaffold route for future expansion.', `
    <div class="card"><p>Recruiters can propose drives. Final publication remains under TPO control.</p><a class="btn" href="/recruiter/proposals">Go to Proposals</a></div>
  `),
  '/recruiter/proposals': () => page('Recruiter Proposals', 'Create and manage drive proposals.', proposalBody()),
  '/recruiter/proposals/new': () => page('New Proposal', 'Submit a new drive proposal for TPO review.', proposalBody()),
  '/recruiter/candidates': () => page('Candidates', 'Filtered and ranked applicants view.', `
    <div class="card"><p>Candidate table placeholder (to be API-connected in next phase).</p></div>
  `),
  '/recruiter/offers': () => page('Recruiter Offers', 'Draft and track offer release status.', appOfferBody())
};

function authPage(label) {
  return page(label, 'Authentication surface (UI scaffold).', `
    <div class="card">
      <p>This page is scaffolded and ready for API integration.</p>
      <div class="actions"><button class="btn">Primary Action</button><a class="btn secondary" href="/auth/login">Back to Login</a></div>
    </div>
  `);
}

function resumeBody() {
  return `<div class="grid cols-2"><article class="card"><h3>Manual Sections</h3><ul class="clean"><li>Education</li><li>Skills</li><li>Experience</li><li>Projects</li><li>Certifications</li></ul></article><article class="card"><h3>Parser Assist</h3><p>Upload resume and review parser output before confirming changes.</p><div class="actions"><button class="btn">Upload Resume</button><button class="btn secondary">Review Parsed Data</button></div></article></div>`;
}

function appOfferBody() {
  return `<div class="grid cols-2"><article class="card"><h3>Status Timeline</h3><ul class="clean"><li>APPLIED</li><li>IN_PROCESS</li><li>OFFERED</li><li>ACCEPTED / DECLINED / TIMED_OUT</li></ul></article><article class="card"><h3>Escalation Logic</h3><p>Post-round and post-offer opt-out actions generate placement office alerts and follow-up tasks.</p></article></div>`;
}

function proposalBody() {
  return `<div class="card"><ul class="clean"><li>Approve</li><li>Reject (reason mandatory)</li><li>Request changes (comment mandatory)</li></ul></div>`;
}

function drivesManageBody() {
  return `<div class="card"><ul class="clean"><li>Draft drive details</li><li>Set eligibility and deadlines</li><li>Publish after TPO confirmation</li><li>Configure rounds and track results</li></ul></div>`;
}

function analyticsBody() {
  return `<div class="card"><p>Analytics panels placeholder: department-wise, batch-wise, and placement outcome trends.</p></div>`;
}

function alertsBody() {
  return `<div class="card"><ul class="clean"><li>Late opt-out escalation</li><li>Post-offer decline escalation</li><li>Drive deadline reminders</li></ul></div>`;
}

function settingsBody() {
  return `<div class="card"><ul class="clean"><li>Notification channels</li><li>Escalation threshold rules</li><li>MFA policy preferences</li></ul></div>`;
}

function resolveDynamicPath(pathname) {
  if (pathname.startsWith('/student/drives/')) return routes['/student/drives']();
  if (pathname.startsWith('/student/applications/')) return routes['/student/applications']();
  if (pathname.startsWith('/student/offers/')) return routes['/student/offers']();
  if (pathname.startsWith('/tpo/recruiter-proposals/')) return routes['/tpo/recruiter-proposals']();
  if (pathname.startsWith('/tpo/drives/')) return routes['/tpo/drives']();
  if (pathname.startsWith('/recruiter/proposals/')) return routes['/recruiter/proposals']();
  return null;
}

function render() {
  const pathname = window.location.pathname;
  const view = routes[pathname] || resolveDynamicPath(pathname);
  app.innerHTML = view || page('404', 'Page not found in current scaffold.', `<div class="card"><a class="btn" href="/">Go Home</a></div>`);
}

window.addEventListener('click', (e) => {
  const a = e.target.closest('a[href]');
  if (!a) return;
  const href = a.getAttribute('href');
  if (!href.startsWith('/')) return;
  e.preventDefault();
  window.history.pushState({}, '', href);
  render();
});

window.addEventListener('popstate', render);
render();
