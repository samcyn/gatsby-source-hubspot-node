import type { GatsbyNode } from 'gatsby';
import type { ObjectSchema } from 'gatsby-plugin-utils';

import { IPluginOptionsInternal } from './types';

/**
 * When you expose options for your plugin, it's best practice to validate the user input.
 * You can use the pluginOptionsSchema API to do this, which is powered by Joi: https://joi.dev/
 * If for example a user would forget to add the endpoint option, Gatsby will show a validation error.
 * @see https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#pluginOptionsSchema
 * @see https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/configuring-usage-with-plugin-options/
 */
export const pluginOptionsSchema: Exclude<GatsbyNode['pluginOptionsSchema'], undefined> = ({ Joi }): ObjectSchema => {
  return Joi.object<unknown, IPluginOptionsInternal>({
    endpoint: Joi.string().uri().required().description('Hubspot API endpoint'),
    requestOptions: Joi.object<unknown, IPluginOptionsInternal['requestOptions']>(),
    searchParams: Joi.object<unknown, IPluginOptionsInternal['searchParams']>(),
    nodeTypeOptions: Joi.object<unknown, IPluginOptionsInternal['nodeTypeOptions']>({
      nodeType: Joi.string().required().description('node type name'),
      schemaCustomizationString: Joi.string().required(),
      apiResponseFormatter: Joi.func().arity(1).required(),
      nodeBuilderFormatter: Joi.func().arity(1).required(),
    }),
  });
};
