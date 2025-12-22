# ISRS Unified Portal - Role-Based Access Control (RBAC) System Specification

**Created**: December 15, 2025
**Version**: 1.0
**Status**: Design Phase

---

## Executive Summary

This document defines the comprehensive Role-Based Access Control (RBAC) system for the ISRS Unified Portal. The system supports **multiple stacking roles** per user, **role-specific dashboards**, **temporal permissions** for conference-related activities, and extensive **self-service capabilities**.

### Key Design Principles

1. **Single Unified Portal** - One login route for all user types
2. **Multiple Roles Per User** - Users can hold multiple roles simultaneously (e.g., Board Member + Conference Presenter)
3. **Granular Permissions** - Fine-grained control over what each role can see and do
4. **Temporal Roles** - Conference-related roles have both active and historical status
5. **Self-Service First** - Members manage their own profiles, registrations, and submissions
6. **Secure by Default** - Least privilege principle, explicit permission grants

---

## Role Hierarchy

### Primary Administrative Roles

#### 1. **Super Admin** (Staff)
- **Highest Level**: Full system access
- **Typical Users**: ISRS staff members
- **Permission Scope**:
  - ✅ User Management (create, edit, delete users; assign/revoke any role)
  - ✅ Financial Access (all payment records, budgets, revenue, expenses)
  - ✅ Content Management (website, press, photos, resources)
  - ✅ System Configuration (settings, integrations, API keys, email templates)
  - ✅ Override any restriction
  - ✅ Access all dashboards and data

---

#### 2. **Board Officers** (President, VP, Secretary, Treasurer)
- **Level**: High administrative access with officer-specific powers
- **Typical Users**: Elected board leadership

##### President
- All Board Member permissions PLUS:
  - ✅ Emergency decision-making authority
  - ✅ Access to all board documents (past and present)
  - ✅ Approve board meeting agendas
  - ✅ Represent organization in official capacity

##### Vice President
- All Board Member permissions PLUS:
  - ✅ Acting President authority (same access as President)
  - ✅ Fill in for President when absent
  - ✅ Access same emergency decision tools

##### Secretary
- All Board Member permissions PLUS:
  - ✅ Schedule board meetings
  - ✅ Manage meeting agendas
  - ✅ Upload and edit meeting minutes
  - ✅ Track board member attendance
  - ✅ Manage board document repository

##### Treasurer
- All Board Member permissions PLUS:
  - ✅ Approve expenses and reimbursements
  - ✅ Reconcile financial accounts
  - ✅ Generate financial reports
  - ✅ Manage organizational budgets
  - ✅ Configure payment processing
  - ✅ Access to full financial dashboard

---

#### 3. **Board Members**
- **Level**: Organizational governance access
- **Typical Users**: Elected board members (non-officers)
- **Permissions**:
  - ✅ View financial reports (budget, income statements, financial health)
  - ✅ Access full member list (export and view all member contact details)
  - ✅ Read strategic documents (meeting minutes, strategic plans)
  - ✅ Vote on board proposals and organizational decisions
  - ✅ Access board-only communication channels
  - ✅ View board dashboard with org metrics
  - ❌ Cannot edit financial data (except Treasurer)
  - ❌ Cannot modify other users' accounts (except Super Admin)

---

#### 4. **Advisory Panel**
- **Level**: Limited admin access for specific advisory functions
- **Typical Users**: Scientific advisors, conference reviewers, subject matter experts
- **Permissions**:
  - ✅ Review and score conference abstracts
  - ✅ View member directory (full contact information)
  - ✅ Participate in conference planning (sessions, field trips, events)
  - ✅ Access and manage funding prospects database
  - ✅ Submit recommendations to board
  - ❌ Cannot view financial data
  - ❌ Cannot vote on board proposals
  - ❌ Cannot edit website content

---

### Member Roles

#### 5. **General Member**
- **Level**: Base membership access
- **Typical Users**: Paid members of ISRS
- **Permissions**:
  - ✅ Edit own profile (contact info, bio, photo, research areas, social media)
  - ✅ Upload CV/resume
  - ✅ Submit resources (white papers, posters, publications)
  - ✅ Upload and share photos
  - ✅ Register for conferences
  - ✅ View own membership and payment history
  - ✅ Make membership payments/donations
  - ✅ Submit conference abstracts
  - ✅ Opt into member directory
  - ✅ View public member profiles
  - ✅ Access members-only resources
  - ❌ Cannot view other members' private data
  - ❌ Cannot access financial information
  - ❌ Cannot view board documents

