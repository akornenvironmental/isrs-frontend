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
      <!-- Collapse Toggle Button -->
      <button class="sidebar-collapse-btn" onclick="toggleSidebarCollapse()" title="Toggle sidebar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <div class="sidebar-header">
        <div class="sidebar-header-row">
          <div class="sidebar-header-text">
            <a href="/admin/dashboard.html" class="sidebar-logo">ISRS Admin</a>
            <div class="sidebar-subtitle">Management Portal</div>
          </div>
          <button class="theme-toggle-btn" onclick="toggleAdminDarkMode()" title="Toggle dark mode">
            <svg id="sunIcon" class="theme-icon sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg id="moonIcon" class="theme-icon moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
        </div>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section">
          <a href="/" target="_blank" class="nav-item nav-item-external" style="background: var(--admin-primary-light, #eff6ff); border-left-color: var(--accent-teal);">
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
          <div class="nav-section-title">Content</div>
          <a href="/admin/photos.html" class="nav-item ${currentPage === 'photos' ? 'active' : ''}">
            <span class="nav-icon">📷</span>
            <span>Photos</span>
          </a>
          <a href="/admin/press-kit.html" class="nav-item ${currentPage === 'press-kit' ? 'active' : ''}">
            <span class="nav-icon">📰</span>
            <span>Press Kit</span>
          </a>
        </div>

        <div class="nav-section">
          <div class="nav-section-title">Governance</div>
          <a href="/admin/board-documents.html" class="nav-item ${currentPage === 'board-documents' ? 'active' : ''}">
            <span class="nav-icon">📁</span>
            <span>Board Documents</span>
          </a>
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
          <a href="/admin/feedback.html" class="nav-item ${currentPage === 'feedback' ? 'active' : ''}">
            <span class="nav-icon">💬</span>
            <span>User Feedback</span>
          </a>
          <a href="/admin/import.html" class="nav-item ${currentPage === 'import' ? 'active' : ''}">
            <span class="nav-icon">📥</span>
            <span>Import Data</span>
          </a>
          <a href="/admin/settings.html" class="nav-item ${currentPage === 'settings' ? 'active' : ''}">
            <span class="nav-icon">⚙️</span>
            <span>Settings</span>
          </a>
        </div>

        <div class="nav-section">
          <div class="nav-section-title">Help</div>
          <a href="/admin/workflows.html" class="nav-item ${currentPage === 'workflows' ? 'active' : ''}">
            <span class="nav-icon">📖</span>
            <span>User Workflows</span>
          </a>
        </div>
      </nav>

      <div class="sidebar-footer">
        <div class="user-profile" onclick="openProfilePopup()" style="cursor: pointer;" title="Edit Profile">
          <div class="user-avatar" id="adminUserAvatar">A</div>
          <div class="user-details">
            <div class="user-email" id="adminUserEmail">Loading...</div>
            <div class="user-role" id="adminUserRole">Admin</div>
          </div>
          <span style="margin-left: auto; color: var(--admin-text-muted, #9ca3af); font-size: 0.75rem;">✎</span>
        </div>
        <button class="btn-logout" onclick="logout()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>

    <!-- Profile Edit Popup -->
    <div id="profilePopup" class="profile-popup-overlay">
      <div class="profile-popup">
        <div class="profile-popup-header">
          <h3>Edit Profile</h3>
          <button class="profile-popup-close" onclick="closeProfilePopup()">&times;</button>
        </div>
        <div class="profile-popup-body">
          <div class="profile-avatar-section">
            <div class="profile-avatar-large" id="profileAvatarLarge">A</div>
          </div>
          <div class="profile-form-group">
            <label>First Name</label>
            <input type="text" id="profileFirstName" class="profile-input" placeholder="First name">
          </div>
          <div class="profile-form-group">
            <label>Last Name</label>
            <input type="text" id="profileLastName" class="profile-input" placeholder="Last name">
          </div>
          <div class="profile-form-group">
            <label>Email</label>
            <input type="email" id="profileEmail" class="profile-input" disabled>
          </div>
          <div class="profile-form-group">
            <label>Role</label>
            <input type="text" id="profileRole" class="profile-input" disabled>
          </div>
          <div class="profile-form-group">
            <label>Organization</label>
            <input type="text" id="profileOrganization" class="profile-input" placeholder="Your organization">
          </div>
          <div class="profile-form-group">
            <label>Phone</label>
            <input type="tel" id="profilePhone" class="profile-input" placeholder="Phone number">
          </div>
          <div class="profile-save-indicator" id="profileSaveIndicator">
            <span class="save-icon"></span>
            <span class="save-text">All changes saved</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <main class="admin-main-content" id="admin-main-content">
      <!-- Content will be inserted here -->
    </main>

    <!-- Admin Footer -->
    <footer class="admin-footer">
      <div class="admin-footer-content">
        <div class="footer-section footer-about">
          <h3 class="footer-heading">ISRS Admin Portal</h3>
          <p class="footer-text">International Society for Reef Studies management system. Streamlining operations and member engagement worldwide.</p>
          <div class="footer-social">
            <a href="https://twitter.com" target="_blank" rel="noopener" class="social-link" title="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener" class="social-link" title="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener" class="social-link" title="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="mailto:admin@reefstudies.org" class="social-link" title="Email">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            </a>
          </div>
        </div>

        <div class="footer-section footer-links">
          <h3 class="footer-heading">Quick Links</h3>
          <ul class="footer-link-list">
            <li><a href="/admin/dashboard.html">Dashboard</a></li>
            <li><a href="/admin/contacts.html">Contacts</a></li>
            <li><a href="/admin/organizations.html">Organizations</a></li>
            <li><a href="/admin/conferences.html">Conferences</a></li>
            <li><a href="/admin/photos.html">Photos</a></li>
            <li><a href="/admin/board-documents.html">Board Documents</a></li>
          </ul>
        </div>

        <div class="footer-section footer-links">
          <h3 class="footer-heading">Resources</h3>
          <ul class="footer-link-list">
            <li><a href="/admin/workflows.html">User Workflows</a></li>
            <li><a href="/admin/feedback.html">User Feedback</a></li>
            <li><a href="/admin/settings.html">Settings</a></li>
            <li><a href="/admin/import.html">Import Data</a></li>
            <li><a href="https://docs.reefstudies.org" target="_blank">Documentation ↗</a></li>
            <li><a href="https://support.reefstudies.org" target="_blank">Support Center ↗</a></li>
          </ul>
        </div>

        <div class="footer-section footer-system">
          <h3 class="footer-heading">System Status</h3>
          <div class="system-status">
            <div class="status-item">
              <span class="status-indicator status-online"></span>
              <span class="status-label">API Status: <strong>Operational</strong></span>
            </div>
            <div class="status-item">
              <span class="status-indicator status-online"></span>
              <span class="status-label">Database: <strong>Healthy</strong></span>
            </div>
            <div class="status-item">
              <span class="status-indicator status-online"></span>
              <span class="status-label">Storage: <strong>Available</strong></span>
            </div>
          </div>
          <div class="footer-version">
            <p>Version 2.1.0</p>
            <p class="footer-text-small">Last updated: ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div class="admin-footer-bottom">
        <div class="footer-bottom-content">
          <p class="footer-copyright">
            &copy; ${new Date().getFullYear()} International Society for Reef Studies. All rights reserved.
          </p>
          <div class="footer-legal">
            <a href="/privacy-policy.html" target="_blank">Privacy Policy</a>
            <span class="footer-divider">|</span>
            <a href="/terms-of-service.html" target="_blank">Terms of Service</a>
            <span class="footer-divider">|</span>
            <a href="/accessibility.html" target="_blank">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
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

      // Update name (show first name, or email if no name available)
      const emailEl = document.getElementById('adminUserEmail');
      if (emailEl) {
        if (user.first_name) {
          emailEl.textContent = user.first_name;
        } else if (user.firstName) {
          emailEl.textContent = user.firstName;
        } else if (user.email) {
          emailEl.textContent = user.email;
        }
      }

      // Update role
      const roleEl = document.getElementById('adminUserRole');
      if (roleEl && user.role) {
        roleEl.textContent = user.role.toUpperCase();
      }

      // Update avatar (use first letter of first name, or email)
      const avatarEl = document.getElementById('adminUserAvatar');
      if (avatarEl) {
        if (user.first_name) {
          avatarEl.textContent = user.first_name.charAt(0).toUpperCase();
        } else if (user.firstName) {
          avatarEl.textContent = user.firstName.charAt(0).toUpperCase();
        } else if (user.email) {
          avatarEl.textContent = user.email.charAt(0).toUpperCase();
        }
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

// Dark Mode Functions
function toggleAdminDarkMode() {
  const body = document.body;
  const isDark = body.classList.toggle('admin-dark-mode');

  // Save preference
  localStorage.setItem('isrs_admin_dark_mode', isDark ? 'true' : 'false');

  // Update toggle text/icon
  updateDarkModeUI(isDark);
}

function updateDarkModeUI(isDark) {
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');

  if (sunIcon && moonIcon) {
    // Show sun icon in dark mode (click to go light)
    // Show moon icon in light mode (click to go dark)
    sunIcon.style.display = isDark ? 'block' : 'none';
    moonIcon.style.display = isDark ? 'none' : 'block';
  }
}

function initAdminDarkMode() {
  const savedPref = localStorage.getItem('isrs_admin_dark_mode');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Use saved preference, or system preference
  const isDark = savedPref === 'true' || (savedPref === null && prefersDark);

  if (isDark) {
    document.body.classList.add('admin-dark-mode');
  }

  updateDarkModeUI(isDark);
}

// Initialize dark mode after layout loads
setTimeout(initAdminDarkMode, 0);

// Profile Popup Functions
let profileSaveTimeout = null;
let currentUserData = null;

function openProfilePopup() {
  const popup = document.getElementById('profilePopup');
  if (!popup) return;

  // Load current user data
  try {
    const userData = localStorage.getItem('isrs_user_data');
    if (userData) {
      currentUserData = JSON.parse(userData);

      // Populate form fields
      document.getElementById('profileFirstName').value = currentUserData.first_name || '';
      document.getElementById('profileLastName').value = currentUserData.last_name || '';
      document.getElementById('profileEmail').value = currentUserData.email || '';
      document.getElementById('profileRole').value = (currentUserData.role || 'user').toUpperCase();
      document.getElementById('profileOrganization').value = currentUserData.organization || '';
      document.getElementById('profilePhone').value = currentUserData.phone || '';

      // Update large avatar
      const avatarLarge = document.getElementById('profileAvatarLarge');
      if (avatarLarge && currentUserData.first_name) {
        avatarLarge.textContent = currentUserData.first_name.charAt(0).toUpperCase();
      } else if (avatarLarge && currentUserData.email) {
        avatarLarge.textContent = currentUserData.email.charAt(0).toUpperCase();
      }
    }
  } catch (error) {
    console.error('Error loading profile data:', error);
  }

  popup.classList.add('active');

  // Add input listeners for auto-save
  const inputs = popup.querySelectorAll('.profile-input:not([disabled])');
  inputs.forEach(input => {
    input.removeEventListener('input', handleProfileInput);
    input.addEventListener('input', handleProfileInput);
  });
}

function closeProfilePopup() {
  const popup = document.getElementById('profilePopup');
  if (popup) {
    popup.classList.remove('active');
  }
}

function handleProfileInput() {
  // Show saving indicator
  const indicator = document.getElementById('profileSaveIndicator');
  if (indicator) {
    indicator.classList.add('saving');
    indicator.querySelector('.save-text').textContent = 'Saving...';
  }

  // Debounce save
  if (profileSaveTimeout) {
    clearTimeout(profileSaveTimeout);
  }

  profileSaveTimeout = setTimeout(() => {
    saveProfile();
  }, 500);
}

async function saveProfile() {
  const indicator = document.getElementById('profileSaveIndicator');

  // Gather form data
  const profileData = {
    first_name: document.getElementById('profileFirstName').value,
    last_name: document.getElementById('profileLastName').value,
    organization: document.getElementById('profileOrganization').value,
    phone: document.getElementById('profilePhone').value
  };

  // Update local storage immediately for responsive UI
  if (currentUserData) {
    currentUserData = { ...currentUserData, ...profileData };
    localStorage.setItem('isrs_user_data', JSON.stringify(currentUserData));

    // Update sidebar display
    const emailEl = document.getElementById('adminUserEmail');
    if (emailEl && currentUserData.first_name && currentUserData.last_name) {
      emailEl.textContent = `${currentUserData.first_name} ${currentUserData.last_name}`;
    }

    const avatarEl = document.getElementById('adminUserAvatar');
    if (avatarEl && currentUserData.first_name) {
      avatarEl.textContent = currentUserData.first_name.charAt(0).toUpperCase();
    }
  }

  // Try to save to server
  try {
    const sessionToken = localStorage.getItem('isrs_session');
    if (sessionToken) {
      const response = await fetch('https://isrs-database-backend.onrender.com/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        },
        body: JSON.stringify(profileData)
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }
    }

    // Show saved indicator
    if (indicator) {
      indicator.classList.remove('saving');
      indicator.classList.add('saved');
      indicator.querySelector('.save-text').textContent = 'All changes saved';

      setTimeout(() => {
        indicator.classList.remove('saved');
      }, 2000);
    }
  } catch (error) {
    console.error('Error saving profile:', error);

    // Still show as saved since local storage is updated
    if (indicator) {
      indicator.classList.remove('saving');
      indicator.classList.add('saved');
      indicator.querySelector('.save-text').textContent = 'Saved locally';
    }
  }
}

// Close popup when clicking outside
document.addEventListener('click', function(event) {
  const popup = document.getElementById('profilePopup');
  if (popup && event.target === popup) {
    closeProfilePopup();
  }
});

// Close popup with ESC key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeProfilePopup();
  }
});

