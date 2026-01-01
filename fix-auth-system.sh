#!/bin/bash
# Fix authentication system across all portal pages
# Changes localStorage key from 'isrs_session' to 'isrs_session_token'

echo "🔧 Fixing authentication system across ISRS portal..."
echo ""

# Files to fix (found via grep)
FILES=(
  "public/admin/contacts.html"
  "public/admin/organizations.html"
  "public/admin/board-documents.html"
  "public/admin/funding.html"
  "public/admin/conferences.html"
  "public/admin/photos.html"
  "public/admin/press-kit.html"
  "public/admin/feedback.html"
  "public/admin/votes.html"
  "public/admin/funding-prospects.html"
  "public/admin/email-campaigns.html"
  "public/admin/workflows.html"
  "public/admin/import.html"
  "public/admin/settings.html"
  "public/abstracts/submit.html"
  "public/admin/contacts-old.html"
  "public/admin/conferences-old.html"
  "public/js/admin-layout.js"
  "public/js/photo-uploader.js"
  "public/js/ai-enhancement-preview.js"
  "public/admin/contact-management.js"
  "public/admin/claude-ai-dropdown.js"
)

COUNT=0

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "📝 Updating: $file"

    # Replace localStorage.getItem('isrs_session') with localStorage.getItem('isrs_session_token')
    sed -i '' "s/localStorage\.getItem('isrs_session')/localStorage.getItem('isrs_session_token')/g" "$file"
    sed -i '' 's/localStorage\.getItem("isrs_session")/localStorage.getItem("isrs_session_token")/g' "$file"

    # Replace localStorage.setItem('isrs_session'
    sed -i '' "s/localStorage\.setItem('isrs_session'/localStorage.setItem('isrs_session_token'/g" "$file"
    sed -i '' 's/localStorage\.setItem("isrs_session"/localStorage.setItem("isrs_session_token"/g' "$file"

    # Replace localStorage.removeItem('isrs_session')
    sed -i '' "s/localStorage\.removeItem('isrs_session')/localStorage.removeItem('isrs_session_token')/g" "$file"
    sed -i '' 's/localStorage\.removeItem("isrs_session")/localStorage.removeItem("isrs_session_token")/g' "$file"

    ((COUNT++))
  else
    echo "⚠️  File not found: $file"
  fi
done

echo ""
echo "✅ Updated $COUNT files"
echo ""
echo "Next steps:"
echo "  1. Review changes: git diff"
echo "  2. Test locally"
echo "  3. Commit: git add -A && git commit -m 'Fix auth system across all portal pages'"
echo "  4. Deploy: git push"
