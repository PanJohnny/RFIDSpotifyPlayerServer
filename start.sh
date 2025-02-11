#!/bin/bash
mkdir -p logs
sudo /home/pi/node/bin/node /home/pi/spotify/server/dist/server/entry.mjs > logs/server.log 2>&1 &
