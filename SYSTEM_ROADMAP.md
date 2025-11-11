# ISRS Complete System Roadmap
**Nonprofit & Conference Management Platform**

## Current State ✅

### Completed Components
- [x] Public website with core content
- [x] Member profile system with authentication
- [x] Member directory with privacy controls
- [x] Magic link passwordless login
- [x] Conference history tracking
- [x] GDPR compliance (data export, deletion)
- [x] Basic database schema with attendee profiles
- [x] Email service integration (magic links)

## Implementation Roadmap

### Phase 1: Conference Registration System (Highest Priority)
**Goal:** Enable ICSR2026 registration by Q2 2025

#### Backend Components
1. **Database Schema**
   - `conference_registration_types` - Define attendee categories (student, professional, exhibitor, sponsor)
   - `registration_pricing` - Pricing tiers with early bird dates
   - `conference_registrations` - Main registration records (already exists, enhance)
   - `registration_sessions` - Workshop/session selections
   - `registration_payments` - Payment tracking
   - `discount_codes` - Promo codes with usage limits
   - `group_registrations` - Bulk registration management

2. **API Endpoints**
   - `GET /api/conference/:id/registration-types` - Available registration categories
   - `GET /api/conference/:id/pricing` - Current pricing (handles early bird logic)
   - `POST /api/conference/:id/register` - Submit registration
   - `GET /api/conference/:id/sessions` - Available workshops/sessions
   - `POST /api/registration/:id/add-sessions` - Add session selections
   - `PUT /api/registration/:id` - Update registration details
   - `GET /api/registration/:id` - Get registration status
   - `POST /api/discount-code/validate` - Validate promo code

3. **Payment Integration**
   - Stripe integration for credit card processing
   - Invoice generation
   - Payment confirmation emails
   - Refund handling

#### Frontend Components
1. **Registration Flow**
   - `/conference/register.html` - Multi-step registration form
     - Step 1: Attendee type selection
     - Step 2: Personal information (auto-fill from profile)
     - Step 3: Workshop/session selection
     - Step 4: Meal preferences & accessibility
     - Step 5: Payment (Stripe)
     - Step 6: Confirmation
   - `/conference/my-registration.html` - View/modify registration
   - `/conference/group-registration.html` - Bulk registration for orgs

2. **Admin Interface**
   - `/admin/registrations.html` - Registration dashboard
   - `/admin/registration-types.html` - Manage categories/pricing
   - `/admin/discount-codes.html` - Create/manage promo codes

**Estimated Time:** 2-3 weeks

---

### Phase 2: Abstract Submission System
**Goal:** Open abstract submissions 6 months before ICSR2026

#### Backend Components
1. **Database Schema**
   - `abstract_submissions` - Already exists, enhance
   - `abstract_reviews` - Peer review scores
   - `abstract_reviewers` - Reviewer assignments
   - `presentation_tracks` - Categories (restoration, policy, research, etc.)
   - `presentation_schedule` - Final schedule with times/rooms

2. **API Endpoints**
   - `POST /api/conference/:id/abstract/submit` - Submit abstract
   - `PUT /api/abstract/:id` - Edit abstract (before deadline)
   - `GET /api/abstract/:id` - View abstract details
   - `POST /api/abstract/:id/withdraw` - Withdraw submission
   - `GET /api/admin/abstracts` - List all submissions (admin)
   - `POST /api/abstract/:id/assign-reviewer` - Assign reviewer (admin)
   - `POST /api/abstract/:id/review` - Submit review score
   - `PUT /api/abstract/:id/status` - Accept/reject (admin)
   - `POST /api/abstract/:id/schedule` - Assign time/room (admin)

#### Frontend Components
1. **Submitter Portal**
   - `/conference/submit-abstract.html` - Submission form
   - `/conference/my-abstracts.html` - View submissions & status
   - `/conference/presentation-info.html` - Accepted presentation details

2. **Reviewer Portal**
   - `/admin/review-abstracts.html` - Review dashboard
   - `/admin/abstract-scoring.html` - Detailed review form

3. **Admin Interface**
   - `/admin/abstracts.html` - All submissions dashboard
   - `/admin/abstract-assignments.html` - Assign reviewers
   - `/admin/schedule-builder.html` - Build conference schedule

**Estimated Time:** 2 weeks

---

