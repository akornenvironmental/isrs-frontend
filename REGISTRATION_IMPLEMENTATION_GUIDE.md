# Conference Registration System - Implementation Guide

## ✅ Completed Work

### Backend (100% Complete)
- ✅ Database schema with 5 new tables (Migration 031)
- ✅ Discount code validation API
- ✅ Session/workshop selection API
- ✅ Group registration infrastructure
- ✅ Email tracking system
- ✅ Auto-counting triggers for capacity management
- ✅ 3 sample discount codes pre-loaded

**API Endpoints Ready:**
- `POST /api/conference/discount-code/validate`
- `GET /api/conference/:conferenceId/sessions`
- `POST /api/conference/sessions/register`

### Documentation
- ✅ System roadmap (11 major components)
- ✅ Registration status analysis
- ✅ Gap analysis with 3 launch options

---

## 🚧 Frontend Work Remaining

### Current Registration Flow
**Existing Steps:**
1. Your Profile
2. Registration Details
3. Review & Payment

**Target Flow:**
1. Your Profile
2. Registration Details + **Discount Code**
3. **Session Selection** (NEW)
4. Review & Payment

---

## 📝 Implementation Tasks

### Task 1: Add Discount Code to Step 2 (2 hours)

**Location:** `/conference/register.html` - Step 2 section

**Add After Registration Type Selection:**

```html
<!-- Discount Code Section -->
<div class="form-group" style="margin-top: 2rem;">
  <label>Discount Code (Optional)</label>
  <div style="display: flex; gap: 0.5rem;">
    <input
      type="text"
      id="discountCode"
      placeholder="Enter promo code"
      style="flex: 1;"
    >
    <button
      type="button"
      class="btn btn-secondary"
      onclick="validateDiscountCode()"
      style="padding: 0.875rem 1.5rem;"
    >
      Apply
    </button>
  </div>
  <div id="discountMessage" style="display: none; margin-top: 0.5rem;"></div>
  <div id="discountSuccess" style="display: none; margin-top: 0.5rem; padding: 0.75rem; background: #d4edda; border: 1px solid #c3e6cb; border-radius: 4px; color: #155724;">
    <strong id="discountDescription"></strong>
    <span id="discountAmount" style="display: block; font-size: 0.9rem; margin-top: 0.25rem;"></span>
  </div>
</div>
```

**Add JavaScript Function:**

```javascript
let appliedDiscount = null;

async function validateDiscountCode() {
  const codeInput = document.getElementById('discountCode');
  const code = codeInput.value.trim().toUpperCase();
  const messageDiv = document.getElementById('discountMessage');
  const successDiv = document.getElementById('discountSuccess');

  if (!code) {
    messageDiv.textContent = 'Please enter a discount code';
    messageDiv.style.display = 'block';
    messageDiv.style.color = '#c00';
    return;
  }

  try {
    const response = await fetch('https://cbt-stakeholder-db.onrender.com/api/conference/discount-code/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: code,
        conferenceId: conferenceData.id,
        registrationType: document.getElementById('registrationType').value,
        userEmail: document.getElementById('email').value
      })
    });

    const result = await response.json();

    if (result.success) {
      appliedDiscount = result.data;
      messageDiv.style.display = 'none';
      successDiv.style.display = 'block';

      document.getElementById('discountDescription').textContent =
        `✓ ${result.data.description}`;

      if (result.data.discountType === 'percentage') {
        document.getElementById('discountAmount').textContent =
          `You'll save ${result.data.discountValue}% on your registration`;
      } else {
        document.getElementById('discountAmount').textContent =
          `You'll save $${result.data.discountValue}`;
      }

      // Recalculate totals
      updatePricingSummary();
    } else {
      messageDiv.textContent = result.error;
      messageDiv.style.display = 'block';
      messageDiv.style.color = '#c00';
      successDiv.style.display = 'none';
      appliedDiscount = null;
    }
  } catch (error) {
    messageDiv.textContent = 'Failed to validate discount code';
    messageDiv.style.display = 'block';
    messageDiv.style.color = '#c00';
  }
}

