import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchArtists } from '../../api/spotify';
import { getAuth } from '../../utils/auth';
import './ArtistSearch.css';

const ArtistSearch = () => {
  const defaultImage = 'https://i.scdn.co/image/ab67616d0000b273b40a0a8c8f97594b8f99b507';
  
  const [query, setQuery] = useState('');
  const [artists, setArtists] = useState([]);
  const [favoriteArtists, setFavoriteArtists] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const loadFavorites = () => {
      const favs = JSON.parse(localStorage.getItem("favoriteArtists") || "[]");
      setFavoriteArtists(favs);
    };
    loadFavorites();
    // Agregar un event listener para actualizar los favoritos cuando cambien
    window.addEventListener('storage', loadFavorites);
    return () => window.removeEventListener('storage', loadFavorites);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query) {
      try {
        const results = await searchArtists(query, auth.token);
        setArtists(results);
      } catch (error) {
        console.error(error);
      }
    }
  };  

  const handleArtistClick = (artist) => {
    navigate(`/artist/${artist.id}`, { state: { artist } });
  };

  const getArtistImage = (artist) => {
    return artist.images?.[0]?.url || artist.image || defaultImage;
  };

  return (
    <div className="search-container">
      <div className="search-main">
        <h1 className="search-title">Buscar Artistas</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ingresa el nombre del artista"
            className="search-input"
          />
          <button type="submit" className="search-button">
            Buscar Artista
          </button>
        </form>

        <div className="artists-list">
          {artists.length === 0 ? (
            <p className="no-results">No se encontraron artistas</p>
          ) : (
            artists.map((artist) => (
              <div
                key={artist.id}
                onClick={() => handleArtistClick(artist)}
                className="artist-item"
              >
                <img 
                  src={getArtistImage(artist)} 
                  alt={artist.name}
                  className="artist-thumbnail"
                  onError={(e) => {
                    e.target.src = defaultImage;
                  }}
                />
                <div className="artist-info">
                  <h3 className="artist-name">{artist.name}</h3>
                  <p className="artist-type">{artist.type}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="favorites-sidebar">
        <h3>Artistas Favoritos</h3>
        {favoriteArtists.length === 0 ? (
          <p className="no-favorites">No hay artistas favoritos</p>
        ) : (
          favoriteArtists.map(artist => (
            <div
              key={artist.id}
              className="favorite-artist-item"
              onClick={() => navigate(`/artist/${artist.id}`)}
            >
              <img
                src={getArtistImage(artist)}
                alt={artist.name}
                className="favorite-artist-image"
                onError={(e) => {
                  e.target.src = defaultImage;
                }}
              />
              <span className="favorite-artist-name">{artist.name}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ArtistSearch;
