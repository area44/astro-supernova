# Supernova

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

Supernova is a highly customized [Starlight](https://starlight.astro.build/) documentation site designed to showcase and provide recipes for advanced [Astro](https://astro.build/) features. It features a unique tabbed sidebar system to separate Astro and Starlight specific content, along with various pre-configured integrations.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/)

### Installation

```sh
git clone https://github.com/AREA44/astro-supernova
cd astro-supernova
pnpm install
```

### Commands

| Command        | Action                                                  |
| :------------- | :------------------------------------------------------ |
| `pnpm dev`     | Starts the development server at `localhost:4321`       |
| `pnpm build`   | Builds the production site to `dist/`                   |
| `pnpm preview` | Previews the production build locally                   |
| `pnpm check`   | Runs linting (`oxlint`) and formatting (`oxfmt`) checks |
| `pnpm fmt`     | Formats the codebase using `oxfmt`                      |

## Adding New Recipes

Supernova follows a specific structure for adding new documentation "recipes":

1.  **Location**: Choose either `src/content/docs/astro/` or `src/content/docs/starlight/` based on the topic.
2.  **File Format**: All recipes must use the `.mdx` extension.
3.  **Recipe Structure**:
    - **Introduction**: Briefly explain what the recipe achieves.
    - **Step-by-Step Guide**: Use the Starlight `<Steps>` component.
    - **Resources**: Include a "Next steps" or "Resources" section at the end.
4.  **Navigation**: If you add a new directory or want to change labels, update `src/content/nav/en.ts` and `config/sidebar.ts`.

## Want to learn more?

To learn more about the underlying technologies, visit:

- [Starlight Documentation](https://starlight.astro.build/)
- [Astro Documentation](https://docs.astro.build)
- [Astro Discord](https://astro.build/chat)
