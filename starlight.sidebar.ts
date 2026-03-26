import type { StarlightUserConfig } from "@astrojs/starlight/types";

import { group } from "./config/sidebar";

export const starlightSidebar = [
  group("starlight.recipes", {
    autogenerate: { directory: "starlight" },
  }),
] satisfies StarlightUserConfig["sidebar"];
