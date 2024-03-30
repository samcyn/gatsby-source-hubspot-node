import type { PluginOptions as GatsbyDefaultPluginOptions, IPluginRefOptions } from 'gatsby';
import { NODE_TYPES } from './constants';

export interface IPostImageInput {
  url: string;
  alt: string;
  width: number;
  height: number;
}

interface IBlogAuthor {
  avatar?: string;
  id?: string;
}

interface IBlogMeta {
  tag_ids?: Array<string>;
  topic_ids?: Array<string>;
}

// mirror this after hubspot blog post shape
export interface IPostInput {
  id: string;
  absolute_url?: string;
  author?: string;
  author_name?: string;
  author_username?: string;
  blog_author?: IBlogAuthor;
  blog_author_id?: string;
  category?: number;
  category_id?: string;
  created?: number;
  current_state?: string;
  currently_published?: boolean;
  featured_image?: string;
  featured_image_alt_text?: string;
  featured_image_height?: number;
  featured_image_length?: number;
  featured_image_width?: number;
  html_title?: string;
  is_published?: boolean;
  keywords?: Array<string>;
  label?: string;
  language?: string;
  meta?: IBlogMeta;
  meta_description?: string;
  name?: string;
  page_title?: string;
  portal_id?: number;
  post_body?: string;
  post_summary?: string;
  publish_date?: number;
  publish_date_local_time?: number;
  publish_immediately?: boolean;
  published_at?: number;
  published_by_email?: string;
  published_by_id?: number;
  published_by_name?: string;
  published_url?: string;
  slug: string;
}

export type NodeBuilderInput = { type: typeof NODE_TYPES.Post; data: IPostInput };

interface IPluginOptionsKeys {
  endpoint: string;
}

/**
 * Gatsby expects the plugin options to be of type "PluginOptions" for gatsby-node APIs (e.g. sourceNodes)
 */
export interface IPluginOptionsInternal extends IPluginOptionsKeys, GatsbyDefaultPluginOptions {}

/**
 * These are the public TypeScript types for consumption in gatsby-config
 */
export interface IPluginOptions extends IPluginOptionsKeys, IPluginRefOptions {}
