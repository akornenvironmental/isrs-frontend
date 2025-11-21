/**
 * Shared Admin Layout Component
 * Provides consistent sidebar navigation and header across all admin pages
 */

function loadAdminLayout(currentPage) {
  const body = document.body;

  // Create wrapper structure
  const wrapper = document.createElement('div');
  wrapper.className = 'admin-layout';

  // Store fixed-position elements that should stay outside the layout
  const fixedElements = [];
  const aiAssistant = document.getElementById('aiAssistant');
  if (aiAssistant) {
    fixedElements.push(aiAssistant);
    body.removeChild(aiAssistant);
  }

  // Move existing body content into a temp container
  const existingContent = document.createElement('div');
  while (body.firstChild) {
    existingContent.appendChild(body.firstChild);
  }

  // Add sidebar
  wrapper.innerHTML = `
    <!-- Sidebar Navigation -->
    <aside class="admin-sidebar" id="admin-sidebar">
      <div class="sidebar-header">
        <a href="/admin/dashboard.html" class="sidebar-logo">ISRS Admin</a>
        <div class="sidebar-subtitle">Management Portal</div>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section">
          <a href="/" target="_blank" class="nav-item nav-item-external" style="background: #eff6ff; border-left-color: var(--accent-teal);">
            <span class="nav-icon">🌐</span>
            <span>View Main Website</span>
            <span style="margin-left: auto; font-size: 0.875rem;">↗</span>
          </a>
        </div>

        <div class="nav-section">
          <div class="nav-section-title">Overview</div>
          <a href="/admin/dashboard.html" class="nav-item ${currentPage === 'dashboard' ? 'active' : ''}">
            <span class="nav-icon">📊</span>
            <span>Dashboard</span>
          </a>
        </div>

        <div class="nav-section">
          <div class="nav-section-title">Data Management</div>
          <a href="/admin/contacts.html" class="nav-item ${currentPage === 'contacts' ? 'active' : ''}">
            <span class="nav-icon">👥</span>
            <span>Contacts</span>
          </a>
          <a href="/admin/organizations.html" class="nav-item ${currentPage === 'organizations' ? 'active' : ''}">
            <span class="nav-icon">🏢</span>
            <span>Organizations</span>
          </a>
          <a href="/admin/conferences.html" class="nav-item ${currentPage === 'conferences' ? 'active' : ''}">
            <span class="nav-icon">📅</span>
            <span>Conferences</span>
          </a>
        </div>

        <div class="nav-section">
          <div class="nav-section-title">Governance</div>
          <a href="/admin/votes.html" class="nav-item ${currentPage === 'votes' ? 'active' : ''}">
            <span class="nav-icon">🗳️</span>
            <span>Board Votes</span>
          </a>
          <a href="/admin/funding.html" class="nav-item ${currentPage === 'funding' ? 'active' : ''}">
            <span class="nav-icon">💰</span>
            <span>Funding</span>
          </a>
        </div>

        <div class="nav-section">
          <div class="nav-section-title">System</div>
          <a href="/admin/settings.html" class="nav-item ${currentPage === 'settings' ? 'active' : ''}">
            <span class="nav-icon">⚙️</span>
            <span>Settings</span>
          </a>
        </div>
      </nav>

      <div class="sidebar-footer">
        <div class="user-profile">
          <div class="user-avatar" id="adminUserAvatar">A</div>
          <div class="user-details">
            <div class="user-email" id="adminUserEmail">Loading...</div>
            <div class="user-role" id="adminUserRole">Admin</div>
          </div>
        </div>
        <button class="btn-logout" onclick="logout()">Sign Out</button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="admin-main-content" id="admin-main-content">
      <!-- Content will be inserted here -->
    </main>
  `;

  // Append wrapper to body
  body.appendChild(wrapper);

  // Insert original content into main content area
  const mainContent = document.getElementById('admin-main-content');
  mainContent.appendChild(existingContent);

  // Restore fixed-position elements outside the layout wrapper
  fixedElements.forEach(el => {
    body.appendChild(el);
  });

  // Load user info
  loadAdminUserInfo();
}

function loadAdminUserInfo() {
  try {
    const userData = localStorage.getItem('isrs_user_data');
    if (userData) {
      const user = JSON.parse(userData);

      // Update email
      const emailEl = document.getElementById('adminUserEmail');
      if (emailEl && user.email) {
        emailEl.textContent = user.email;
      }

      // Update role
      const roleEl = document.getElementById('adminUserRole');
      if (roleEl && user.role) {
        roleEl.textContent = user.role.toUpperCase();
      }

      // Update avatar
      const avatarEl = document.getElementById('adminUserAvatar');
      if (avatarEl && user.email) {
        avatarEl.textContent = user.email.charAt(0).toUpperCase();
      }
    }
  } catch (error) {
    console.error('Error loading admin user info:', error);
  }
}

function logout() {
  localStorage.removeItem('isrs_auth_token');
  localStorage.removeItem('isrs_user_data');
  window.location.href = '/admin/';
}

// Export for use in other scripts
window.loadAdminLayout = loadAdminLayout;
window.logout = logout;
