import { setTokenHeader } from '@/utils/request'; // use localStorage to store the authority info, which might be sent from server in actual project.
import { reloadAuthorized } from './Authorized';

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

export function setAccessToken(token) {
  localStorage.setItem('access_token', token);
}

export function clearCredential() {
  localStorage.setItem('access_token', null);
  localStorage.setItem('antd-pro-authority', null);
  setTokenHeader('');
}
