# Member Profile System - Frontend Implementation

## ✅ COMPLETED (Backend)

### Database Schema
- **Migration 030**: Member profiles with privacy controls
- `attendee_profiles` enhanced with:
  - `directory_opt_in` - Whether user appears in public directory
  - `directory_visible_fields` - JSONB object controlling field visibility
  - `privacy_consent_given` - GDPR consent tracking
  - `profile_completion_score` - Auto-calculated 0-100 score
  - `notification_preferences` - Email preferences
- `member_conference_history` - Tracks participation across conferences
- `data_export_requests` - GDPR compliance for data export/deletion
- `member_directory` VIEW - Public profiles with privacy filters applied

### Backend API Endpoints (All Working)
Base URL: `https://safmc-fmp-tracker.onrender.com/api/profile` (or your deployed backend)

1. **POST /request-login**
   - Body: `{email: "user@example.com"}`
   - Sends magic link email
   - Returns: Success message

2. **POST /verify-magic-link**
   - Body: `{token: "magic-link-token"}`
   - Verifies token and creates session
   - Returns: `{sessionToken, expiresAt, user: {id, email, firstName, lastName}}`

3. **GET /me?sessionToken=xxx**
   - Returns full profile including:
     - Profile data
     - `conferenceHistory` - Past ICSR participation
     - `registrations` - Conference registrations
     - `abstracts` - Abstract submissions
     - `requiresFirstTimeSetup` - Boolean flag

4. **PUT /me**
   - Body: `{sessionToken, ...updates}`
   - Allowed fields: first_name, last_name, organization_name, position, department, phone, country, city, bio, website, linkedin_url, twitter_handle, orcid, research_areas, expertise_keywords, profile_photo_url, directory_opt_in, directory_visible_fields, notification_preferences
   - Special: `privacy_consent_given` triggers consent tracking

5. **GET /directory?search=&country=&expertise=&conference=**
   - Public member directory
   - Search/filter by name, country, expertise, conference year
   - Returns only opted-in members with privacy settings applied

6. **POST /request-data-export**
   - Body: `{sessionToken}`
   - Creates GDPR data export request

7. **POST /request-account-deletion**
   - Body: `{sessionToken, reason}`
   - Requests account deletion

8. **POST /logout**
   - Body: `{sessionToken}`
   - Invalidates session

## 🚧 TODO (Frontend)

### Design Decisions (from user responses)
- **Authentication**: Magic link (passwordless)
- **Onboarding**: Pre-created accounts, users claim via magic link
- **Visibility**: Member directory with opt-in
- **Privacy**: GDPR compliant with explicit consent
- **Engagement**: Profile completion badge/score
- **Integration**: Profile required for ICSR2026 registration

### Pages to Create

#### 1. Login Page (`/member/login.html`)
**Features:**
- Email input form
- "Send Magic Link" button
- Success message after email sent
- Link to conference registration
- Professional design matching existing site

**User Flow:**
1. User enters email
2. Click "Send Magic Link"
3. API call to POST /request-login
4. Show success: "Check your email for login link"

#### 2. Magic Link Verification (`/member/verify.html`)
**Features:**
- Auto-verify token from URL parameter
- Loading state while verifying
- Redirect to profile confirmation or profile page

**User Flow:**
1. User clicks magic link in email
2. Page loads with ?token=xxx
3. Auto-call POST /verify-magic-link
4. Store sessionToken in localStorage
5. GET /me to check requiresFirstTimeSetup
6. Redirect to confirmation or profile

#### 3. First-Time Profile Confirmation (`/member/welcome.html`)
**Features:**
- Welcome message
- Display pre-populated data (name, org, past conferences)
- Required fields to review/confirm
- Privacy consent checkbox (required)
- Terms acceptance checkbox (required)
- Profile completion progress bar
- "Complete Profile" button

**Required Actions:**
- Accept privacy policy
- Accept terms of service
- Review and confirm basic info
- Add missing information
- Set directory preferences

**User Flow:**
1. Show: "Welcome back! We have your information from ICSR [years]"
2. Display all pre-populated data in editable form
3. Show privacy consent with clear text
4. Require completion of key fields (name, country, organization)
5. PUT /me with all data + privacy_consent_given
6. Redirect to profile page

#### 4. Profile Page (`/member/profile.html`)
**Features:**
- View/Edit mode toggle
- All profile sections:
  - **Basic Info**: Name, email (locked), organization, title
  - **Contact**: Phone, country, city, website, LinkedIn
  - **Professional**: Bio, position, research areas, expertise
  - **Conference History**: Auto-populated, read-only list with edit capability
  - **Photo Upload**: Profile picture
