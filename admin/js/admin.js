// ISRS Admin Dashboard JavaScript

let currentUser = null;

// Check authentication on page load
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
});

/**
 * Check if user is authenticated
 */
function checkAuth() {
  const storedEmail = localStorage.getItem('isrs_admin_email');
  if (storedEmail) {
    verifyAndLoadDashboard(storedEmail);
  }
}

/**
 * Handle login form submission
 */
async function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('emailInput').value;

  try {
    const permissions = await UserAPI.checkPermissions(email);

    if (permissions.success && (permissions.role === 'admin' || permissions.role === 'board')) {
      localStorage.setItem('isrs_admin_email', email);
      currentUser = permissions;
      showDashboard();
      loadDashboardData();
    } else {
      alert('Access denied. You do not have permission to access this dashboard.');
    }
  } catch (error) {
    alert('Error verifying permissions: ' + error.message);
  }
}

/**
 * Verify stored email and load dashboard
 */
async function verifyAndLoadDashboard(email) {
  try {
    const permissions = await UserAPI.checkPermissions(email);

    if (permissions.success && (permissions.role === 'admin' || permissions.role === 'board')) {
      currentUser = permissions;
      showDashboard();
      loadDashboardData();
    } else {
      logout();
    }
  } catch (error) {
    logout();
  }
}

/**
 * Show dashboard and hide login
 */
function showDashboard() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('mainDashboard').style.display = 'block';
  document.getElementById('userEmail').textContent = currentUser.email;
}

/**
 * Logout
 */
function logout() {
  localStorage.removeItem('isrs_admin_email');
  currentUser = null;
  document.getElementById('loginScreen').style.display = 'block';
  document.getElementById('mainDashboard').style.display = 'none';
  document.getElementById('emailInput').value = '';
}

/**
 * Load all dashboard data
 */
async function loadDashboardData() {
  await loadStatistics();
  loadVoteHistory();
  loadBoardMembers();
  loadConferenceData();
  loadSystemOverview();
}

/**
 * Load statistics
 */
async function loadStatistics() {
  try {
    const stats = await AdminAPI.getStats();

    document.getElementById('statContacts').textContent = formatNumber(stats.totalContacts);
    document.getElementById('statOrgs').textContent = formatNumber(stats.totalOrganizations);
    document.getElementById('statVotes').textContent = formatNumber(stats.totalVotes);
    document.getElementById('statRegistrations').textContent = formatNumber(stats.icsr2026Registered);
    document.getElementById('statQuality').textContent = stats.dataQuality + '%';
    document.getElementById('statStatus').textContent = stats.systemStatus || 'Active';
    document.getElementById('lastUpdated').textContent = formatDate(stats.lastUpdated);
  } catch (error) {
    console.error('Error loading statistics:', error);
  }
}

/**
 * Refresh statistics
 */
async function refreshStats() {
  showLoading('statsGrid');
  await loadStatistics();
  location.reload(); // Refresh to show updated stats
}

/**
 * Switch tabs
 */
function switchTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });

  // Remove active class from all tab buttons
  document.querySelectorAll('.tab').forEach(btn => {
    btn.classList.remove('active');
  });

  // Show selected tab
  document.getElementById('tab-' + tabName).classList.add('active');

  // Add active class to clicked button
  event.target.classList.add('active');
}

/**
 * Load system overview
 */
function loadSystemOverview() {
  const overview = document.getElementById('systemOverview');
  overview.innerHTML = `
    <div class="grid grid-2">
      <div>
        <h3 style="color: #1e5a8e; margin-bottom: 1rem;">Database Info</h3>
        <p><strong>Backend:</strong> PostgreSQL on Render</p>
        <p><strong>API:</strong> <a href="https://isrs-database-backend.onrender.com" target="_blank" style="color: #16a085;">isrs-database-backend.onrender.com</a></p>
        <p><strong>Your Role:</strong> ${currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}</p>
        <p><strong>Permissions:</strong> ${currentUser.permissions.join(', ')}</p>
      </div>
      <div>
        <h3 style="color: #1e5a8e; margin-bottom: 1rem;">Quick Stats</h3>
        <p><strong>Board Members:</strong> ${formatNumber(document.getElementById('statVotes').dataset.boardCount || 8)}</p>
        <p><strong>Recent Votes:</strong> ${formatNumber(document.getElementById('statVotes').dataset.recentCount || 0)} (last 30 days)</p>
        <p><strong>ICSR 2024:</strong> 312 attendees, 23 countries</p>
        <p><strong>ICSR 2026:</strong> Puget Sound, WA (Oct 4-8, 2026)</p>
      </div>
    </div>
  `;
}

/**
 * Process board vote
 */
