/////////////Работа с API(запросы и ответы сервера)////////////////
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39',
  headers: {
    authorization: '3d623270-8a67-47ce-9696-fe22b0bfb3d2',
    'Content-Type': 'application/json'
  }
};

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })

};

const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);  
    })
};

const editingProfile  = (newName, newAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,

    body: JSON.stringify({
      name: newName,
      about: newAbout
    })
  })
    .then(res => checkResult(res));
};

function editingAvatar (link){
  return fetch(`${config.baseUrl}/users/me/avatar`,{
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
    .then((res) => checkResult(res));
}

const addCards  = (newNameCards, newURL) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,

    body: JSON.stringify({
      link: newURL,
      name: newNameCards
    })
  })
    .then((res) => checkResult(res));
};

function deleteCard (cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => checkResult(res));
}

function setLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(res => checkResult(res));
};

function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => checkResult(res));
};

function checkResult(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

export {getInitialCards, getProfile, editingProfile, editingAvatar, addCards, deleteCard, setLike, deleteLike};
