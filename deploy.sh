#!/usr/bin/env bash
# Rebuilds the app/ Vite project and copies the production output to the
# repo root, which is what GitHub Pages serves for this repo
# (https://ashitataneja.github.io/aangan/).
set -euo pipefail
cd "$(dirname "$0")"

(cd app && npm run build)

rm -rf assets index.html 404.html
cp -r app/dist/. .
cp index.html 404.html

echo "Root now holds the latest build. Review with 'git status', then commit and push."