function updatePricingSummary() {
  const baseFee = parseFloat(document.getElementById('registrationFee').textContent.replace('$', ''));
  let finalFee = baseFee;

  if (appliedDiscount) {
    if (appliedDiscount.discountType === 'percentage') {
      finalFee = baseFee - (baseFee * appliedDiscount.discountValue / 100);
    } else {
      finalFee = baseFee - appliedDiscount.discountValue;
    }
  }

  // Update pricing display
  const summaryHTML = `
    <div>Registration Fee: $${baseFee.toFixed(2)}</div>
    ${appliedDiscount ? `
      <div style="color: #28a745;">Discount: -$${(baseFee - finalFee).toFixed(2)}</div>
      <div style="font-size: 1.2rem; font-weight: 700; margin-top: 0.5rem;">
        Total: $${finalFee.toFixed(2)}
      </div>
    ` : `
      <div style="font-size: 1.2rem; font-weight: 700; margin-top: 0.5rem;">
        Total: $${finalFee.toFixed(2)}
      </div>
    `}
  `;

  document.getElementById('pricingSummary').innerHTML = summaryHTML;
}
```

---

### Task 2: Add Session Selection Step (3-4 hours)

**Update Progress Bar (Change from 3 to 4 steps):**

Find the progress bar section and add a 4th step:

```html
<div class="progress-step" data-step="4">
  <div class="step-number">4</div>
  <div class="step-label">Sessions & Workshops</div>
</div>
<div class="progress-step" data-step="5">
  <div class="step-number">5</div>
  <div class="step-label">Review & Payment</div>
</div>
```

**Add New Form Section (After Step 3):**

```html
<!-- Step 4: Session Selection -->
<div class="form-section" data-step="4">
  <h2 class="section-title">Select Your Sessions & Workshops</h2>

  <p style="color: var(--text-light); margin-bottom: 2rem;">
    Choose the workshops and sessions you'd like to attend. Some sessions have limited capacity and may have a waitlist.
  </p>

  <div id="sessionsLoading" style="text-align: center; padding: 3rem;">
    <div class="spinner" style="margin: 0 auto 1rem;"></div>
    <p>Loading available sessions...</p>
  </div>

  <div id="sessionsContainer" style="display: none;">
    <!-- Sessions will be populated here -->
  </div>

  <div class="form-actions">
    <button type="button" class="btn btn-secondary" onclick="previousStep()">
      ← Back
    </button>
    <button type="button" class="btn btn-primary" onclick="nextStep()">
      Continue to Review →
    </button>
  </div>
</div>
```

**Add CSS for Session Cards:**

```css
.session-card {
  border: 2px solid var(--border-color);
  border-radius: 4px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.session-card:hover {
  border-color: var(--primary-blue);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.session-card.selected {
  border-color: var(--primary-blue);
  background: #f0f8ff;
}

.session-card.full {
  opacity: 0.6;
  cursor: not-allowed;
}

.session-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 0.75rem;
}

.session-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary-blue);
}

.session-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}

.session-badge.workshop {
  background: #e3f2fd;
  color: #1976d2;
}

.session-badge.field-trip {
  background: #f3e5f5;
  color: #7b1fa2;
}

.session-badge.available {
  background: #e8f5e9;
  color: #388e3c;
}

.session-badge.limited {
  background: #fff3e0;
  color: #f57c00;
}

.session-badge.waitlist {
  background: #ffebee;
  color: #d32f2f;
}
```

**Add JavaScript to Load Sessions:**

```javascript
let selectedSessions = [];
let availableSessions = [];

