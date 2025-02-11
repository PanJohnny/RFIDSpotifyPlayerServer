#!/bin/bash
# Switch to the correct node version
echo "Please use Node 20.3.0 - it is the latest supported version on raspi 0"
node --version

# Set env variables to build for the right environment
export npm_config_arch=armv6l
export npm_config_target_arch=armv6l

# Remove the old build and dependencies
echo "Removing old build and dependencies"
rm -rf node_modules package-lock.json dist

echo "Installing new dependencies"
npm install --arch=armv6l

echo "Building for armv6l"
npm run build -- --target_arch=armv6l

echo "Done building for armv6l"

exit 0