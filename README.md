# Welcome to nf-core/schema

This repository should extend [nf-core/tools](github.com/nf-core/tools) to create
a `nextflow-schema.json` file and use such a file to launch a pipeline.


## Project Structure

The page is built using [Astro](https://astro.build) and 
[Svelte](https://svelte.dev/) and follows the common Astro project structure:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── *.{astro,svelte}
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                             |
| :--------------------- | :------------------------------------------------- |
| `npm install`          | Installs dependencies                              |
| `npm run dev`          | Starts local dev server at `localhost:3000`        |
| `npm run build`        | Build your production site to `./dist/`            |
| `npm run preview`      | Preview your build locally, before deploying       |