async function loadSessions() {
  try {
    const response = await fetch(
      `https://cbt-stakeholder-db.onrender.com/api/conference/${conferenceData.id}/sessions`
    );
    const result = await response.json();

    if (result.success) {
      availableSessions = result.data;
      renderSessions();
      document.getElementById('sessionsLoading').style.display = 'none';
      document.getElementById('sessionsContainer').style.display = 'block';
    }
  } catch (error) {
    console.error('Error loading sessions:', error);
    document.getElementById('sessionsLoading').innerHTML =
      '<p style="color: #c00;">Failed to load sessions. Please try again.</p>';
  }
}

function renderSessions() {
  const container = document.getElementById('sessionsContainer');

  // Group sessions by date
  const sessionsByDate = {};
  availableSessions.forEach(session => {
    const date = session.session_date;
    if (!sessionsByDate[date]) {
      sessionsByDate[date] = [];
    }
    sessionsByDate[date].push(session);
  });

  let html = '';
  Object.keys(sessionsByDate).sort().forEach(date => {
    html += `
      <h3 style="color: var(--primary-blue); margin: 2rem 0 1rem;">
        ${new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
      </h3>
    `;

    sessionsByDate[date].forEach(session => {
      const isSelected = selectedSessions.includes(session.id);
      const isFull = session.isFull;
      const hasSpots = session.availableSpots;

      let badgeClass = 'available';
      let badgeText = 'Available';
      if (isFull) {
        badgeClass = 'waitlist';
        badgeText = 'Waitlist Only';
      } else if (hasSpots !== null && hasSpots < 10) {
        badgeClass = 'limited';
        badgeText = `${hasSpots} spots left`;
      }

      html += `
        <div class="session-card ${isSelected ? 'selected' : ''} ${isFull && !session.enable_waitlist ? 'full' : ''}"
             onclick="toggleSession('${session.id}')"
             id="session-${session.id}">
          <div class="session-header">
            <div>
              <div class="session-title">${session.session_name}</div>
              <div style="color: var(--text-light); font-size: 0.9rem; margin-top: 0.25rem;">
                ${session.start_time} - ${session.end_time} • ${session.room || 'TBD'}
              </div>
            </div>
            <div>
              <span class="session-badge ${session.session_type}">${session.session_type}</span>
              <span class="session-badge ${badgeClass}">${badgeText}</span>
            </div>
          </div>
          ${session.description ? `
            <p style="color: var(--text-color); margin-bottom: 0.5rem;">
              ${session.description}
            </p>
          ` : ''}
          ${session.chair_name ? `
            <div style="font-size: 0.9rem; color: var(--text-light);">
              Chair: ${session.chair_name}
            </div>
          ` : ''}
          ${session.requires_additional_fee ? `
            <div style="margin-top: 0.5rem; padding: 0.5rem; background: #fff3e0; border-radius: 4px; font-size: 0.9rem;">
              Additional fee: $${session.additional_fee}
            </div>
          ` : ''}
        </div>
      `;
    });
  });

  container.innerHTML = html;
}

function toggleSession(sessionId) {
  const session = availableSessions.find(s => s.id === sessionId);
  if (!session) return;

  // Check if full and no waitlist
  if (session.isFull && !session.enable_waitlist) {
    alert('This session is full and does not have a waitlist.');
    return;
  }

  const index = selectedSessions.indexOf(sessionId);
  if (index > -1) {
    selectedSessions.splice(index, 1);
  } else {
    selectedSessions.push(sessionId);
  }

  renderSessions();
}

// Call when moving to step 4
function onEnterStep4() {
  if (availableSessions.length === 0) {
    loadSessions();
  }
}
```

**Update Step Navigation:**

Modify the `nextStep()` function to handle step 4:

```javascript
function nextStep() {
  // ... existing validation ...

  if (currentStep === 4) {
    // Moving from session selection to review
    // Sessions are optional, so just continue
  }

  // Update step numbers (now 5 steps instead of 3)
  if (currentStep === 4) {
    onEnterStep4(); // Load sessions
  }

  // ... rest of navigation ...
}
```

---

### Task 3: Update Review & Payment Step (1 hour)

**Add Selected Sessions to Review:**

In the review step, add a section showing selected sessions:

```html
<!-- Selected Sessions -->
<div class="review-section" id="reviewSessions" style="display: none;">
  <h3>Selected Sessions & Workshops</h3>
  <div id="selectedSessionsList"></div>
