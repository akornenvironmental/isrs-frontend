// Contact Management Features - Import, Export, Duplicate Detection, Bulk Operations, Merge

// ========== GLOBAL STATE ==========
let importData = null;
let importFieldMapping = null;
let importStep = 1;
let duplicatesData = null;
let mergeContactsData = null;

// ========== IMPORT FUNCTIONS ==========

function showImportModal() {
  document.getElementById('importModal').classList.add('show');
  resetImportModal();
}

function closeImportModal() {
  document.getElementById('importModal').classList.remove('show');
  resetImportModal();
}

function resetImportModal() {
  importStep = 1;
  importData = null;
  importFieldMapping = null;
  document.getElementById('importStep1').style.display = 'block';
  document.getElementById('importStep2').style.display = 'none';
  document.getElementById('importStep3').style.display = 'none';
  document.getElementById('importNextBtn').style.display = 'none';
  document.getElementById('importBackBtn').style.display = 'none';
  document.getElementById('importExecuteBtn').style.display = 'none';
  document.getElementById('fileInfo').style.display = 'none';
  document.getElementById('uploadError').style.display = 'none';
  document.getElementById('uploadLoading').style.display = 'none';
  document.getElementById('fileInput').value = '';
}

async function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const fileInfo = document.getElementById('fileInfo');
  const error = document.getElementById('uploadError');
  const loading = document.getElementById('uploadLoading');

  // Reset states
  fileInfo.style.display = 'none';
  error.style.display = 'none';
  loading.style.display = 'block';

  // Show file info
  fileInfo.innerHTML = `
    <strong>File:</strong> ${file.name}<br>
    <strong>Size:</strong> ${(file.size / 1024).toFixed(2)} KB<br>
    <strong>Type:</strong> ${file.type || 'Unknown'}
  `;

  try {
    const sessionToken = localStorage.getItem('isrs_session');
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/api/admin/contacts/import/analyze`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sessionToken}`
      },
      body: formData
    });

    const result = await response.json();
    loading.style.display = 'none';

    if (result.success) {
      importData = result;
      fileInfo.style.display = 'block';
      fileInfo.innerHTML += `<br><strong>Rows:</strong> ${result.rowCount}<br><strong>Columns:</strong> ${result.columns.length}`;
      document.getElementById('importNextBtn').style.display = 'inline-block';

      // Show duplicate warnings if any
      if (result.duplicates && result.duplicates.length > 0) {
        const warnings = document.getElementById('duplicateWarnings');
        warnings.style.display = 'block';
        warnings.innerHTML = `
          <strong>⚠️ Duplicates found in file:</strong><br>
          ${result.duplicates.length} potential duplicate(s) detected. They will be highlighted during import.
        `;
      }
    } else {
      error.style.display = 'block';
      error.textContent = result.error || 'Failed to analyze file';
    }
  } catch (err) {
    loading.style.display = 'none';
    error.style.display = 'block';
    error.textContent = 'Error uploading file: ' + err.message;
  }
}

function importNextStep() {
  if (importStep === 1) {
    // Move to field mapping step
    importStep = 2;
    document.getElementById('importStep1').style.display = 'none';
    document.getElementById('importStep2').style.display = 'block';
    document.getElementById('importBackBtn').style.display = 'inline-block';

    // Build field mapping UI
    buildFieldMappingUI();
  } else if (importStep === 2) {
    // Move to preview step
    importStep = 3;
    document.getElementById('importStep2').style.display = 'none';
    document.getElementById('importStep3').style.display = 'block';
    document.getElementById('importNextBtn').style.display = 'none';
    document.getElementById('importExecuteBtn').style.display = 'inline-block';

    // Collect field mappings
    collectFieldMappings();

    // Show preview
    showImportPreview();
  }
}

function importPrevStep() {
  if (importStep === 2) {
    importStep = 1;
    document.getElementById('importStep2').style.display = 'none';
    document.getElementById('importStep1').style.display = 'block';
    document.getElementById('importBackBtn').style.display = 'none';
    document.getElementById('importNextBtn').style.display = 'inline-block';
  } else if (importStep === 3) {
    importStep = 2;
    document.getElementById('importStep3').style.display = 'none';
    document.getElementById('importStep2').style.display = 'block';
    document.getElementById('importNextBtn').style.display = 'inline-block';
    document.getElementById('importExecuteBtn').style.display = 'none';
  }
}

