import request from 'umi-request';
import { CurrentUser } from './data.d';

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function fetchUpdateUser(params: CurrentUser) {
  return request('/api/updateUser', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
