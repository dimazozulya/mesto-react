import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onSubmit, currentUser }){

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect (() => {
        if(currentUser) {
            console.log('Текущий пользователь:', currentUser);
            setName(currentUser.name || '');
            setDescription (currentUser.company?.name || '');
        }
    }, [currentUser, isOpen]);

    const handleNameChange = (e) => {
        setName (e.target.value)
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            name,
            about : description,
        });
    };

    return (
        <PopupWithForm
          title="Редактировать профиль"
          name="edit-profile"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
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
              onChange={handleNameChange}
              value={name}
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
              value={description}
              onChange={handleDescriptionChange}
            />
            <span className="error-message job-error"></span>
          </div>
        </PopupWithForm>
    );
}

export default EditProfilePopup;