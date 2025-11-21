#!/bin/bash
echo "🔍 Monitoring DNS propagation for shellfish-society.org..."
echo ""
for i in {1..10}; do
    echo "Check #$i at $(date +%H:%M:%S)..."
    ROOT=$(dig @8.8.8.8 shellfish-society.org +short | head -1)
    WWW=$(dig @8.8.8.8 www.shellfish-society.org +short | head -1)
    
    echo "  Root: $ROOT"
    echo "  WWW:  $WWW"
    
    if [[ "$ROOT" != "192.168.4.1" ]] && [[ "$WWW" != "192.168.4.1" ]]; then
        echo ""
        echo "✅ DNS Updated! New values detected."
        echo "🌐 Try accessing: https://www.shellfish-society.org"
        exit 0
    fi
    
    if [ $i -lt 10 ]; then
        sleep 30
    fi
done

echo ""
echo "⏰ DNS still propagating. Check again in a few minutes."
