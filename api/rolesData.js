const endpoint = 'https://notemap-b0e1d-default-rtdb.firebaseio.com/';

const getRoles = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/roles_list.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const addRole = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/roles_list.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const updateRole = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/roles_list/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleRole = (bandRole) => new Promise((resolve, reject) => {
  console.warn(bandRole);
  fetch(`${endpoint}/roles_list/${bandRole}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch(reject);
});

const deleteRole = (bandRoleId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/roles_list/${bandRoleId}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getRoles, deleteRole, getSingleRole, addRole, updateRole,
};
