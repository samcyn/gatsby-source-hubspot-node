export const schemaCustomizationOptions = `
  type BlogAuthor {
    avatar: String
    id: ID
  }

  type Meta {
    tag_ids: [ID]
    topic_ids: [ID]
  }  

  type Post implements Node {
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
    featured_image: Asset @link
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

  type Asset implements Node & RemoteFile {
    url: String!
    alt: String!
    width: Int!
    height: Int!
  }
`;
