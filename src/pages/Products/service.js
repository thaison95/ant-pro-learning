import request from '@/utils/request';

export async function getProducts(payload) {
  const params = {
    PageIndex: payload.current,
    PageSize: payload.pageSize,
  };
  return request('/api/Products/paging', {
    params,
  });
}

export async function createProduct(body) {
  return request('/api/Products', {
    method: 'POST',
    data: {...body, categoryId: 1},
  });
}

export async function deleteProduct(id) {
  const res = await fetch('https://5ed3109c717d5f001651847c.mockapi.io/users/' + id, {
    method: 'DELETE',
  });
  return res.json();
}
