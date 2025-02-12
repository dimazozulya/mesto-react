import React, { useState  } from 'react'; 
import PopupWithForm from './PopupWithForm';

function AddPlacePopup ({ isOpen, onClose, onAddPlace }){

    const [ title, setTitle ] = useState('');
    const [ image, setImage ] = useState('');

    function handleTitleChange (e) {
        setTitle ( e.target.value );
    }

    function handleImageChange (e) {
        setImage( e.target.value );
    }

    function handleSubmit (e) {
        e.preventDefault();
        console.log('Отправляем данные: ', {title, image} );
        onAddPlace ({title, image});
        setTitle(""); 
        setImage("");
    }

    return (
        <PopupWithForm
          title="Новое место"
          name="add-place"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
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
              value={title}
              onChange={handleTitleChange}
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
              value={image}
              onChange={handleImageChange}
            />
            <span className="error-message link-error"></span>
          </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup;