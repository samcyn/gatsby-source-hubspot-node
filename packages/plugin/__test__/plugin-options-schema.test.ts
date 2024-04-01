import { expect, describe, it } from 'vitest';
import { testPluginOptionsSchema } from 'gatsby-plugin-utils';

import { pluginOptionsSchema } from '../../plugin/src/plugin-options-schema';

describe(`pluginOptionsSchema`, () => {
  it(`should match snapshot of pluginOptionsSchema`, () => {
    expect(pluginOptionsSchema).toMatchSnapshot();
  });

  it(`should invalidate incorrect options`, async () => {
    const options = {
      endpoint: undefined,
    };

    const { isValid, errors } = await testPluginOptionsSchema(pluginOptionsSchema, options);

    expect(isValid).toBe(false);
    expect(errors).toEqual([`"endpoint" is required`]);
  });
  it(`should invalidate incorrect endpoint string`, async () => {
    const options = {
      endpoint: `foo`,
    };

    const { isValid, errors } = await testPluginOptionsSchema(pluginOptionsSchema, options);

    expect(isValid).toBe(false);
    expect(errors).toEqual([`"endpoint" must be a valid uri`]);
  });
  it(`should validate correct options`, async () => {
    const options = {
      endpoint: `http://localhost:4000/graphql`,
    };

    const { isValid, errors } = await testPluginOptionsSchema(pluginOptionsSchema, options);

    expect(isValid).toBe(true);
    expect(errors).toEqual([]);
  });
  it(`should invalidate incorrect nodeTypeOptions option when one or more missing required fields are not provided`, async () => {
    const options = {
      endpoint: 'https://samsoniyanda.com',
      nodeTypeOptions: {
        nodeType: 'Post',
      },
    };

    const { isValid, errors } = await testPluginOptionsSchema(pluginOptionsSchema, options);

    expect(isValid).toBe(false);
    expect(errors).toEqual([
      `"nodeTypeOptions.schemaCustomizationString" is required`,
      `"nodeTypeOptions.apiResponseFormatter" is required`,
      `"nodeTypeOptions.nodeBuilderFormatter" is required`,
    ]);
  });
  it(`should validate correct nodeTypeOptions option when required fields are provided`, async () => {
    const options = {
      endpoint: 'https://samsoniyanda.com',
      nodeTypeOptions: {
        nodeType: 'Post',
        schemaCustomizationString: `
          type Post implements Node {
            id: ID!
          }
        `,
        apiResponseFormatter(response: unknown) {
          return response;
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        nodeBuilderFormatter(_node: unknown) {},
      },
    };

    const { isValid, errors } = await testPluginOptionsSchema(pluginOptionsSchema, options);

    expect(isValid).toBe(true);
    expect(errors).toEqual([]);
  });
});