// Sidebar Collapse Functions
function toggleSidebarCollapse() {
  const sidebar = document.getElementById('admin-sidebar');
  const layout = document.querySelector('.admin-layout');
  const logoutBtn = document.querySelector('.btn-logout');

  if (sidebar && layout) {
    const isCollapsed = sidebar.classList.toggle('collapsed');
    layout.classList.toggle('sidebar-collapsed', isCollapsed);

    // Show/hide logout icon vs text
    if (logoutBtn) {
      const svg = logoutBtn.querySelector('svg');
      if (svg) {
        svg.style.display = isCollapsed ? 'block' : 'none';
      }
    }

    // Save preference
    localStorage.setItem('isrs_sidebar_collapsed', isCollapsed ? 'true' : 'false');
  }
}

function initSidebarState() {
  const savedState = localStorage.getItem('isrs_sidebar_collapsed');
  if (savedState === 'true') {
    const sidebar = document.getElementById('admin-sidebar');
    const layout = document.querySelector('.admin-layout');
    const logoutBtn = document.querySelector('.btn-logout');

    if (sidebar && layout) {
      sidebar.classList.add('collapsed');
      layout.classList.add('sidebar-collapsed');

      if (logoutBtn) {
        const svg = logoutBtn.querySelector('svg');
        if (svg) {
          svg.style.display = 'block';
        }
      }
    }
  }
}

// Initialize sidebar state after layout loads
setTimeout(initSidebarState, 0);

// Export for use in other scripts
window.loadAdminLayout = loadAdminLayout;
window.logout = logout;
window.toggleAdminDarkMode = toggleAdminDarkMode;
window.openProfilePopup = openProfilePopup;
window.closeProfilePopup = closeProfilePopup;
window.toggleSidebarCollapse = toggleSidebarCollapse;