---

### Conference-Related Roles (Temporal)

These roles have **both active status** (for current/upcoming conference) and **historical record** (for past participation).

#### 6. **Conference Attendee**
- **Active Period**: Registration through conference end
- **Permissions (Active)**:
  - ✅ View conference schedule and sessions
  - ✅ Modify own registration details
  - ✅ Access attendee-only resources
  - ✅ Network with other attendees (if directory opt-in)
  - ✅ Download conference materials
  - ✅ Rate and review sessions
- **Permissions (Historical)**:
  - ✅ View own past conference attendance
  - ✅ Access archived conference materials
  - ✅ "Attended ICSR 20XX" badge on profile

#### 7. **Conference Presenter** (Speaker/Oral Presentation)
- **Active Period**: Abstract acceptance through conference end
- **Permissions (Active)**:
  - All Conference Attendee permissions PLUS:
  - ✅ Upload presentation slides/materials
  - ✅ Manage session details (title, abstract, co-authors)
  - ✅ View attendee count for session
  - ✅ Access speaker resources and AV requirements
  - ✅ Communicate with session moderators
- **Permissions (Historical)**:
  - ✅ "Presented at ICSR 20XX" badge
  - ✅ View presentation analytics (views, downloads)

#### 8. **Poster Presenter**
- **Active Period**: Poster acceptance through conference end
- **Permissions (Active)**:
  - All Conference Attendee permissions PLUS:
  - ✅ Upload poster PDF
  - ✅ Manage poster session details
  - ✅ View poster viewing analytics
  - ✅ Access poster resources (sizing, printing guidelines)
- **Permissions (Historical)**:
  - ✅ "Poster Presenter ICSR 20XX" badge

#### 9. **Student**
- **Active Period**: Conference registration through conference end
- **Permissions (Active)**:
  - All Conference Attendee permissions PLUS:
  - ✅ Access student-only networking events
  - ✅ Apply for student travel grants
  - ✅ Access student resources and mentorship
  - ✅ Discounted registration pricing
- **Permissions (Historical)**:
  - ✅ "Student Participant ICSR 20XX" badge

#### 10. **Field Trip Organizer** (Temporary Event Admin)
- **Active Period**: Planning phase through event completion
- **Permissions (Active)**:
  - ✅ Manage field trip details (location, schedule, capacity)
  - ✅ View attendee list for their field trip
  - ✅ Communicate with registered participants
  - ✅ Access logistics and transportation info
  - ✅ Upload field trip materials/guides
  - **REMOVE** after conference completion
- **Permissions (Historical)**:
  - ✅ "Field Trip Organizer ICSR 20XX" badge

#### 11. **Special Event Coordinator** (Temporary Event Admin)
- **Active Period**: Planning phase through event completion
- **Permissions (Active)**:
  - ✅ Manage event details (schedule, location, requirements)
  - ✅ View event participant list
  - ✅ Communicate with participants
  - ✅ Coordinate with conference organizers
  - **REMOVE** after conference completion
- **Permissions (Historical)**:
  - ✅ "Event Coordinator ICSR 20XX" badge

---

### Sponsor & Exhibitor Roles

#### 12. **Sponsor/Funder**
- **Level**: Financial contributor with recognition benefits
- **Permissions**:
  - All General Member permissions PLUS:
  - ✅ Analytics dashboard (logo impressions, attendee reach, sponsor ROI)
  - ✅ Manage sponsor profile (upload logo, company description, links)
  - ✅ Download attendee list (with opt-in consent for networking)
  - ✅ Highlighted profile in sponsor directory
  - ✅ Access to sponsor-only networking events
  - ✅ Early access to conference information

#### 13. **Exhibitor**
- **Level**: Conference table/booth holder
- **Permissions**:
  - All Conference Attendee permissions PLUS:
  - ✅ Manage exhibitor booth information
  - ✅ Upload promotional materials
  - ✅ Download attendee list (with consent)
  - ✅ Access exhibitor hall logistics
  - ✅ Analytics on booth visits (if tracked)
  - ✅ Network with other exhibitors

---

## Permission Matrix

