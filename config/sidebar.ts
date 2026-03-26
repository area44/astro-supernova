import type { StarlightUserConfig } from "@astrojs/starlight/types";

import enLabels from "../src/content/nav/en";

type NavKey = keyof typeof enLabels;

/**
 * Create a Starlight sidebar group config entry that uses labels from
 * `src/content/nav/*` files.
 */
export function group(key: NavKey, group: any): any {
  return {
    label: enLabels[key],
    ...group,
  };
}

export const astroSidebar = [
  group("astro.recipes", {
    autogenerate: { directory: "astro" },
  }),
] satisfies StarlightUserConfig["sidebar"];

export const starlightSidebar = [
  group("starlight.recipes", {
    autogenerate: { directory: "starlight" },
  }),
] satisfies StarlightUserConfig["sidebar"];
