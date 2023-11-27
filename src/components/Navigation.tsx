import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function Navigation() {
  // @ts-ignore
  const [user] = React.useContext(UserContext);
  const location = useLocation();
  const { pathname } = location;
  return (
    <nav className="header-nav">
      <Link to="/recipe">
        <span className={`${pathname === '/recipe' ? 'nmw-bold' : ''}`}>recipes</span>
      </Link>
      |
      <Link to="/">
        <span className={`${pathname === '/' ? 'nmw-bold' : ''}`}>{`${
          user ? 'logout' : 'login'
        }`}</span>
      </Link>
      |
      <Link to="/about">
        <span className={`${pathname === '/about' ? 'nmw-bold' : ''}`}>about</span>
      </Link>
    </nav>
  );
}

export default Navigation;
