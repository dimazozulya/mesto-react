import React from 'react';
import closeIcon from '../images/close-icon.svg';

function PopupWithImage ({card, onClose}){
    if (!card) {
        return null;
      }
    return(
        <div id="popup-image" className={`popup popup__element ${card ? "popup_active" : ""}`}>
            <div className="popup__element-container">
                <button className="popup__close-btn popup__element-close" onClick={onClose}>
                    <img id="popup-image-pic" src={closeIcon} alt="Кнопка закрытия" className="close__icon"/>
                </button>
                <div className="popup__content-container">
                    {card && (
                        <>
                            <img 
                                className="element__image_popup show_img"
                                src={card.image} // Указываем правильный атрибут `src`
                                alt='Картинка карточки'
                            />
                        </>
                    )}
                    <h2 className="element__title_popup show_txt">{card.title}</h2>
                </div>
            </div>
        </div>  
    );
}

export default PopupWithImage;