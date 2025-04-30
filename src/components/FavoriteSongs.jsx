import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ padding: "20px" }}>
      <h2>Canciones Favoritas</h2>
      {favoriteTracks.length === 0 ? (
        <p>No hay canciones favoritas</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {favoriteTracks.map((track) => (
            <li key={track.id} style={{ margin: "10px 0" }}>
              <strong>{track.name}</strong> – {track.artist} ({track.album})
              <button onClick={() => removeFavorite(track.id)} style={{ marginLeft: "10px" }}>
                Eliminar
              </button>
              {track.albumId && (
                <button onClick={() => navigate(`/album/${track.albumId}`)} style={{ marginLeft: "10px" }}>
                  Ver Álbum
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate("/search")}>Volver a Búsqueda</button>
    </div>
  );
};

export default FavoriteSongs;
