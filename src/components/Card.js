import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/currentUserContext';

function Card ({ card, onCardLike, onDelete, onClick}){

    const currentUser = useContext(CurrentUserContext);

    if(!card){
        console.error('Card object is missing');
        return null;
    }

    const { title, image, likes, owner, id } = card;

    const isOwn = card.owner?._id === currentUser?._id;

    const isLiked = Array.isArray(card.likes) && card.likes.some((like) => like._id === currentUser?._id);

    const cardLikeButtonClassName = `card__like-button ${isLiked && 'card__like-button_active'}`;

    const handleLikeClick = () => {
        onCardLike(card);
    }

    return(
        <div id="card" className="template-card">
            
            <div className="element__card">
                {/* {isOwn && (
                    <div 
                    className="element__card_remove element__delete-button_visible"
                    onClick={onDelete}>
                        <svg 
                        className='element__card_remove_styles'
                        width="18" 
                        height="19" 
                        viewBox="0 0 18 19" 
                        fill="currentColor" 
                        xmlns="http://www.w3.org/2000/svg">
                            <path 
                                d="M2.45787 17.86C2.51882 18.52 3.06735 19 3.73778 19H14.2615C14.9319 19 15.4804 18.5 15.5414 17.86L16.7197 5.69995H1.27954L2.45787 17.86Z" 
                                fill=""/>
                            <path 
                                d="M16.7201 1.9H11.5801V1.26C11.5801 0.560001 11.0113 0 10.3002 0H7.72009C7.00903 0 6.44018 0.560001 6.44018 1.26V1.9H1.27991C0.568849 1.9 0 2.46 0 3.16C0 3.86001 0.568849 4.42001 1.27991 4.42001H16.7201C17.4312 4.42001 18 3.86001 18 3.16C18 2.46 17.4312 1.9 16.7201 1.9Z" 
                                fill="white"/>
                        </svg>
                    </div>
                )} */}
                <div 
                    className="element__card_remove element__delete-button_visible"
                    onClick={onDelete}>
                        <svg 
                        className='element__card_remove_styles'
                        width="18" 
                        height="19" 
                        viewBox="0 0 18 19" 
                        fill="currentColor" 
                        xmlns="http://www.w3.org/2000/svg">
                            <path 
                                d="M2.45787 17.86C2.51882 18.52 3.06735 19 3.73778 19H14.2615C14.9319 19 15.4804 18.5 15.5414 17.86L16.7197 5.69995H1.27954L2.45787 17.86Z" 
                                fill=""/>
                            <path 
                                d="M16.7201 1.9H11.5801V1.26C11.5801 0.560001 11.0113 0 10.3002 0H7.72009C7.00903 0 6.44018 0.560001 6.44018 1.26V1.9H1.27991C0.568849 1.9 0 2.46 0 3.16C0 3.86001 0.568849 4.42001 1.27991 4.42001H16.7201C17.4312 4.42001 18 3.86001 18 3.16C18 2.46 17.4312 1.9 16.7201 1.9Z" 
                                fill="white"/>
                        </svg>
                    </div>
              
                <img 
                    src={image} 
                    alt={title} 
                    className="element__image_style"
                    onClick={onClick}
                />
           
                

                <div className="element__container">
                    <h2 className="element__title element__title_card">{title}</h2>
                            <div className="element__like_container">
                            <button 
                                className={cardLikeButtonClassName}
                                // Замените следующую строку на реальный обработчик лайка
                                onClick={handleLikeClick} 
                                >
                                <svg 
                                    className='element__like-svg' 
                                    width="32px" 
                                    height="30px" 
                                    viewBox="0 0 24 24" 
                                    fill="currentColor" 
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path 
                                    fillRule="evenodd" 
                                    clipRule="evenodd" 
                                    d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" 
                                    stroke="#000000" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                                <span className="element__like-count">{Array.isArray(card.likes) ? card.likes.length : 0}</span>
                            </div>
                </div>
            </div>
        </div>
    );
}

export default Card; 