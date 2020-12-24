import request from '@/utils/request';
import type { TableListParams, TableListItem } from './data.d';

export async function getUserList(params?: TableListParams) {
  return request('/api/getUserList', {
    params,
  });
}

export async function delUser(params: { id: string }) {
  return request('/api/delUser', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addUser(params: TableListItem) {
  return request('/api/register', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateUser(params: TableListParams) {
  return request('/api/updateUser', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
