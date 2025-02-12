import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../utils/AuthApi';
import logo from '../images/logo.svg';
import InfoToolTip from '../utils/InfoToolTip';


function Registration() {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isSuccess, setIsSucces] = useState(false);
    const [message, setMessage] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try { 
            console.log ('Регистрируем пользователя : ', { email, password });
            const response = await registerUser({ email, password });

            if (response.token){
                setIsSucces(true);
                setMessage('Регистрация прошла успешно!');
                setIsPopupOpen(true);
                
                setTimeout(() => {
                    navigate('/sign-in');
                }, 2000);
            }
        } catch (err){
                setIsSucces(false)
                setMessage('Что-то пошло не так! Попробуйте еще раз!');
                setIsPopupOpen(true);
        }
    };
    const handleClosePopup = () => {
        setIsPopupOpen(false);
    }

    return (
        <>
        <header className="header-auth">
      <a href="header__logo">
        <img src={logo} alt="Логотип сайта" className="header__image" />
      </a>
      <Link to="/sign-in" className='header__sign'>Войти</Link>
        </header>
        <div className="auth-container">
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    type='password'
                    placeholder='Пароль'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className='submit__button' type='submit'>Зарегистрироваться</button>
            </form>
            <InfoToolTip isOpen={isPopupOpen} onClose={handleClosePopup} isSuccess={isSuccess} message={message}/>
        </div>
        </>
    )
}

export default Registration;