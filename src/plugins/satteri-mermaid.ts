import { defineHastPlugin } from "satteri";

export const satteriMermaid = defineHastPlugin({
  name: "mermaid",
  element: {
    filter: ["pre"],
    visit(node, ctx) {
      const codeChild = node.children?.find(
        (c) => c.type === "element" && (c as any).tagName === "code",
      );
      if (!codeChild || codeChild.type !== "element") return;

      const lang = (codeChild as any).data?.lang;

      if (lang === "mermaid") {
        ctx.setProperty(node, "tagName", "div");
        ctx.setProperty(node, "className", ["mermaid"]);

        const text = ctx.textContent(codeChild);
        ctx.setProperty(node, "children", [{ type: "text", value: text }]);
      }
    },
  },
});
