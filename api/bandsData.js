const endpoint = 'https://notemap-b0e1d-default-rtdb.firebaseio.com/';

const getAllBands = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bands.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getUserBands = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bands.json?orderBy="created_by"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleBand = (bandId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bands/${bandId}.json/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteBand = (bandId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bands/${bandId}.json/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getAllBands, getUserBands, deleteBand, getSingleBand,
};
