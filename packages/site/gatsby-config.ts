import type { GatsbyConfig } from 'gatsby';
import type { IPluginOptions } from 'plugin';

const HUSPOT_ENDPOINT = 'https://api.hubapi.com/content/api/v2/blog-posts';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `site`,
    siteUrl: `https://www.yourdomain.tld`,
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
      resolve: 'plugin',
      options: {
        endpoint: HUSPOT_ENDPOINT,
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
        },
        searchParams: {
          state: 'PUBLISHED',
        },
        //   schemaCustomizationString: `
        //     type Post implements Node {
        //       id: ID!
        //     }
        // `,
        //   apiResponseFormatter(response: { objects: Array<Record<string, unknown>> }) {
        //     return response.objects;
        //   },
        //   nodeBuilderFormatter({ gatsbyApi, input }) {
        //     const id = gatsbyApi.createNodeId(`${input.type}-${input.data.id}`);
        //     const node = {
        //       ...input.data,
        //       id,
        //       parent: null,
        //       children: [],
        //       internal: {
        //         type: input.type,
        //         /**
        //          * The content digest is a hash of the entire node.
        //          * Gatsby uses this internally to determine if the node needs to be updated.
        //          */
        //         contentDigest: gatsbyApi.createContentDigest(input.data),
        //       },
        //     } as NodeInput;
        //     gatsbyApi.actions.createNode(node);
        //   },
      } satisfies IPluginOptions,
    },
  ],
};

export default config;
