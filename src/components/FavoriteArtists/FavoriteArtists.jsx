import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArtist } from '../../api/spotify'; 
import { getAuth } from '../../utils/auth';
import './FavoriteArtists.css';

const FavoriteArtists = () => {
  const [favoriteArtists, setFavoriteArtists] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const fetchArtists = async () => {
      const storedArtists = JSON.parse(localStorage.getItem("favoriteArtists") || "[]");

      const updatedArtists = await Promise.all(storedArtists.map(async (artist) => {
        if (!artist.image) {
          try {
            const artistData = await getArtist(artist.id, auth.token);
            return {
              ...artist,
              image: artistData.images?.[0]?.url || 'https://via.placeholder.com/200'
            };
          } catch (error) {
            console.error(`Error al obtener imagen para ${artist.name}:`, error);
            return artist;
          }
        }
        return artist;
      }));

      setFavoriteArtists(updatedArtists);
      localStorage.setItem("favoriteArtists", JSON.stringify(updatedArtists));
    };

    fetchArtists();
  }, [auth.token]);

  const removeFavorite = (artistId) => {
    const updatedArtists = favoriteArtists.filter(artist => artist.id !== artistId);
    localStorage.setItem("favoriteArtists", JSON.stringify(updatedArtists));
    setFavoriteArtists(updatedArtists);
  };

  return (
    <div className="favorite-artists-container">
      <h1>Mis Artistas Favoritos</h1>
      {favoriteArtists.length === 0 ? (
        <p className="no-favorites">No tienes artistas favoritos aún</p>
      ) : (
        <div className="artists-grid">
          {favoriteArtists.map(artist => (
            <div key={artist.id} className="artist-card">
              <img 
                src={artist.image} 
                alt={artist.name} 
                className="artist-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200';
                  e.target.onerror = null;
                }}
              />
              <h3 className="artist-name">{artist.name}</h3>
              <div className="artist-actions">
                <button 
                  className="view-button"
                  onClick={() => navigate(`/artist/${artist.id}`)}
                >
                  Ver Artista
                </button>
                <button 
                  className="remove-button"
                  onClick={() => removeFavorite(artist.id)}
                >
                  Quitar de Favoritos
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteArtists;