| Feature/Action | Super Admin | President | VP | Secretary | Treasurer | Board Member | Advisory Panel | Member | Conference Attendee | Presenter | Sponsor | Exhibitor |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| **USER MANAGEMENT** |
| Create/Edit/Delete Users | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Assign/Revoke Roles | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Edit Own Profile | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Upload CV/Resume | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| View Member Directory | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 👁️ | 👁️ | 👁️ | 👁️ | 👁️ |
| Export Member List | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅* | ✅* |
| **FINANCIAL** |
| View All Financial Data | ✅ | ✅ | ✅ | ❌ | ✅ | 📊 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Approve Expenses | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Reconcile Accounts | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Generate Financial Reports | ✅ | ✅ | ✅ | ❌ | ✅ | 📊 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Make Membership Payment | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **CONTENT** |
| Edit Website Content | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Manage Press Releases | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Upload Resources (own) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Delete Any Resource | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Upload Photos | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **BOARD/GOVERNANCE** |
| Access Board Documents | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Schedule Board Meetings | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Upload Meeting Minutes | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Vote on Proposals | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Emergency Decisions | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **CONFERENCE** |
| Register for Conference | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Submit Abstract | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Review Abstracts | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Manage Conference Settings | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | 🔧 | ❌ | ❌ | ❌ | ❌ | ❌ |
| Upload Presentation | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| **FUNDING** |
| View Funding Prospects | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Edit Funding Database | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **ANALYTICS** |
| View System Analytics | ✅ | ✅ | ✅ | ✅ | ✅ | 📊 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| View Sponsor Analytics | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| View Presentation Analytics | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |

**Legend**:
- ✅ Full Access
- ❌ No Access
- 👁️ View Only (public profiles only)
- 📊 View Reports Only (cannot edit)
- 🔧 Can suggest/plan (final approval by Super Admin)
- ✅* With opt-in consent only

---

## User Profile & History System

### Profile Visibility Tiers

Each user can control visibility of their profile information:

1. **Public** (visible to anyone on the web)
   - Name
   - Organization
   - Profile photo
   - Public bio (user-controlled)
   - Public social media links

2. **Members Only** (visible to logged-in members)
   - Full bio and research areas
   - CV/Resume (if shared)
   - Conference participation history
   - Publications and resources
   - Email (if user opts in)

3. **Board/Staff Only** (visible to board members and super admin)
   - Phone number
   - Full address
   - Payment history
   - Membership status
   - Private notes

4. **Private** (visible only to user and super admin)
   - Payment methods
   - Login activity
   - Draft submissions
   - Private documents

### Achievement Badge System

Users earn badges for participation and contributions:

**Conference Badges**:
- 🎤 "Conference Presenter" - Gave oral presentation
- 📄 "Poster Presenter" - Presented poster
- 🎓 "Student Participant" - Attended as student
- 🗺️ "Field Trip Organizer" - Organized field trip
- 🌟 "5-Year Attendee" - Attended 5+ conferences
- 👥 "Networking Champion" - High engagement with attendees

**Contribution Badges**:
- 📚 "Resource Contributor" - Shared white papers/publications
- 📷 "Photo Contributor" - Uploaded photos to gallery
- 🔬 "Abstract Reviewer" - Reviewed abstracts
- 💰 "Sustaining Sponsor" - Multi-year sponsorship
- 🏛️ "Founding Member" - Original member

**Leadership Badges**:
- ⚖️ "Board Member" - Current/past board service
- 👔 "Board Officer" - Leadership role
- 🎯 "Advisory Panel" - Serving on advisory panel

Badges are displayed on:
- User profile page
- Member directory listing
- Conference attendee list
- When posting in forums/discussions

---

## Dashboard Design

### Role-Based Dashboard Views

Each primary role sees a customized dashboard on login:

#### Super Admin Dashboard
**Sections**:
1. **System Health** - Server status, database performance, error logs
2. **User Activity** - Recent logins, new registrations, user growth chart
3. **Financial Snapshot** - Revenue, membership payments, conference income
4. **Content Pending** - Awaiting approval (abstracts, photos, resources)
5. **Quick Actions** - Add user, send broadcast email, export data
6. **Alerts** - System errors, security warnings, expiring payments