function buildFieldMappingUI() {
  const container = document.getElementById('fieldMappingContainer');
  const suggestedMapping = importData.suggestedMapping || {};

  const dbFields = [
    { value: '', label: '-- Skip this column --' },
    { value: 'first_name', label: 'First Name' },
    { value: 'last_name', label: 'Last Name' },
    { value: 'email', label: 'Email' },
    { value: 'organization_name', label: 'Organization Name' },
    { value: 'country', label: 'Country' },
    { value: 'member_type', label: 'Member Type' },
    { value: 'phone', label: 'Phone' },
    { value: 'position', label: 'Position' },
    { value: 'expertise', label: 'Expertise' },
    { value: 'notes', label: 'Notes' }
  ];

  let html = '';
  for (const col of importData.columns) {
    const suggested = suggestedMapping[col];
    const confidence = suggested ? suggested.confidence : 0;
    const selectedField = suggested ? suggested.field : '';

    let confidenceClass = 'confidence-low';
    let confidenceText = 'Low';
    if (confidence > 0.8) {
      confidenceClass = 'confidence-high';
      confidenceText = 'High';
    } else if (confidence > 0.5) {
      confidenceClass = 'confidence-medium';
      confidenceText = 'Medium';
    }

    html += `
      <div class="field-mapping-row">
        <label>${col}</label>
        <select data-import-column="${col}">
          ${dbFields.map(f => `<option value="${f.value}" ${f.value === selectedField ? 'selected' : ''}>${f.label}</option>`).join('')}
        </select>
        ${suggested ? `<span class="confidence-indicator ${confidenceClass}">✓ ${confidenceText}</span>` : '<span class="confidence-indicator">-</span>'}
      </div>
    `;
  }

  container.innerHTML = html;
}

function collectFieldMappings() {
  const selects = document.querySelectorAll('#fieldMappingContainer select');
  importFieldMapping = {};

  selects.forEach(select => {
    const importCol = select.getAttribute('data-import-column');
    const dbField = select.value;
    if (dbField) {
      importFieldMapping[importCol] = { field: dbField, confidence: 1.0 };
    }
  });
}

