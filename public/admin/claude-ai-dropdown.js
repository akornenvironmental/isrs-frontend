/**
 * Claude AI Dropdown Component
 * SAFMC-inspired purple gradient dropdown for AI data quality tools
 */

class ClaudeAIDropdown {
  constructor() {
    this.showMenu = false;
    this.loading = false;
    this.result = null;
    this.error = '';
    this.container = null;

    this.init();
  }

  init() {
    this.createHTML();
    this.attachEventListeners();
  }

  createHTML() {
    const html = `
      <div class="claude-ai-dropdown">
        <!-- AI Button -->
        <button class="claude-ai-btn" title="AI-powered data quality tools">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
          Claude AI
        </button>

        <!-- Dropdown Menu -->
        <div class="claude-ai-menu" style="display: none;">
          <div class="claude-ai-menu-header">
            AI Data Quality Tools
            <span class="selected-count"></span>
          </div>

          <button class="claude-ai-menu-item" data-action="find-duplicates">
            <div class="menu-item-content">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v8m-4-4h8"/>
              </svg>
              <span>Find Duplicates</span>
            </div>
            <div class="menu-item-description">
              Identify potential duplicate contacts
            </div>
          </button>

          <button class="claude-ai-menu-item" data-action="review-quality">
            <div class="menu-item-content">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>Review Data Quality</span>
            </div>
            <div class="menu-item-description">
              Get AI recommendations for improvements
            </div>
          </button>

          <button class="claude-ai-menu-item enhance-contact-btn" data-action="enhance-contact" style="display: none;">
            <div class="menu-item-content">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
              </svg>
              <span>Enhance Selected Contact</span>
            </div>
            <div class="menu-item-description">
              Get AI suggestions for this contact
            </div>
          </button>

          <div class="claude-ai-disclaimer">
            AI-generated suggestions should be reviewed for accuracy before use.
          </div>
        </div>
      </div>

      <!-- Loading Modal -->
      <div class="claude-ai-loading-modal" style="display: none;">
        <div class="claude-ai-loading-content">
          <div class="claude-ai-spinner"></div>
          <div class="claude-ai-loading-text">
            <h3>Claude AI is analyzing...</h3>
            <p>This may take a moment</p>
          </div>
        </div>
      </div>

      <!-- Results Modal -->
      <div class="claude-ai-results-modal" style="display: none;">
        <div class="claude-ai-results-content">
          <div class="claude-ai-results-inner">
            <!-- Results will be inserted here -->
          </div>
        </div>
      </div>

      <!-- Error Modal -->
      <div class="claude-ai-error-modal" style="display: none;">
        <div class="claude-ai-error-content">
          <div class="claude-ai-error-inner">
            <div class="error-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <h3>Error</h3>
            <p class="error-message"></p>
            <button class="claude-ai-close-error">Close</button>
          </div>
        </div>
      </div>
    `;

    // Insert at the container location
    const container = document.getElementById('claudeAIContainer');
    if (container) {
      container.innerHTML = html;
      this.container = container.querySelector('.claude-ai-dropdown');
    }
  }

