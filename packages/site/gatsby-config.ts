import type { GatsbyConfig, NodeInput } from 'gatsby';
import type { IPluginOptions } from 'gatsby-source-hubspot-node';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    title: `site`,
    siteUrl: `https://www.samsoniyanda.com`,
  },
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
            } as NodeInput;
            gatsbyApi.actions.createNode(node);
          },
        },
      } satisfies IPluginOptions,
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
            } as NodeInput;
            gatsbyApi.actions.createNode(node);
          },
        },
      } satisfies IPluginOptions,
    },
    {
      resolve: 'gatsby-source-hubspot-node',
      options: {
        endpoint: 'https://api.github.com/repos/samcyn/gatsby-source-hubspot-node',
        requestOptions: {
          // todo take off not need in next version
          headers: {},
        },
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
            } as NodeInput;
            gatsbyApi.actions.createNode(node);
          },
        },
      } satisfies IPluginOptions,
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        footnotes: true,
        gfm: true,
        jsFrontmatterEngine: false,
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 740,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
        ],
      },
    },
  ],
};

export default config;
