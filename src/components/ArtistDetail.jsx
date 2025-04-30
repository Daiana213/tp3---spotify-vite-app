import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getArtist, getArtistAlbums } from '../api/spotify';
import { getAuth } from '../utils/auth';

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
    <div style={{ padding: "20px" }}>
      <h2>Detalle Artista</h2>
      {artist ? (
        <div>
          {artist.images && artist.images.length > 0 && (
            <img
              src={artist.images[0].url}
              alt={artist.name}
              width="100"
              height="100"
              style={{ borderRadius: "50%" }}
            />
          )}
          <h3>{artist.name}</h3>
          <button onClick={toggleFavorite}>
            {isFavorite ? "Quitar de Favoritos" : "Agregar a Favoritos"}
          </button>
        </div>
      ) : (
        <p>Cargando información del artista...</p>
      )}
      <h3>Álbumes</h3>
      {albums.length === 0 ? (
        <p>No se encontraron álbumes</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {albums.map((album) => (
            <li key={album.id} style={{ margin: "10px 0", display: "flex", alignItems: "center" }}>
              {album.images && album.images.length > 0 && (
                <img src={album.images[0].url} alt={album.name} width="50" height="50" />
              )}
              <span style={{ marginLeft: "10px" }}>
                {album.name} ({album.release_date.substring(0, 4)})
              </span>
              <button onClick={() => navigate(`/album/${album.id}`)} style={{ marginLeft: "10px" }}>
                Ver Detalle
              </button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate("/search")}>Volver a Búsqueda</button>
    </div>
  );
};

export default ArtistDetail;