async function processVote(event) {
  event.preventDefault();

  const emailContent = document.getElementById('voteEmail').value;
  const resultDiv = document.getElementById('voteResult');

  resultDiv.innerHTML = '<div class="loading">Processing vote with AI...</div>';

  try {
    const result = await VoteAPI.processVote({ emailContent });

    if (result.success) {
      const vote = result.vote;
      resultDiv.innerHTML = `
        <div class="success">
          <h3>✅ Vote Processed Successfully!</h3>
          <div class="vote-details">
            <p><strong>Motion:</strong> ${vote.motion}</p>
            <p><strong>Date:</strong> ${formatDate(vote.date)}</p>
            <p><strong>Method:</strong> ${vote.method}</p>
            <p><strong>Result:</strong> <span class="badge ${vote.result === 'passed' ? 'success' : 'danger'}">${vote.result.toUpperCase()}</span></p>
            <p><strong>Votes:</strong> ${vote.yesCount} Yes, ${vote.noCount} No, ${vote.abstainCount} Abstain</p>
            <p><strong>Quorum:</strong> ${vote.quorumMet ? '✅ Met' : '❌ Not Met'}</p>

            <h4>Vote Breakdown:</h4>
            <div class="vote-grid">
              ${Object.entries(vote.votes).map(([member, v]) =>
                `<div class="vote-item ${v.toLowerCase()}">${member}: ${v}</div>`
              ).join('')}
            </div>
          </div>
        </div>
      `;

      // Refresh vote history
      loadVoteHistory();
    } else {
      resultDiv.innerHTML = `<div class="error">Error: ${result.error}</div>`;
    }
  } catch (error) {
    resultDiv.innerHTML = `<div class="error">Error processing vote: ${error.message}</div>`;
  }
}

/**
 * Clear vote form
 */
function clearVoteForm() {
  document.getElementById('voteEmail').value = '';
  document.getElementById('voteResult').innerHTML = '';
}

/**
 * Load vote history
 */
async function loadVoteHistory() {
  const historyDiv = document.getElementById('voteHistory');
  historyDiv.innerHTML = '<div class="loading">Loading vote history...</div>';

  try {
    const result = await VoteAPI.getHistory(20);

    if (result.success && result.votes.length > 0) {
      let html = '<table class="data-table"><thead><tr>';
      html += '<th>Date</th><th>Motion</th><th>Result</th><th>Votes</th><th>Quorum</th><th>Actions</th>';
      html += '</tr></thead><tbody>';

      result.votes.forEach(vote => {
        html += `<tr>
          <td>${formatDate(vote.vote_date)}</td>
          <td>${vote.motion_title}</td>
          <td><span class="badge ${vote.result === 'passed' ? 'success' : 'danger'}">${vote.result.toUpperCase()}</span></td>
          <td>${vote.yes_count} / ${vote.no_count} / ${vote.abstain_count}</td>
          <td>${vote.quorum_met ? '✅' : '❌'}</td>
          <td><button class="btn-admin secondary" onclick="viewVoteDetails('${vote.vote_id}')">View</button></td>
        </tr>`;
      });

      html += '</tbody></table>';
      historyDiv.innerHTML = html;
    } else {
      historyDiv.innerHTML = '<p style="text-align: center; color: #7f8c8d; padding: 2rem;">No votes recorded yet.</p>';
    }
  } catch (error) {
    historyDiv.innerHTML = `<div class="error">Error loading vote history: ${error.message}</div>`;
  }
}

/**
 * View vote details
 */
async function viewVoteDetails(voteId) {
  try {
    const result = await VoteAPI.getDetails(voteId);

    if (result.success) {
      alert('Vote Details:\n' + JSON.stringify(result.vote, null, 2));
    }
  } catch (error) {
    alert('Error loading vote details: ' + error.message);
  }
}

/**
 * Load board members
 */
async function loadBoardMembers() {
  const boardDiv = document.getElementById('boardMembersList');
  boardDiv.innerHTML = '<div class="loading">Loading board members...</div>';

  try {
    const result = await AdminAPI.getBoardMembers();

    if (result.success && result.boardMembers.length > 0) {
      let html = '<table class="data-table"><thead><tr>';
      html += '<th>Name</th><th>Email</th><th>Role</th><th>Organization</th><th>Phone</th>';
      html += '</tr></thead><tbody>';

      result.boardMembers.forEach(member => {
        html += `<tr>
          <td>${member.name || '-'}</td>
          <td>${member.email || '-'}</td>
          <td>${member.role || '-'}</td>
          <td>${member.organization || '-'}</td>
          <td>${member.phone || '-'}</td>
        </tr>`;
      });

      html += '</tbody></table>';
      html += `<p style="margin-top: 1rem; color: #7f8c8d;">Total: ${result.count} board members</p>`;
      boardDiv.innerHTML = html;
    } else {
      boardDiv.innerHTML = '<p style="text-align: center; color: #7f8c8d; padding: 2rem;">No board members found in database.</p>';
    }
  } catch (error) {
    boardDiv.innerHTML = `<div class="error">Error loading board members: ${error.message}</div>`;
  }
}

