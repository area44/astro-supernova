import type { StarlightUserConfig } from "@astrojs/starlight/types";

export const astroSidebar = [
  {
    label: "Astro Recipes",
    autogenerate: { directory: "astro" },
  },
] satisfies StarlightUserConfig["sidebar"];
