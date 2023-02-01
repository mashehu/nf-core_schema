import { defineConfig } from "astro/config";

// https://astro.build/config
import svelte from "@astrojs/svelte";

// https://astro.build/config
import critters from "astro-critters";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), critters()]
});