</div>
```

**Update Review Display JavaScript:**

```javascript
function updateReviewStep() {
  // ... existing review code ...

  // Show selected sessions
  if (selectedSessions.length > 0) {
    document.getElementById('reviewSessions').style.display = 'block';
    const sessionsList = selectedSessions.map(sessionId => {
      const session = availableSessions.find(s => s.id === sessionId);
      return `
        <div style="padding: 0.75rem; background: var(--light-gray); border-radius: 4px; margin-bottom: 0.5rem;">
          <strong>${session.session_name}</strong><br>
          <span style="color: var(--text-light); font-size: 0.9rem;">
            ${new Date(session.session_date).toLocaleDateString()} • ${session.start_time}
          </span>
        </div>
      `;
    }).join('');
    document.getElementById('selectedSessionsList').innerHTML = sessionsList;
  }
}
```

---

### Task 4: Update Registration Submission (1 hour)

**Modify the form submission to include discount and sessions:**

```javascript
async function submitRegistration() {
  // ... existing registration code ...

  const registrationData = {
    // ... existing fields ...
    discountCode: appliedDiscount ? appliedDiscount.code : null,
  };

  // Submit registration
  const regResponse = await fetch('/api/conference/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(registrationData)
  });

  const regResult = await regResponse.json();

  if (regResult.success && selectedSessions.length > 0) {
    // Register for sessions
    await fetch('/api/conference/sessions/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        registrationId: regResult.data.registrationId,
        sessionIds: selectedSessions
      })
    });
  }

  // ... rest of submission ...
}
```

---

## 🎯 Testing Checklist

After implementing the above:

- [ ] Discount code validation works
- [ ] Invalid codes show appropriate errors
- [ ] Discount calculates correctly (percentage and fixed)
- [ ] Sessions load properly
- [ ] Session capacity shows correctly
- [ ] Session selection toggles properly
- [ ] Waitlist logic works for full sessions
- [ ] Review step shows all selected items
- [ ] Form submission includes discount and sessions
- [ ] Step navigation works with 4 steps
- [ ] Progress bar updates correctly

---

## 📊 Estimated Total Time

- Task 1 (Discount Code): **2 hours**
- Task 2 (Session Selection): **3-4 hours**
- Task 3 (Review Update): **1 hour**
- Task 4 (Submission Update): **1 hour**

**Total: 7-8 hours of frontend development**

---

## 🚀 After Frontend Complete

### Remaining System Components

1. **Email Templates** (4-6 hrs)
   - Registration confirmation
   - Payment receipt
   - Session confirmations

2. **Admin Dashboard** (10-12 hrs)
   - Registration list
   - Payment tracking
   - Analytics
   - Export to CSV

3. **Group Registration** (8-10 hrs)
   - Separate page for bulk registration
   - Group discount calculation
   - Group organizer designation

4. **My Registration Portal** (6-8 hrs)
   - View registration status
   - Modify sessions
   - Update dietary/accessibility
   - Download receipt

### Priority Order

**Week 1:** Frontend enhancements (this guide)
**Week 2:** Email templates + Admin dashboard
**Week 3:** Group registration + My Registration portal

---

## 📝 Notes

- Backend API is 100% ready for all features
- Migration 031 needs to be run on production database
- All sample discount codes are pre-loaded
- ICSR2026 conference data is already in database
- Existing registration form is 80% complete

**Next Steps:**
1. Implement Tasks 1-4 from this guide
2. Test thoroughly
3. Deploy backend migration
4. Launch registration!
