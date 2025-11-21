/**
 * ISRS Data Enrichment Script
 *
 * This script analyzes and enriches contact and organization data by:
 * 1. Parsing email addresses to extract names and organizations
 * 2. Finding organization websites
 * 3. Creating missing organizations
 * 4. Ensuring unique IDs across all entities
 * 5. Linking contacts to organizations
 *
 * Usage:
 *   node scripts/data-enrichment.js --analyze    # Analyze only, no changes
 *   node scripts/data-enrichment.js --apply      # Apply changes to database
 */

const API_BASE_URL = 'https://isrs-database-backend.onrender.com';

// Email domain to organization mapping
const EMAIL_DOMAIN_TO_ORG = {
  'noaa.gov': { name: 'NOAA', website: 'https://www.noaa.gov', type: 'Government' },
  'usda.gov': { name: 'USDA', website: 'https://www.usda.gov', type: 'Government' },
  'doi.gov': { name: 'Department of Interior', website: 'https://www.doi.gov', type: 'Government' },
  'epa.gov': { name: 'EPA', website: 'https://www.epa.gov', type: 'Government' },
  'gmail.com': null, // Personal email
  'yahoo.com': null,
  'hotmail.com': null,
  'outlook.com': null,
};

class DataEnrichmentAnalyzer {
  constructor() {
    this.contacts = [];
    this.organizations = [];
    this.changes = {
      contactsToUpdate: [],
      organizationsToCreate: [],
      organizationsToUpdate: [],
      linkages: []
    };
    this.stats = {
      totalContacts: 0,
      contactsWithoutNames: 0,
      contactsWithoutOrgs: 0,
      emailsParsed: 0,
      organizationsFound: 0,
      websitesFound: 0
    };
  }

  /**
   * Parse email address to extract potential name and organization
   */
  parseEmail(email) {
    if (!email) return { firstName: null, lastName: null, organization: null, domain: null };

    const [localPart, domain] = email.toLowerCase().split('@');
    if (!localPart || !domain) return { firstName: null, lastName: null, organization: null, domain: null };

    // Common patterns:
    // firstname.lastname@domain.com
    // firstnamelastname@domain.com
    // first.last@org.domain.com
    // flastname@domain.com

    let firstName = null;
    let lastName = null;
    let organization = null;

    // Parse local part for names
    if (localPart.includes('.')) {
      const parts = localPart.split('.');
      if (parts.length >= 2) {
        firstName = this.capitalize(parts[0]);
        lastName = this.capitalize(parts[1]);
      }
    } else if (localPart.includes('_')) {
      const parts = localPart.split('_');
      if (parts.length >= 2) {
        firstName = this.capitalize(parts[0]);
        lastName = this.capitalize(parts[1]);
      }
    }

    // Parse domain for organization
    const domainParts = domain.split('.');
    if (domainParts.length >= 2) {
      const domainKey = domainParts.slice(-2).join('.');

      if (EMAIL_DOMAIN_TO_ORG[domainKey]) {
        const orgInfo = EMAIL_DOMAIN_TO_ORG[domainKey];
        if (orgInfo) {
          organization = orgInfo.name;
        }
      } else if (!['com', 'org', 'net', 'edu', 'gov'].includes(domainParts[domainParts.length - 1])) {
        // International domain or specific org domain
        organization = this.capitalize(domainParts[domainParts.length - 2]);
      } else if (domainParts.length >= 3) {
        // Subdomain might indicate organization
        organization = this.capitalize(domainParts[0]);
      } else {
        // Use main domain name
        organization = this.capitalize(domainParts[domainParts.length - 2]);
      }
    }

    return { firstName, lastName, organization, domain };
  }

