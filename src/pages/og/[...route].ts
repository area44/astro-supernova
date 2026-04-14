import type { APIRoute } from "astro";

import { getCollection } from "astro:content";
import { ImageResponse } from "takumi-js/response";

export async function getStaticPaths() {
  const entries = await getCollection("docs");
  return entries.map((entry) => {
    // Strip file extension from entry.id to match Starlight's route ID
    const id = entry.id.replace(/\.[^/.]+$/, "");
    return {
      params: { route: `${id || "index"}.png` },
      props: { title: entry.data.title, description: entry.data.description },
    };
  });
}

export const GET: APIRoute = async ({ props }) => {
  const { title, description } = props;

  const template = `
    <div
      style="
        display: flex;
        flex-direction: column;
        width: 1200px;
        height: 630px;
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        padding: 80px;
        position: relative;
        overflow: hidden;
        font-family: sans-serif;
      "
    >
      <!-- Decorative background elements -->
      <div style="position: absolute; top: -100px; right: -100px; width: 400px; height: 400px; background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%); border-radius: 50%;"></div>
      <div style="position: absolute; bottom: -50px; left: -50px; width: 300px; height: 300px; background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%); border-radius: 50%;"></div>

      <!-- Accent line -->
      <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 12px; background: linear-gradient(to bottom, #6366f1, #a855f7);"></div>

      <div
        style="
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: center;
          position: relative;
          z-index: 10;
        "
      >
        <div style="display: flex; align-items: center; margin-bottom: 32px;">
          <span style="color: #94a3b8; font-size: 24px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;">
            Supernova Docs
          </span>
        </div>

        <h1
          style="
            font-size: 88px;
            font-weight: 900;
            color: white;
            margin: 0 0 24px 0;
            line-height: 1.1;
            letter-spacing: -0.02em;
            display: flex;
          "
        >
          ${title}
        </h1>

        ${
          description
            ? `
          <p
            style="
              font-size: 42px;
              color: #94a3b8;
              line-height: 1.5;
              margin: 0;
              max-width: 900px;
              display: flex;
            "
          >
            ${description}
          </p>
        `
            : ""
        }
      </div>
    </div>
  `;

  return new ImageResponse(template, {
    width: 1200,
    height: 630,
    format: "png",
  });
};
