import type { GatsbyNode } from 'gatsby';
import { ERROR_CODES } from './constants';
import { wrapWithAsterisks } from './utils';

/**
 * Use the onPluginInit API to set up things that should be run before the plugin is initialized.
 * You can use this e.g. for the reporter.setErrorMap API. Using this API is optional, but highly recommended.
 * By providing your own errors you can make it clearer to your users where the error is coming from and you can control what to show.
 * Using the ERROR_CODES enum you can reference the IDs without knowing them by hard.
 * @see https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#onPluginInit
 * @see https://www.gatsbyjs.com/docs/reference/config-files/node-api-helpers/#reporter
 */
export const onPluginInit: GatsbyNode['onPluginInit'] = ({ reporter }) => {
  const info = `Hey, thanks for considering installing "gatsby-source-hubspot-node",
  for documentation see https://github.com/samcyn/gatsby-source-hubspot-node`;

  reporter.info(wrapWithAsterisks(info));
  reporter.setErrorMap({
    [ERROR_CODES.HubspotSourcing]: {
      text: (context) => `${context.sourceMessage}: ${context.errorCode}`,
      level: 'ERROR',
      type: 'API.NODE.EXECUTION',
      category: 'THIRD_PARTY',
      docsUrl: 'https://legacydocs.hubspot.com/docs',
    },
  });
};
