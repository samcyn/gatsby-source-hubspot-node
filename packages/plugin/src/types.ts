import type { PluginOptions as GatsbyDefaultPluginOptions, IPluginRefOptions, SourceNodesArgs } from 'gatsby';
import { RequestInit } from 'node-fetch';

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

export type NodeBuilderInput<T> = { type: string; data: T | Record<string, unknown> };

interface IPluginOptionsKeys<T> {
  endpoint: string;
  nodeType?: string;
  /**
   * document in node fetch
   * @params RequestInit
   * @see docs available here https://github.com/node-fetch/node-fetch
   */
  requestOptions?: RequestInit;
  searchParams?: Record<string, string>;
  schemaCustomizationString?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiResponseFormatter?: (args: any) =>
    | Array<T>
    | Array<{
        [x: string]: unknown;
      }>;
  nodeBuilderFormatter?: ({
    gatsbyApi,
    input,
    pluginOptions,
  }: {
    gatsbyApi: SourceNodesArgs;
    input: NodeBuilderInput<T>;
    pluginOptions?: IPluginOptionsInternal<T>;
  }) => void;
}

/**
 * Gatsby expects the plugin options to be of type "PluginOptions" for gatsby-node APIs (e.g. sourceNodes)
 */
export interface IPluginOptionsInternal<T = IPostInput> extends IPluginOptionsKeys<T>, GatsbyDefaultPluginOptions {}

/**
 * These are the public TypeScript types for consumption in gatsby-config
 */
export interface IPluginOptions<T = IPostInput> extends IPluginOptionsKeys<T>, IPluginRefOptions {}