### Phase 3: Donation & Fundraising System
**Goal:** Accept donations for ISRS operations and scholarships

#### Backend Components
1. **Database Schema**
   - `donations` - All donation records
   - `recurring_donations` - Subscription management
   - `donation_campaigns` - Fundraising campaigns (scholarship fund, operations, etc.)
   - `donors` - Donor profiles (linked to attendee_profiles if applicable)
   - `tax_receipts` - Generated receipts for taxes

2. **API Endpoints**
   - `POST /api/donate` - Process one-time donation
   - `POST /api/donate/recurring` - Set up recurring donation
   - `PUT /api/donation/recurring/:id/cancel` - Cancel subscription
   - `GET /api/donations/my-history` - Donor's giving history
   - `GET /api/donation/receipt/:id` - Generate tax receipt
   - `GET /api/campaigns` - Active fundraising campaigns
   - `POST /api/admin/campaign` - Create campaign (admin)

#### Frontend Components
1. **Donor Portal**
   - `/donate.html` - Main donation page with campaign selection
   - `/donate/recurring.html` - Set up monthly giving
   - `/donate/thank-you.html` - Confirmation page
   - `/member/giving-history.html` - View donation history

2. **Admin Interface**
   - `/admin/donations.html` - Donation dashboard
   - `/admin/donors.html` - Donor management
   - `/admin/campaigns.html` - Campaign management
   - `/admin/tax-receipts.html` - Generate annual receipts

**Estimated Time:** 1.5 weeks

---

### Phase 4: Email Marketing & Communications
**Goal:** Communicate with members, donors, and registrants

#### Backend Components
1. **Database Schema**
   - `email_campaigns` - Campaign records
   - `email_templates` - Reusable templates
   - `email_sends` - Track individual sends
   - `email_lists` - Segmented lists (members, donors, ICSR2026 registrants, etc.)
   - `email_clicks` - Track link clicks
   - `email_unsubscribes` - Unsubscribe management

2. **API Endpoints**
   - `POST /api/email/campaign` - Send campaign (admin)
   - `GET /api/email/templates` - List templates
   - `POST /api/email/template` - Create template (admin)
   - `GET /api/email/campaign/:id/stats` - Campaign analytics
   - `POST /api/email/unsubscribe` - Unsubscribe from list
   - `GET /api/email/lists` - Available mailing lists

3. **Integration**
   - SendGrid or Mailchimp integration
   - Transactional emails (registration confirmations, abstract status, receipts)
   - Automated drip campaigns

#### Frontend Components
1. **Admin Interface**
   - `/admin/email-campaigns.html` - Campaign dashboard
   - `/admin/email-composer.html` - Create/send campaigns
   - `/admin/email-templates.html` - Template management
   - `/admin/email-lists.html` - Manage segments
   - `/admin/email-analytics.html` - Campaign performance

2. **User Interface**
   - `/email-preferences.html` - Manage subscriptions
   - Unsubscribe landing page

**Estimated Time:** 1.5 weeks

---

### Phase 5: Admin Dashboard & Analytics
**Goal:** Real-time insights for board and staff

#### Backend Components
1. **API Endpoints**
   - `GET /api/admin/dashboard` - Overall metrics
   - `GET /api/admin/stats/registrations` - Registration analytics
   - `GET /api/admin/stats/revenue` - Financial summary
   - `GET /api/admin/stats/members` - Member growth
   - `GET /api/admin/stats/abstracts` - Abstract submission stats
   - `GET /api/admin/stats/donations` - Fundraising metrics
   - `GET /api/admin/reports/export` - Download CSV/Excel reports

#### Frontend Components
1. **Admin Dashboard**
   - `/admin/dashboard.html` - Main dashboard with key metrics
     - Total registrations by type
     - Revenue vs goals
     - Member count & growth
     - Abstract submission status
     - Recent donations
     - Upcoming deadlines
   - `/admin/reports.html` - Generate custom reports
   - `/admin/analytics.html` - Detailed analytics with charts

**Estimated Time:** 1 week

---

### Phase 6: Event & Schedule Management
**Goal:** Build and publish conference program

#### Backend Components
1. **Database Schema**
   - `conference_events` - Sessions, workshops, social events
   - `event_venues` - Rooms and locations
   - `event_speakers` - Speaker assignments
   - `event_equipment` - A/V and equipment requests
   - `event_attendance` - Track who attended what

