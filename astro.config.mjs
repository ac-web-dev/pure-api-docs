// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://ac-web-dev.github.io",
  base: "/pure-api-docs/",
  integrations: [
    starlight({
      title: "Pure",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/ac-web-dev/pure-api-docs",
        },
      ],
      customCss: ["./src/styles/custom.css"],
      sidebar: [
        {
          label: "Getting Started",
          collapsed: true,
          items: [{ label: "Introduction", link: "get-started/intro" }],
        },
        {
          label: "Reference",
          collapsed: true,
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],
});
