import type { StarlightUserConfig } from "@astrojs/starlight/types";

export const starlightSidebar = [
  {
    label: "Starlight Recipes",
    autogenerate: { directory: "starlight" },
  },
] satisfies StarlightUserConfig["sidebar"];
