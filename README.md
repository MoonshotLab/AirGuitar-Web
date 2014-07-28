# Air Guitar Web
The companion web app for the [Air Guitar Rig](https://github.com/joelongstreet/AirGuitar-Rig). Contains two primary points of functionality:
1. A projection mapped interface which acts as the "wall of rock". Accepts new videos from the rig and will trigger animations and mode transitions.
1. Shareable takeaway content for the performer. Comes in the form of a "browseable" video.

To run the app, you'll need a full mongo connection string and a post hook secret which matches the Air Guitar Rig app.


## Triggering Updates
To trigger a new update to the app interface, just post to `/slowmo` with the following body params:
* `secret` - The matching rig short secret
* `shortCode` - The shortCode of the new slowmo video


## Environment Variables
* `DB_CONNECT` - The Full mongo connection string: `mongodb://{mongo_username}:{mongo_password}@{mongo_url}`
* `POST_HOOK_SECRET` - The secret used to make POST request to the companion web app.
