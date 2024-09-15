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

const getSingleRole = (bandRoleId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/roles_list/${bandRoleId}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
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

export { getRoles, deleteRole, getSingleRole };
