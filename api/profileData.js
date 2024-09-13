import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

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
  if (!endpoint) {
    reject(new Error('API enasdasddpoint is not defined'));
    return; // Exit early if endpoint is not defined
  }

  fetch(`${endpoint}/profile_roles.json`, {
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
