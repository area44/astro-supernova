import type { APIRoute } from "astro";

import { getCollection } from "astro:content";
import fs from "node:fs";
import path from "node:path";
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

  const bgImagePath = path.resolve("./src/pages/og/_background-image.png");
  const bgImageBuffer = fs.readFileSync(bgImagePath);
  const bgImageBase64 = `data:image/png;base64,${bgImageBuffer.toString("base64")}`;

  const template = `
    <div
      style="
        display: flex;
        flex-direction: column;
        width: 1200px;
        height: 630px;
        background-image: url('${bgImageBase64}');
        background-size: cover;
        padding: 80px;
        border-left: 32px solid #6366f1;
        justify-content: center;
        font-family: sans-serif;
      "
    >
      <div
        style="
          display: flex;
          flex-direction: column;
        "
      >
        <h1
          style="
            font-size: 84px;
            font-weight: 900;
            color: white;
            margin-bottom: 24px;
            line-height: 1.1;
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
              font-size: 48px;
              color: #d1d5db;
              line-height: 1.4;
              margin: 0;
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
