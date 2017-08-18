#!/bin/bash

ps aux | grep "node server.js" | tr -s " " | cut -d" " -f2 | xargs kill
rm -rf public/out
git pull
npm install || true
npm run deploy
NODE_ENV=production nohup node server.js 2>&1 &