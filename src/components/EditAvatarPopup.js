import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup ({ isOpen, onClose, onUpdateAvatar }){

    const avatarRef = useRef();

    useEffect(() => {
        if(!isOpen) {
            avatarRef.current.value = '';
        }
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return(

        <PopupWithForm
          title="Обновить аватар"
          name="edit-avatar"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        >
          <div className="input__wrapper">
            <input
              type="url"
              name="avatar"
              className="popup__input popup__input-avatar"
              placeholder="Ссылка на аватар"
              ref={avatarRef}
              required
            />
            <span className="error-message avatar-error"></span>
          </div>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;

