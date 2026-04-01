# Agent Guide

This guide provides instructions for AI agents working on the Supernova project.

## Project Overview

Supernova is a customized Astro/Starlight documentation site.

- **Key Technologies**: Astro, Starlight, TypeScript, MDX, pnpm.
- **Tooling**: `oxlint` for linting, `oxfmt` for formatting.

## Architecture & Conventions

### Custom Sidebar Tabs

The sidebar is customized to support multiple tabs (e.g., "Astro Recipes" and "Starlight Recipes").

- **Configuration**: Sidebar items are defined in `config/sidebar.ts`.
- **Labels**: All sidebar group labels MUST be defined in `config/sidebar.ts` and referenced via the `group()` helper.
- **Override**: The default Starlight Sidebar is overridden by `src/components/Sidebar.astro`.
- **Components**: The tabbed UI uses components in `src/components/tabs/`.
- **Top-level restriction**: All top-level items in the `sidebar` configuration array must be groups; standalone links are not allowed at the top level.

### Documentation Recipes

Recipes are the core content of this site.

- **Format**: Always use `.mdx`.
- **Directory**: `src/content/docs/astro/` or `src/content/docs/starlight/`.
- **Structure**:
  - Introduction.
  - "Step-by-Step Guide" section using the `<Steps>` component from Starlight.
  - "Resources" or "Next steps" section at the end.
- **Media**: Store images in `src/content/docs/starlight/_images/` (or equivalent for astro).

### Client-side Scripts

When adding client-side scripts to Astro components:

- Use the `astro:after-swap` event listener to re-initialize logic or reset DOM references. This ensures compatibility with Starlight's page transitions (View Transitions).
- For scroll-linked UI updates, use `requestAnimationFrame` and `{ passive: true }` event listeners for performance.

## Development Workflow

### Verification

Always run the following command before submitting changes to ensure code quality:

```sh
pnpm check
```

This runs both `oxlint` and `oxfmt`.

### Adding a Sidebar Entry

1. Add the label key and value to the `enLabels` constant in `config/sidebar.ts`.
2. Use the `group` function in `config/sidebar.ts` to add the new section.
3. If it's a new directory, ensure `autogenerate` is configured correctly.

## Common Components

- `<Steps>`: For ordered guides.
- `<Icon>`: For icons (Starlight built-in).
- `<YouTube id="..." />`: For video embeds (custom component).
- `<PackageManagerCommand ... />`: For showing install commands for different package managers.
