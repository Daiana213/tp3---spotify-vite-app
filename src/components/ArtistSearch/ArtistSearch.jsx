import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchArtists } from '../../api/spotify';
import { getAuth } from '../../utils/auth';
import './ArtistSearch.css';

const ArtistSearch = () => {
  const [query, setQuery] = useState('');
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();

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

  return (
    <div className="search-container">
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
                src={artist.images[0]?.url || 'https://via.placeholder.com/80'} 
                alt={artist.name}
                className="artist-thumbnail"
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
  );
};

export default ArtistSearch;