- **Privacy Settings Section**:
  - Directory opt-in toggle
  - Field visibility checkboxes
  - Notification preferences
- **Profile Completion**: Progress bar with % and badge
- **Data Privacy**:
  - "Export My Data" button
  - "Delete Account" button
- Save button (PUT /me)

#### 5. Member Directory (`/member/directory.html`)
**Features:**
- Search bar (name, organization, bio)
- Filters:
  - Country dropdown
  - Expertise/Research area tags
  - Conference participation (year selector)
- Member cards showing:
  - Photo
  - Name
  - Organization & Title
  - Country
  - Research areas (tags)
  - Contact info (if visible)
  - Conference history (if visible)
- Click card to see full profile (modal or page)
- "X members found" count
- Pagination/infinite scroll

#### 6. Privacy Policy Page (`/privacy-policy.html`)
**Features:**
- Clear explanation of data collection
- What we track and why
- User rights (GDPR)
- How to exercise rights
- Contact information

### Shared Components

#### JavaScript Module (`/js/member-auth.js`)
```javascript
// Session management
- getSessionToken()
- setSessionToken(token)
- clearSession()
- isAuthenticated()
- requireAuth() // Redirect to login if not authenticated

// API calls
- login(email)
- verifyMagicLink(token)
- getProfile()
- updateProfile(updates)
- logout()
- getDirectory(filters)
- requestDataExport()
- requestAccountDeletion()
```

#### CSS Additions (`/css/styles.css`)
- `.profile-completion-bar` - Progress bar styles
- `.profile-badge` - Completion badge
- `.member-card` - Directory listing cards
- `.privacy-toggle` - Toggle switches for settings
- `.field-visibility-control` - Checkbox grid for visibility

### Integration Points

#### Conference Registration Integration
When user registers for ICSR2026:
1. Check if authenticated
2. If not, redirect to `/member/login.html?redirect=/conference/register.html`
3. After login, auto-fill registration from profile
4. After registration, update profile with attendance

#### Email Template (Announcement)
Subject: "Welcome to ISRS - Claim Your Member Profile"

Body:
```
Dear [Name],

We're excited to announce the official launch of the International Shellfish Restoration Society (ISRS) and the upcoming ICSR2026 conference in Puget Sound, Washington!

As a past participant in ICSR [year(s)], we've created a member profile for you with your information from previous conferences.

**Claim Your Profile:**
Simply click below to access your profile via a secure login link:
[Claim My Profile Button]

**What You Can Do:**
- Update your professional information
- Connect with other members in our global directory
- Track your ICSR participation history
- Get early access to ICSR2026 registration

**About ISRS:**
ISRS is a new 501(c)(3) nonprofit organization dedicated to building community and advancing innovation in shellfish restoration worldwide.

**ICSR2026 - Save the Date:**
October 4-8, 2026
Hosted by Squaxin Island Tribe
Puget Sound, Washington

Questions? Contact us at info@shellfish-society.org

Looking forward to seeing you in 2026!

The ISRS Team
```

### Technical Notes

- **Session Storage**: Use localStorage for sessionToken
- **API Base URL**: Environment-dependent (dev vs prod)
- **Error Handling**: Clear user-friendly messages
- **Loading States**: Show spinners during API calls
- **Mobile Responsive**: All pages must work on mobile
- **Accessibility**: Follow existing 508-compliance standards
- **Styling**: Match existing ISRS site design (colors: #546d7d, #2e5a8a)

### Next Steps Priority

1. Create login page (simple, gets users started)
2. Create verification page (completes auth flow)
3. Create welcome/confirmation page (first-time UX)
4. Create profile page (core functionality)
5. Create directory page (networking feature)
6. Create privacy policy (legal requirement)
7. Create email campaign (announcement)

### Testing Checklist

- [ ] Magic link email arrives
- [ ] Magic link successfully logs in
- [ ] First-time users see welcome screen
- [ ] Privacy consent is recorded
- [ ] Profile updates save correctly
- [ ] Directory search/filter works
- [ ] Profile completion score updates
- [ ] Directory respects privacy settings
- [ ] Data export request submits
- [ ] Account deletion works
- [ ] Session persists across page loads
- [ ] Logout clears session
- [ ] Mobile responsive on all pages

