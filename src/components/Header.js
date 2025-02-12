import React, { use } from 'react';
import logo from '../images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';


function Header( {isLoggedIn, userEmail, handleLogout} ) {

    const navigate = useNavigate();

    const onLogoutClick = () => {
      handleLogout();
      navigate('/sign-in');
    }
  return (
    <header className="header">
      <a href="/" className="header__logo">
        <img src={logo} alt="Логотип сайта" className="header__image" />
      </a>

      {isLoggedIn ? (
        <div className="header__info">
          <span className="header__email">{userEmail}</span>
          <button className="header__logout" onClick={onLogoutClick}>Выйти</button>
        </div>
      ) : (
        <div className="header__auth-links">
          <Link to="/sign-in" className="header__link">Войти</Link>
          <Link to="/sign-up" className="header__link">Регистрация</Link>
        </div>
      )}
    </header>
  );
}

export default Header;
