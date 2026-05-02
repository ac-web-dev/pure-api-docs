// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLinksValidator from "starlight-links-validator";
import starlightVersions from "starlight-versions";
import starlightScrollToTop from "starlight-scroll-to-top";
import starlightUiTweaks from "starlight-ui-tweaks";
import { starlightBasePath } from "starlight-base-path";

const base = "/pure-api-docs";

// https://astro.build/config
export default defineConfig({
  site: "https://ac-web-dev.github.io",
  base: base,
  integrations: [
    starlight({
      title: "Pure",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/ac-web-dev/pure-api-docs",
        },
        {
          icon: "patreon",
          label: "Patreon",
          href: "https://patreon.com/peterboese",
        },
      ],
      expressiveCode: {
        themes: ["github-dark", "github-light"],
      },
      customCss: ["./src/styles/custom.css"],
      components: {
        ThemeSelect: "./src/components/CustomThemeSelect.astro",
      },
      plugins: [
        starlightBasePath(),
        starlightUiTweaks({
          navbarLinks: [
            { label: "Docs", href: "/pure-api-docs/get-started/intro" },
          ],
        }),
        starlightLinksValidator({
          errorOnRelativeLinks: true,
        }),
        starlightVersions({
          versions: [{ slug: "0.180a" }],
        }),
        starlightScrollToTop({
          smoothScroll: true,
          showOnHomepage: false,
        }),
      ],
      editLink: {
        baseUrl: "https://github.com/ac-web-dev/pure-api-docs/edit/main/",
      },
      lastUpdated: true,
      sidebar: [
        {
          label: "Getting Started",
          collapsed: true,
          items: [{ label: "Introduction", link: "get-started/intro" }],
        },
        {
          label: "Guides",
          collapsed: true,
          items: [
            {
              label: "Working with Camera Heading Vectors",
              link: "guides/working-with-camera-heading-vectors",
            },
          ],
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