/**
 * Load conference data
 */
async function loadConferenceData() {
  const confDiv = document.getElementById('conferenceData');
  confDiv.innerHTML = '<div class="loading">Loading conference data...</div>';

  try {
    const result = await AdminAPI.getICSRData();

    if (result.success) {
      const icsr2024 = result.icsr2024;
      const icsr2026 = result.icsr2026;

      let html = '<div class="grid grid-2">';

      // ICSR 2024
      html += '<div class="card">';
      html += '<h3 style="color: #1e5a8e;">ICSR 2024 - Jekyll Island, GA</h3>';
      html += `<p><strong>Dates:</strong> ${icsr2024.dates}</p>`;
      html += `<p><strong>Attendees:</strong> ${icsr2024.attendees}</p>`;
      html += `<p><strong>Countries:</strong> ${icsr2024.countries}</p>`;
      html += `<p><strong>Sessions:</strong> ${icsr2024.sessions}</p>`;
      html += `<p><strong>Posters:</strong> ${icsr2024.posters}</p>`;
      html += `<p><strong>Sponsors:</strong> ${icsr2024.sponsors}</p>`;
      html += '</div>';

      // ICSR 2026
      html += '<div class="card">';
      html += '<h3 style="color: #16a085;">ICSR 2026 - Puget Sound, WA</h3>';
      html += `<p><strong>Dates:</strong> ${icsr2026.dates}</p>`;
      html += `<p><strong>Location:</strong> ${icsr2026.location}</p>`;
      html += `<p><strong>Registration Open:</strong> ${icsr2026.registrationOpen ? 'Yes' : 'Not yet'}</p>`;
      html += `<p><strong>Early Bird Deadline:</strong> ${icsr2026.earlyBirdDeadline}</p>`;
      html += `<p><strong>Abstract Deadline:</strong> ${icsr2026.abstractDeadline}</p>`;
      html += `<p><strong>Confirmed Sponsors:</strong> ${icsr2026.confirmedSponsors}</p>`;
      html += `<p><strong>Potential Sponsors:</strong> ${icsr2026.potentialSponsors}</p>`;
      html += '</div>';

      html += '</div>';

      confDiv.innerHTML = html;
    }
  } catch (error) {
    confDiv.innerHTML = `<div class="error">Error loading conference data: ${error.message}</div>`;
  }
}

/**
 * Test database connection
 */
async function testDatabase() {
  const dbDiv = document.getElementById('databaseInfo');
  dbDiv.innerHTML = '<div class="loading">Testing database connection...</div>';

  try {
    const result = await AdminAPI.testConnection();

    if (result.success) {
      let html = '<div class="success"><h3>✅ Database Connection Successful</h3></div>';

      result.tests.forEach(test => {
        html += `<div style="margin: 1rem 0; padding: 1rem; background-color: #ecf0f1; border-radius: 5px;">`;
        html += `<h4>${test.name}</h4>`;
        html += `<p><strong>Status:</strong> ${test.status}</p>`;

        if (test.version) {
          html += `<p><strong>Version:</strong> ${test.version}</p>`;
        }

        if (test.tables) {
          html += `<p><strong>Tables:</strong> ${test.tables.join(', ')}</p>`;
        }

        if (test.contacts !== undefined) {
          html += `<p><strong>Records:</strong> ${test.contacts} contacts, ${test.votes} votes, ${test.organizations} organizations</p>`;
        }

        html += `</div>`;
      });

      dbDiv.innerHTML = html;
    } else {
      dbDiv.innerHTML = `<div class="error">Database test failed</div>`;
    }
  } catch (error) {
    dbDiv.innerHTML = `<div class="error">Error testing database: ${error.message}</div>`;
  }
}

/**
 * View database tables
 */
async function viewTables() {
  const dbDiv = document.getElementById('databaseInfo');
  dbDiv.innerHTML = '<div class="loading">Loading database tables...</div>';

  try {
    const result = await AdminAPI.testConnection();

    if (result.success && result.tests) {
      const tableTest = result.tests.find(t => t.name === 'Database Tables');

      if (tableTest && tableTest.tables) {
        let html = '<h3>Database Tables</h3>';
        html += '<ul style="column-count: 2; column-gap: 2rem; margin-top: 1rem;">';

        tableTest.tables.forEach(table => {
          html += `<li style="margin-bottom: 0.5rem;">${table}</li>`;
        });

        html += '</ul>';
        dbDiv.innerHTML = html;
      }
    }
  } catch (error) {
    dbDiv.innerHTML = `<div class="error">Error loading tables: ${error.message}</div>`;
  }
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('active');
}
