import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getArtist, getArtistAlbums } from '../../api/spotify';
import { getAuth } from '../../utils/auth';
import './ArtistDetail.css';

const ArtistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = getAuth();
  const location = useLocation();

  // Reutiliza información pasada vía state si la hubiera
  const [artist, setArtist] = useState(location.state?.artist || null);
  const [albums, setAlbums] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!artist) {
      const fetchArtist = async () => {
        try {
          const data = await getArtist(id, auth.token);
          setArtist(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchArtist();
    }

    const fetchAlbums = async () => {
      try {
        const data = await getArtistAlbums(id, auth.token);
        setAlbums(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlbums();
    checkFavorite();
  }, [id, artist]);

  const checkFavorite = () => {
    const favs = JSON.parse(localStorage.getItem("favoriteArtists") || "[]");
    setIsFavorite(favs.some((fav) => fav.id === id));
  };

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem("favoriteArtists") || "[]");
    if (isFavorite) {
      const newFavs = favs.filter((fav) => fav.id !== id);
      localStorage.setItem("favoriteArtists", JSON.stringify(newFavs));
      setIsFavorite(false);
    } else {
      const newFav = artist || { id, name: "Desconocido" };
      localStorage.setItem("favoriteArtists", JSON.stringify([...favs, newFav]));
      setIsFavorite(true);
    }
  };

  return (
    <div className="main-content">
      <div 
        className="artist-profile"
        style={{
          '--artist-image': `url(${artist?.images[0]?.url || 'https://via.placeholder.com/400'})`
        }}
      >
        <img 
          src={artist?.images[0]?.url || 'https://via.placeholder.com/400'} 
          alt={artist?.name || 'Artista Desconocido'}
          className="artist-image"
        />
        <div className="artist-info">
          <h1 className="artist-name">{artist?.name || 'Artista Desconocido'}</h1>
          <button 
            className={`favorite-button ${isFavorite ? 'active' : ''}`}
            onClick={toggleFavorite}
          >
            {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          </button>
        </div>
      </div>

      <h3 className="albums-section">Álbumes</h3>
      {albums.length === 0 ? (
        <p>No se encontraron álbumes</p>
      ) : (
        <div className="track-list">
          {albums.map((album) => (
            <div key={album.id} className="track-item">
              {album.images && album.images.length > 0 && (
                <img 
                  src={album.images[0].url} 
                  alt={album.name} 
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '4px',
                    objectFit: 'cover'
                  }} 
                />
              )}
              <div className="track-info">
                <span className="track-name">{album.name}</span>
                <span className="track-artist">
                  {album.release_date.substring(0, 4)}
                </span>
              </div>
              <div className="track-actions">
                <button onClick={() => navigate(`/album/${album.id}`)}>
                  Ver Detalle
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button 
        onClick={() => navigate("/search")} 
        className="back-button"
      >
        Volver a Búsqueda
      </button>
    </div>
  );
};

export default ArtistDetail;
