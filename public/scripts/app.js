const app = document.getElementById('app');
const profileToggle = document.getElementById('profileToggle');
const profileName = document.getElementById('profileName');
const profileMenu = document.getElementById('profileMenu');

const currentUser = {
  firstName: 'Ahmed',
  fullName: 'Ahmed Hakeem',
  email: 'dev.ahm.hak@gmail.com',
  role: 'RECRUITER', // STUDENT | TPO | RECRUITER
  department: 'CSE',
  program: 'B.Tech',
  year_of_study: 4,
  cgpa: '8.50',
  backlog_count: 0,
  phone: '+91-9876543210',
  bio: 'Aspiring software engineer focused on distributed systems and product design.'
};

const commonMenu = [
  'Your Profile',
  'Calendar',
  'Settings',
  'Theme: Light/Dark',
  'FAQ',
  'Get Support',
  'Log Out'
];

const roleExtras = {
  STUDENT: ['My Applications'],
  TPO: ['Review Proposals'],
  RECRUITER: ['My Drive Proposals']
};

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

  '/student/profile': () => profilePage('STUDENT'),
  '/tpo/profile': () => profilePage('TPO'),
  '/recruiter/profile': () => profilePage('RECRUITER'),

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

  '/student/settings': () => page('Settings', 'Account preferences and communication options.', settingsBody()),

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

  '/recruiter/dashboard': () => recruiterDashboardPage(),
  '/recruiter/proposals': () => recruiterProposalsPage(),
  '/recruiter/proposals/new': () => recruiterDriveCreationPage(),
  '/recruiter/candidates': () => page('Candidates', 'Filtered and ranked applicants view.', `<div class="card"><p>Candidate table placeholder (to be API-connected in next phase).</p></div>`),
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

function profilePage(scope) {
  const scopeSection = {
    STUDENT: `
      <div class="form-group"><label class="form-label" for="department">Department</label><input id="department" class="form-input" value="${currentUser.department}"></div>
      <div class="form-group"><label class="form-label" for="program">Program</label><input id="program" class="form-input" value="${currentUser.program}"></div>
      <div class="form-group"><label class="form-label" for="year">Year of Study</label><input id="year" class="form-input" type="number" value="${currentUser.year_of_study}"></div>
      <div class="form-group"><label class="form-label" for="cgpa">CGPA</label><input id="cgpa" class="form-input" value="${currentUser.cgpa}"></div>
      <div class="form-group"><label class="form-label" for="backlog">Backlog Count</label><input id="backlog" class="form-input" type="number" value="${currentUser.backlog_count}"></div>
    `,
    TPO: `
      <div class="form-group"><label class="form-label" for="office">Office</label><input id="office" class="form-input" value="Placement Office"></div>
      <div class="form-group"><label class="form-label" for="designation">Designation</label><input id="designation" class="form-input" value="Training & Placement Officer"></div>
      <div class="form-group full"><label class="form-label" for="policy">Escalation Policy Note</label><textarea id="policy" class="form-textarea">Post-offer student opt-outs trigger mandatory counseling workflow.</textarea></div>
    `,
    RECRUITER: `
      <div class="form-group"><label class="form-label" for="company">Company Name</label><input id="company" class="form-input" value="Acme Tech"></div>
      <div class="form-group"><label class="form-label" for="industry">Industry</label><input id="industry" class="form-input" value="Software"></div>
      <div class="form-group"><label class="form-label" for="designation">Designation</label><input id="designation" class="form-input" value="Talent Partner"></div>
      <div class="form-group full"><label class="form-label" for="pref">Preferred Hiring Note</label><textarea id="pref" class="form-textarea">Open to final-year students with internship experience.</textarea></div>
    `
  };

  return page('Your Profile', `Manage account details for ${scope}.`, `
    <section class="profile-layout">
      <aside class="profile-side">
        <button class="profile-nav-item active">Personal Info</button>
        <button class="profile-nav-item">Security & Sign-in</button>
        <button class="profile-nav-item">Data & Privacy</button>
        <button class="profile-nav-item">Activity</button>
      </aside>
      <section class="profile-main">
        <div class="profile-head">
          <div class="profile-big-avatar">${currentUser.firstName.charAt(0)}</div>
          <div>
            <h3 style="margin:0">${currentUser.fullName}</h3>
            <p style="margin:2px 0 0">${currentUser.email}</p>
          </div>
        </div>

        <form class="profile-form">
          <div class="form-group"><label class="form-label" for="full_name">Full Name</label><input id="full_name" class="form-input" value="${currentUser.fullName}"></div>
          <div class="form-group"><label class="form-label" for="email">Email</label><input id="email" class="form-input" value="${currentUser.email}"></div>
          <div class="form-group"><label class="form-label" for="phone">Phone</label><input id="phone" class="form-input" value="${currentUser.phone}"></div>
          <div class="form-group"><label class="form-label" for="role">Role</label><input id="role" class="form-input" value="${scope}" readonly></div>

          ${scopeSection[scope]}

          <div class="form-group full"><label class="form-label" for="bio">Bio</label><textarea id="bio" class="form-textarea">${currentUser.bio}</textarea></div>
        </form>
        <div class="actions" style="margin-top:12px"><button class="btn">Save Profile</button></div>
      </section>
    </section>
  `);
}

