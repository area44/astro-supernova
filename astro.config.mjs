import { satteri } from "@astrojs/markdown-satteri";
// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

import { astroSidebar, starlightSidebar } from "./config/sidebar";
import { satteriExternalLinks } from "./src/plugins/satteri-external-links";
import { satteriKatex } from "./src/plugins/satteri-katex";
import { satteriMermaid } from "./src/plugins/satteri-mermaid";
import { satteriReadingTime } from "./src/plugins/satteri-reading-time";

// https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables
const site = process.env.NETLIFY
  ? process.env.CONTEXT === "production"
    ? "https://astro-supernova.netlify.app"
    : process.env.DEPLOY_PRIME_URL || process.env.URL
  : (process.env.SITE ?? "http://localhost:4321");

const base = process.env.BASE || "/";

// https://astro.build/config
export default defineConfig({
  site,
  base,
  markdown: {
    syntaxHighlight: {
      type: "shiki",
      excludeLangs: ["mermaid", "math"],
    },
    processor: satteri({
      mdastPlugins: [satteriKatex, satteriReadingTime],
      hastPlugins: [satteriMermaid, satteriExternalLinks],
      features: {
        math: true,
      },
    }),
  },
  integrations: [
    starlight({
      routeMiddleware: "./src/routeData.ts",
      title: "Supernova",
      description: "Play with Astro",
      customCss: ["./src/styles/global.css", "katex/dist/katex.min.css"],
      components: {
        Header: "./src/components/Header.astro",
        PageTitle: "./src/components/PageTitle.astro",
        Sidebar: "./src/components/Sidebar.astro",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/AREA44/astro-supernova",
        },
      ],
      editLink: {
        baseUrl: "https://github.com/AREA44/astro-supernova/blob/main/",
      },
      sidebar: [...astroSidebar, ...starlightSidebar],
      lastUpdated: true,
      credits: true,
    }),
  ],
});
