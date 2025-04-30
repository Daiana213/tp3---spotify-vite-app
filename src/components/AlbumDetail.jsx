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
          {album.images && album.images.length > 0 && (
            <img src={album.images[0].url} alt={album.name} width="200" />
          )}
          <h3>{album.name}</h3>
          <p>Artista: {album.artists[0].name}</p>
          <h4>Lista de Canciones:</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {album.tracks.items.map((track) => (
              <li key={track.id} style={{ margin: "5px 0" }}>
                {track.name}
                <button onClick={() => toggleFavoriteTrack(track)} style={{ marginLeft: "10px" }}>
                  {isTrackFavorite(track.id) ? "Quitar de Favoritos" : "Agregar a Favoritos"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Cargando información del álbum...</p>
      )}
      <button onClick={() => navigate(-1)}>Volver</button>
    </div>
  );
};

export default AlbumDetail;
