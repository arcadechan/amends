import type { ImageInputFormat } from "astro";

export type AstroImage = {
  src: string;
  width: number;
  height: number;
  format: ImageInputFormat;
};