// import type { GatsbyConfig, NodeInput } from 'gatsby';
// import type { IPluginOptions } from 'gatsby-source-hubspot-node';
// import remarkGfm from 'remark-gfm';
import remarkExternalLinks from 'remark-external-links';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// eslint-disable-next-line @typescript-eslint/no-var-requires
import dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config = {
  siteMetadata: {
    title: `site`,
    siteUrl: `https://www.samsoniyanda.com`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        mdxOptions: {
          remarkPlugins: [[remarkExternalLinks, { target: false }]],
          rehypePlugins: [
            // Generate heading ids for rehype-autolink-headings
            rehypeSlug,
            // To pass options, use a 2-element array with the
            // configuration in an object in the second element
            [rehypeAutolinkHeadings, { behavior: `wrap` }],
          ],
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'mdx',
        path: './src/docs/',
      },
      __key: 'mdx',
    },
    {
      // using hubspot version 2. this is the default
      resolve: 'gatsby-source-hubspot-node',
      options: {
        endpoint: 'https://api.hubapi.com/content/api/v2/blog-posts',
        requestOptions: {
          headers: {
            Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
          },
        },
        searchParams: {
          state: 'PUBLISHED',
        },
      },
    },
    {
      // using hubspot version 3.
      resolve: 'gatsby-source-hubspot-node',
      options: {
        endpoint: 'https://api.hubapi.com/cms/v3/blogs/posts',
        requestOptions: {
          headers: {
            Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
          },
        },
        nodeTypeOptions: {
          nodeType: 'Blog',
          schemaCustomizationString: `
            type Blog implements Node {
              id: ID!
              state: String
              slug: String
            }
          `,
          apiResponseFormatter: (response) => response.results,
          nodeBuilderFormatter({ gatsbyApi, input, pluginOptions }) {
            const id = gatsbyApi.createNodeId(`${pluginOptions.nodeType}-${input.data.id}`);
            const node = {
              ...input.data,
              id,
              parent: null,
              children: [],
              internal: {
                type: input.type,
                contentDigest: gatsbyApi.createContentDigest(input.data),
              },
            };
            gatsbyApi.actions.createNode(node);
          },
        },
      },
    },
    {
      // contact api
      resolve: 'gatsby-source-hubspot-node',
      options: {
        endpoint: 'https://api.hubapi.com/crm/v3/objects/contacts',
        requestOptions: {
          headers: {
            Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
          },
        },
        nodeTypeOptions: {
          nodeType: 'Contact',
          schemaCustomizationString: `
            type Contact implements Node {
              id: ID!
            }
          `,
          apiResponseFormatter: (response) => response.results,
          nodeBuilderFormatter({ gatsbyApi, input, pluginOptions }) {
            const id = gatsbyApi.createNodeId(`${pluginOptions.nodeType}-${input.data.id}`);
            const node = {
              ...input.data,
              id,
              parent: null,
              children: [],
              internal: {
                type: input.type,
                contentDigest: gatsbyApi.createContentDigest(input.data),
              },
            };
            gatsbyApi.actions.createNode(node);
          },
        },
      },
    },
    {
      resolve: 'gatsby-source-hubspot-node',
      options: {
        endpoint: 'https://api.github.com/repos/samcyn/gatsby-source-hubspot-node',
        nodeTypeOptions: {
          nodeType: 'repository',
          schemaCustomizationString: `
            type Repository implements Node {
              id: ID!
              name: String
              description: String
            }
          `,
          apiResponseFormatter: (response) => [response],
          nodeBuilderFormatter({ gatsbyApi, input, pluginOptions }) {
            const id = gatsbyApi.createNodeId(`${pluginOptions.nodeType}-${input.data.id}`);
            const node = {
              ...input.data,
              id,
              parent: null,
              children: [],
              internal: {
                type: input.type,
                contentDigest: gatsbyApi.createContentDigest(input.data),
              },
            };
            gatsbyApi.actions.createNode(node);
          },
        },
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (e.g. <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (e.g. for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: 'language-',
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: null,
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {},
              // This toggles the display of line numbers globally alongside the code.
              // To use it, add the following line in gatsby-browser.js
              // right after importing the prism color scheme:
              //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
              // Defaults to false.
              // If you wish to only show line numbers on certain code blocks,
              // leave false and use the {numberLines: true} syntax below
              showLineNumbers: false,
              // If setting this to true, the parser won't handle and highlight inline
              // code used in markdown i.e. single backtick code like `this`.
              noInlineHighlight: false,
              // This adds a new language definition to Prism or extend an already
              // existing language definition. More details on this option can be
              // found under the header "Add new language definition or extend an
              // existing language" below.
              languageExtensions: [
                {
                  language: 'superscript',
                  extend: 'javascript',
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              // Customize the prompt used in shell output
              // Values below are default
              prompt: {
                user: 'root',
                host: 'localhost',
                global: false,
              },
              // By default the HTML entities <>&'" are escaped.
              // Add additional HTML escapes by providing a mapping
              // of HTML entities and their escape value IE: { '}': '&#123;' }
              escapeEntities: {},
            },
          },
        ],
      },
    },
  ],
};

export default config;
