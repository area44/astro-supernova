import type starlight from "@astrojs/starlight";

import enLabels from "../src/content/nav/en";

type StarlightSidebarConfig = NonNullable<Parameters<typeof starlight>[0]["sidebar"]>;
type StarlightSidebarEntry = StarlightSidebarConfig[number];
type StarlightManualSidebarGroup = Extract<StarlightSidebarEntry, { items: any[] }>;
type StarlightAutoSidebarGroup = Extract<StarlightSidebarEntry, { autogenerate: any }>;

type NavKey = keyof typeof enLabels;

/**
 * Create a Starlight sidebar group config entry that uses labels from
 * `src/content/nav/*` files.
 */
export function group(
  key: NavKey,
  group: Omit<StarlightManualSidebarGroup, "label"> | Omit<StarlightAutoSidebarGroup, "label">,
): StarlightManualSidebarGroup | StarlightAutoSidebarGroup {
  return {
    label: enLabels[key],
    ...group,
  } as any;
}
