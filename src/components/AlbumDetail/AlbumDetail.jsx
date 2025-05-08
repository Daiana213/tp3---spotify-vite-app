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
            <span className="track-duration">
              {Math.floor(track.duration_ms / 60000)}:
              {String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0')}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumDetail;
