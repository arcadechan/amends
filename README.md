ENV Variables:

- TINA_CLIENT_ID: Get from Tina Cloud
- TINA_TOKEN: Get from Tina Cloud
- NEXT_PUBLIC_TINA_BRANCH: Usually set to `main` during local dev.
- NEXT_PUBLIC_USE_LOCAL_CLIENT: Set to 1 to have Tina fetch content locally rather than the Live Content API when developing locally
- NODE_ENV: Use `development` while doing local dev. Can set to `production` to locally test builds
- TINA_API_URL: Potentially not needed anymore. Workaround to call content directly rather than using Tina's built in client request feature.
- LOCAL_API_URL: Same as above. Would work in tandem with `TINA_API_URL` and toggle depending on whether it was a local environment, or a test/production build
- SPOTIFY_CLIENT_ID: Use pending. Fetch from Spotify developer dashboard
- SPOTIFY_CLIENT_SECRET: Use pending. Fetch from Spotify developer dashboard
