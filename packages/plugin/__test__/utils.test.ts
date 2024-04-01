import { expect, describe, beforeEach, afterEach, it, vi } from 'vitest';
import { createAssetNode, nodeBuilderFormatter } from '../src/utils';
import { authorFixture, postFixture, postImageFixture } from './fixtures';

const nodeIdPlaceholder = `unique-id`;
const contentDigestPlaceholder = `unique-content-digest`;

let gatsbyApi;

describe(`sourceNodes`, () => {
  beforeEach(() => {
    gatsbyApi = {
      cache: {
        set: vi.fn(),
        get: vi.fn(),
      },
      actions: {
        createNode: vi.fn(),
      },
      createContentDigest: vi.fn().mockReturnValue(contentDigestPlaceholder),
      createNodeId: vi.fn().mockReturnValue(nodeIdPlaceholder),
      store: vi.fn(),
      reporter: {
        info: vi.fn(),
        error: vi.fn(),
        panic: vi.fn(),
        activityTimer: (): Record<string, unknown> => ({
          start: vi.fn(),
          end: vi.fn(),
          setStatus: vi.fn(),
        }),
      },
    };
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe(`nodeBuilderFormatter`, () => {
    it(`should create correct Author node`, () => {
      nodeBuilderFormatter({
        gatsbyApi,
        input: { type: `Author`, data: authorFixture },
      });

      expect(gatsbyApi.actions.createNode.mock.calls[0][0]).toMatchInlineSnapshot(`
        {
          "children": [],
          "id": "unique-id",
          "internal": {
            "contentDigest": "unique-content-digest",
            "type": "Author",
          },
          "name": "Jay Gatsby",
          "parent": null,
        }
      `);
    });

    it(`should create correct Post node`, () => {
      nodeBuilderFormatter({ gatsbyApi, input: { type: `Post`, data: postFixture } });
      expect(gatsbyApi.actions.createNode.mock.calls[0][0]).toMatchInlineSnapshot(`
        {
          "alt": undefined,
          "children": [],
          "filename": undefined,
          "height": undefined,
          "id": "unique-id",
          "internal": {
            "contentDigest": "unique-content-digest",
            "type": "Asset",
          },
          "mimeType": "image/jpg",
          "parent": null,
          "placeholderUrl": "undefined&w=%width%&h=%height%",
          "url": undefined,
          "width": undefined,
        }
      `);
    });
  });

  describe(`createAssetNode`, () => {
    it(`should create correct Asset node`, () => {
      const id = createAssetNode(gatsbyApi, postImageFixture);

      expect(id).toEqual(nodeIdPlaceholder);
      expect(gatsbyApi.actions.createNode.mock.calls[0][0]).toMatchInlineSnapshot(`
        {
          "alt": "brown and white long coated dog",
          "children": [],
          "filename": "https://images.unsplash.com/photo-1615751072497-5f5169febe17?fm=jpg",
          "height": 4032,
          "id": "unique-id",
          "internal": {
            "contentDigest": "unique-content-digest",
            "type": "Asset",
          },
          "mimeType": "image/jpg",
          "parent": null,
          "placeholderUrl": "https://images.unsplash.com/photo-1615751072497-5f5169febe17?fm=jpg&w=%width%&h=%height%",
          "url": "https://images.unsplash.com/photo-1615751072497-5f5169febe17?fm=jpg",
          "width": 3024,
        }
      `);
    });
  });
});
