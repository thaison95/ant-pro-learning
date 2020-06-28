import { setTokenHeader } from '@/utils/request';
import request from 'umi-request';
import { reloadAuthorized } from './Authorized';
import { history } from 'umi';

export function getAuthority(str) {
  const authorityString =
    typeof str === 'undefined' && localStorage ? localStorage.getItem('antd-pro-authority') : str; // authorityString could be admin, "admin", ["admin"]

  let authority;

  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }

  if (typeof authority === 'string') {
    return [authority];
  } // preview.pro.ant.design only do not use in your production.
  // preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

  if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return ['admin'];
  }

  return authority;
}
export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority)); // auto reload

  reloadAuthorized();
}

export function getAccessToken() {
  return localStorage.getItem('access_token') || '';
}

export function refreshTokenFunc() {
  const accessToken = getAccessToken();
  const refreshToken = localStorage.getItem('refresh_token');
  request
    .post('/api/Users/refresh-token', {
      data: {
        token: accessToken,
        refreshToken,
      },
    })
    .then((response) => {
      setCredential(response.token, response.refreshToken);
      // reloadToken();
      history.go(0);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function setCredential(token, refreshToken) {
  localStorage.setItem('access_token', token);
  localStorage.setItem('refresh_token', refreshToken);
  setTokenHeader(token);
}

export function clearCredential() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('antd-pro-authority');
  setTokenHeader('');
}
