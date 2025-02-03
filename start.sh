#!/bin/bash
mkdir -p logs
node dist/server/entry.mjs > logs/server.log 2>&1 &