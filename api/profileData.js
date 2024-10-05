const endpoint = 'https://notemap-b0e1d-default-rtdb.firebaseio.com/';

const getUserProfile = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/profiles.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getUserProfileByUsername = (username) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/profiles.json?orderBy="username"&equalTo="${username}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getAllProfiles = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/profiles.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const createProfile = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/profiles.json`, {
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

const updateProfile = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/profiles/${payload.uid}.json`, {
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
  getUserProfile, getAllProfiles, createProfile, updateProfile, getUserProfileByUsername,
};
