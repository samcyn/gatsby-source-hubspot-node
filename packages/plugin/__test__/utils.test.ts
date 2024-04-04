import { expect, describe, beforeEach, afterEach, it, vi } from 'vitest';

import { createAssetNode, nodeBuilderFormatter, fetchRequest } from '../src/utils';
import { authorFixture, postFixture, postImageFixture } from './fixtures';

const nodeIdPlaceholder = `unique-id`;
const contentDigestPlaceholder = `unique-content-digest`;

let gatsbyApi;

describe(`utils`, () => {
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

  describe('fetchRequest', () => {
    afterEach(() => {
      vi.resetAllMocks();
    });

    const mockedMethod = vi.hoisted(() => {
      return async () => {
        const mockResponseData = {
          data: 'successful',
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const fetch = (url: RequestInfo, options: RequestInit) => {
          expect(url).toBe('https://example.com/api?param1=value1&param2=value2');
          expect(options.method).toBe('GET');
          return {
            json: () => {
              return mockResponseData;
            },
          };
        };
        return {
          default: fetch,
        };
      };
    });

    it('should format URL correctly when searchParams are provided', async () => {
      vi.mock('node-fetch', mockedMethod);

      const pluginOptions = {
        endpoint: 'https://example.com/api',
        requestOptions: {},
        searchParams: {
          param1: 'value1',
          param2: 'value2',
        },
      };

      const response = await fetchRequest(pluginOptions);
      expect(response.data).toBe('successful');
    });
  });

  // it('should format URL correctly when endpoint already contains query parameters', async () => {
  //   const pluginOptions = {
  //     endpoint: 'https://example.com/api?key1=value1',
  //     requestOptions: {},
  //     searchParams: {
  //       param2: 'value2',
  //     },
  //   };

  //   await fetchRequest(pluginOptions);

  //   expect.deepEqual(fetch.mock.calls[0], ['https://example.com/api?key1=value1&param2=value2', expect.any(Object)]);
  // });
});

// it('should use default method and headers if not provided in requestOptions', async () => {
//   const pluginOptions = {
//     endpoint: 'https://example.com/api',
//     requestOptions: {},
//     searchParams: {},
//   };

//   await fetchRequest(pluginOptions);

//   expect.deepEqual(fetch.mock.calls[0], [
//     'https://example.com/api',
//     expect.objectContaining({
//       method: 'GET',
//       headers: expect.any(Object), // Assuming defaultHeaders is defined globally or imported
//     }),
//   ]);
// });

// it('should use provided method and headers from requestOptions', async () => {
//   const pluginOptions = {
//     endpoint: 'https://example.com/api',
//     requestOptions: {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     },
//     searchParams: {},
//   };

//   await fetchRequest(pluginOptions);

//   assert.deepEqual(fetch.mock.calls[0], [
//     'https://example.com/api',
//     expect.objectContaining({
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }),
//   ]);
// });