function recruiterDashboardPage() {
  return page('Recruiter Dashboard', 'Propose and track drives before TPO approval.', `
    <div class="kpis">
      <div class="kpi"><div class="kpi-value">3</div><div class="kpi-label">Draft Proposals</div></div>
      <div class="kpi"><div class="kpi-value">5</div><div class="kpi-label">Under TPO Review</div></div>
      <div class="kpi"><div class="kpi-value">2</div><div class="kpi-label">Approved Drives</div></div>
      <div class="kpi"><div class="kpi-value">1</div><div class="kpi-label">Needs Changes</div></div>
    </div>
    <div class="actions" style="margin-top:14px">
      <a class="btn" href="/recruiter/proposals/new">Create New Drive Proposal</a>
      <a class="btn secondary" href="/recruiter/proposals">View All Proposals</a>
    </div>
  `);
}

function recruiterProposalsPage() {
  return page('Recruiter Proposals', 'Review the current proposal queue and statuses.', `
    <div class="card">
      <div class="actions" style="justify-content:space-between; margin-bottom:12px;">
        <span class="badge">Proposal Queue</span>
        <a class="btn" href="/recruiter/proposals/new">+ New Proposal</a>
      </div>
      <ul class="clean">
        <li><strong>Software Engineer 2026</strong> — UNDER_REVIEW</li>
        <li><strong>Data Analyst Internship</strong> — DRAFT</li>
        <li><strong>Graduate Trainee Program</strong> — CHANGES_REQUESTED</li>
      </ul>
    </div>
  `);
}

