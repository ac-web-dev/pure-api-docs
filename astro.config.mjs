// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
//import starlightUiTweaks from "starlight-ui-tweaks";
import starlightLinksValidator from "starlight-links-validator";
import { visit } from "unist-util-visit";
import starlightVersions from "starlight-versions";

const base = "/pure-api-docs";

/**
 * plugin to automatically prepend base path
 * to absolute internal links and images
 * @returns {(tree: any) => void}
 */
function remarkPrependBase() {
  return (tree) => {
    visit(tree, "link", (node) => {
      if (
        node.url.startsWith("/") &&
        !node.url.startsWith(base) &&
        !node.url.startsWith("//")
      ) {
        node.url = `${base}${node.url}`;
      }
    });
    visit(tree, "image", (node) => {
      if (
        node.url.startsWith("/") &&
        !node.url.startsWith(base) &&
        !node.url.startsWith("//")
      ) {
        node.url = `${base}${node.url}`;
      }
    });
  };
}

// https://astro.build/config
export default defineConfig({
  site: "https://ac-web-dev.github.io",
  base: base,
  markdown: {
    remarkPlugins: [remarkPrependBase],
  },
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
      plugins: [
        //starlightUiTweaks({}),
        starlightLinksValidator({
          errorOnRelativeLinks: true,
        }),
        starlightVersions({
          versions: [{ slug: "0.180a" }],
        }),
      ],
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
