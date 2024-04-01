import { expect, describe, beforeEach, it, vi } from 'vitest';
import { createSchemaCustomization } from '../../plugin/src/create-schema-customization';
import { CreateSchemaCustomizationArgs } from 'gatsby';

// Mocking createTypes function
const createTypesMock = vi.fn();

// Mocking actions object
const actionsMock = {
  actions: {
    createTypes: createTypesMock,
  },
} as unknown as CreateSchemaCustomizationArgs;

// Mocking plugin options object
const options = {
  plugins: ['plugin'],
  nodeTypeOptions: {
    schemaCustomizationString: `
      type Post {
        id: ID!
        title: String!
        author: Author!
      }

      type Author {
        id: ID!
        name: String!
      }
    `,
  },
};

describe('createSchemaCustomization', () => {
  beforeEach(() => {
    createTypesMock.mockClear();
  });

  it('should create schema customization with provided options', () => {
    createSchemaCustomization(actionsMock, options, () => {});

    expect(createTypesMock).toHaveBeenCalledWith(options.nodeTypeOptions.schemaCustomizationString);
  });
});