function recruiterDriveCreationPage() {
  return page('Create Drive Proposal', 'Recruiter-side proposal form mapped to placement drive schema for TPO review.', `
    <section class="drive-layout">
      <div>
        <form id="driveProposalForm">
          <section class="form-section">
            <h3>Role & Drive Basics</h3>
            <div class="profile-form">
              <div class="form-group"><label class="form-label" for="title">Drive Title</label><input id="title" class="form-input" placeholder="e.g., Software Engineer 2026"></div>
              <div class="form-group"><label class="form-label" for="employment_type">Employment Type</label><select id="employment_type" class="form-select"><option>Full-time</option><option>Internship</option><option>PPO</option><option>Contract</option></select></div>
              <div class="form-group full"><label class="form-label" for="description">Role Description</label><textarea id="description" class="form-textarea" placeholder="Role summary, responsibilities, hiring process"></textarea></div>
              <div class="form-group"><label class="form-label" for="location">Location</label><input id="location" class="form-input" placeholder="Bangalore / Remote / Hybrid"></div>
              <div class="form-group"><label class="form-label" for="package">Package Offered (CTC)</label><input id="package" class="form-input" type="number" step="0.01" placeholder="10.50"></div>
            </div>
          </section>

          <section class="form-section">
            <h3>Eligibility Rules</h3>
            <div class="profile-form">
              <div class="form-group"><label class="form-label" for="min_cgpa">Minimum CGPA</label><input id="min_cgpa" class="form-input" type="number" min="0" max="10" step="0.01" value="6.50"></div>
              <div class="form-group"><label class="form-label" for="max_backlogs">Maximum Backlogs</label><input id="max_backlogs" class="form-input" type="number" min="0" value="0"></div>
              <div class="form-group"><label class="form-label" for="min_year_of_study">Minimum Year of Study</label><input id="min_year_of_study" class="form-input" type="number" min="1" max="5" value="3"></div>
              <div class="form-group"><label class="form-label" for="is_featured">Featured Drive</label><select id="is_featured" class="form-select"><option value="false">No</option><option value="true">Yes</option></select></div>
              <div class="form-group full">
                <label class="form-label">Eligible Departments</label>
                <div class="check-grid">
                  ${['CSE','ECE','EEE','ME','CE','IT','BBA','MCA','MBA'].map((d) => `<div class="check-item"><input id="dept_${d}" type="checkbox"><label for="dept_${d}">${d}</label></div>`).join('')}
                </div>
              </div>
            </div>
          </section>

          <section class="form-section">
            <h3>Timeline & Review Submission</h3>
            <div class="profile-form">
              <div class="form-group"><label class="form-label" for="application_deadline">Application Deadline</label><input id="application_deadline" class="form-input" type="datetime-local"></div>
              <div class="form-group"><label class="form-label" for="drive_start_date">Drive Start Date</label><input id="drive_start_date" class="form-input" type="datetime-local"></div>
              <div class="form-group"><label class="form-label" for="drive_end_date">Drive End Date</label><input id="drive_end_date" class="form-input" type="datetime-local"></div>
              <div class="form-group"><label class="form-label" for="proposal_status">Proposal Status</label><input id="proposal_status" class="form-input" value="DRAFT" readonly></div>
              <div class="form-group full"><label class="form-label" for="notes">Notes for TPO</label><textarea id="notes" class="form-textarea" placeholder="Any clarifications or special constraints for TPO review"></textarea></div>
            </div>
            <div class="actions" style="margin-top:10px">
              <button type="button" class="btn" onclick="alert('Proposal save placeholder')">Save Draft</button>
              <button type="button" class="btn secondary" onclick="alert('Submitted to TPO placeholder')">Submit for TPO Review</button>
            </div>
          </section>
        </form>
      </div>

      <aside class="drive-sidebar">
        <h3 style="margin-top:0">Schema Mapping</h3>
        <ul class="mini-list">
          <li><code>title</code>, <code>description</code>, <code>employment_type</code></li>
          <li><code>min_cgpa</code>, <code>max_backlogs</code>, <code>min_year_of_study</code></li>
          <li><code>eligible_departments[]</code></li>
          <li><code>package_offered</code>, <code>location</code></li>
          <li><code>application_deadline</code>, <code>drive_start_date</code>, <code>drive_end_date</code></li>
          <li><code>status</code> starts as <code>DRAFT</code></li>
        </ul>
        <hr>
        <p style="margin:0">Recruiters can <strong>propose</strong>. TPO performs approval/publish actions.</p>
      </aside>
    </section>
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
  if (pathname.startsWith('/recruiter/proposals/')) {
    if (pathname === '/recruiter/proposals/new') return routes['/recruiter/proposals/new']();
    return routes['/recruiter/proposals']();
  }
  return null;
}

function buildProfileMenu() {
  const actions = [...commonMenu, ...(roleExtras[currentUser.role] || [])];

  profileName.textContent = currentUser.firstName;
  const avatar = profileToggle.querySelector('.avatar');
  avatar.textContent = currentUser.firstName.charAt(0).toUpperCase();

  profileMenu.innerHTML = actions
    .map((item) => `<button type="button" data-action="${item}">${item}</button>`)
    .join('');
}

function routeForProfile(role) {
  if (role === 'TPO') return '/tpo/profile';
  if (role === 'RECRUITER') return '/recruiter/profile';
  return '/student/profile';
}

function setupHeaderInteractions() {
  profileToggle.addEventListener('click', () => {
    const hidden = profileMenu.classList.toggle('hidden');
    profileToggle.setAttribute('aria-expanded', String(!hidden));
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.profile-menu-wrap')) {
      profileMenu.classList.add('hidden');
      profileToggle.setAttribute('aria-expanded', 'false');
    }
  });

  profileMenu.addEventListener('click', (e) => {
    const button = e.target.closest('button[data-action]');
    if (!button) return;

    const action = button.dataset.action;

    if (action === 'Your Profile') {
      navigate(routeForProfile(currentUser.role));
    } else if (action === 'Calendar') {
      navigate(currentUser.role === 'RECRUITER' ? '/recruiter/dashboard' : '/student/dashboard');
    } else if (action === 'Settings') {
      if (currentUser.role === 'TPO') navigate('/tpo/settings');
      else if (currentUser.role === 'RECRUITER') navigate('/recruiter/dashboard');
      else navigate('/student/settings');
    } else if (action === 'Log Out') {
      alert('Log out action placeholder');
    } else if (action === 'Review Proposals') {
      navigate('/tpo/recruiter-proposals');
    } else if (action === 'My Drive Proposals') {
      navigate('/recruiter/proposals');
    } else if (action === 'My Applications') {
      navigate('/student/applications');
    } else {
      alert(`${action} placeholder`);
    }

    profileMenu.classList.add('hidden');
    profileToggle.setAttribute('aria-expanded', 'false');
  });
}

function render() {
  const pathname = window.location.pathname;
  const routeFn = routes[pathname];
  const view = routeFn ? routeFn() : resolveDynamicPath(pathname);
  app.innerHTML = view || page('404', 'Page not found in current scaffold.', `<div class="card"><a class="btn" href="/">Go Home</a></div>`);
}

function navigate(path) {
  window.history.pushState({}, '', path);
  render();
}

window.addEventListener('click', (e) => {
  const a = e.target.closest('a[href]');
  if (!a) return;
  const href = a.getAttribute('href');
  if (!href.startsWith('/')) return;
  e.preventDefault();
  navigate(href);
});

window.addEventListener('popstate', render);

buildProfileMenu();
setupHeaderInteractions();
render();
