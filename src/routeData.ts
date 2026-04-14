import { defineRouteMiddleware } from "@astrojs/starlight/route-data";

export const onRequest = defineRouteMiddleware((context) => {
  const { id } = context.locals.starlightRoute;

  // Ensure the URL is correctly constructed using the site's base URL
  const ogImageUrl = new URL(
    `${import.meta.env.BASE_URL.replace(/\/$/, "")}/og/${id || "index"}.png`,
    context.site ?? context.url.origin,
  );

  const { head } = context.locals.starlightRoute;

  head.push({
    tag: "meta",
    attrs: { property: "og:image", content: ogImageUrl.href },
  });
  head.push({
    tag: "meta",
    attrs: { name: "twitter:image", content: ogImageUrl.href },
  });
});
