#!/bin/bash
mkdir -p logs
python3 /home/pi/spotify/lib/handle.py > logs/handle.log 2>&1 &