#### Board Officer Dashboard
**Sections** (varies by officer):
1. **President/VP**: Upcoming board votes, recent decisions, member feedback
2. **Secretary**: Meeting schedule, attendance tracker, minutes to upload
3. **Treasurer**: Budget status, pending approvals, financial alerts
4. **All Officers**: Board announcements, strategic priorities, org health metrics

#### Board Member Dashboard
**Sections**:
1. **Governance** - Upcoming votes, board meeting schedule, minutes
2. **Financial Health** - Budget overview, income statement, key metrics
3. **Membership** - Growth trends, member demographics, retention
4. **Strategic Initiatives** - Progress on goals, upcoming deadlines
5. **Your Profile** - Personal info, attendance record

#### Advisory Panel Dashboard
**Sections**:
1. **Abstract Review Queue** - Pending reviews, scoring progress
2. **Conference Planning** - Session proposals, field trip ideas
3. **Funding Opportunities** - New prospects, application deadlines
4. **Member Directory** - Quick search, recent members
5. **Your Contributions** - Review history, planning involvement

#### General Member Dashboard
**Sections**:
1. **Your Profile** - Completion score, visibility settings, badges
2. **Upcoming Events** - Conferences, webinars, deadlines
3. **Your Registrations** - Status, payment, schedule
4. **Your Submissions** - Abstracts, posters, resources (status)
5. **Membership** - Renewal date, payment history, benefits
6. **Community** - Recent photos, member spotlights, news

#### Conference Presenter Dashboard (additional section)
**Sections**:
- **Your Presentation** - Upload status, session time, attendee count
- **Speaker Resources** - AV requirements, room setup, guidelines
- **Session Analytics** - Views, downloads, feedback

#### Sponsor Dashboard (additional sections)
**Sections**:
- **Your Sponsorship** - Level, benefits, logo placements
- **Analytics** - Impressions, clicks, attendee reach, ROI
- **Recognition** - How your logo appears, member visibility
- **Networking** - Attendee list (opt-in), booth traffic

---

## Database Schema for RBAC

### Core Tables

#### `users`
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  email_verified BOOLEAN DEFAULT false,
  email_verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP,
  login_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  deactivated_at TIMESTAMP,
  deactivation_reason TEXT
);
```

#### `roles`
```sql
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) UNIQUE NOT NULL, -- 'super_admin', 'board_officer', 'board_member', etc.
  display_name VARCHAR(200) NOT NULL,
  description TEXT,
  permission_level INTEGER NOT NULL, -- 100=super_admin, 90=board_officer, 80=board, 70=advisory, 60=member, etc.
  is_temporal BOOLEAN DEFAULT false, -- true for conference-related roles
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `user_roles` (Many-to-Many with Temporal Support)
```sql
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role_id UUID REFERENCES roles(id),
  granted_by UUID REFERENCES users(id), -- who assigned this role
  granted_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true, -- for temporal roles
  active_from TIMESTAMP, -- when role becomes active
  active_until TIMESTAMP, -- when role expires (NULL = permanent)
  conference_year INTEGER, -- for conference-related roles
  context_data JSONB, -- additional role-specific data
  UNIQUE(user_id, role_id, conference_year)
);
```

#### `permissions`
```sql
CREATE TABLE permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) UNIQUE NOT NULL, -- 'user.create', 'finance.view', 'abstract.review'
  resource VARCHAR(100) NOT NULL, -- 'user', 'finance', 'abstract'
  action VARCHAR(50) NOT NULL, -- 'create', 'read', 'update', 'delete', 'approve'
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `role_permissions` (Defines what each role can do)
```sql
CREATE TABLE role_permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_id UUID REFERENCES roles(id),
  permission_id UUID REFERENCES permissions(id),
  granted_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(role_id, permission_id)
);
```

#### `user_profiles`
```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  display_name VARCHAR(200),
  organization VARCHAR(255),
  position VARCHAR(255),
  bio TEXT,
  research_areas TEXT[],
  profile_photo_url TEXT,
  cv_url TEXT,
  website TEXT,
  linkedin_url TEXT,
  twitter_handle VARCHAR(100),
  orcid VARCHAR(50),

  -- Visibility settings
  profile_visibility VARCHAR(20) DEFAULT 'members', -- 'public', 'members', 'board', 'private'
  email_visibility VARCHAR(20) DEFAULT 'private',
  phone_visibility VARCHAR(20) DEFAULT 'private',
  cv_visibility VARCHAR(20) DEFAULT 'members',

  -- Profile completion
  profile_completion_score INTEGER DEFAULT 0,
  profile_completed_at TIMESTAMP,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### `achievement_badges`
