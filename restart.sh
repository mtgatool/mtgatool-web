#!/bin/bash
git fetch
if [[ $(git rev-parse HEAD) != $(git rev-parse @{u}) ]]; then
  git pull
  npm install
  npm run build
  pm2 restart next-js
fi
