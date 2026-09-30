import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { sanityEnv } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

const projectId = sanityEnv.projectId || "unconfigured";

export default defineConfig({
  name: "elvas-cultura",
  title: "Elvas Cultura",
  projectId,
  dataset: sanityEnv.dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Conteúdo")
          .items([
            S.documentTypeListItem("evento").title("Eventos"),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