```sql
CREATE TABLE achievement_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(50), -- emoji or icon class
  category VARCHAR(50), -- 'conference', 'contribution', 'leadership'
  criteria JSONB, -- how to earn this badge
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `user_badges`
```sql
CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES achievement_badges(id),
  earned_at TIMESTAMP DEFAULT NOW(),
  conference_year INTEGER, -- if badge is conference-specific
  visible BOOLEAN DEFAULT true, -- user can hide badges
  UNIQUE(user_id, badge_id, conference_year)
);
```

#### `officer_assignments` (Track board officer positions)
```sql
CREATE TABLE officer_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  position VARCHAR(50) NOT NULL, -- 'president', 'vice_president', 'secretary', 'treasurer'
  term_start DATE NOT NULL,
  term_end DATE,
  is_current BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Authentication Flow for Unified Portal

### Magic Link Authentication (Secure, Passwordless)

**Step 1: Request Login**
```
POST /api/auth/request-login
Body: { "email": "user@example.com" }

Response:
{
  "success": true,
  "message": "Magic link sent to your email"
}
```

**Backend**:
1. Verify user exists in database
2. Generate cryptographically secure token: `crypto.randomBytes(32).toString('hex')`
3. Store token in database with 15-minute expiration
4. Send email with magic link: `https://portal.isrs.org/auth/verify?token=ABC123`
5. Return success message (do NOT reveal if email exists - prevent enumeration)

**Step 2: Verify Magic Link**
```
GET /auth/verify?token=ABC123

Response: Redirect to dashboard with session cookie set
```

**Backend**:
1. Validate token exists and hasn't expired
2. Retrieve user from database
3. Load all active roles for user
4. Calculate permissions based on roles
5. Create session with:
   - Session ID (cryptographically random)
   - User ID
   - Roles array
   - Permissions array
   - IP address
   - User agent
   - Expires in 24 hours
6. Set HTTP-only, secure, SameSite=Strict session cookie
7. Delete magic link token (single use)
8. Log authentication event
9. Redirect to appropriate dashboard based on primary role

### Session Management

**Session Cookie**:
```
isrs_session=<token>; HttpOnly; Secure; SameSite=Strict; Max-Age=86400
```

**Session Validation on Every Request**:
1. Extract session cookie
2. Validate session exists and hasn't expired
3. Load user and roles from session (cached)
4. Check permission for requested resource
5. Update last activity timestamp

**Session Expiration**:
- **Idle Timeout**: 24 hours (configurable)
- **Absolute Timeout**: 7 days maximum (even with activity)
- **Automatic Renewal**: Session extended on each request (up to absolute timeout)

**Logout**:
```
POST /api/auth/logout

Response:
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Backend**:
1. Delete session from database
2. Clear session cookie
3. Log logout event
4. Redirect to login page

---

## Permission Checking Logic

### Permission Check Function
```javascript
function hasPermission(user, resource, action) {
  // Super admin has all permissions
  if (user.roles.includes('super_admin')) return true;

  // Get all active roles for user
  const activeRoles = user.roles.filter(role => {
    if (!role.is_temporal) return true; // permanent role
    if (!role.active_from || !role.active_until) return true;
    const now = new Date();
    return now >= role.active_from && now <= role.active_until;
  });

  // Collect all permissions from active roles
  const permissions = new Set();
  activeRoles.forEach(role => {
    role.permissions.forEach(perm => permissions.add(perm));
  });

  // Check if permission exists
  const permissionString = `${resource}.${action}`;
  return permissions.has(permissionString);
}
```

### Example Permission Checks
```javascript
// Can user edit another user's profile?
hasPermission(currentUser, 'user', 'edit.other')

// Can user view financial data?
hasPermission(currentUser, 'finance', 'view')

// Can user approve expenses?
hasPermission(currentUser, 'expense', 'approve')