function showImportPreview() {
  const preview = document.getElementById('importPreview');
  const previewRows = importData.preview || importData.data.slice(0, 5);

  let html = `
    <p><strong>Ready to import ${importData.rowCount} rows</strong></p>
    <p>Preview of first 5 rows with mapped fields:</p>
    <div class="import-preview-table">
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            ${Object.values(importFieldMapping).map(m => `<th style="padding: 0.5rem; border: 1px solid #ddd; background: #f5f5f5;">${m.field}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${previewRows.map(row => `
            <tr>
              ${Object.keys(importFieldMapping).map(col => `<td style="padding: 0.5rem; border: 1px solid #ddd;">${row[col] || '-'}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    <div class="form-group" style="margin-top: 1rem;">
      <label>
        <input type="checkbox" id="confirmImport">
        I confirm that I want to import these contacts
      </label>
    </div>
  `;

  preview.innerHTML = html;
}

async function executeImport() {
  const confirmed = document.getElementById('confirmImport')?.checked;
  if (!confirmed) {
    showToast('Please confirm the import', 'error');
    return;
  }

  const executeBtn = document.getElementById('importExecuteBtn');
  executeBtn.disabled = true;
  executeBtn.textContent = 'Importing...';

  const updateExisting = document.getElementById('updateExisting').checked;

  try {
    const sessionToken = localStorage.getItem('isrs_session');
    const response = await fetch(`${API_BASE_URL}/api/admin/contacts/import/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`
      },
      body: JSON.stringify({
        data: importData.data,
        fieldMapping: importFieldMapping,
        options: { updateExisting }
      })
    });

    const result = await response.json();

    if (result.success) {
      const resultsDiv = document.getElementById('importResults');
      resultsDiv.style.display = 'block';
      resultsDiv.innerHTML = `
        <div class="success">
          <h3>Import Complete!</h3>
          <p><strong>Imported:</strong> ${result.results.imported} contacts</p>
          <p><strong>Updated:</strong> ${result.results.updated} contacts</p>
          <p><strong>Skipped:</strong> ${result.results.skipped} contacts</p>
          ${result.results.errors.length > 0 ? `
            <details style="margin-top: 1rem;">
              <summary style="cursor: pointer;">View Errors (${result.results.errors.length})</summary>
              <ul style="margin-top: 0.5rem;">
                ${result.results.errors.slice(0, 20).map(err => `<li>${err}</li>`).join('')}
              </ul>
            </details>
          ` : ''}
        </div>
      `;

      // Hide preview and button
      document.getElementById('importPreview').style.display = 'none';
      executeBtn.style.display = 'none';

      // Reload contacts
      setTimeout(() => {
        closeImportModal();
        loadContacts();
        showToast('Import completed successfully', 'success');
      }, 2000);
    } else {
      showToast(result.error || 'Import failed', 'error');
      executeBtn.disabled = false;
      executeBtn.textContent = 'Import Contacts';
    }
  } catch (err) {
    showToast('Error during import: ' + err.message, 'error');
    executeBtn.disabled = false;
    executeBtn.textContent = 'Import Contacts';
  }
}

// ========== EXPORT FUNCTIONS ==========

async function exportAllToCSV() {
  try {
    const sessionToken = localStorage.getItem('isrs_session');
    const response = await fetch(`${API_BASE_URL}/api/admin/contacts/export`, {
      headers: {
        'Authorization': `Bearer ${sessionToken}`
      }
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `contacts-export-${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      showToast('Contacts exported successfully', 'success');
    } else {
      const result = await response.json();
      showToast(result.error || 'Export failed', 'error');
    }
  } catch (err) {
    showToast('Error exporting contacts: ' + err.message, 'error');
  }
}

// ========== DUPLICATES FUNCTIONS ==========

function showDuplicatesModal() {
  document.getElementById('duplicatesModal').classList.add('show');
  detectDuplicates();
}

function closeDuplicatesModal() {
  document.getElementById('duplicatesModal').classList.remove('show');
}

async function detectDuplicates() {
  const loading = document.getElementById('duplicatesLoading');
  const content = document.getElementById('duplicatesContent');

  loading.style.display = 'block';
  content.style.display = 'none';

  try {
    const sessionToken = localStorage.getItem('isrs_session');
    const response = await fetch(`${API_BASE_URL}/api/admin/contacts/duplicates`, {
      headers: {
        'Authorization': `Bearer ${sessionToken}`
      }
    });

    const result = await response.json();
    loading.style.display = 'none';

    if (result.success) {
      duplicatesData = result;
      displayDuplicates(result);
      content.style.display = 'block';
    } else {
      showToast(result.error || 'Failed to detect duplicates', 'error');
      closeDuplicatesModal();
    }
  } catch (err) {
    loading.style.display = 'none';
    showToast('Error detecting duplicates: ' + err.message, 'error');
    closeDuplicatesModal();
  }
}

function displayDuplicates(data) {
  const summary = document.querySelector('.duplicates-summary');
  const list = document.querySelector('.duplicates-list');

  const totalEmailDupes = data.totalEmailDupes || 0;
  const totalNameDupes = data.totalNameDupes || 0;

  summary.innerHTML = `
    <h3>Duplicate Detection Results</h3>
    <p><strong>Email Duplicates:</strong> ${totalEmailDupes} group(s)</p>
    <p><strong>Name Duplicates:</strong> ${totalNameDupes} potential match(es)</p>
  `;

  let listHTML = '';

  // Display email duplicates
  if (data.emailDuplicates && data.emailDuplicates.length > 0) {
    listHTML += '<h3>Email Duplicates</h3>';
    for (const dup of data.emailDuplicates) {
      listHTML += `
        <div class="duplicate-group">
          <div class="duplicate-group-header">Email: ${dup.email} (${dup.count} contacts)</div>
          <button class="btn btn-sm btn-primary" onclick="showMergeModal('${dup.contactIds.join(',')}')">Merge These Contacts</button>
        </div>
      `;
    }
  }

  // Display name duplicates
  if (data.nameDuplicates && data.nameDuplicates.length > 0) {
    listHTML += '<h3 style="margin-top: 2rem;">Name Similarity Matches</h3>';
    for (const dup of data.nameDuplicates.slice(0, 20)) { // Limit to 20 for performance
      const contact1 = dup.contacts[0];
      const contact2 = dup.contacts[1];
      listHTML += `
        <div class="duplicate-group">
          <div class="duplicate-group-header">${dup.reason}</div>
          <div class="duplicate-contacts">
            <div class="duplicate-contact">
              <strong>${contact1.first_name} ${contact1.last_name}</strong><br>
              Email: ${contact1.email || 'N/A'}<br>
              Organization: ${contact1.organization_id || 'N/A'}
            </div>
            <div class="duplicate-contact">
              <strong>${contact2.first_name} ${contact2.last_name}</strong><br>
              Email: ${contact2.email || 'N/A'}<br>
              Organization: ${contact2.organization_id || 'N/A'}
            </div>
          </div>
          <button class="btn btn-sm btn-primary" onclick="showMergeModal('${contact1.id},${contact2.id}')">Merge These Contacts</button>
        </div>
      `;
    }
  }

  if (totalEmailDupes === 0 && totalNameDupes === 0) {
    listHTML = '<p style="text-align: center; padding: 2rem; color: #666;">No duplicates found! Your contact database is clean.</p>';
  }

  list.innerHTML = listHTML;
}

// ========== MERGE FUNCTIONS ==========

async function showMergeModal(contactIdsStr) {
  const contactIds = contactIdsStr.split(',');
  if (contactIds.length !== 2) {
    showToast('Please select exactly 2 contacts to merge', 'error');
    return;
  }

  // Fetch full contact details
  const contacts = await Promise.all(contactIds.map(id => fetchContactById(id)));

  if (contacts.some(c => !c)) {
    showToast('Failed to load contact details', 'error');
    return;
  }

  mergeContactsData = { contacts, primaryId: contactIds[0], secondaryId: contactIds[1] };

  document.getElementById('mergeModal').classList.add('show');
  buildMergeUI(contacts);
}

function closeMergeModal() {
  document.getElementById('mergeModal').classList.remove('show');
  mergeContactsData = null;
}

async function fetchContactById(id) {
  try {
    const sessionToken = localStorage.getItem('isrs_session');
    const response = await fetch(`${API_BASE_URL}/api/admin/contacts`, {
      headers: {
        'Authorization': `Bearer ${sessionToken}`
      }
    });
    const result = await response.json();
    if (result.success) {
      return result.data.find(c => c.id === id);
    }
  } catch (err) {
    console.error('Error fetching contact:', err);
  }
  return null;
}

function buildMergeUI(contacts) {
  const comparison = document.querySelector('.merge-comparison');
  const [contact1, contact2] = contacts;

  const fields = ['first_name', 'last_name', 'email', 'phone', 'country', 'member_type', 'position', 'expertise', 'notes'];

  let html = '';
  html += '<div class="merge-field-label">Field</div>';
  html += '<div class="merge-field-label">Contact 1 (Primary)</div>';
  html += '<div class="merge-field-label">Contact 2 (Secondary)</div>';

  for (const field of fields) {
    html += `<div class="merge-field-label">${field.replace('_', ' ').toUpperCase()}</div>`;
    html += `
      <div class="merge-field-option selected" onclick="selectMergeField('${field}', 'primary', this)">
        <input type="radio" name="merge_${field}" value="primary" checked>
        ${contact1[field] || '-'}
      </div>
      <div class="merge-field-option" onclick="selectMergeField('${field}', 'secondary', this)">
        <input type="radio" name="merge_${field}" value="secondary">
        ${contact2[field] || '-'}
      </div>
    `;
  }

  comparison.innerHTML = html;
}

function selectMergeField(field, source, element) {
  // Deselect siblings
  const siblings = element.parentElement.querySelectorAll('.merge-field-option');
  siblings.forEach(s => s.classList.remove('selected'));

  // Select clicked
  element.classList.add('selected');
  element.querySelector('input').checked = true;
}

async function executeMerge() {
  if (!mergeContactsData) return;

  // Collect field selections
  const fieldSelections = {};
  const radios = document.querySelectorAll('.merge-comparison input[type="radio"]:checked');
  radios.forEach(radio => {
    const field = radio.name.replace('merge_', '');
    fieldSelections[field] = radio.value;
  });

  try {
    const sessionToken = localStorage.getItem('isrs_session');
    const response = await fetch(`${API_BASE_URL}/api/admin/contacts/merge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`
      },
      body: JSON.stringify({
        primaryId: mergeContactsData.primaryId,
        secondaryId: mergeContactsData.secondaryId,
        fieldSelections
      })
    });

    const result = await response.json();

    if (result.success) {
      showToast('Contacts merged successfully', 'success');
      closeMergeModal();
      closeDuplicatesModal();
      loadContacts();
    } else {
      showToast(result.error || 'Merge failed', 'error');
    }
  } catch (err) {
    showToast('Error merging contacts: ' + err.message, 'error');
  }
}

