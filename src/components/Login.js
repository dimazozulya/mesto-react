import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../utils/AuthApi';
import logo from '../images/logo.svg';
import InfoToolTip from '../utils/InfoToolTip';


function Login ({ setIsLoggedIn }) {

    
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isSuccess, setIsSucces] = useState(false);
    const [message, setMessage] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const [ email, setEmail ] = useState ('');
    const [ password, setPassword ] = useState ('');
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return; 
        setIsLoading(true);
        try{
            console.log('Входим в систему: ', { email, password });
            const response = await loginUser ({ email, password });

            if (response.token){
                localStorage.setItem('token', response.token);
                localStorage.setItem('userEmail', email);
                setIsLoggedIn(true);

                setIsSucces(true);
                setMessage('Вы успешно вошли в аккаунт!');

                setUserEmail(email);
                setIsPopupOpen(true); 


                setTimeout(() =>{
                    navigate('/');
                }, 1500);
            }
        } catch (err){
            setIsSucces(false);
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
      <Link to="/sign-up" className='header__sign'>Регистрация</Link>
        </header>
        <div className='auth-container'>
            <h2>Вход</h2>
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
                <button className='submit__button' type='submit'>Войти</button>

                <InfoToolTip isOpen={isPopupOpen} onClose={handleClosePopup} isSuccess={isSuccess} message={message}/>
            </form>

        </div>
        </>
    )

}


export default Login;