// Can user review abstracts?
hasPermission(currentUser, 'abstract', 'review')
```

---

## Implementation Phases

### Phase 1: Core RBAC (2-3 weeks)
1. Database schema migration
2. Role and permission seeding
3. User role assignment migration
4. Authentication middleware update
5. Permission checking functions
6. Session management with HTTP-only cookies

### Phase 2: Role-Based Dashboards (2 weeks)
1. Dashboard route and component structure
2. Super Admin dashboard
3. Board Officer dashboards
4. General Member dashboard
5. Dynamic dashboard loading based on user roles

### Phase 3: Self-Service Features (2-3 weeks)
1. Profile editing
2. CV/Resume upload
3. Resource submission
4. Photo upload and sharing
5. Social media integration
6. Conference registration

### Phase 4: Admin Features (2 weeks)
1. User management (Super Admin)
2. Role assignment UI
3. Financial dashboards (Board/Treasurer)
4. Abstract review system (Advisory Panel)
5. Funding database (Advisory Panel)

### Phase 5: Conference Features (2 weeks)
1. Temporal role activation
2. Presentation upload
3. Event coordinator tools
4. Sponsor analytics
5. Attendee networking

### Phase 6: Achievement & History (1 week)
1. Badge system
2. Participation history
3. Profile visibility controls
4. Badge display

---

## Security Considerations

### Implemented Protections
1. **Magic Link Authentication** - Secure, passwordless login
2. **HTTP-only Cookies** - Session tokens not accessible to JavaScript
3. **SameSite Cookies** - CSRF protection
4. **Secure Cookies** - HTTPS only
5. **Token Expiration** - Magic links expire in 15 minutes
6. **Single-Use Tokens** - Magic links deleted after use
7. **Permission Validation** - Every request checks permissions
8. **Audit Logging** - All sensitive actions logged
9. **Rate Limiting** - Prevent brute force on login endpoint
10. **No User Enumeration** - Login doesn't reveal if email exists

### Additional Recommendations
1. **2FA for Super Admin** - Optional two-factor authentication
2. **IP Allowlisting for Super Admin** - Restrict admin access by IP
3. **Session Anomaly Detection** - Alert on unusual login locations/devices
4. **Regular Permission Audits** - Review who has access to what
5. **Automated Role Cleanup** - Remove expired temporal roles

---

## Migration Strategy

### From Current System to Unified Portal

**Step 1: Data Migration**
1. Export existing users from `attendee_profiles` and `admin_users` tables
2. Merge into unified `users` table (deduplicate by email)
3. Map current permissions to new role system:
   - Current `super_admin` → New `super_admin` role
   - Current `admin` → Determine if `board_member` or `advisory_panel`
   - Current attendees → New `member` role
   - Current conference registrations → Add `conference_attendee` role

**Step 2: Role Assignment**
1. Super Admin reviews and confirms role mappings
2. Assign officer positions to current board leadership
3. Tag historical conference participation with badges

**Step 3: Authentication Transition**
1. Deploy new magic link system alongside current system
2. Send announcement email to all users about new portal
3. Users request magic link on first login to new portal
4. Email verified automatically on magic link click
5. Deprecate old `/api/auth/login` endpoint after 30 days

**Step 4: Portal Rollout**
1. Launch unified portal in beta mode
2. Invite Super Admins and Board Officers first
3. Gather feedback and iterate
4. Roll out to Advisory Panel and active conference participants
5. Open to all members
6. Sunset old admin portal

---

## Success Metrics

**User Adoption**:
- % of users who have logged into unified portal
- % of profiles completed (target: 80%+)
- Daily active users

**Self-Service**:
- % of conference registrations self-service (vs admin-created)
- % of profiles updated by users (vs staff)
- Abstract submissions per conference

**Security**:
- Failed login attempts (should be low with magic links)
- Session hijacking attempts (should be zero with HTTP-only cookies)
- Permission violation attempts (should trigger alerts)

**Engagement**:
- Photos uploaded per month
- Resources shared per quarter
- Badge completion rate
- Member directory opt-in rate

---

## Next Steps

1. **Review this specification** with ISRS leadership
2. **Refine role definitions** based on organizational needs
3. **Prioritize features** for Phase 1 implementation
4. **Design mockups** for dashboards and key flows
5. **Begin database migration** and role seeding
6. **Implement secure magic link authentication**
7. **Build unified portal framework**
8. **Iterative rollout** with feedback loops

---

**Document Prepared By**: Claude Code
**For**: ISRS Leadership Team
**Status**: Awaiting Review and Approval
