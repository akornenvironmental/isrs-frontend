# ISRS Data Enrichment System

This document describes the comprehensive data enrichment system that has been implemented to automatically parse and enhance contact and organization data.

## Overview

The system provides three approaches to data enrichment:
1. **Analysis Script** - Safe preview tool that generates reports without making changes
2. **Backend API** - RESTful endpoints for programmatic enrichment with transaction support
3. **Database Functions** - PostgreSQL functions for direct data manipulation

## Current Data Quality Status

Based on the migration run (2025-01-21):
- **Contacts Missing First Name**: 2,620 (99.81%)
- **Contacts Missing Last Name**: 2,620 (99.81%)
- **Contacts Without Organizations**: 2,625 (100.00%)
- **Organizations Missing Websites**: 407 (100.00%)
- **Contacts with Uppercase in Email**: 3 (0.11%)

## Features

### Email Parsing
The system can extract names and organizations from email addresses:

**Pattern Recognition**:
- `firstname.lastname@domain.com` → John Smith
- `first_last@domain.com` → First Last
- `jsmith@noaa.gov` → Organization: NOAA

**Domain Mapping**:
- `noaa.gov` → NOAA (Government)
- `usda.gov` → USDA (Government)
- `doi.gov` → Department of Interior (Government)
- `epa.gov` → EPA (Government)
- `.edu` → University
- `.gov` → Government
- Personal email domains (gmail.com, yahoo.com, etc.) → No organization

### Website Generation
Automatically generates organization websites from email domains:
- Known domains use official URLs (e.g., noaa.gov → https://www.noaa.gov)
- Unknown domains generate likely URLs (e.g., example.org → https://example.org)
- Personal email domains are skipped

### Email Normalization
All emails are automatically converted to lowercase on insert/update via database trigger.

## Usage

### 1. Frontend Analysis Script

Located at: `/Users/akorn/isrs-frontend/scripts/data-enrichment.js`

```bash
# Analyze data without making changes
ISRS_SESSION_TOKEN="your-session-token" node scripts/data-enrichment.js --analyze

# Save report to file
ISRS_SESSION_TOKEN="your-session-token" node scripts/data-enrichment.js --analyze > report.txt

# Apply mode (not yet implemented)
ISRS_SESSION_TOKEN="your-session-token" node scripts/data-enrichment.js --apply
```

The script will:
- Fetch all contacts and organizations
- Parse email addresses for names and organizations
- Generate enrichment suggestions
- Export SQL for manual review
- Create `data-enrichment.sql` file

### 2. Backend API Endpoints

All endpoints require authentication token: `Authorization: Bearer <token>`

#### Get Data Quality Report
```bash
GET https://isrs-database-backend.onrender.com/api/admin/data-quality-report
```

Returns comprehensive metrics about data quality.

#### Preview Enrichment (No Changes)
```bash
POST https://isrs-database-backend.onrender.com/api/admin/contacts/enrich-preview
```

Returns:
```json
{
  "success": true,
  "totalContacts": 2625,
  "contactsToEnrich": 2620,
  "organizationsToCreate": 150,
  "suggestions": [
    {
      "contactId": "uuid",
      "email": "john.doe@noaa.gov",
      "currentData": {
        "firstName": null,
        "lastName": null,
        "organizationName": null
      },
      "suggestedUpdates": {
        "first_name": "John",
        "last_name": "Doe",
        "organization_name": "NOAA",
        "organization_id": "uuid"
      }
    }
  ],
  "newOrganizations": [
    {
      "name": "NOAA",
      "type": "Government",
      "website": "https://www.noaa.gov",
      "notes": "Auto-generated from email domain: noaa.gov"
    }
  ]
}
```

#### Apply Enrichment
```bash
POST https://isrs-database-backend.onrender.com/api/admin/contacts/enrich-apply
Content-Type: application/json

{
  "suggestions": [/* array of suggestions from preview */],
  "createOrganizations": [/* array of organizations to create */]
}
```

Returns:
```json
{
  "success": true,
  "message": "Enrichment complete: 2620 contacts updated, 150 organizations created",
  "results": {
    "contactsUpdated": 2620,
    "organizationsCreated": 150,
    "errors": []
  }
}
```

#### Enrich Organization Websites
```bash
POST https://isrs-database-backend.onrender.com/api/admin/organizations/enrich-websites
```

Suggests websites for organizations that don't have them, based on associated contact emails.

### 3. Direct Database Functions

Located at: `/Users/akorn/isrs-database-backend/database/migrations/024_data_enrichment_utilities.sql`

**Parse Email Name**:
```sql
SELECT * FROM parse_email_name('john.doe@example.com');
-- Returns: first_name: 'John', last_name: 'Doe'
```

**Extract Domain**:
```sql
SELECT extract_email_domain('john.doe@noaa.gov');
-- Returns: 'noaa.gov'
```

**Domain to Organization**:
```sql
SELECT domain_to_org_name('noaa.gov');
-- Returns: 'NOAA'
```

**Domain to Website**:
```sql
SELECT domain_to_website('noaa.gov');
-- Returns: 'https://www.noaa.gov'
```

**Domain to Type**:
```sql
SELECT domain_to_org_type('noaa.gov');
-- Returns: 'Government'
```

**Data Quality Report**:
```sql
SELECT * FROM generate_data_quality_report();
```

## Database Schema Changes

### New Functions
- `parse_email_name(email_address TEXT)` - Extract names from email
- `extract_email_domain(email_address TEXT)` - Get domain from email
- `domain_to_org_name(domain TEXT)` - Map domain to organization
- `domain_to_website(domain TEXT)` - Generate organization website
- `domain_to_org_type(domain TEXT)` - Determine organization type
- `lowercase_email()` - Trigger function for email normalization
- `generate_data_quality_report()` - Generate metrics

### New Views
- `contacts_missing_names` - Contacts without first/last names
- `contacts_without_organizations` - Contacts not linked to organizations
- `organizations_missing_websites` - Organizations without websites

### New Trigger
- `lowercase_contacts_email` - Automatically lowercase all emails on insert/update

## Migration

To run the migration:
```bash
cd /Users/akorn/isrs-database-backend
node database/run-data-enrichment-migration.js
```

The migration script will:
1. Execute all SQL functions and triggers
2. Generate current data quality report
3. Test all parsing functions
4. Verify successful deployment

## Best Practices

### Before Enrichment
1. **Run Preview First**: Always use `enrich-preview` to see suggested changes
2. **Review Suggestions**: Check that organization mappings make sense
3. **Backup Data**: Although transactions are used, always have a backup plan

### During Enrichment
1. **Start Small**: Test with a subset of suggestions first
2. **Monitor Errors**: Check the `errors` array in the response
3. **Verify Results**: Query the database after enrichment to confirm changes

### After Enrichment
1. **Run Quality Report**: Check improvement in data quality metrics
2. **Manual Review**: Some contacts may still need manual intervention
3. **Link Organizations**: Ensure contacts are properly linked to organization_id

## Unique IDs

All tables already use UUID primary keys:
- `contacts.id` - UUID (auto-generated)
- `organizations.id` - UUID (auto-generated)
- `conferences.id` - UUID (auto-generated)
- `funding_prospects.id` - UUID (auto-generated)

No additional unique ID changes needed.

## Funding Prospects → Members/Attendees

The database schema supports transitions:
- `funding_prospects` table has `contact_id` and `organization_id` foreign keys
- When a funding prospect becomes a member or attendee:
  1. Create/update contact record
  2. Link to organization via `organization_id`
  3. Create membership or conference registration record
  4. Update funding prospect status to 'converted' or 'committed'

## Known Domains

Currently mapped domains (add more in migration SQL):
- `noaa.gov` → NOAA (Government)
- `usda.gov` → USDA (Government)
- `doi.gov` → Department of Interior (Government)
- `epa.gov` → EPA (Government)

Personal email domains (skipped):
- `gmail.com`, `yahoo.com`, `hotmail.com`, `outlook.com`, `aol.com`, `icloud.com`

## API Integration Example

```javascript
// Get session token from localStorage
const sessionToken = localStorage.getItem('isrs_session');

// 1. Preview enrichment
const preview = await fetch('https://isrs-database-backend.onrender.com/api/admin/contacts/enrich-preview', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${sessionToken}`,
    'Content-Type': 'application/json'
  }
});

