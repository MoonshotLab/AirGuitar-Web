# Air Guitar Web

The companion web app for the [Air Guitar Rig](https://github.com/joelongstreet/AirGuitar-Rig).

Includes the following:
* A 3d image browser so users can navigate an *awesome* (the content type of the navigable image set).
* A POST webhook which can be called to update all connected sockets.
* Share stuff...


## Environment Variables
* `DB_CONNECT` - The Full mongo connection string: `mongodb://{mongo_username}:{mongo_password}@{mongo_url}`
* `POST_HOOK_SECRET` - The secret used to make POST request to the companion web app.
