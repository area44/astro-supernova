import type { StarlightUserConfig } from "@astrojs/starlight/types";

import { group } from "./config/sidebar";

export const astroSidebar = [
  group("astro.recipes", {
    autogenerate: { directory: "astro" },
  }),
] satisfies StarlightUserConfig["sidebar"];
