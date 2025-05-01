import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeAuth } from '../utils/auth';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAuth();
    navigate('/login');
  };

  return (
    <header style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <nav>
        <Link to="/search" style={{ marginRight: '10px' }}>Buscar Artistas</Link>
        <Link to="/favorites" style={{ marginRight: '10px' }}>Canciones Favoritas</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
};

export default Header;
