const endpoint = 'https://notemap-b0e1d-default-rtdb.firebaseio.com/';

const createBandRole = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/band_roles.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// const getSingleBandRole = (bandId) => new Promise((resolve, reject) => {
//   fetch(`${endpoint}/band_roles/${bandId}.json/`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => resolve(data))
//     .catch(reject);
// });

const getAllBandRoles = (bandId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/band_roles.json?orderBy="band_id"&equalTo="${bandId}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteSingleBandRole = (bandRoleId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/band_roles/${bandRoleId}.json/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateRole = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/band_role/${payload}.json`, {
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

export {
  createBandRole, getAllBandRoles, deleteSingleBandRole, updateRole,
};
