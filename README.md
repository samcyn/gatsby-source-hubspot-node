# gatsby-source-hubspot-nodes

The `gatsby-source-hubspot-nodes` plugin seamlessly integrates your Gatsby site with HubSpot, enabling you to source data directly from HubSpot into your Gatsby application. This plugin is perfect for developers looking to leverage HubSpot's powerful CRM and content management features within their Gatsby projects, making it easier to create dynamic, content-driven websites. This plugin supports sourcing various HubSpot resources, such as blog posts, contacts, and forms, into Gatsby's GraphQL data layer, allowing you to query your HubSpot data right alongside your other data sources. Whether you're building a blog, a landing page, or a full-fledged website, gatsby-source-hubspot-nodes makes it straightforward to incorporate your HubSpot data.



## Prerequisites

Before you begin, make sure you have the following:

- Gatsby CLI installed
- Node.js installed
- An active HubSpot account



## Installation

```shell
npm install gatsby-source-hubspot-nodes
```

or
```
yarn add gatsby-source-hubspot-nodes
```


## How to use

You can have multiple instances of this plugin in your `gatsby-config` to read data from different Hubspot CMS. Be sure to give each instance a unique `nodeType`.

```js:title=gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-hubspot-nodes`,
      options: {
        // The unique nodeType for each instance
        nodeType: `Post`,
        // hubspot end point for blogs
        endpoint: `process.env.HUBSPOT_API_ENDPOINT_FOR_BLOGS`,
      },
    },
    {
      resolve: `gatsby-source-hubspot-nodes`,
      options: {
        // The unique nodeType for each instance
        nodeType: `Contact`,
        // hubspot end point for contact
        endpoint: `process.env.HUBSPOT_API_ENDPOINT_FOR_CONTACTS`,
      },
    },
  ],
}
```
In the above example, `Post` and `Contact` nodes will be created inside GraphQL. 



## Options

1. **endpoint** (**Required**)
    Remote url to hubspot resource. Check [Hubspot API Overview](https://legacydocs.hubspot.com/docs/overview) for more details

2. **nodeType** (**Optional**)
    A unique nodeType for the `gatsby-source-hubspot-nodes` instance. It's default value is `Post`. It's advisable to always set a value if you have multiple instances of `gatsby-source-hubspot-nodes` plugin.

3. **requestOptions** (**Optional**)
    This is adapted from `node-fetch` library, [Node Fetch](https://github.com/node-fetch/node-fetch). Use this property to set headers, and methods. For details check the docs above.

4. **searchParams** (**Optional**)
    This is use to set search params along with the endpoint supplied to `gatsby-source-hubspot-nodes` plugin

5. **nodeTypeOptions** (**Optional**)
    This is an advanced option and should only be use if you understand node customization from Gatsby point of view. For deeper information and understanding check the docs here [Customizing the GraphQL Schema](https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/).

    This option has three required field `schemaCustomizationString`, `apiResponseFormatter` and `nodeBuilderFormatter`

    a). **schemaCustomizationString** (**Optional**)

      - This is use to explicitly define the data shape, or add custom functionality to the query layer - this is what Gatsby’s Schema Customization API provides. Check docs for more info [Customizing the GraphQL Schema](https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/):

        ```js:title=gatsby-config.js
          module.exports = {
            plugins: [
              {
                resolve: `gatsby-source-hubspot-nodes`,
                options: {
                  // The unique nodeType for each instance
                  nodeType: `Post`,
                  // hubspot end point for blogs
                  endpoint: `process.env.HUBSPOT_API_ENDPOINT_FOR_BLOGS`,
                  // this is just an example you can check the default value use under packages/plugin/src/config/schema-customization-options.ts
                  schemaCustomizationString: `
                    type Post implements Node {
                      id: ID!
                      absolute_url: String
                      author: String
                      author_name: String
                    }
                  `
                },
              }
            ],
          }
        ```

    b). **apiResponseFormatter** (**Optional**)

      - This is use to format response api depending on hubspot response api. Take note this formatter has to return an array of Items that match `schemaCustomizationString` option above;

    c). **nodeBuilderFormatter** (**Optional**)

      - This is a function use to build node as per [Gatsby sourceNode API](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#sourceNodes). Note that once you have provided `schemaCustomizationString` in plugin options, you must provide  `apiResponseFormatter`, `nodeBuilderFormatter`. Here's an advanced configuration example, demonstrating how to use all available options:

        ```js:title=gatsby-config.ts
        import type { NodeInput, SourceNodesArgs } from 'gatsby';
        // gatsby-config.js
        module.exports = {
          plugins: [
            {
              resolve: `gatsby-source-hubspot-nodes`,
              options: {
                nodeType: `Post`,
                endpoint: `process.env.HUBSPOT_BLOGS_ENDPOINT`,
                schemaCustomizationString: `
                  type Post implements Node {
                    id: ID!
                    title: String
                    author: String
                    publishDate: Date @dateformat
                  }
                `,
                requestOptions: {
                  headers: {
                    Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
                  },
                },
                searchParams: {
                  state: 'published',
                },
                apiResponseFormatter: (response) => {
                  // Example formatter, for some api, it's response.results or simple response.
                  return response.data;
                },
                nodeBuilderFormatter: ({ gatsbyApi, input }: {
                  gatsbyApi: SourceNodesArgs
                  // type is the nodeType supplied
                  input: { type: string; data: T | Record<string, unknown> };
                }) => {
                  // Example node builder
                  const { actions, createNodeId, createContentDigest } = gatsbyApi;
                  const { createNode } = actions;

                  const nodeContent = JSON.stringify(input.data);

                  const nodeMeta = {
                    id: createNodeId(`${input.type}-${input.data.id}`),
                    parent: null,
                    children: [],
                    internal: {
                      type: `YourNodeType`,
                      mediaType: `text/html`,
                      content: nodeContent,
                      contentDigest: createContentDigest(input.data),
                    },
                  } satisfies NodeInput;

                  const node = Object.assign({}, input.data, nodeMeta);
                  createNode(node);
                },
              },
            },
          ],
        };
        ```

## Troubleshooting

- API Rate Limits: HubSpot API has rate limits. If you encounter errors related to exceeding these limits, try to reduce the number of requests or implement caching.
- Data Structure Mismatches: Make sure the structure defined in schemaCustomizationString matches the actual data structure returned by the HubSpot API.

## Contributing
Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change. Please make sure to update tests as appropriate.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.

## Support
For support and questions, please open an issue on the GitHub repository or contact the plugin maintainers.