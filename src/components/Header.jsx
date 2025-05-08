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
    <header>
      <nav>
        <div className="nav-left">
          <Link to="/search">Buscar Artistas</Link>
          <Link to="/favorites">Canciones Favoritas</Link>
        </div>
        
        <div className="nav-center">
          <img 
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" 
            alt="Spotify Logo" 
            className="spotify-logo"
          />
        </div>

        <div className="nav-right">
          <button 
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: '2px solid #1db954',
              color: '#1db954',
              padding: '0.75rem 1.25rem',
              borderRadius: '25px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '1.1rem',
              fontWeight: '500'
            }}
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
