#!/bin/bash

ps aux | grep "node server.js" | tr -s " " | cut -d" " -f2 | xargs kill
git pull
npm install || true
npm run build:content
nohup NODE_ENV=production node server.js 2>&1 &