2. **API Endpoints**
   - `POST /api/admin/event` - Create event/session
   - `PUT /api/event/:id` - Update event details
   - `GET /api/conference/:id/schedule` - Public schedule
   - `POST /api/event/:id/assign-venue` - Assign room
   - `POST /api/event/:id/assign-speaker` - Add speaker
   - `GET /api/admin/schedule-conflicts` - Check for conflicts

#### Frontend Components
1. **Public Interface**
   - `/conference/schedule.html` - Full conference schedule
   - `/conference/session/:id.html` - Session details
   - `/conference/my-schedule.html` - Personal agenda

2. **Admin Interface**
   - `/admin/schedule.html` - Schedule builder
   - `/admin/venues.html` - Manage rooms/locations
   - `/admin/equipment.html` - Equipment tracking

**Estimated Time:** 1.5 weeks

---

### Phase 7: Volunteer Coordination
**Goal:** Recruit and manage conference volunteers

#### Backend Components
1. **Database Schema**
   - `volunteer_opportunities` - Available shifts/roles
   - `volunteer_signups` - Volunteer assignments
   - `volunteer_hours` - Time tracking
   - `volunteer_profiles` - Volunteer-specific info

2. **API Endpoints**
   - `GET /api/volunteer/opportunities` - List available shifts
   - `POST /api/volunteer/signup` - Sign up for shift
   - `POST /api/volunteer/:id/check-in` - Log hours
   - `GET /api/volunteer/my-shifts` - View my volunteer schedule
   - `POST /api/admin/volunteer/opportunity` - Create volunteer role

#### Frontend Components
1. **Volunteer Portal**
   - `/volunteer.html` - Volunteer opportunities
   - `/volunteer/signup.html` - Sign up form
   - `/volunteer/my-shifts.html` - My volunteer schedule

2. **Admin Interface**
   - `/admin/volunteers.html` - Volunteer dashboard
   - `/admin/volunteer-shifts.html` - Manage shifts
   - `/admin/volunteer-hours.html` - Hours tracking

**Estimated Time:** 1 week

---

### Phase 8: Committee Management
**Goal:** Coordinate board and committee work

#### Backend Components
1. **Database Schema**
   - `committees` - Committee definitions
   - `committee_members` - Member assignments with roles
   - `committee_meetings` - Meeting schedule
   - `committee_documents` - Shared files
   - `committee_tasks` - Task tracking

2. **API Endpoints**
   - `GET /api/committees` - List committees
   - `GET /api/committee/:id/members` - Committee roster
   - `POST /api/committee/:id/meeting` - Schedule meeting
   - `POST /api/committee/:id/document` - Upload document
   - `POST /api/committee/:id/task` - Create task

#### Frontend Components
1. **Committee Portal**
   - `/committees.html` - Committee directory
   - `/committee/:id.html` - Committee workspace
   - `/committee/:id/meetings.html` - Meeting schedule
   - `/committee/:id/documents.html` - Document library
   - `/committee/:id/tasks.html` - Task board

**Estimated Time:** 1 week

---

### Phase 9: Sponsorship Management
**Goal:** Manage conference sponsors and benefits

#### Backend Components
1. **Database Schema**
   - `sponsorship_tiers` - Platinum, Gold, Silver, etc.
   - `sponsors` - Sponsor organizations
   - `sponsor_benefits` - Benefits tracking
   - `sponsor_materials` - Logos, descriptions, booth info

2. **API Endpoints**
   - `GET /api/sponsorship/tiers` - Available sponsorship levels
   - `POST /api/sponsorship/apply` - Submit sponsorship application
   - `GET /api/sponsor/portal` - Sponsor dashboard
   - `POST /api/sponsor/materials` - Upload logos/materials
   - `PUT /api/admin/sponsor/:id/approve` - Approve sponsor

#### Frontend Components
1. **Public Interface**
   - `/sponsor.html` - Become a sponsor
   - `/sponsors.html` - Current sponsors showcase

2. **Sponsor Portal**
   - `/sponsor/portal.html` - Sponsor dashboard
   - `/sponsor/materials.html` - Upload materials
   - `/sponsor/booth.html` - Booth/exhibit info

3. **Admin Interface**
   - `/admin/sponsors.html` - Sponsor management
   - `/admin/sponsorship-tiers.html` - Manage tiers

