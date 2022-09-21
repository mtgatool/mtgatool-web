#!/bin/bash
git pull
npm install
npm run build
pm2 restart next-js
