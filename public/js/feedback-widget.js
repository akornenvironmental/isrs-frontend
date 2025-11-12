/**
 * ISRS Feedback Widget
 * Floating feedback button styled like SAFMC Interview System
 * Can be included in any page - public site or admin portal
 *
 * Usage:
 *   <script src="/js/feedback-widget.js"></script>
 *   <script>initFeedbackWidget({ isAdminPortal: false });</script>
 */

(function() {
  'use strict';

  const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : 'https://isrs-database-backend.onrender.com';

  let feedbackConfig = {
    isAdminPortal: false,
    userEmail: null,
    userName: null,
    userId: null
  };

  /**
   * Initialize the feedback widget
   */
  window.initFeedbackWidget = function(config = {}) {
    feedbackConfig = { ...feedbackConfig, ...config };

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createFeedbackButton);
    } else {
      createFeedbackButton();
    }
  };

  /**
   * Create the floating feedback button
   */
  function createFeedbackButton() {
    // Don't add twice
    if (document.getElementById('isrs-feedback-widget')) return;

    // Create button
    const button = document.createElement('button');
    button.id = 'isrs-feedback-widget';
    button.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <span>Feedback</span>
    `;
    button.onclick = openFeedbackModal;

    // Add styles
    injectStyles();

    // Add button to page
    document.body.appendChild(button);

    // Create modal (hidden)
    createFeedbackModal();
  }

  /**
   * Inject CSS styles
   */
  function injectStyles() {
    if (document.getElementById('isrs-feedback-styles')) return;

    const style = document.createElement('style');
    style.id = 'isrs-feedback-styles';
    style.textContent = `
      #isrs-feedback-widget {
        position: fixed;
        right: 0;
        top: 50%;
        transform: translateY(-50%) rotate(-90deg);
        transform-origin: right center;
        z-index: 9999;
        background: linear-gradient(135deg, #2E5A8A 0%, #5BC0BE 100%);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 6px 6px 0 0;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        box-shadow: 0 2px 8px rgba(46, 90, 138, 0.3);
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      #isrs-feedback-widget:hover {
        background: linear-gradient(135deg, #5BC0BE 0%, #2E5A8A 100%);
        box-shadow: 0 4px 12px rgba(46, 90, 138, 0.5);
      }

      #isrs-feedback-widget svg {
        width: 20px;
        height: 20px;
      }

      /* Modal Overlay */
      .isrs-feedback-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10000;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }

      .isrs-feedback-modal-overlay.active {
        display: flex;
      }

      /* Modal */
      .isrs-feedback-modal {
        background: white;
        border-radius: 8px;
        max-width: 600px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      }

      .isrs-feedback-modal-header {
        background: linear-gradient(135deg, #2E5A8A 0%, #5BC0BE 100%);
        color: white;
        padding: 24px 32px;
        border-radius: 8px 8px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .isrs-feedback-modal-header h2 {
        margin: 0;
        font-size: 24px;
        font-weight: 700;
      }

      .isrs-feedback-modal-close {
        background: none;
        border: none;
        color: white;
        font-size: 28px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        opacity: 0.8;
        transition: opacity 0.2s;
      }

      .isrs-feedback-modal-close:hover {
        opacity: 1;
      }

      .isrs-feedback-modal-body {
        padding: 32px;
      }

      .isrs-feedback-form-group {
        margin-bottom: 20px;
      }

      .isrs-feedback-form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: #333;
        font-size: 14px;
      }

      .isrs-feedback-form-group input,
      .isrs-feedback-form-group select,
      .isrs-feedback-form-group textarea {
        width: 100%;
        padding: 12px;
        border: 2px solid #e0e0e0;
        border-radius: 6px;
        font-size: 14px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        transition: border-color 0.2s;
        box-sizing: border-box;
      }

      .isrs-feedback-form-group input:focus,
      .isrs-feedback-form-group select:focus,
      .isrs-feedback-form-group textarea:focus {
        outline: none;
        border-color: #2E5A8A;
      }

      .isrs-feedback-form-group textarea {
        min-height: 120px;
        resize: vertical;
      }

      .isrs-feedback-form-group small {
        display: block;
        margin-top: 4px;
        color: #666;
        font-size: 12px;
      }

      .isrs-feedback-rating {
        display: flex;
        gap: 8px;
      }

      .isrs-feedback-rating-star {
        font-size: 32px;
        cursor: pointer;
        transition: transform 0.1s;
        user-select: none;
      }

      .isrs-feedback-rating-star:hover {
        transform: scale(1.2);
      }

      .isrs-feedback-modal-footer {
        padding: 0 32px 32px;
        display: flex;
        gap: 12px;
        justify-content: flex-end;
      }

      .isrs-feedback-btn {
        padding: 12px 24px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        border: none;
        font-family: inherit;
      }

      .isrs-feedback-btn-primary {
        background: linear-gradient(135deg, #2E5A8A 0%, #5BC0BE 100%);
        color: white;
      }

      .isrs-feedback-btn-primary:hover:not(:disabled) {
        background: linear-gradient(135deg, #5BC0BE 0%, #2E5A8A 100%);
        box-shadow: 0 4px 12px rgba(46, 90, 138, 0.3);
      }

      .isrs-feedback-btn-primary:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .isrs-feedback-btn-secondary {
        background: #f5f5f5;
        color: #333;
      }

      .isrs-feedback-btn-secondary:hover {
        background: #e0e0e0;
      }

      .isrs-feedback-success {
        text-align: center;
        padding: 40px;
      }

      .isrs-feedback-success-icon {
        font-size: 64px;
        margin-bottom: 16px;
      }

      .isrs-feedback-success h3 {
        margin: 0 0 12px;
        color: #2E5A8A;
        font-size: 24px;
      }

      .isrs-feedback-success p {
        margin: 0;
        color: #666;
        font-size: 16px;
      }

      @media (max-width: 768px) {
        #isrs-feedback-widget span {
          display: none;
        }

        .isrs-feedback-modal {
          max-width: 100%;
          margin: 0;
          border-radius: 0;
        }

        .isrs-feedback-modal-header,
        .isrs-feedback-modal-body,
        .isrs-feedback-modal-footer {
          padding-left: 20px;
          padding-right: 20px;
        }
      }
    `;

    document.head.appendChild(style);
  }

  /**
   * Create the feedback modal
   */
  function createFeedbackModal() {
    if (document.getElementById('isrs-feedback-modal')) return;

    const modal = document.createElement('div');
    modal.className = 'isrs-feedback-modal-overlay';
    modal.id = 'isrs-feedback-modal';
    modal.innerHTML = `
      <div class="isrs-feedback-modal" onclick="event.stopPropagation()">
        <div class="isrs-feedback-modal-header">
          <h2>📝 Send Feedback</h2>
          <button class="isrs-feedback-modal-close" onclick="window.closeFeedbackModal()">&times;</button>
        </div>
        <div class="isrs-feedback-modal-body">
          <form id="isrs-feedback-form">
            <div class="isrs-feedback-form-group">
              <label>Your Name (optional)</label>
              <input type="text" id="feedback-name" placeholder="John Doe">
            </div>

            <div class="isrs-feedback-form-group">
              <label>Email (optional)</label>
              <input type="email" id="feedback-email" placeholder="you@example.com">
              <small>We'll only use this to follow up on your feedback if needed</small>
            </div>

            <div class="isrs-feedback-form-group">
              <label>What component is this about? (optional)</label>
              <input type="text" id="feedback-component" placeholder="e.g., Registration form, Member directory">
            </div>

            <div class="isrs-feedback-form-group">
              <label>Feedback Type</label>
              <select id="feedback-type">
                <option value="general">General Feedback</option>
                <option value="bug">🐛 Bug Report</option>
                <option value="feature_request">✨ Feature Request</option>
                <option value="improvement">📈 Improvement Suggestion</option>
              </select>
            </div>

            <div class="isrs-feedback-form-group">
              <label>Rating (optional)</label>
              <div class="isrs-feedback-rating" id="feedback-rating">
                <span class="isrs-feedback-rating-star" data-rating="1">☆</span>
                <span class="isrs-feedback-rating-star" data-rating="2">☆</span>
                <span class="isrs-feedback-rating-star" data-rating="3">☆</span>
                <span class="isrs-feedback-rating-star" data-rating="4">☆</span>
                <span class="isrs-feedback-rating-star" data-rating="5">☆</span>
              </div>
              <input type="hidden" id="feedback-rating-value" value="">
            </div>

            <div class="isrs-feedback-form-group">
              <label>Your Feedback *</label>
              <textarea id="feedback-message" required placeholder="Tell us what's on your mind..."></textarea>
            </div>
          </form>
        </div>
        <div class="isrs-feedback-modal-footer">
          <button type="button" class="isrs-feedback-btn isrs-feedback-btn-secondary" onclick="window.closeFeedbackModal()">Cancel</button>
          <button type="submit" form="isrs-feedback-form" class="isrs-feedback-btn isrs-feedback-btn-primary" id="feedback-submit-btn">Send Feedback</button>
        </div>
      </div>
    `;

    // Click overlay to close
    modal.onclick = window.closeFeedbackModal;

    document.body.appendChild(modal);

    // Setup rating stars
    setupRatingStars();

    // Setup form submission
    document.getElementById('isrs-feedback-form').onsubmit = handleFeedbackSubmit;
  }

  /**
   * Setup rating stars
   */
  function setupRatingStars() {
    const stars = document.querySelectorAll('.isrs-feedback-rating-star');
    stars.forEach(star => {
      star.onclick = function() {
        const rating = parseInt(this.dataset.rating);
        document.getElementById('feedback-rating-value').value = rating;

        // Update star display
        stars.forEach((s, index) => {
          s.textContent = index < rating ? '★' : '☆';
        });
      };
    });
  }

  /**
   * Open feedback modal
   */
  function openFeedbackModal() {
    const modal = document.getElementById('isrs-feedback-modal');
    modal.classList.add('active');

    // Pre-fill user info if available
    if (feedbackConfig.userName) {
      document.getElementById('feedback-name').value = feedbackConfig.userName;
    }
    if (feedbackConfig.userEmail) {
      document.getElementById('feedback-email').value = feedbackConfig.userEmail;
    }
  }

  /**
   * Close feedback modal
   */
  window.closeFeedbackModal = function() {
    const modal = document.getElementById('isrs-feedback-modal');
    modal.classList.remove('active');

    // Reset form
    document.getElementById('isrs-feedback-form').reset();
    document.getElementById('feedback-rating-value').value = '';
    document.querySelectorAll('.isrs-feedback-rating-star').forEach(s => s.textContent = '☆');
  };

  /**
   * Handle feedback submission
   */
  async function handleFeedbackSubmit(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('feedback-submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      // Collect browser info
      const browserInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      };

      const formData = {
        user_name: document.getElementById('feedback-name').value || null,
        user_email: document.getElementById('feedback-email').value || null,
        user_id: feedbackConfig.userId,
        session_id: getSessionId(),
        page_url: window.location.href,
        page_title: document.title,
        component_name: document.getElementById('feedback-component').value || null,
        feedback_type: document.getElementById('feedback-type').value,
        rating: document.getElementById('feedback-rating-value').value ? parseInt(document.getElementById('feedback-rating-value').value) : null,
        message: document.getElementById('feedback-message').value,
        browser_info: browserInfo,
        is_admin_portal: feedbackConfig.isAdminPortal
      };

      const response = await fetch(`${API_BASE_URL}/api/feedback/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        showSuccessMessage();
      } else {
        throw new Error(result.error || 'Failed to submit feedback');
      }

    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Sorry, there was an error submitting your feedback. Please try again or contact support.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Feedback';
    }
  }

  /**
   * Show success message
   */
  function showSuccessMessage() {
    const modalBody = document.querySelector('.isrs-feedback-modal-body');
    const modalFooter = document.querySelector('.isrs-feedback-modal-footer');

    modalBody.innerHTML = `
      <div class="isrs-feedback-success">
        <div class="isrs-feedback-success-icon">✅</div>
        <h3>Thank You!</h3>
        <p>Your feedback has been received and will help us improve the ISRS platform.</p>
      </div>
    `;

    modalFooter.innerHTML = `
      <button type="button" class="isrs-feedback-btn isrs-feedback-btn-primary" onclick="window.closeFeedbackModal()">Close</button>
    `;

    // Auto-close after 3 seconds
    setTimeout(() => {
      window.closeFeedbackModal();
      // Reset modal content
      setTimeout(() => {
        createFeedbackModal();
      }, 300);
    }, 3000);
  }

  /**
   * Get or create session ID
   */
  function getSessionId() {
    let sessionId = sessionStorage.getItem('isrs-feedback-session');
    if (!sessionId) {
      sessionId = 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
      sessionStorage.setItem('isrs-feedback-session', sessionId);
    }
    return sessionId;
  }

})();
