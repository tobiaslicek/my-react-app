import ky from 'ky';
import { handleResponseError, setRequestHeaders } from './hooks';

function removeLeadingSlash(path: string): string {
    return path.startsWith('/') ? path.slice(1) : path;
  }

export const apiClient = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  timeout: false,
  retry: 0,
  hooks: {
    beforeRequest: [setRequestHeaders],
    afterResponse: [handleResponseError],
  },
});

export const kyMutator = async <T>({
  url,
  method,
  body,
  data,
  headers,
  signal,
  params,
}: {
  url: string;
  method: string;
  body?: unknown;
  data?: unknown;
  headers?: HeadersInit;
  signal?: AbortSignal;
  params?: Record<string, string | number | boolean>;
}): Promise<T> => {
  const response = await apiClient(removeLeadingSlash(url), {
    method,
    headers,
    signal,
    json: body ?? data,
    searchParams: params,
  });

  return response.json<T>();
};