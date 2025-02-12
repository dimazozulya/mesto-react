const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Получить информацию о пользователе
export function getUserInfo() {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    console.log('Данные из localStorage:', JSON.parse(storedUser));
    return Promise.resolve(JSON.parse(storedUser));
  }

  console.log('Запрос к серверу для получения данных пользователя');
  return fetch(`${BASE_URL}/users/1`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((userData) => {
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    });
}

// Получить список карточек
export function getCards() {
  return fetch(`${BASE_URL}/posts`).then((res) => {
    console.log(11);
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// Добавить новую карточку
export function addCard({ title, image }) {
  return fetch(`https://jsonplaceholder.typicode.com/photos`, { // 👈 Используем /photos
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          title: title,  
          url: image,  
          albumId: 1 
      })
  })
  .then(res => {
      if (!res.ok) {
          throw new Error(`Ошибка: ${res.status}`);
      }
      return res.json();
  })
  .then(data => {
      console.log("Ответ от jsonplaceholder:", data);
      return data;
  })
  .catch(error => {
      console.error("Ошибка при добавлении карточки:", error);
  });
}



// Обновить данные пользователя
export function updateUserInfo(data) {
  console.log('Отправляем данные на сервер:', data);
  return fetch(`${BASE_URL}/users/1`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((updatedData) => {
      console.log('Ответ сервера при обновлении пользователя:', updatedData);
      const storedUser = JSON.parse(localStorage.getItem('user')) || {};
      const mergedData = { ...storedUser, ...updatedData };
      localStorage.setItem('user', JSON.stringify(mergedData));
      return mergedData;
    });
}

// Удалить карточку
export function deleteCard(cardId) {
  return fetch(`${BASE_URL}/posts/${cardId}`, {
    method: 'DELETE',
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
}

// Обновить аватар
export function updateAvatar(data) {
  return fetch(`${BASE_URL}/users/1`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      avatar: data.avatar,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// Имитация лайков
export function toggleLike(cardId, isLiked) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: cardId,
        likes: isLiked ? [] : [{ userId: 1 }],
      });
    }, 500);
  });
}

export function changeLikeCardStatus(cardId, isLiked) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: cardId, likes: isLiked ? [{userId: 1}] : []});
    }, 500);
  });
}

