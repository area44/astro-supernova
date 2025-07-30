// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import mermaid from "astro-mermaid";
import rehypeExternalLinks from "rehype-external-links";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import starlightLinksValidator from "starlight-links-validator";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";

// https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables
const site =
  process.env.SITE ||
  (process.env.NETLIFY
    ? process.env.CONTEXT === "production"
      ? "https://astro-supernova.netlify.app"
      : process.env.DEPLOY_PRIME_URL || process.env.URL
    : "http://localhost:4321");

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
    remarkPlugins: [remarkMath, remarkReadingTime],
    rehypePlugins: [
      rehypeKatex,
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["nofollow", "noopener"],
          content: {
            type: "element",
            tagName: "svg",
            properties: {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 20 20",
              width: "0.75em",
              height: "0.75em",
              fill: "currentColor",
              "aria-hidden": "true",
              focusable: "false",
              className: ["external-link-icon"],
            },
            children: [
              {
                type: "element",
                tagName: "path",
                properties: {
                  d: "M1.5 3.5V14.5H12.5V10H14V15C14 15.5523 13.5523 16 13 16H1C0.447716 16 0 15.5523 0 15V3C0 2.44772 0.447715 2 1 2H6V3.5H1.5Z",
                },
              },
              {
                type: "element",
                tagName: "path",
                properties: {
                  d: "M15.9217 1.17828L7.01473 10.0853L5.95407 9.02462L14.8611 0.117624L15.9217 1.17828Z",
                },
              },
              {
                type: "element",
                tagName: "path",
                properties: {
                  d: "M7.5 0H16V1.5H7.5V0Z",
                },
              },
              {
                type: "element",
                tagName: "path",
                properties: {
                  d: "M16 0L16 8.5L14.5 8.5L14.5 -6.55671e-08L16 0Z",
                },
              },
            ],
          },
        },
      ],
    ],
  },
  integrations: [
    mermaid(),
    starlight({
      title: "Supernova",
      description: "Play with Astro",
      customCss: ["./src/styles/global.css", "katex/dist/katex.min.css"],
      components: {
        Head: "./src/components/Head.astro",
        PageTitle: "./src/components/PageTitle.astro",
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
      sidebar: [
        {
          label: "Home",
          link: "/",
        },
        {
          label: "Astro Recipes",
          autogenerate: { directory: "astro" },
        },
        {
          label: "Starlight Recipes",
          autogenerate: { directory: "starlight" },
        },
      ],
      lastUpdated: true,
      credits: true,
      plugins: [starlightLinksValidator()],
    }),
  ],
});
