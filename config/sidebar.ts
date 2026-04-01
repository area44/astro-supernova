import type { StarlightUserConfig } from "@astrojs/starlight/types";

const enLabels = {
  "astro.recipes": "Astro Recipes",
  "starlight.recipes": "Starlight Recipes",
} as const;

type NavKey = keyof typeof enLabels;

/**
 * Create a Starlight sidebar group config entry that uses the predefined labels.
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
