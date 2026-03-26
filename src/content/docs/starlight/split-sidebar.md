---
title: How to Split Your Starlight Sidebar into Tabs
description: A detailed step-by-step guide to implementing a tabbed sidebar switcher with official icons.
---

This guide provides a comprehensive walkthrough for implementing a tabbed sidebar switcher in Starlight, similar to the one used in the official Astro Documentation.

## Overview

By default, Starlight provides a vertical sidebar. For larger documentation sites, a tabbed interface can help organize content into top-level categories, making navigation more intuitive. This implementation allows users to switch between different "suites" of documentation (e.g., Astro vs. Starlight) while preserving the active state based on the current page.

## Prerequisites

Ensure you have a Starlight project set up. This guide assumes you are comfortable with Astro components and TypeScript.

## Step 1: Centralize Navigation Labels

Create a file to manage your navigation labels. This helps with localization and centralized management of tab titles.

**File:** `src/content/nav/en.ts`

```ts
export default {
  "astro.recipes": "Astro Recipes",
  "starlight.recipes": "Starlight Recipes",
} as const;
```

## Step 2: Modularize Sidebar Configuration

Create a dedicated configuration file for your sidebar. This file will export separate arrays for each tab, combined into a single configuration for Starlight.

**File:** `config/sidebar.ts`

```ts
import type { StarlightUserConfig } from "@astrojs/starlight/types";
import enLabels from "../src/content/nav/en";

type NavKey = keyof typeof enLabels;

/**
 * Helper to create a sidebar group with localized labels.
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
```

## Step 3: Implement Tab Components

Create the following components in `src/components/tabs/` to handle the UI and logic of the switcher.

### 1. TabbedContent.astro

This component manages the tab list and the panels, using a custom element for client-side switching.

```astro
---
export interface Props {
  class?: string;
}
---

<tabbed-content class={Astro.props.class}>
  <ul class="tab-list">
    <slot name="tab-list" />
  </ul>
  <div class="panels">
    <slot />
  </div>
</tabbed-content>

<style>
  .tab-list {
    list-style: none;
    padding: 0;
  }
</style>

<script>
  class Tabs extends HTMLElement {
    readonly id = Math.floor(Math.random() * 10e10).toString(32);
    count = 0;
    TabStore: Set<HTMLElement>[] = [];
    PanelStore: Set<HTMLElement>[] = [];

    constructor() {
      super();
      const panels = this.querySelectorAll<HTMLElement>(".panels > [id]");
      const tablist = this.querySelector(".tab-list")!;
      const tabs = tablist.querySelectorAll("a");

      tablist.setAttribute("role", "tablist");
      let initialTab = 0;

      Array.prototype.forEach.call(tabs, (tab: HTMLElement, i: number) => {
        tab.setAttribute("role", "tab");
        tab.setAttribute("id", this.id + "tab" + this.count++);
        tab.setAttribute("tabindex", "-1");
        tab.parentElement?.setAttribute("role", "presentation");
        if (!this.TabStore[i]) this.TabStore.push(new Set());
        this.TabStore[i].add(tab);
        if ("initial" in tab.dataset && tab.dataset.initial !== "false") initialTab = i;

        const onClick = (e: MouseEvent) => {
          e.preventDefault();
          this.switchTab(e.currentTarget as HTMLElement, i);
        };
        tab.addEventListener("click", onClick);
      });

      Array.prototype.forEach.call(panels, (panel: HTMLElement, i: number) => {
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("aria-labelledby", tabs[i].id);
        panel.hidden = true;
        if (!this.PanelStore[i]) this.PanelStore.push(new Set());
        this.PanelStore[i].add(panel);
      });

      tabs[initialTab].removeAttribute("tabindex");
      tabs[initialTab].setAttribute("aria-selected", "true");
      panels[initialTab].hidden = false;
    }

    switchTab(newTab: HTMLElement, index: number) {
      this.TabStore.forEach((s) => s.forEach((t) => {
        t.removeAttribute("aria-selected");
        t.setAttribute("tabindex", "-1");
      }));
      this.TabStore[index].forEach((t) => {
        t.removeAttribute("tabindex");
        t.setAttribute("aria-selected", "true");
      });
      this.PanelStore.forEach((s) => s.forEach((p) => p.hidden = true));
      this.PanelStore[index].forEach((p) => p.hidden = false);
    }
  }
  customElements.define("tabbed-content", Tabs);
</script>
```

