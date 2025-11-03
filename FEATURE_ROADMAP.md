# ISRS Conference System - Feature Roadmap

## Overview
Comprehensive conference management system for the International Shellfish Restoration Society.

---

## Phase 1: Member Registration & Donations (Priority: HIGH)

### Features
- **Standalone Membership Registration**
  - Create `/join` or `/membership` page
  - Simple profile form (no conference registration)
  - Membership tiers: Regular, Student, Corporate
  - Annual membership fees

- **Zeffy Donation Integration**
  - Optional donation at signup
  - One-time or recurring donations
  - Donation recognition levels
  - Thank you page with tax receipt info

### Database Requirements
- `members` table separate from `attendee_profiles`
- Member status tracking (active, expired, lifetime)
- Donation history tracking
- Membership start/renewal dates

### UI Components
- Member registration form
- Donation amount selector
- Membership benefits display
- Member dashboard (view status, renew)

**Estimated Time:** 2-3 days
**Files to Create:**
- `/public/membership/join.html`
- `/public/membership/dashboard.html`
- Backend: `membershipController.js`, `membershipRoutes.js`
- Database: Migration for members table

---

## Phase 2: Profile Auto-Population (Priority: HIGH)

### Features
- **Email Lookup on Conference Registration**
  - Check if email exists in members/attendee_profiles
  - Auto-fill all known fields
  - Show "Welcome back, [Name]!" message
  - Allow edits/updates to profile

- **Profile Merge Logic**
  - Merge member profile with attendee profile
  - Update changed fields
  - Track profile update history

### Implementation
```javascript
// On email blur/change:
1. Query API: GET /api/profiles/lookup?email=xxx
2. If exists: Pre-fill form fields
3. Show indicator: "We found your profile!"
4. User can update any field
```

**Estimated Time:** 1 day
**Files to Update:**
- `register.html` - Add email lookup
- `conferenceController.js` - Add profile lookup endpoint

---

## Phase 3: Register Another Person (Priority: MEDIUM)

### Features
- **Proxy Registration**
  - "Register Someone Else" button
  - Clear/reset form
  - Track who registered whom (registrar_email field)
  - Payment by proxy registrar
  - Email confirmation to both parties

### Use Cases
- Admin registering speakers
- Company registering employees
- Parent registering student
- One person handling group registration

### Implementation
- Add `registered_by_email` field to registrations
- Toggle between "Register Yourself" / "Register Someone Else"
- Separate payment notification emails
- Admin view: See who registered whom

**Estimated Time:** 1 day
**Files to Update:**
- `register.html` - Add registration mode toggle
- `conferenceController.js` - Track registrar

---

## Phase 4: Abstract Management System (Priority: HIGH)

### Features

#### 4A: Abstract Submission
- **Submission Form**
  - Title, authors, affiliations
  - Abstract text (word limit: 250-500 words)
  - Keywords (multi-select)
  - Presentation type: Oral, Poster, Either
  - Topic categories
  - File upload: Supporting materials (optional)

- **Author Management**
  - Primary author (auto from profile)
  - Add co-authors (name, email, affiliation)
  - Presenting author selection
  - Author order management

#### 4B: Submission Management
- **User Dashboard**
  - View all submissions
  - Submission status: Draft, Submitted, Under Review, Accepted, Rejected, Needs Revision
  - Edit drafts
  - Withdraw submissions
  - Upload revised versions

#### 4C: Review System (Admin)
- **Admin Review Panel**
  - List all submissions
  - Filter by status, topic, type
  - Assign reviewers
  - Review scoring/feedback
  - Accept/Reject decisions
  - Send notification emails

#### 4D: Presentation Scheduling
- **Schedule Builder**
  - Drag-and-drop schedule creator
  - Session management
  - Time slot assignments
  - Room assignments
  - Generate printable schedule

### Database Schema
```sql
-- Abstracts table
CREATE TABLE abstracts (
  id SERIAL PRIMARY KEY,
  conference_id INT REFERENCES conferences(id),
  user_email VARCHAR(255),
  title VARCHAR(500),
  abstract_text TEXT,
  keywords TEXT[],
  presentation_type VARCHAR(50), -- oral, poster, either
  topic_category VARCHAR(100),
  status VARCHAR(50), -- draft, submitted, under_review, accepted, rejected, revision
  submitted_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Abstract authors
CREATE TABLE abstract_authors (
  id SERIAL PRIMARY KEY,
  abstract_id INT REFERENCES abstracts(id),
  author_order INT,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  affiliation VARCHAR(500),
  is_presenting BOOLEAN
);

-- Abstract reviews
CREATE TABLE abstract_reviews (
  id SERIAL PRIMARY KEY,
  abstract_id INT REFERENCES abstracts(id),
  reviewer_email VARCHAR(255),
  score INT,
  comments TEXT,
  recommendation VARCHAR(50), -- accept, reject, revision
  reviewed_at TIMESTAMP
);
```

**Estimated Time:** 5-7 days
**Files to Create:**
- `/public/abstracts/submit.html`
- `/public/abstracts/manage.html`
- `/public/admin/abstracts.html`
- Backend: `abstractController.js`, `abstractRoutes.js`
- Database: Migrations for abstract tables

