import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAlbumDetails } from '../api/spotify';
import { getAuth } from '../utils/auth';

const AlbumDetail = () => {
  const { id } = useParams();
  const auth = getAuth();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [favoriteTracks, setFavoriteTracks] = useState(
    JSON.parse(localStorage.getItem("favoriteTracks") || "[]")
  );

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const data = await getAlbumDetails(id, auth.token);
        setAlbum(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAlbum();
  }, [id, auth.token]);

  const toggleFavoriteTrack = (track) => {
    let favs = JSON.parse(localStorage.getItem("favoriteTracks") || "[]");
    if (favs.find((t) => t.id === track.id)) {
      favs = favs.filter((t) => t.id !== track.id);
    } else {
      favs.push({
        id: track.id,
        name: track.name,
        artist: album.artists[0].name,
        album: album.name,
        albumId: album.id
      });
    }
    localStorage.setItem("favoriteTracks", JSON.stringify(favs));
    setFavoriteTracks(favs);
  };

  const isTrackFavorite = (trackId) => {
    return favoriteTracks.some((t) => t.id === trackId);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Detalle del Álbum</h2>
      {album ? (
        <div>
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', alignItems: 'center' }}>
            {album.images && album.images.length > 0 && (
              <img 
                src={album.images[0].url} 
                alt={album.name} 
                style={{ 
                  width: '200px', 
                  height: '200px', 
                  objectFit: 'cover',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                }} 
              />
            )}
            <div>
              <h3 style={{ marginBottom: '0.5rem' }}>{album.name}</h3>
              <p style={{ color: '#b3b3b3' }}>Artista: {album.artists[0].name}</p>
              <p style={{ color: '#b3b3b3' }}>Fecha de lanzamiento: {album.release_date}</p>
            </div>
          </div>
          <h4>Lista de Canciones:</h4>
          <div className="track-list">
            {album.tracks.items.map((track) => (
              <div key={track.id} className="track-item">
                <div className="track-info">
                  <span className="track-name">{track.name}</span>
                  <span className="track-artist">{album.artists[0].name}</span>
                </div>
                <div className="track-actions">
                  <button onClick={() => toggleFavoriteTrack(track)}>
                    {isTrackFavorite(track.id) ? "Quitar de Favoritos" : "Agregar a Favoritos"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Cargando información del álbum...</p>
      )}
      <button onClick={() => navigate(-1)} style={{ marginTop: '1rem' }}>Volver</button>
    </div>
  );
};

export default AlbumDetail;
