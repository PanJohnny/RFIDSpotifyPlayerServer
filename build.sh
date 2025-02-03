#!/bin/bash
mkdir -p logs
npm run build > logs/build.log 2>&1 &