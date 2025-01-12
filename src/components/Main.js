import React, { useState } from 'react';
import EditBtn from '../images/Vector-pencil.svg';
import Card from './Card';
import PopupWithImage from './PopupWithImage';

function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, userInfo, avatar, onCardDelete }) {
  
  const [selectedCard, setSelectedCard] = useState(null);
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }
  const closeImagePopup = () => {
    setSelectedCard(null);
  }

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <div className="image-container" onClick={onEditAvatar}>
            <img
              src={avatar}
              alt="Изображение Вашего профиля"
              className="profile__img"
            />
            <div className="image-container__overlay">
              <svg
                className="image-container__icon"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 1.32827L2.60377 8.7666L1.28302 7.41936L8.66038 0L10 1.32827ZM0 10L1.96226 9.41177L0.584906 8.08349L0 10Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <div className="profile__info">
            <div className="profile__name">
              <h1 className="profile__name-text">{userInfo ? userInfo.name : ''}</h1>
              <div className="profile__name-btn" onClick={onEditProfile}>
                <img
                  src={EditBtn}
                  alt="Кнопка редактировать"
                  className="profile__name-pencil"
                  
                />
              </div>
            </div>
            <h2 className="profile__subtitle">{userInfo && userInfo.company ? userInfo.company.name : ''}</h2>
          </div>
          <div className="profile__btn">
            <button className="profile__btn_style" onClick={onAddPlace}>
              +
            </button>
          </div>
        </div>
      </section>

      <section className="elements">
        <div id="content" className="elements__container">
          {cards.map((card) => (
            <Card 
              key={card.id}
              title={card.title}
              imageSrc={card.image}
              likes={card.likes}
              onLike={() => console.log('Лайк', card.id)} // Заменить на реальный обработчик
              onDelete={() => onCardDelete(card.id)}
              onClick={() => handleCardClick(card)}
            />
            
          ))}
        </div>
      </section>

      <PopupWithImage card={selectedCard} onClose={closeImagePopup} />
      
    </main>
  );
}

export default Main;
