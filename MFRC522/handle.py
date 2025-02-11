#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import RPi.GPIO as GPIO
import MFRC522  # Ensure MFRC522 uses spidev and GPIO
import signal
import requests
import json
import time
import logging

# API base URL
API_BASE = "http://localhost/api/v1/cards"

# Flag to control the loop
continue_reading = True

# Setup logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

# Capture SIGINT for cleanup
def end_read(signal, frame):
    global continue_reading
    logging.info("\nCtrl+C captured, ending read.")
    continue_reading = False
    GPIO.cleanup()

# Hook SIGINT
signal.signal(signal.SIGINT, end_read)

# Create an object of the class MFRC522
MIFAREReader = MFRC522.MFRC522()

logging.info("Welcome to the MFRC522 RFID reader")
logging.info("Place your card near the scanner...")
logging.info("Press Ctrl-C to stop.")

while continue_reading:
    # Get the card ID using the specialized method
    uid = MIFAREReader.get_card_id()
    if uid:
        card_id = ''.join([f"{byte:02X}" for byte in uid])
        logging.info(f"Card detected with UID: {card_id}")

        try:
            # Reset session
            logging.info("Resetting session...")
            session_response = requests.get(API_BASE + "/session")
            logging.info(f"Session response: {session_response.status_code} - {session_response.text}")

            # Send card ID to the server
            logging.info(f"Using card ID {card_id}...")
            use_response = requests.post(
                API_BASE + "/use",
                data=json.dumps({"id": card_id}),
                headers={"Content-Type": "application/json"}
            )
            logging.info(f"Use response: {use_response.status_code} - {use_response.text}")

        except requests.RequestException as e:
            logging.error(f"Error communicating with API: {e}")

    else:
        logging.error("Error reading card UID")

    time.sleep(2)  # Add a small delay between reads for better stability
