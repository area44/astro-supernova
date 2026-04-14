import type { APIRoute } from "astro";

import { getCollection } from "astro:content";
import { ImageResponse } from "takumi-js/response";

export async function getStaticPaths() {
  const entries = await getCollection("docs");
  return entries.map((entry) => ({
    params: { route: `${entry.id || "index"}.png` },
    props: { title: entry.data.title, description: entry.data.description },
  }));
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
