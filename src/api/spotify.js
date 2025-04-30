// src/api/spotify.js

// Obtiene el token de acceso con CLIENT_ID y CLIENT_SECRET
export async function fetchAccessToken(clientId, clientSecret) {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`)
      },
      body: "grant_type=client_credentials"
    });
    const data = await response.json();
    if (response.ok) {
      return data.access_token;
    } else {
      throw new Error(data.error_description || "Error al obtener el token");
    }
  }
  
  // Busca artistas utilizando el endpoint de búsqueda de Spotify
  export async function searchArtists(query, token) {
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=artist&q=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    const data = await response.json();
    return data.artists.items;
  }
  
  // Obtiene datos de un artista por su ID
  export async function getArtist(artistId, token) {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  }
  
  // Obtiene los álbumes del artista (albumes y singles)
  export async function getArtistAlbums(artistId, token) {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&market=US`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    const data = await response.json();
    return data.items;
  }
  
  // Obtiene los detalles de un álbum (incluyendo tracks)
  export async function getAlbumDetails(albumId, token) {
    const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  }
  