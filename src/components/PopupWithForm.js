import React from 'react';
import closeIcon from '../images/close-icon.svg';

function PopupWithForm({ title, name, children, isOpen, onClose }) {
  
  return (
    <section className={`popup popup_type_${name} ${isOpen ? 'popup_active' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-btn" onClick={onClose}>
          <img
            src={closeIcon}
            alt="Кнопка закрытия"
            className="close__icon"
          />
        </button>
        <h2 className="popup__title">{title}</h2>
        <form name={name} className="popup__form" noValidate>
          {children} {/* Здесь вставляется содержимое */}
          <button type="submit" className="popup__submit-button">Сохранить</button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
