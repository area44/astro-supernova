import { defineHastPlugin } from "satteri";

export const satteriMath = defineHastPlugin({
  name: "math-hast",
  element: {
    filter: ["code", "pre"],
    visit(node, ctx) {
      if (node.tagName === "code") {
        const classes = (node.properties?.className as string[]) || [];
        if (classes.includes("math-inline")) {
          const text = ctx.textContent(node);
          ctx.replaceNode(node, {
            type: "element",
            tagName: "span",
            properties: { className: ["tex2jax_process"] },
            children: [{ type: "text", value: `$${text}$` }],
          } as any);
        }
      } else if (node.tagName === "pre") {
        const codeChild = node.children?.find(
          (c) =>
            c.type === "element" &&
            (c as any).tagName === "code" &&
            ((c as any).properties?.className as string[])?.includes("math-display"),
        );
        if (codeChild) {
          const text = ctx.textContent(codeChild);
          ctx.replaceNode(node, {
            type: "element",
            tagName: "div",
            properties: { className: ["tex2jax_process"] },
            children: [{ type: "text", value: `$$\n${text}\n$$` }],
          } as any);
        }
      }
    },
  },
});
