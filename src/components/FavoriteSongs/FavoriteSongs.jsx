import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FavoriteSongs.css';

const FavoriteSongs = () => {
  const [favoriteTracks, setFavoriteTracks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favoriteTracks") || "[]");
    setFavoriteTracks(favs);
  }, []);

  const removeFavorite = (trackId) => {
    const updated = favoriteTracks.filter((track) => track.id !== trackId);
    localStorage.setItem("favoriteTracks", JSON.stringify(updated));
    setFavoriteTracks(updated);
  };

  return (
    <div className="favorite-songs-container">
      <h2>Mis Canciones Favoritas</h2>
      {favoriteTracks.length === 0 ? (
        <p>No hay canciones favoritas</p>
      ) : (
        <div className="track-list">
          {favoriteTracks.map((track) => (
            <div key={track.id} className="track-item">
              <div className="track-info">
                <span className="track-name">{track.name}</span>
                <span className="track-artist">{track.artist} - {track.album}</span>
              </div>
              <div className="track-actions">
                <button onClick={() => removeFavorite(track.id)}>
                  Eliminar
                </button>
                {track.albumId && (
                  <button onClick={() => navigate(`/album/${track.albumId}`)}>
                    Ver Álbum
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <button 
        onClick={() => navigate("/search")} 
        className="back-to-search-btn"
      >
        Volver a Búsqueda
      </button>
    </div>
  );
};

export default FavoriteSongs;