  attachEventListeners() {
    if (!this.container) return;

    // Toggle menu
    const btn = this.container.querySelector('.claude-ai-btn');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMenu();
    });

    // Menu item clicks
    const menuItems = this.container.querySelectorAll('.claude-ai-menu-item');
    menuItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = item.getAttribute('data-action');
        this.handleAction(action);
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.claude-ai-dropdown')) {
        this.closeMenu();
      }
    });

    // ESC key to close modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
        this.closeMenu();
      }
    });

    // Close error button
    const closeErrorBtn = document.querySelector('.claude-ai-close-error');
    closeErrorBtn?.addEventListener('click', () => {
      this.hideError();
    });

    // Update menu based on selection changes
    this.updateMenuItems();
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    const menu = this.container.querySelector('.claude-ai-menu');
    menu.style.display = this.showMenu ? 'block' : 'none';

    if (this.showMenu) {
      this.updateMenuItems();
    }
  }

  closeMenu() {
    this.showMenu = false;
    const menu = this.container?.querySelector('.claude-ai-menu');
    if (menu) menu.style.display = 'none';
  }

  updateMenuItems() {
    const selectedCount = window.selectedContacts?.size || 0;
    const countSpan = this.container?.querySelector('.selected-count');
    const enhanceBtn = this.container?.querySelector('.enhance-contact-btn');

    if (countSpan) {
      countSpan.textContent = selectedCount > 0 ? `(${selectedCount} selected)` : '';
    }

    // Show "Enhance Selected Contact" only when exactly 1 contact is selected
    if (enhanceBtn) {
      enhanceBtn.style.display = selectedCount === 1 ? 'block' : 'none';
    }
  }

  async handleAction(action) {
    this.closeMenu();

    switch (action) {
      case 'find-duplicates':
        await this.findDuplicates();
        break;
      case 'review-quality':
        await this.reviewQuality();
        break;
      case 'enhance-contact':
        await this.enhanceContact();
        break;
    }
  }

  async findDuplicates() {
    this.showLoading();

    try {
      const sessionToken = localStorage.getItem('isrs_session');
      const contact_ids = this.getSelectedContactIds();

      const response = await fetch(`${API_BASE_URL}/api/claude/find-duplicates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        },
        body: JSON.stringify({ contact_ids, limit: 100 })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to find duplicates');
      }

      this.hideLoading();
      this.showDuplicatesResults(data);
    } catch (error) {
      this.hideLoading();
      this.showError(error.message);
    }
  }

  async reviewQuality() {
    this.showLoading();

    try {
      const sessionToken = localStorage.getItem('isrs_session');
      const contact_ids = this.getSelectedContactIds();

      const response = await fetch(`${API_BASE_URL}/api/claude/review-contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        },
        body: JSON.stringify({ contact_ids, limit: 100, focus: 'quality' })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to review contacts');
      }

      this.hideLoading();
      this.showReviewResults(data);
    } catch (error) {
      this.hideLoading();
      this.showError(error.message);
    }
  }

  async enhanceContact() {
    const contact_ids = this.getSelectedContactIds();
    if (!contact_ids || contact_ids.length !== 1) {
      this.showError('Please select exactly one contact');
      return;
    }

    this.showLoading();

    try {
      const sessionToken = localStorage.getItem('isrs_session');
      const response = await fetch(`${API_BASE_URL}/api/claude/enhance-contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        },
        body: JSON.stringify({ contact_id: contact_ids[0] })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to enhance contact');
      }

      this.hideLoading();
      this.showEnhancementResults(data);
    } catch (error) {
      this.hideLoading();
      this.showError(error.message);
    }
  }

  getSelectedContactIds() {
    if (!window.selectedContacts || window.selectedContacts.size === 0) {
      return undefined;
    }

    if (!window.allContacts) {
      return undefined;
    }

    const selectedEmails = Array.from(window.selectedContacts);
    const contacts = window.allContacts.filter(c => selectedEmails.includes(c.email));
    return contacts.map(c => c.id).filter(Boolean);
  }

  showLoading() {
    this.loading = true;
    const modal = document.querySelector('.claude-ai-loading-modal');
    if (modal) modal.style.display = 'flex';
  }

  hideLoading() {
    this.loading = false;
    const modal = document.querySelector('.claude-ai-loading-modal');
    if (modal) modal.style.display = 'none';
  }

  showError(message) {
    this.error = message;
    const modal = document.querySelector('.claude-ai-error-modal');
    const messageEl = modal?.querySelector('.error-message');
    if (messageEl) messageEl.textContent = message;
    if (modal) modal.style.display = 'flex';
  }

  hideError() {
    this.error = '';
    const modal = document.querySelector('.claude-ai-error-modal');
    if (modal) modal.style.display = 'none';
  }

  showDuplicatesResults(data) {
    const html = `
      <h3>Duplicate Contacts Found</h3>
      ${data.duplicates.length === 0 ? `
        <p style="color: #22c55e; font-size: 1.125rem; text-align: center; padding: 2rem;">
          ✅ No duplicates found! Your data looks clean.
        </p>
      ` : `
        <div class="duplicates-list">
          ${data.duplicates.map((group, idx) => `
            <div class="duplicate-group">
              <div class="duplicate-group-header">
                <span class="confidence-badge">${group.confidence}% confidence</span>
                <p style="margin: 0.5rem 0; color: #6b7280; font-size: 0.875rem;">${this.escapeHtml(group.reason)}</p>
              </div>
              <div class="duplicate-contacts-grid">
                ${group.contacts.map(contact => `
                  <div class="duplicate-contact-card">
                    <div style="font-weight: 600;">${this.escapeHtml(contact.full_name || contact.name)}</div>
                    <div style="color: #6b7280; font-size: 0.875rem;">${this.escapeHtml(contact.email || '')}</div>
                    <div style="color: #6b7280; font-size: 0.875rem;">${this.escapeHtml(contact.organization || '')}</div>
                  </div>
                `).join('')}
              </div>
              ${group.contacts.length > 1 ? `
                <button class="merge-btn" onclick="window.claudeAI.mergeDuplicates([${group.contacts.map(c => c.id).join(',')}])">
                  Merge Contacts
                </button>
              ` : ''}
            </div>
          `).join('')}
        </div>
      `}
      <button class="claude-ai-close-results">Close</button>
    `;

    this.showResultsModal(html);
  }

  showReviewResults(data) {
    const review = data.review;
    const html = `
      <h3>Data Quality Review</h3>
      <div class="health-score-card">
        <div class="health-score-number">${review.health_score}</div>
        <div class="health-score-label">/ 100</div>
        <p style="margin-top: 1rem; color: #4b5563;">${this.escapeHtml(review.summary || '')}</p>
      </div>

      ${review.priority_contacts && review.priority_contacts.length > 0 ? `
        <div class="priority-section">
          <h4>Priority Contacts to Review</h4>
          ${review.priority_contacts.slice(0, 5).map(pc => `
            <div class="priority-contact">
              <div style="font-weight: 600;">${this.escapeHtml(pc.contact.full_name || pc.contact.name)}</div>
              <div style="color: #6b7280; font-size: 0.875rem; margin-top: 0.25rem;">${this.escapeHtml(pc.reason)}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${review.recommendations && review.recommendations.length > 0 ? `
        <div class="recommendations-section">
          <h4>Recommendations</h4>
          <ul>
            ${review.recommendations.map(rec => `<li>${this.escapeHtml(rec)}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      <button class="claude-ai-close-results">Close</button>
    `;

    this.showResultsModal(html);
  }

  showEnhancementResults(data) {
    const contact = data.contact;
    const enhancement = data.enhancement;

    const html = `
      <h3>Contact Enhancement Suggestions</h3>

      <div class="current-contact-card">
        <h4>Current Contact</h4>
        <div style="color: #1f2937; font-size: 0.875rem;">
          <div><strong>Name:</strong> ${this.escapeHtml(contact.full_name || '(empty)')}</div>
          <div><strong>Organization:</strong> ${this.escapeHtml(contact.organization || '(empty)')}</div>
          <div><strong>Role:</strong> ${this.escapeHtml(contact.role || '(empty)')}</div>
          <div><strong>Phone:</strong> ${this.escapeHtml(contact.phone || '(empty)')}</div>
        </div>
      </div>

      <div class="quality-score-badge">
        Quality Score: ${enhancement.quality_score}/100
      </div>

      ${enhancement.issues && enhancement.issues.length > 0 ? `
        <div class="issues-section">
          <h4>Issues Found</h4>
          <ul>
            ${enhancement.issues.map(issue => `<li>${this.escapeHtml(issue)}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      ${enhancement.suggestions && Object.keys(enhancement.suggestions).length > 0 ? `
        <div class="suggestions-section">
          <h4>AI Suggestions</h4>
          <div class="suggestions-table">
            ${Object.entries(enhancement.suggestions).map(([field, value]) => `
              <div class="suggestion-row">
                <div class="suggestion-field">${this.formatFieldName(field)}:</div>
                <div class="suggestion-value">${this.escapeHtml(String(value))}</div>
              </div>
            `).join('')}
          </div>
          <button class="apply-suggestions-btn" onclick="window.claudeAI.applyEnhancements(${contact.id}, ${JSON.stringify(enhancement.suggestions).replace(/"/g, '&quot;')})">
            ✓ Apply AI Suggestions to Contact
          </button>
          <p style="text-align: center; color: #6b7280; font-size: 0.75rem; margin-top: 0.5rem;">
            This will update the contact with the suggested values above
          </p>
        </div>
      ` : ''}

      <button class="claude-ai-close-results">Close</button>
    `;

    this.showResultsModal(html);
  }

  showResultsModal(html) {
    const modal = document.querySelector('.claude-ai-results-modal');
    const inner = modal?.querySelector('.claude-ai-results-inner');

    if (inner) {
      inner.innerHTML = html;

      // Attach close button listener
      const closeBtn = inner.querySelector('.claude-ai-close-results');
      closeBtn?.addEventListener('click', () => this.closeResultsModal());
    }

    if (modal) modal.style.display = 'flex';
  }

  closeResultsModal() {
    const modal = document.querySelector('.claude-ai-results-modal');
    if (modal) modal.style.display = 'none';
  }

  closeAllModals() {
    this.hideLoading();
    this.hideError();
    this.closeResultsModal();
  }

  async mergeDuplicates(contactIds) {
    if (!confirm('Are you sure you want to merge these contacts? This cannot be undone.')) {
      return;
    }

    this.closeResultsModal();
    this.showLoading();

    try {
      const sessionToken = localStorage.getItem('isrs_session');
      // First get merge suggestion
      const suggestionRes = await fetch(`${API_BASE_URL}/api/claude/suggest-merge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        },
        body: JSON.stringify({ contact_ids: contactIds })
      });

      const suggestionData = await suggestionRes.json();

      if (!suggestionRes.ok || !suggestionData.success) {
        throw new Error(suggestionData.error || 'Failed to get merge suggestion');
      }

      // Execute merge
      const mergeRes = await fetch(`${API_BASE_URL}/api/claude/execute-merge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        },
        body: JSON.stringify({
          contact_ids: contactIds,
          merged_data: suggestionData.suggestion.merged_contact
        })
      });

      const mergeData = await mergeRes.json();

      if (!mergeRes.ok || !mergeData.success) {
        throw new Error(mergeData.error || 'Failed to merge contacts');
      }

      this.hideLoading();

      // Show success message
      const html = `
        <h3 style="color: #22c55e;">✓ Contacts Merged Successfully</h3>
        <p style="text-align: center; color: #4b5563; padding: 2rem;">
          ${mergeData.deleted_ids.length} duplicate contact(s) merged into the primary record.
        </p>
        <button class="claude-ai-close-results">Close</button>
      `;
      this.showResultsModal(html);

      // Reload contacts
      if (typeof window.loadContacts === 'function') {
        setTimeout(() => window.loadContacts(), 1000);
      }
    } catch (error) {
      this.hideLoading();
      this.showError(error.message);
    }
  }

  async applyEnhancements(contactId, suggestions) {
    if (!confirm(`Apply AI suggestions to this contact?\n\nThis will update ${Object.keys(suggestions).length} field(s).`)) {
      return;
    }

    this.closeResultsModal();
    this.showLoading();

    try {
      // Get the current contact
      const contact = window.allContacts?.find(c => c.id === contactId);
      if (!contact) {
        throw new Error('Contact not found');
      }

      // Merge suggestions with current contact
      const updatedContact = {
        full_name: suggestions.full_name || contact.full_name,
        first_name: suggestions.first_name || contact.first_name,
        last_name: suggestions.last_name || contact.last_name,
        email: suggestions.email || contact.email,
        phone: suggestions.phone || contact.phone,
        organization: suggestions.organization || contact.organization,
        role: suggestions.role || contact.role,
        expertise: suggestions.expertise || contact.expertise,
        interests: suggestions.interests || contact.interests
      };

      // Update via API
      const sessionToken = localStorage.getItem('isrs_session');
      const response = await fetch(`${API_BASE_URL}/api/contacts/${contactId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        },
        body: JSON.stringify(updatedContact)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to update contact');
      }

      this.hideLoading();

      // Show success
      const html = `
        <h3 style="color: #22c55e;">✓ Contact Updated Successfully</h3>
        <p style="text-align: center; color: #4b5563; padding: 2rem;">
          AI suggestions have been applied to the contact.
        </p>
        <button class="claude-ai-close-results">Close</button>
      `;
      this.showResultsModal(html);

      // Reload contacts
      if (typeof window.loadContacts === 'function') {
        setTimeout(() => window.loadContacts(), 1000);
      }
    } catch (error) {
      this.hideLoading();
      this.showError(error.message);
    }
  }

  formatFieldName(field) {
    return field.split('_').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  escapeHtml(text) {
    if (typeof text !== 'string') return text;
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.claudeAI = new ClaudeAIDropdown();
  });
} else {
  window.claudeAI = new ClaudeAIDropdown();
}
