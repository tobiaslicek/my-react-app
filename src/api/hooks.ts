import type { AfterResponseHook, BeforeRequestHook } from 'ky';

export const setRequestHeaders: BeforeRequestHook = async (request) => {
  const accessToken = window.localStorage.getItem('accessToken');

  if (accessToken) {
    request.headers.set('Authorization', `Bearer ${accessToken}`);
  }
};

export const handleResponseError: AfterResponseHook = async (
  request,
  options,
  response,
) => {
  if (response.status === 401) {
    window.localStorage.removeItem('accessToken');
    window.location.href = '/';
    return;
  }

  if (response.status >= 400) {
    const errorResponse = await response.clone().json();
    // TODO remove this console log in future
    console.log(errorResponse);
  }
};