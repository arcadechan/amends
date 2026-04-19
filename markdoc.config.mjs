import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
  nodes: {
    image: {
      render: component('./src/components/MarkdocImage.astro'),
      attributes: {
        src: { type: String },
        alt: { type: String },
        title: { type: String }
      }
    },
  },
  tags: {
    Image: {
      render: component('./src/components/ImageIsland.astro'),
      attributes: {
        image: { type: String },
        alt: { type: String },
        caption: { type: String }
      }
    },
    Accordion: {
      render: component('./src/components/AccordionIsland.astro'),
      attributes: {
        items: { type: Array }
      }
    },
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