const previewData = await preview.json();
console.log(`Can enrich ${previewData.contactsToEnrich} contacts`);

// 2. Review and apply
if (confirm(`Apply enrichment to ${previewData.contactsToEnrich} contacts?`)) {
  const apply = await fetch('https://isrs-database-backend.onrender.com/api/admin/contacts/enrich-apply', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${sessionToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      suggestions: previewData.suggestions,
      createOrganizations: previewData.newOrganizations
    })
  });

  const result = await apply.json();
  console.log(result.message);
}
```

## Files Changed/Created

### Frontend
- `scripts/data-enrichment.js` - Analysis script (NEW)
- `DATA_ENRICHMENT_README.md` - This documentation (NEW)

### Backend
- `database/migrations/024_data_enrichment_utilities.sql` - SQL migration (NEW)
- `database/run-data-enrichment-migration.js` - Migration runner (NEW)
- `src/controllers/adminController.js` - Added enrichment endpoints (MODIFIED)
- `src/routes/adminRoutes.js` - Added enrichment routes (MODIFIED)

## Next Steps

1. **Run Preview**: Execute enrichment preview to see current suggestions
2. **Review Results**: Manually review suggested changes
3. **Apply Enrichment**: Run enrichment on production data
4. **Monitor Quality**: Check data quality report after enrichment
5. **Add Domains**: Extend domain mappings as needed
6. **Manual Cleanup**: Handle edge cases that automation missed

## Support

For issues or questions:
- Check data quality report: `GET /api/admin/data-quality-report`
- Review audit logs in `audit_log` table
- Check migration logs in backend deployment
- Use frontend analysis script for detailed reports
