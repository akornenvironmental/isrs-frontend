#!/bin/bash

# Set terminal title
echo -ne "\033]0;ISRS\007"
echo -ne "\033]1;ISRS\007"

# Navigate to project directory
cd "$(dirname "$0")"

# Run the init script
if [ -f .isrs_init.sh ]; then
    source .isrs_init.sh
else
    echo "⚠️  .isrs_init.sh not found"
    exec $SHELL
fi
