import React from 'react';
import successIcon from '../images/successIcon.svg';
import errorIcon from '../images/errorIcon.svg';
import closeIcon from '../images/close-icon.svg'

function InfoToolTip({isOpen, onClose, isSuccess, message}){
    return(
        <div className={`popup ${isOpen ? 'popup_active' : ''}`}>
            <div className='popup__container'>
            <button className="popup__close-btn" onClick={onClose}>
                <img
                    src={closeIcon}
                    alt="Кнопка закрытия"
                />
            </button>
                <img 
                    className='popup__icon'
                    src={isSuccess ? successIcon : errorIcon}
                    alt={isSuccess ? 'Успех' : 'Ошибка'}/>
                <p className='popup__message'>{message}</p>
            </div>
        </div>
    )    
}

export default InfoToolTip;