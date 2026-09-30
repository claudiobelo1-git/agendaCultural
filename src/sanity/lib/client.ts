import { createClient } from "next-sanity";
import { sanityEnv } from "@/sanity/env";

export const sanityClient = sanityEnv.configured
  ? createClient({
      projectId: sanityEnv.projectId,
      dataset: sanityEnv.dataset,
      apiVersion: sanityEnv.apiVersion,
      useCdn: true,
      token: process.env.SANITY_API_READ_TOKEN || undefined,
    })
  : null;
