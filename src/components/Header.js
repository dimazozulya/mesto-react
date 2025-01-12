import React from 'react';
import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <a href="header__logo">
        <img src={logo} alt="Логотип сайта" className="header__image" />
      </a>
    </header>
  );
}

export default Header;
