import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import BaseAvatar from '../images/profile__img.jpg';
import { getUserInfo, getCards, addCard, updateUserInfo, updateAvatar, deleteCard, changeLikeCardStatus } from '../utils/Api';
import CurrentUserContext from '../contexts/currentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [userInfo, setUserInfo] = useState(null);
  const [avatar, setAvatar] = useState(BaseAvatar);
  const [cards, setCards] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    getUserInfo()
      .then(userInfo => {
        setCurrentUser(userInfo);
      })
      .catch(error => {
        console.error('Error fetching user info :', error);
      });
  }, []);

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
            likes: Array.isArray(card.likes) ? card.likes : [],  
            owner: card.owner || { _id: 'default-owner-id'},
          }))
        );
      })
      .catch((error) => {
        console.error('Ошибка при получении карточек:', error);
      });
  }, []);

  // Обновление аватара
  function handleUpdateAvatar(data) {
    updateAvatar(data)
      .then ((updatedUser) => {
        setCurrentUser((prevUser) => ({
          ...prevUser,
          avatar: updatedUser.avatar,
        }));
        closeAllPopups();
      })
      .catch((error) => {
        console.log('Ошибка при обновление аватара: ', error);
      });
  }


  // Удаление карточки
  const handleCardDelete = (cardId) => {
    deleteCard(cardId)
      .then(() => {
        console.log('Удаление карточки')
        setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
      })
      .catch((error) => {
        console.error('Ошибка при удалении карточки:', error);
      });
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
  
    console.log(`Карточка: ${card._id}, лайк ${isLiked ? 'удаляется' : 'ставится'}`);
  
    changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c.id === card.id ? { ...c, ...newCard } : c))
        );
      })
      .catch((err) => {
        console.error('Ошибка при изменении статуса лайка:', err);
      });
  }

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

  function handleUpdateUser(data) {
    updateUserInfo(data)
      .then((updatedUser) => {
        setCurrentUser({
          ...currentUser,
          name: updatedUser.name,
          company: { ...currentUser?.company, name: data.about }, // Обновляем company.name
        });
        closeAllPopups();
      })
      .catch((error) => {
        console.error('Ошибка при обновлении профиля:', error);
      });
  }

  function handleAddPlaceSubmit(newCard){
    console.log("Данные из формы перед отправкой:", newCard); 
    addCard(newCard)
      .then ((addedCard) => {
        console.log("Новая карточка с сервера:", addedCard);
        setCards((prevCards) => {
          const updatedCards = [
              {
                  id: addedCard.id, 
                  title: addedCard.title, 
                  image: addedCard.url,  
                  likes: [], 
                  owner: { _id: currentUser._id }, 
              },
              ...prevCards,
          ];
          console.log("Обновленный массив карточек:", updatedCards);
          return updatedCards;
      });
    })
      .catch((error) => {
        console.error('Ошибка при добавлении карточки: ', error);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
          onCardLike={handleCardLike}
        />

        {/* Компонент Footer */}
        <Footer />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleUpdateUser}
          currentUser={currentUser}
        />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup 
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
        />
       
      </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