**Estimated Time:** 1 week

---

### Phase 10: Grant Tracking
**Goal:** Track grants and reporting requirements

#### Backend Components
1. **Database Schema**
   - `grants` - Grant records
   - `grant_reports` - Report submissions and deadlines
   - `grant_activities` - Activities funded by grants
   - `grant_budgets` - Budget tracking

2. **API Endpoints**
   - `POST /api/admin/grant` - Add grant
   - `GET /api/admin/grants` - List all grants
   - `POST /api/grant/:id/report` - Submit report
   - `GET /api/grant/:id/budget` - View budget vs actual

#### Frontend Components
1. **Admin Interface**
   - `/admin/grants.html` - Grant dashboard
   - `/admin/grant/:id.html` - Grant details
   - `/admin/grant-reports.html` - Reporting calendar

**Estimated Time:** 0.5 weeks

---

### Phase 11: Financial Reporting
**Goal:** Board-ready financial reports

#### Backend Components
1. **API Endpoints**
   - `GET /api/admin/financial/summary` - Revenue/expense summary
   - `GET /api/admin/financial/revenue-by-source` - Breakdown
   - `GET /api/admin/financial/budget-variance` - Budget vs actual
   - `GET /api/admin/financial/export` - Export to Excel

#### Frontend Components
1. **Admin Interface**
   - `/admin/financials.html` - Financial dashboard
   - `/admin/revenue-report.html` - Revenue analysis
   - `/admin/budget.html` - Budget management

**Estimated Time:** 0.5 weeks

---

## Suggested Implementation Order

### Sprint 1 (Weeks 1-3) - **Critical for ICSR2026**
1. Conference Registration System
2. Payment Integration (Stripe)

### Sprint 2 (Weeks 4-5) - **Content Generation**
3. Abstract Submission System
4. Event/Schedule Management (basic)

### Sprint 3 (Weeks 6-7) - **Revenue & Outreach**
5. Donation System
6. Email Marketing System

### Sprint 4 (Weeks 8-9) - **Operations**
7. Admin Dashboard & Analytics
8. Volunteer Coordination

### Sprint 5 (Weeks 10-12) - **Governance & Sustainability**
9. Committee Management
10. Sponsorship Management
11. Grant Tracking
12. Financial Reporting

---

## Technical Considerations

### Integrations Needed
1. **Stripe** - Payment processing
2. **SendGrid/Mailchimp** - Email marketing
3. **AWS S3** - File storage (logos, documents)
4. **Google Calendar** - Committee meetings
5. **Zoom API** - Virtual meeting integration (if needed)

### Security & Compliance
1. PCI compliance for payment processing
2. GDPR compliance (already implemented for profiles)
3. Data encryption at rest and in transit
4. Regular security audits
5. Backup and disaster recovery

### Infrastructure
1. Production database scaling
2. Redis for session management
3. CDN for static assets
4. Load balancing for conference registration rush
5. Monitoring and alerting (Sentry, New Relic)

### Testing Strategy
1. Unit tests for all API endpoints
2. Integration tests for payment flows
3. End-to-end tests for registration process
4. Load testing for launch day capacity
5. Security penetration testing

---

## Success Metrics

### Conference Registration
- 200+ registrations for ICSR2026
- <2% payment failure rate
- 95% attendee satisfaction with registration process

### Member Engagement
- 40% of past attendees claim profiles
- 30% opt-in to member directory
- 80% profile completion rate

### Fundraising
- $50K in donations year 1
- 20+ recurring donors
- 5+ sponsorships for ICSR2026

### Communication
- 60% email open rate
- <2% unsubscribe rate
- 500+ newsletter subscribers

---

## Timeline Summary

**Total Estimated Time:** 12 weeks (3 months)
**Recommended Start:** February 2025
**Target Completion:** May 2025
**Buffer for Testing:** 2-4 weeks

This allows ICSR2026 registration to open in June 2025, 4 months before the October conference.

---

## Next Immediate Steps

1. **Decision Point:** Confirm Sprint 1 priorities
2. **Payment Integration:** Set up Stripe account for ISRS
3. **Design Registration Form:** Wireframe multi-step registration
4. **Database Migration:** Design conference_registration schema
5. **Frontend Mockup:** Create registration page design
