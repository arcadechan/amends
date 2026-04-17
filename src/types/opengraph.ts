import type { AstroImage } from "./astro";

export type OpenGraphWebsite = {
  type?: "website";
  image?: AstroImage;
};

export type OpenGraphArticle = {
  type?: "article";
  image?: AstroImage;
  publishedTime?: Date;
  article?: string;
  tags?: string[];
};
