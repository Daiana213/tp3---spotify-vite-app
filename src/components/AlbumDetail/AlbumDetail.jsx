import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAlbumDetails } from "/src/api/spotify";
import { getAuth } from '../../utils/auth';
import './AlbumDetail.css';

const AlbumDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = getAuth();
  const [album, setAlbum] = useState(null);
  const [favoriteTracks, setFavoriteTracks] = useState([]);

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
    // Cargar canciones favoritas del localStorage
    const favs = JSON.parse(localStorage.getItem("favoriteTracks") || "[]");
    setFavoriteTracks(favs);
  }, [id, auth.token]);

  const toggleFavorite = (track) => {
    const favs = JSON.parse(localStorage.getItem("favoriteTracks") || "[]");
    const trackWithDetails = {
      id: track.id,
      name: track.name,
      artist: album.artists[0].name,
      album: album.name,
      albumId: album.id
    };

    const isCurrentlyFavorite = favs.some(fav => fav.id === track.id);
    let newFavs;

    if (isCurrentlyFavorite) {
      newFavs = favs.filter(fav => fav.id !== track.id);
    } else {
      newFavs = [...favs, trackWithDetails];
    }

    localStorage.setItem("favoriteTracks", JSON.stringify(newFavs));
    setFavoriteTracks(newFavs);
  };

  const isFavorite = (trackId) => {
    return favoriteTracks.some(track => track.id === trackId);
  };

  if (!album) {
    return <div className="album-detail-container">Cargando álbum...</div>;
  }

  return (
    <div className="album-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        Volver
      </button>
      <div className="album-header">
        <img
          src={album.images[0]?.url || 'https://via.placeholder.com/200'}
          alt={album.name}
          className="album-cover"
        />
        <div className="album-info">
          <h1 className="album-title">{album.name}</h1>
          <p className="album-artist">{album.artists.map(a => a.name).join(', ')}</p>
          <p className="album-release">{album.release_date}</p>
        </div>
      </div>
      <h2 className="tracks-title">Canciones</h2>
      <ul className="track-list">
        {album.tracks.items.map(track => (
          <li key={track.id} className="track-item">
            <span className="track-name">{track.name}</span>
            <div className="track-actions">
              <span className="track-duration">
                {Math.floor(track.duration_ms / 60000)}:
                {String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0')}
              </span>
              <button 
                className={`favorite-button ${isFavorite(track.id) ? 'active' : ''}`}
                onClick={() => toggleFavorite(track)}
              >
                {isFavorite(track.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumDetail;
