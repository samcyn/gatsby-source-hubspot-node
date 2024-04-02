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
    'gatsby-plugin-mdx',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
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
      } satisfies IPluginOptions,
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
  ],
};

export default config;
