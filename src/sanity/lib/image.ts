import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { sanityEnv } from "@/sanity/env";
import { sanityClient } from "@/sanity/lib/client";

const builder =
  sanityEnv.configured && sanityClient
    ? createImageUrlBuilder(sanityClient)
    : null;

export function urlForImage(source: SanityImageSource) {
  if (!builder) {
    return null;
  }

  return builder.image(source);
}
