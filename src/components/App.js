import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import Login from './Login';
import Registration from './Registration';



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [userEmail, setUserEmail] = useState('');   

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [userInfo, setUserInfo] = useState(null);
  const [avatar, setAvatar] = useState(BaseAvatar);
  const [cards, setCards] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedEmail = localStorage.getItem('email');

    if(token && savedEmail){
      setIsLoggedIn(true);
      setUserEmail(true);
      getUserInfo().then(user => setCurrentUser(user));
    }
  },[]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');

    setIsLoggedIn(false);
    setUserEmail('');
  }

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
    <BrowserRouter>
         <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
      <div className="root">

          <Routes>
              <Route 
                path='/'
                element={
                  isLoggedIn ? (
                    <>
                    <Header
                        onEditProfile={handleEditProfileClick}
                        isLoggedIn={isLoggedIn}
                        userEmail={userEmail}
                        handleLogout={handleLogout}
                    />
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

                    <Footer />

                    </>
                  ) : (
                    <Navigate to ='/sign-in' replace/>
                  )
                }
              />

              <Route path='/sign-up' element={<Registration />} />
              <Route path='/sign-in' element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
              <Route path="*" element={<Navigate to="/sign-in" replace />} />


          </Routes>

       {isLoggedIn && (
          <>
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
          </>
       )}
       
      </div>
    </div>
    </CurrentUserContext.Provider>

    </BrowserRouter>
   
  );
}

export default App;
