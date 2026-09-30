export function assertSanityEnv() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

  return {
    projectId: projectId || "",
    dataset,
    apiVersion,
    configured: Boolean(projectId),
  };
}

export const sanityEnv = assertSanityEnv();
