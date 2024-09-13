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

export {
  getUserProfile, getAllProfiles,
};
