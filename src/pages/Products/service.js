import request from '@/utils/request';

export async function getProducts() {
  const res = await fetch('https://5ed3109c717d5f001651847c.mockapi.io/users');
  return res.json();
}

export async function createProduct(body) {
  const res = await fetch('https://5ed3109c717d5f001651847c.mockapi.io/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch('https://5ed3109c717d5f001651847c.mockapi.io/users/' + id, {
    method: 'DELETE',
  });
  return res.json();
}
