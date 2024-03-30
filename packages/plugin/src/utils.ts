import fetch, { HeadersInit } from 'node-fetch';
import { IPluginOptionsInternal } from './types';

const defaultHeaders = {
  'Content-Type': 'application/json',
} satisfies HeadersInit;

export async function fetchRequest<T>(
  pluginOptions: Pick<IPluginOptionsInternal, 'endpoint' | 'headers' | 'searchParams'>
): Promise<T> {
  const { endpoint, headers, searchParams } = pluginOptions;

  const params = searchParams || {};
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
