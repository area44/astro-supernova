import { readFileSync, writeFileSync } from "fs";

const configPath = "astro.config.mjs";
let config = readFileSync(configPath, "utf-8");

// Add import
if (!config.includes('import { unified } from "@astrojs/markdown-remark";')) {
  config = config.replace(
    'import { defineConfig } from "astro/config";',
    'import { defineConfig } from "astro/config";\nimport { unified } from "@astrojs/markdown-remark";',
  );
}

// Refactor markdown object
const markdownRegex = /markdown: \{([\s\S]*?)\},\n  integrations:/;
const match = config.match(markdownRegex);

if (match) {
  const content = match[1];
  const syntaxHighlightMatch = content.match(/syntaxHighlight: \{([\s\S]*?)\},/);
  const remarkPluginsMatch = content.match(/remarkPlugins: \[([\s\S]*?)\],/);
  const rehypePluginsMatch = content.match(/rehypePlugins: \[([\s\S]*?)\],/);

  let newMarkdown = "markdown: {\n";
  if (syntaxHighlightMatch) {
    newMarkdown += `    syntaxHighlight: {${syntaxHighlightMatch[1]}},\n`;
  }

  newMarkdown += "    processor: unified({\n";
  if (remarkPluginsMatch) {
    newMarkdown += `      remarkPlugins: [${remarkPluginsMatch[1]}],\n`;
  }
  if (rehypePluginsMatch) {
    newMarkdown += `      rehypePlugins: [${rehypePluginsMatch[1]}],\n`;
  }
  newMarkdown += "    }),\n  },";

  config = config.replace(match[0], `${newMarkdown}\n  integrations:`);
}

writeFileSync(configPath, config);
