import type { CollectionEntry } from "astro:content";

export interface PlayerProps {
  trackId: string;
  trackName: string;
  trackArtist: string;
  trackAlbumArt: string;
  platformLinks?: {
    spotify?: string;
    youtube?: string;
    appleMusic?: string;
    deezer?: string;
    bandcamp?: string;
    soundcloud?: string;
  };
}

export interface PlayerPropsWithAlbumArt extends PlayerProps {
    albumArtData?: CollectionEntry<"media">["data"];
}