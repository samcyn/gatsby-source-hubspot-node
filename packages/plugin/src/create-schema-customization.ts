import type { GatsbyNode } from 'gatsby';
import { NODE_TYPES } from './constants';

/**
 * By default Gatsby, infers the data types for each node. This can be sometimes brittle or lead to hard-to-debug errors.
 * However, you as the source plugin author should explicitly define the data types. This way you override the inference.
 * This has multiple benefits:
 * - All data types are correct and consistent across all nodes
 * - Users can have optional data/missing data. With inference this would break builds, with explicit data types it will work
 * - You can set up relationships between nodes
 *
 * Important: For Valhalla, you need to explicitly define the data types for all nodes.
 * @see https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#explicitly-defining-data-types
 * @see https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createSchemaCustomization
 */
export const createSchemaCustomization: GatsbyNode[`createSchemaCustomization`] = ({ actions }) => {
  const { createTypes } = actions;

  /**
   * Two things are happening here:
   * - The `Post` and `Author` types are being explicitly defined with all their fields
   * - The `author` field on the `Post` type is being linked to the `Author` type via a foreign-key relationship
   * @see https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#foreign-key-fields
   */
  createTypes(`
    type BlogAuthor {
      avatar: String
      id: ID
    }
    
    type Meta {
      tag_ids: [ID]
      topic_ids: [ID]
    }  

    type ${NODE_TYPES.Post} implements Node {
      id: ID!
      absolute_url: String
      author: String
      author_name: String
      author_username: String
      blog_author: BlogAuthor
      blog_author_id: ID
      category: Int
      category_id: ID
      created: Int
      current_state: String
      currently_published: Boolean
      featured_image: ${NODE_TYPES.Asset} @link
      featured_image_alt_text: String
      featured_image_height: Int
      featured_image_length: Int
      featured_image_width: Int
      html_title: String
      is_published: Boolean
      keywords: [String]
      label: String
      language: String
      meta: Meta
      meta_description: String
      name: String
      page_title: String
      portal_id: Int
      post_body: String
      post_summary: String
      publish_date: Int
      publish_date_local_time: Int
      publish_immediately: Boolean
      published_at: Int
      published_by_email: String
      published_by_id: Int
      published_by_name: String
      published_url: String
      slug: String!
    }

    type ${NODE_TYPES.Asset} implements Node & RemoteFile {
      url: String!
      alt: String!
      width: Int!
      height: Int!
    }
  `);

  /**
   * You most often will use SDL syntax to define your data types. However, you can also use type builders for more advanced use cases
   * @see https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#gatsby-type-builders
   */
};