### 2. TabListItem.astro

A simple wrapper for the tab links.

```astro
---
import type { HTMLAttributes } from 'astro/types';
export interface Props {
  id: string;
  initial?: boolean;
  class?: string;
}
const { id, initial } = Astro.props;
const linkAttributes: HTMLAttributes<'a'> = initial ? { 'data-initial': 'true' } : {};
---
<li class:list={Astro.props.class}>
  <a href={'#' + id} {...linkAttributes}><slot /></a>
</li>
```

### 3. TabPanel.astro

Wraps the sidebar content for each tab.

```astro
---
export interface Props {
  id: string;
  initial?: boolean;
}
const { id, initial } = Astro.props;
---
<div id={id} data-initial={initial ? "true" : undefined}>
  <slot />
</div>
```

## Step 4: Create the Custom Sidebar Component

This component overrides Starlight's default Sidebar. It uses the components from Step 3 and assigns icons like "astro" and "starlight".

**File:** `src/components/Sidebar.astro`

```astro
---
import { Icon } from "@astrojs/starlight/components";
import SidebarPersister from "@astrojs/starlight/components/SidebarPersister.astro";
import SidebarSublist from "@astrojs/starlight/components/SidebarSublist.astro";
import TabbedContent from "./tabs/TabbedContent.astro";
import TabListItem from "./tabs/TabListItem.astro";
import TabPanel from "./tabs/TabPanel.astro";

const { sidebar } = Astro.locals.starlightRoute;

const makeId = (label: string) => "__tab-" + label.toLowerCase().replace(/\s+/g, "-");

const getIcon = (label: string) => {
  if (label.toLowerCase().includes("astro")) return "astro";
  if (label.toLowerCase().includes("starlight")) return "starlight";
  return "open-book";
};

const isCurrent = (entries: any[]): boolean =>
  entries.some((e) => (e.type === "link" ? e.isCurrent : isCurrent(e.entries)));

const anyTabIsCurrent = sidebar.some((s: any) => isCurrent(s.entries));
---

<SidebarPersister>
  <TabbedContent class="tabbed-sidebar">
    <Fragment slot="tab-list">
      {sidebar.map((group: any, index: number) => (
        <TabListItem
          id={makeId(group.label)}
          initial={anyTabIsCurrent ? isCurrent(group.entries) : index === 0}
          class="tab-item"
        >
          <Icon name={getIcon(group.label)} /> {group.label}
        </TabListItem>
      ))}
    </Fragment>
    {sidebar.map((group: any, index: number) => (
      <TabPanel
        id={makeId(group.label)}
        initial={anyTabIsCurrent ? isCurrent(group.entries) : index === 0}
      >
        <SidebarSublist sublist={group.entries} />
      </TabPanel>
    ))}
  </TabbedContent>
</SidebarPersister>

<style>
  /* Add your custom styles here to match the Astro Docs look */
  .tabbed-sidebar {
     /* CSS as seen in Step 3/4 above */
  }
</style>
```

## Step 5: Configure Astro

Finally, register your custom component and import the modular sidebar configs.

**File:** `astro.config.mjs`

```js
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import { astroSidebar, starlightSidebar } from "./config/sidebar";

export default defineConfig({
  integrations: [
    starlight({
      components: {
        Sidebar: "./src/components/Sidebar.astro",
      },
      sidebar: [...astroSidebar, ...starlightSidebar],
    }),
  ],
});
```

## Conclusion

You now have a modern, tabbed sidebar for your Starlight documentation! This structure is highly scalable and allows for a clean separation of concerns in your configuration.