// ========== BULK OPERATIONS ==========

function showBulkEditModal() {
  if (selectedContacts.size === 0) {
    showToast('Please select contacts first', 'error');
    return;
  }

  document.getElementById('bulkEditModal').classList.add('show');
  document.getElementById('bulkEditCount').textContent = selectedContacts.size;

  // Reset form
  document.getElementById('bulkCountry').value = '';
  document.getElementById('bulkMemberType').value = '';
  document.getElementById('bulkOrganization').value = '';
}

function closeBulkEditModal() {
  document.getElementById('bulkEditModal').classList.remove('show');
}

async function executeBulkEdit(event) {
  event.preventDefault();

  const updates = {};
  const country = document.getElementById('bulkCountry').value.trim();
  const memberType = document.getElementById('bulkMemberType').value;
  const organizationId = document.getElementById('bulkOrganization').value;

  if (country) updates.country = country;
  if (memberType) updates.member_type = memberType;
  if (organizationId) updates.organization_id = organizationId;

  if (Object.keys(updates).length === 0) {
    showToast('Please select at least one field to update', 'error');
    return;
  }

  try {
    const sessionToken = localStorage.getItem('isrs_session');
    const response = await fetch(`${API_BASE_URL}/api/admin/contacts/bulk-update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`
      },
      body: JSON.stringify({
        contactIds: Array.from(selectedContacts),
        updates
      })
    });

    const result = await response.json();

    if (result.success) {
      showToast(result.message, 'success');
      closeBulkEditModal();
      clearSelection();
      loadContacts();
    } else {
      showToast(result.error || 'Bulk update failed', 'error');
    }
  } catch (err) {
    showToast('Error updating contacts: ' + err.message, 'error');
  }
}

async function bulkDeleteSelected() {
  if (selectedContacts.size === 0) {
    showToast('Please select contacts first', 'error');
    return;
  }

  if (!confirm(`Are you sure you want to delete ${selectedContacts.size} selected contact(s)? This action cannot be undone.`)) {
    return;
  }

  try {
    const sessionToken = localStorage.getItem('isrs_session');
    const response = await fetch(`${API_BASE_URL}/api/admin/contacts/bulk-delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`
      },
      body: JSON.stringify({
        contactIds: Array.from(selectedContacts),
        confirmed: true
      })
    });

    const result = await response.json();

    if (result.success) {
      showToast(result.message, 'success');
      clearSelection();
      loadContacts();
    } else {
      showToast(result.error || 'Bulk delete failed', 'error');
    }
  } catch (err) {
    showToast('Error deleting contacts: ' + err.message, 'error');
  }
}

// ========== UTILITY FUNCTIONS ==========

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `message-toast ${type}`;
  toast.style.background = type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#fff3cd';
  toast.style.color = type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#856404';
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}
