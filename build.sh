#!/bin/sh
set -eu
rm -rf dist
mkdir -p dist
cp index.html style.css app-core.js app-locales.js app.js i18n.js ui-locales.js training-catalog-data.js training-catalog.js privacy.html privacy.js auto-language.js favicon.svg social-card.png robots.txt sitemap.xml dist/
git rev-parse HEAD > dist/version.txt
