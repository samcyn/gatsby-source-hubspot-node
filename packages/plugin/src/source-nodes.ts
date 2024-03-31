import type { GatsbyNode } from 'gatsby';

import type { IPluginOptionsInternal } from './types';
import { CACHE_KEYS, ERROR_CODES } from './constants';
import {
  apiResponseFormatter as defaultApiResponseFormatter,
  fetchRequest,
  nodeBuilderFormatter as defaultNodeBuilderFormatter,
} from './utils';

let isFirstSource = true;

/**
 * The sourceNodes API is the heart of a Gatsby source plugin. This is where data is ingested and transformed into Gatsby's data layer.
 * @see https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#sourceNodes
 */
export const sourceNodes: GatsbyNode['sourceNodes'] = async (gatsbyApi, pluginOptions: IPluginOptionsInternal) => {
  const { actions, reporter, cache, getNodes } = gatsbyApi;
  const { touchNode } = actions;
  const {
    endpoint,
    requestOptions,
    searchParams,
    nodeType = 'Post',
    apiResponseFormatter,
    nodeBuilderFormatter,
  } = pluginOptions;

  /**
   * It's good practice to give your users some feedback on progress and status. Instead of printing individual lines, use the activityTimer API.
   * This will give your users a nice progress bar and can you give updates with the .setStatus API.
   * In the end your users will also have the exact time it took to source the data.
   * @see https://www.gatsbyjs.com/docs/reference/config-files/node-api-helpers/#reporter
   */
  const sourcingTimer = reporter.activityTimer(`Sourcing from plugin API`);
  sourcingTimer.start();

  if (isFirstSource) {
    /**
     * getNodes() returns all nodes in Gatsby's data layer
     */
    getNodes().forEach((node) => {
      /**
       * "owner" is the name of your plugin, the "name" you defined in the package.json
       */
      if (node.internal.owner !== 'plugin') {
        return;
      }

      /**
       * Gatsby aggressively garbage collects nodes between runs. This means that nodes that were created in the previous run but are not created in the current run will be deleted. You can tell Gatsby to keep old, but still valid nodes around, by "touching" them.
       * For this you need to use the touchNode API.
       *
       * However, Gatsby only checks if a node has been touched on the first sourcing. This is what the "isFirstSource" variable is for.
       * @see https://www.gatsbyjs.com/docs/reference/config-files/actions/#touchNode
       */
      touchNode(node);
    });

    isFirstSource = false;
  }

  /**
   * If your API supports delta updates via e.g. a timestamp or token, you can store that information via the cache API.
   *
   * The cache API is a key-value store that persists between runs.
   * You should also use it to persist results of time/memory/cpu intensive tasks.
   * @see https://www.gatsbyjs.com/docs/reference/config-files/node-api-helpers/#cache
   */
  const lastFetchedDate: number = await cache.get(CACHE_KEYS.Timestamp);
  const lastFetchedDateCurrent = Date.now();

  /**
   * The reporter API has a couple of methods:
   * - info: Print a message to the console
   * - warn: Print a warning message to the console
   * - error: Print an error message to the console
   * - panic: Print an error message to the console and exit the process
   * - panicOnBuild: Print an error message to the console and exit the process (only during "gatsby build")
   * - verbose: Print a message to the console that is only visible when the "verbose" flag is enabled (e.g. gatsby build --verbose)
   * @see https://www.gatsbyjs.com/docs/reference/config-files/node-api-helpers/#reporter
   *
   * Try to keep the terminal information concise and informative. You can use the "verbose" method to print more detailed information.
   * You don't need to print out every bit of detail your plugin is doing as otherwise it'll flood the user's terminal.
   */
  reporter.verbose(`[plugin] Last fetched date: ${lastFetchedDate}`);

  /**
   * Fetch data from the example API. This will differ from your implementation and personal preferences on e.g. which library to use.
   * A good general recommendation is: https://github.com/sindresorhus/got
   */
  try {
    const response = await fetchRequest({ endpoint, requestOptions, searchParams });

    if ('status' in response && response.status === 'error') {
      const { correlationId, errorType, message } = response;

      sourcingTimer.panicOnBuild({
        id: ERROR_CODES.HubspotSourcing,
        error: Error(message),
        context: {
          sourceMessage: errorType,
          errorCode: 500,
        },
        correlationId,
      });
      return;
    }
    /**
     * Gatsby's cache API uses LMDB to store data inside the .cache/caches folder.
     *
     * As mentioned above, cache the timestamp of last sourcing.
     * The cache API accepts "simple" data structures like strings, integers, arrays.
     * For example, passing a Set or Map won't work because the "structuredClone" option is purposefully not enabled:
     * https://github.com/kriszyp/lmdb-js#serialization-options
     */
    await cache.set(CACHE_KEYS.Timestamp, lastFetchedDateCurrent);

    const postFormatter = apiResponseFormatter ? apiResponseFormatter : defaultApiResponseFormatter;

    const posts = postFormatter(response);

    /**
     * Up until now the terminal output only showed "Sourcing from plugin API" and a timer. Via the "setStatus" method you can add more information to the output.
     * It'll then print "Sourcing from plugin API - Processing X posts and X authors"
     */
    sourcingTimer.setStatus(`Processing ${posts.length} posts`);

    /**
     * Iterate over the data and create nodes
     */
    const postNodeBuilderFormatter = nodeBuilderFormatter ? nodeBuilderFormatter : defaultNodeBuilderFormatter;

    for (const post of posts) {
      postNodeBuilderFormatter({ gatsbyApi, input: { type: nodeType, data: post } });
    }

    sourcingTimer.end();
  } catch (error) {
    sourcingTimer.panicOnBuild({
      id: ERROR_CODES.HubspotSourcing,
      error,
      context: {
        sourceMessage: 'Sourcing from the Hubspot API failed',
        errorCode: 500,
      },
    });
  }
};
