#!/bin/bash

# ISRS Deployment Health Check Script
# Monitors when Render deployment completes

URL="https://www.shellfish-society.org/"
MAX_CHECKS=30
CHECK_INTERVAL=10

echo "🔍 Monitoring deployment status for: $URL"
echo "Will check every ${CHECK_INTERVAL}s for up to $((MAX_CHECKS * CHECK_INTERVAL / 60)) minutes"
echo ""

for i in $(seq 1 $MAX_CHECKS); do
    echo "Check #$i at $(date +%H:%M:%S)..."

    # Try to fetch the site and check HTTP status
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL" --max-time 15)

    if [ "$HTTP_CODE" = "200" ]; then
        echo ""
        echo "✅ SUCCESS! Site is live and responding with HTTP 200"
        echo "🌐 URL: $URL"
        echo "⏱️  Deployment completed after $((i * CHECK_INTERVAL)) seconds"
        echo ""
        echo "📊 Checking for translation files..."

        # Check if components.js is accessible
        COMPONENTS_URL="https://www.shellfish-society.org/js/components.js"
        COMPONENTS_SIZE=$(curl -sI "$COMPONENTS_URL" | grep -i content-length | awk '{print $2}' | tr -d '\r')

        if [ ! -z "$COMPONENTS_SIZE" ]; then
            COMPONENTS_KB=$((COMPONENTS_SIZE / 1024))
            echo "   ✓ components.js: ${COMPONENTS_KB}KB (should be ~50-60KB with translations)"
        fi

        echo ""
        echo "🎉 Deployment verification complete!"
        echo "   Next steps:"
        echo "   1. Visit: $URL"
        echo "   2. Test language switcher (EN/ES/FR buttons)"
        echo "   3. Check member portal pages"

        exit 0
    elif [ "$HTTP_CODE" = "503" ] || [ "$HTTP_CODE" = "000" ]; then
        echo "   ⏳ Still deploying (HTTP $HTTP_CODE)..."
    else
        echo "   ⚠️  Unexpected status: HTTP $HTTP_CODE"
    fi

    if [ $i -lt $MAX_CHECKS ]; then
        sleep $CHECK_INTERVAL
    fi
done

echo ""
echo "❌ Deployment check timed out after $((MAX_CHECKS * CHECK_INTERVAL / 60)) minutes"
echo "   Please check Render dashboard manually:"
echo "   https://dashboard.render.com"
echo ""
exit 1
