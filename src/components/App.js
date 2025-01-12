import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import BaseAvatar from '../images/profile__img.jpg';
import { getUserInfo, getCards, addCard, updateUserInfo, updateAvatar, deleteCard } from '../utils/Api';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [userInfo, setUserInfo] = useState(null);
  const [avatar, setAvatar] = useState(BaseAvatar);
  const [cards, setCards] = useState([]);

  // Загружаем данные пользователя при монтировании компонента
  useEffect(() => {
    console.log('Вызов getUserInfo');
    getUserInfo()
      .then((userData) => {
        console.log('Устанавливаем данные пользователя:', userData);
        setUserInfo({
          name: userData.name,
          company: userData.company,
        });
      })
      .catch((error) => {
        console.error('Ошибка при получении данных пользователя:', error);
      });
  }, []);

  // Загружаем карточки при монтировании компонента
  useEffect(() => {
    console.log('Вызов getCards');
    getCards()
      .then((cardsData) => {
        console.log('Устанавливаем карточки:', cardsData);
        setCards(
          cardsData.map((card) => ({
            id: card.id,
            title: card.title,
            image: card.image || `https://picsum.photos/600/400?random=${card.id}`,
            likes: Math.floor(Math.random() * 100), // Случайное число для лайков
          }))
        );
      })
      .catch((error) => {
        console.error('Ошибка при получении карточек:', error);
      });
  }, []);

  // Обновление информации о пользователе
  const handleUpdateUser = (data) => {
    updateUserInfo(data)
      .then((updatedUser) => {
        setUserInfo(updatedUser);
        closeAllPopups();
      })
      .catch((error) => {
        console.error('Ошибка при обновлении данных пользователя:', error);
      });
  };

  // Обновление аватара
  const handleUpdateAvatar = (data) => {
    updateAvatar(data)
      .then((updatedUser) => {
        setAvatar(updatedUser);
        closeAllPopups();
      })
      .catch((error) => {
        console.error('Ошибка при обновлении аватара:', error);
      });
  };

  // Добавление новой карточки
  const handleAddPlace = (newCard) => {
    addCard(newCard)
      .then((addedCard) => {
        setCards([addedCard, ...cards]); // Добавляем новую карточку в начало списка
        closeAllPopups();
      })
      .catch((error) => {
        console.error('Ошибка при добавлении карточки:', error);
      });
  };

  // Удаление карточки
  const handleCardDelete = (cardId) => {
    deleteCard(cardId)
      .then(() => {
        setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
      })
      .catch((error) => {
        console.error('Ошибка при удалении карточки:', error);
      });
  };

  // Обработчики открытия попапов
  const handleEditProfileClick = () => {
    console.log('Открытие попапа редактирования профиля');
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  // Закрытие всех попапов
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
  };

  return (
    <div className="App">
      <div className="root">
        {/* Компонент Header с передачей данных пользователя */}
        {userInfo && (
          <Header
            onEditProfile={handleEditProfileClick}
          />
        )}

        {/* Компонент Main с передачей карточек и обработчиков */}
        <Main
          cards={cards}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardDelete={handleCardDelete}
          userInfo={userInfo}
          avatar={avatar}
          onEditProfile={handleEditProfileClick}
        />

        {/* Компонент Footer */}
        <Footer />

        {/* Попапы */}
        <PopupWithForm
          title="Редактировать профиль"
          name="edit-profile"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleUpdateUser}
        >
          <div className="input__wrapper">
            <input
              type="text"
              name="name"
              className="popup__input popup__input-name"
              placeholder="Введите имя"
              required
              minLength="2"
              maxLength="40"
            />
            <span className="error-message name-error"></span>
          </div>
          <div className="input__wrapper">
            <input
              type="text"
              name="job"
              className="popup__input popup__input-job"
              placeholder="Введите место работы"
              required
              minLength="2"
              maxLength="200"
            />
            <span className="error-message job-error"></span>
          </div>
        </PopupWithForm>

        <PopupWithForm
          title="Новое место"
          name="add-place"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleAddPlace}
        >
          <div className="input__wrapper">
            <input
              type="text"
              name="place"
              className="popup__input popup__input-name"
              placeholder="Название"
              required
              minLength="2"
              maxLength="30"
            />
            <span className="error-message place-error"></span>
          </div>
          <div className="input__wrapper">
            <input
              type="url"
              name="link"
              className="popup__input popup__input-link"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="error-message link-error"></span>
          </div>
        </PopupWithForm>

        <PopupWithForm
          title="Обновить аватар"
          name="edit-avatar"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleUpdateAvatar}
        >
          <div className="input__wrapper">
            <input
              type="url"
              name="avatar"
              className="popup__input popup__input-avatar"
              placeholder="Ссылка на аватар"
              value={userInfo ? userInfo.avatar : ''} 
              required
            />
            <span className="error-message avatar-error"></span>
          </div>
        </PopupWithForm>

        {/* Компонент ImagePopup */}
       
      </div>
    </div>
  );
}

export default App;