---

## Phase 5: Travel & Accommodation Sharing (Priority: MEDIUM)

### Features

#### 5A: Travel Buddy Finder
- **Profile Preferences**
  - Arrival/departure dates and times
  - Airport/travel method
  - Willing to share: Ride, Taxi, Rental car
  - Gender preference (optional)
  - Smoking preference
  - Bio/introduction

- **Matching System**
  - Search by dates/airport
  - Filter by preferences
  - View profiles
  - Send connection requests
  - In-app messaging or email exchange

#### 5B: Roommate Matching
- **Room Sharing Preferences**
  - Hotel name/location
  - Check-in/check-out dates
  - Room type preference
  - Number of roommates wanted
  - Gender preference
  - Smoking preference
  - Budget range
  - Sleep schedule (early bird / night owl)
  - Additional preferences

- **Matching Board**
  - List of people looking for roommates
  - Filter by preferences
  - "I'm interested" button
  - Contact exchange
  - Mark as "Room found"

#### 5C: Travel Forum
- **Discussion Boards**
  - Travel tips
  - Local recommendations
  - Group activities
  - Restaurant meetups
  - Carpooling threads

### Database Schema
```sql
-- Travel profiles
CREATE TABLE travel_profiles (
  id SERIAL PRIMARY KEY,
  registration_id INT REFERENCES conference_registrations(id),
  arrival_date DATE,
  arrival_time TIME,
  departure_date DATE,
  departure_time TIME,
  airport VARCHAR(10),
  travel_method VARCHAR(50),
  willing_to_share_ride BOOLEAN,
  preferences JSONB,
  created_at TIMESTAMP
);

-- Roommate requests
CREATE TABLE roommate_requests (
  id SERIAL PRIMARY KEY,
  registration_id INT REFERENCES conference_registrations(id),
  hotel_name VARCHAR(255),
  check_in DATE,
  check_out DATE,
  looking_for_roommates INT,
  gender_preference VARCHAR(50),
  preferences JSONB,
  status VARCHAR(50), -- active, found, cancelled
  created_at TIMESTAMP
);

-- Travel connections
CREATE TABLE travel_connections (
  id SERIAL PRIMARY KEY,
  requester_id INT,
  recipient_id INT,
  connection_type VARCHAR(50), -- travel_buddy, roommate
  status VARCHAR(50), -- pending, accepted, declined
  message TEXT,
  created_at TIMESTAMP
);
```

**Estimated Time:** 7-10 days
**Files to Create:**
- `/public/travel/find-buddy.html`
- `/public/travel/find-roommate.html`
- `/public/travel/my-connections.html`
- `/public/travel/forum.html`
- Backend: `travelController.js`, `travelRoutes.js`
- Database: Migrations for travel tables

---

## Implementation Priority

### Immediate (Week 1-2)
1. ✅ Member registration system
2. ✅ Profile auto-population
3. ✅ Zeffy donation integration

### Short-term (Week 3-4)
4. ✅ Register another person
5. ✅ Abstract submission system
6. ✅ Abstract management dashboard

### Medium-term (Week 5-7)
7. ✅ Abstract review system (admin)
8. ✅ Travel buddy finder
9. ✅ Roommate matching

### Long-term (Week 8+)
10. ✅ Presentation scheduling
11. ✅ Travel forum/messaging
12. ✅ Advanced matching algorithms

---

## Technical Considerations

### Frontend
- Reusable components for forms
- State management for complex flows
- File upload handling
- Real-time updates (WebSockets for messaging?)
- Mobile-responsive design

### Backend
- Email notification system (SendGrid/AWS SES)
- File storage (AWS S3 or similar)
- Search/filtering optimization
- Matching algorithm implementation
- Privacy controls
- Admin permissions and roles

### Database
- Indexes for search performance
- Foreign key constraints
- Audit logging
- Data retention policies

### Security
- Email verification for new members
- Privacy settings for travel profiles
- Content moderation for forums
- Rate limiting for messaging
- Data encryption for sensitive info

---

## Questions to Clarify

1. **Membership Tiers**: What membership levels/prices do you want?
   - Regular Member: $XX/year
   - Student Member: $XX/year
   - Lifetime Member: $XXX
   - Corporate/Institutional: $XXX/year

2. **Abstract Deadlines**: When should abstract submission open/close?

3. **Review Process**: Who reviews abstracts? External reviewers or board members?

4. **Messaging**: In-app messaging or just email contact exchange?

5. **Privacy**: What info should be public vs. private in travel profiles?

6. **Moderation**: Who moderates forum posts and travel listings?

---

## Next Steps

**What would you like to prioritize first?**

**Option A: Start with Member Registration**
- Quick win, provides immediate value
- Foundation for profile auto-fill
- Can launch while building other features

**Option B: Start with Abstract Management**
- Critical for conference planning
- Likely has deadline pressure
- Most complex system

**Option C: Build everything in parallel**
- Faster overall completion
- Higher coordination complexity
- Requires more resources

Let me know your priority and I'll start building!
