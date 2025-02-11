# RFID Spotify Player Server

This is a server that allows you to play music on your Spotify account by placing a card near a RFID reader.

This project does not rewrite card data - it just uses the card id. In theory it can be used with any kind of RFID/NFC card.
## Using the server

You need to hook the APIs up to a script that will handle the RFID reader.

### Setting up the server

1. Clone the repository
2. Change astro.config.mjs to set your desired port. Default is 80 (http). When using 80, you will need sudo permissions
   to run the server.
3. Create a `.env` file in the root of the project with the following content:

```env
CLIENT_ID="YOUR_SPOTIFY_CLIENT_ID"
CLIENT_SECRET="YOUR_SPOTIFY_CLIENT_SECRET"
REDIRECT_URI="http://server-ip:port/callback"
```

The `REDIRECT_URI` must be the same as the one you set up in the Spotify Developer Dashboard. `/callback` is the route
for the callback.

4. Use correct node version. For Raspberry Pi Zero install nvm and use Node v20.3.0 - it is the latest (unofficial)
   build for armv6l.

```bash
nvm install 20.3.0
nvm use 20.3.0
```

5. Run ./build.sh to install node modules and build the server on *amrv6l*. If you are not using a Raspberry Pi Zero W,
   change the architecture to your corresponding one.
6. Copy the whole project to your desired location. Skip this step if you want to run the server on the current machine.
7. Run the server with `node dist/server/entry.mjs`. Or modify the `start.sh` script to use the correct path to the node
   executable and to the entry file.

> [!WARNING]
> Newer Node versions are not supported on Raspberry Pi Zero W. Use Node v20.3.0. Download it
> from https://unofficial-builds.nodejs.org/download/release/v20.3.0/ and then change the start.sh script to use the
> position of the executable.

> [!NOTE]
> Remove the MFRC522 folder if you do not need it.

### Connecting to spotify
You will need to have Spotify playing on other device, than open the server in your browser. This will prompt in to login and after logging in you can configure cards to play music.

This will need to be done after every reboot or once in a while if the servers stops working.

### Registering cards
If you have your reader set up and connected with the API, place a card for the first time to register it. Then you can use the online dashboard to search songs or write the current song/playlist/album to the database matching the id.

### Using the server
The server is exposed on the configured ip and port. It is really straight forward.

> [!NOTE]
> Do you want to contribute, do anything? Just fork the project and create a pull request. I will be happy to review it. You can also contact me and I will be really happy to do anything cool with this side project.
> My website: https://panjohnny.me

## Setting up the RFID reader

This may differ depending on the RFID reader you are using. The server provides HTTP API with the following endpoints
and flow. If you are interested in MIFARE RF10-RC522, jump [here](#mifare-rf10-rc522).

### GET /api/v1/cards/session

This endpoint starts a new session. This is necessary to clear the active state of any card.

Expected response:

```json
HTTP 200
{
  "success": true,
  "message": "Session started"
}
```

In case of an error:

```json
HTTP 500
{
  "error": "[error message]"
}
```

### POST /api/v1/cards/use

This endpoint is used to check if a card is valid and to play the music associated with it. The body of the request
should be a JSON object with the following structure:

```json
{
  "id": "[card id]"
}
```

This endpoint will change the state of the card.

Expected response:

```json
HTTP 201
{
  "message": "Card created and activated",
  "id": "[card id]"
}
```

If the card is already registered:

```json
HTTP 200
{
  "message": "Card activated",
  "id": "[card id]",
  "action": "<play|queue|state>"
}
```

If an error occurs:

```json
HTTP 500
{
  "error": "[error message]"
}
```

### Calling endpoints

These are the endpoints that you need to use to interact with the server. You can use any language or library to
interact with the server.

1. First you need to start a session by calling the `/api/v1/cards/session` endpoint.
2. Then you can call the `/api/v1/cards/use` endpoint with the card id to play the music associated with it. Or to bind
   a new card to a song.

## MIFARE RF10-RC522

This is a simple RFID reader that can be used with the server. The reader uses SPI to communicate with the Raspberry Pi.
The following steps will guide you through the setup.

This guide and library is based on the [MFRC522-python](https://github.com/mxgxw/MFRC522-python) library, with updates
for python3 and spidev.

1. Connect pins according to the following table:

| Name | Pin # |  Pin name  |
|:----:|:-----:|:----------:|
| SDA  |  24   |   GPIO8    |
| SCK  |  23   |   GPIO11   |
| MOSI |  19   |   GPIO10   |
| MISO |  21   |   GPIO9    |
| IRQ  | None  |    None    |
| GND  |  Any  | Any Ground |
| RST  |  22   |   GPIO25   |
| 3.3V |   1   |    3V3     |

Or use the following image as a reference:
![RFID Reader Pinout](http://i.imgur.com/y7Fnvhq.png)

2. Install required packages from requirements.txt:

```bash
pip3 install -r requirements.txt
```

3. Run the script with the following command:

```bash
python3 handle.py
```

> [!NOTE]
> The script counts on the server running on localhost:80. Modify the script to use other address by changing `API_BASE = "http://server-ip:port/api/v1/cards"`


I recommend using the start.sh scripts and modify them correspondingly. Building on Raspberry Pi Zero W is slow, so do it on your own machine.