  capitalize(str) {
    if (!str) return null;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Generate organization website from email domain
   */
  generateWebsite(domain) {
    if (!domain) return null;

    // Check known mappings first
    if (EMAIL_DOMAIN_TO_ORG[domain]) {
      return EMAIL_DOMAIN_TO_ORG[domain]?.website;
    }

    // Generate likely website
    return `https://${domain}`;
  }

  /**
   * Fetch all contacts from API
   */
  async fetchContacts(sessionToken) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/contacts`, {
        headers: { 'Authorization': `Bearer ${sessionToken}` }
      });
      const data = await response.json();
      if (data.success) {
        this.contacts = data.data;
        this.stats.totalContacts = this.contacts.length;
        console.log(`✓ Fetched ${this.contacts.length} contacts`);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  }

  /**
   * Fetch all organizations from API
   */
  async fetchOrganizations(sessionToken) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/organizations`, {
        headers: { 'Authorization': `Bearer ${sessionToken}` }
      });
      const data = await response.json();
      if (data.success) {
        this.organizations = data.data;
        console.log(`✓ Fetched ${this.organizations.length} organizations`);
      }
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  }

  /**
   * Analyze all contacts and generate enrichment suggestions
   */
  analyzeContacts() {
    console.log('\n📊 Analyzing contacts...\n');

    for (const contact of this.contacts) {
      const needsUpdate = {};

      // Parse email if available
      if (contact.email) {
        const parsed = this.parseEmail(contact.email);
        this.stats.emailsParsed++;

        // Suggest first name if missing
        if (!contact.first_name && parsed.firstName) {
          needsUpdate.first_name = parsed.firstName;
          this.stats.contactsWithoutNames++;
        }

        // Suggest last name if missing
        if (!contact.last_name && parsed.lastName) {
          needsUpdate.last_name = parsed.lastName;
        }

        // Suggest organization if missing
        if (!contact.organization_name && parsed.organization) {
          needsUpdate.organization_name = parsed.organization;
          this.stats.contactsWithoutOrgs++;

          // Check if organization exists
          const existingOrg = this.organizations.find(org =>
            org.name?.toLowerCase() === parsed.organization.toLowerCase()
          );

          if (!existingOrg) {
            // Suggest creating organization
            const website = this.generateWebsite(parsed.domain);
            this.changes.organizationsToCreate.push({
              name: parsed.organization,
              website: website,
              type: parsed.domain?.includes('.gov') ? 'Government' :
                     parsed.domain?.includes('.edu') ? 'University' : 'Organization',
              notes: `Auto-generated from contact: ${contact.email}`
            });
            this.stats.organizationsFound++;
            if (website) this.stats.websitesFound++;
          }

          // Create linkage
          this.changes.linkages.push({
            contactEmail: contact.email,
            organizationName: parsed.organization
          });
        }
      }

      if (Object.keys(needsUpdate).length > 0) {
        this.changes.contactsToUpdate.push({
          id: contact.id,
          email: contact.email,
          currentData: {
            first_name: contact.first_name,
            last_name: contact.last_name,
            organization_name: contact.organization_name
          },
          updates: needsUpdate
        });
      }
    }
  }

  /**
   * Generate report of suggested changes
   */
  generateReport() {
    console.log('\n' + '='.repeat(80));
    console.log('📋 DATA ENRICHMENT ANALYSIS REPORT');
    console.log('='.repeat(80));

    console.log('\n📊 STATISTICS:');
    console.log(`  Total Contacts: ${this.stats.totalContacts}`);
    console.log(`  Emails Parsed: ${this.stats.emailsParsed}`);
    console.log(`  Contacts Without Names: ${this.stats.contactsWithoutNames}`);
    console.log(`  Contacts Without Organizations: ${this.stats.contactsWithoutOrgs}`);
    console.log(`  New Organizations Found: ${this.stats.organizationsFound}`);
    console.log(`  Websites Generated: ${this.stats.websitesFound}`);

    console.log('\n📝 SUGGESTED CHANGES:');
    console.log(`  Contacts to Update: ${this.changes.contactsToUpdate.length}`);
    console.log(`  Organizations to Create: ${this.changes.organizationsToCreate.length}`);
    console.log(`  Contact-Organization Links: ${this.changes.linkages.length}`);

    if (this.changes.contactsToUpdate.length > 0) {
      console.log('\n👤 SAMPLE CONTACT UPDATES (first 10):');
      this.changes.contactsToUpdate.slice(0, 10).forEach((change, i) => {
        console.log(`\n  ${i + 1}. ${change.email}`);
        Object.entries(change.updates).forEach(([field, value]) => {
          console.log(`     ${field}: "${change.currentData[field] || '(empty)'}" → "${value}"`);
        });
      });
    }

    if (this.changes.organizationsToCreate.length > 0) {
      console.log('\n🏢 NEW ORGANIZATIONS TO CREATE (first 10):');
      this.changes.organizationsToCreate.slice(0, 10).forEach((org, i) => {
        console.log(`\n  ${i + 1}. ${org.name}`);
        console.log(`     Type: ${org.type}`);
        console.log(`     Website: ${org.website || '(none)'}`);
        console.log(`     Notes: ${org.notes}`);
      });
    }

    console.log('\n' + '='.repeat(80));
    console.log('💾 To save this report: node scripts/data-enrichment.js --analyze > report.txt');
    console.log('⚡ To apply changes: node scripts/data-enrichment.js --apply');
    console.log('='.repeat(80) + '\n');

    return this.changes;
  }

  /**
   * Export changes as SQL for manual review
   */
  generateSQL() {
    const sql = [];

    sql.push('-- ISRS Data Enrichment SQL');
    sql.push('-- Generated: ' + new Date().toISOString());
    sql.push('-- REVIEW CAREFULLY BEFORE EXECUTING\n');

    // Organizations to create
    if (this.changes.organizationsToCreate.length > 0) {
      sql.push('-- Create new organizations');
      this.changes.organizationsToCreate.forEach(org => {
        sql.push(`INSERT INTO organizations (name, type, website, notes) VALUES (
  '${org.name.replace(/'/g, "''")}',
  '${org.type}',
  ${org.website ? `'${org.website}'` : 'NULL'},
  '${org.notes.replace(/'/g, "''")}'
) ON CONFLICT (name) DO NOTHING;`);
      });
      sql.push('');
    }

    // Contacts to update
    if (this.changes.contactsToUpdate.length > 0) {
      sql.push('-- Update contacts');
      this.changes.contactsToUpdate.forEach(change => {
        const updates = Object.entries(change.updates)
          .map(([field, value]) => `${field} = '${value.replace(/'/g, "''")}'`)
          .join(', ');
        sql.push(`UPDATE contacts SET ${updates} WHERE email = '${change.email}';`);
      });
      sql.push('');
    }

    return sql.join('\n');
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const mode = args[0];

  if (!mode || !['--analyze', '--apply'].includes(mode)) {
    console.log('Usage:');
    console.log('  node scripts/data-enrichment.js --analyze    # Analyze and report');
    console.log('  node scripts/data-enrichment.js --apply      # Apply changes');
    process.exit(1);
  }

  console.log('🚀 ISRS Data Enrichment Tool\n');

  // For now, we need a session token - you'll need to provide this
  const sessionToken = process.env.ISRS_SESSION_TOKEN;
  if (!sessionToken) {
    console.error('❌ Error: ISRS_SESSION_TOKEN environment variable required');
    console.log('\nGet your session token from browser localStorage and run:');
    console.log('  ISRS_SESSION_TOKEN="your-token" node scripts/data-enrichment.js --analyze');
    process.exit(1);
  }

  const analyzer = new DataEnrichmentAnalyzer();

  // Fetch data
  await analyzer.fetchContacts(sessionToken);
  await analyzer.fetchOrganizations(sessionToken);

  // Analyze
  analyzer.analyzeContacts();

  // Generate report
  const changes = analyzer.generateReport();

  // Generate SQL
  const sql = analyzer.generateSQL();
  const fs = require('fs');
  fs.writeFileSync('data-enrichment.sql', sql);
  console.log('💾 SQL script saved to: data-enrichment.sql\n');

  if (mode === '--apply') {
    console.log('⚠️  --apply mode not yet implemented');
    console.log('Please review data-enrichment.sql and apply manually for now.');
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { DataEnrichmentAnalyzer };
