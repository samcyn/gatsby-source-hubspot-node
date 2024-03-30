import fetch, { HeadersInit } from 'node-fetch';

const apiToken = process.env.HUBSPOT_API_TOKEN || 'pat-eu1-dd2d8ba5-5e1e-452f-8372-1dddba3694c7';

const defaultHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${apiToken}`,
} satisfies HeadersInit;

/**
 * Fetch utility for requests to the example api.
 * @see https://graphql.org/code/#javascript-client
 */
export async function fetchRequest<T>(endpoint: string, headers?: HeadersInit): Promise<T> {
  // Query parameters
  const params = {
    state: 'PUBLISHED',
    limit: '2',
  };
  const url = `${endpoint}?${new URLSearchParams(params).toString()}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  });

  const result = await response.json();
  return result as T;
}
