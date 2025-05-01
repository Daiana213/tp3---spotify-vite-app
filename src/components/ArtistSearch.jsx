import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchArtists } from '../api/spotify';
import { getAuth } from '../utils/auth';

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
    <div style={{ padding: "20px" }}>
      <h2>Buscar Artistas</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ingresa el nombre del artista"
        />
        <button type="submit">Buscar</button>
      </form>
      <div>
        <h3>Resultados:</h3>
        {artists.length === 0 ? (
          <p>No se encontraron artistas</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {artists.map((artist) => (
              <li
                key={artist.id}
                onClick={() => handleArtistClick(artist)}
                style={{
                  cursor: "pointer",
                  margin: "10px 0",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                {artist.images && artist.images.length > 0 && (
                  <img
                    src={artist.images[0].url}
                    alt={artist.name}
                    width="50"
                    height="50"
                    style={{ borderRadius: "50%" }}
                  />
                )}
                <span style={{ marginLeft: "10px" }}>{artist.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ArtistSearch;
