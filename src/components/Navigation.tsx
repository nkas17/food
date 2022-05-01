import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  const { pathname } = location;
  return (
    <nav className="header-nav">
      <Link to="/">
        <span className={`${pathname === '/' ? 'bold' : ''}`}>home</span>
      </Link>
      |
      <Link to="/recipe">
        <span className={`${pathname === '/recipe' ? 'bold' : ''}`}>recipes</span>
      </Link>
      |
      <Link to="/about">
        <span className={`${pathname === '/about' ? 'bold' : ''}`}>about</span>
      </Link>
    </nav>
  );
}

export default Navigation;
