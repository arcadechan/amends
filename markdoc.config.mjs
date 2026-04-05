import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
  tags: {
    Player: {
        render: component('./src/components/player/PlayerIsland.astro'),
        attributes: {
            trackId: { type: String },
            trackArtist: { type: String },
            trackName: { type: String },
            trackAlbumArt: { type: String },
            platformLinks: { type: Object }
        }
    },
    Iframe: {
      render: component('./src/components/Iframe.astro'),
      attributes: {
        code: { type: String }
      }
    }
  },
});