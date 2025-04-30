// src/utils/auth.js

export function saveAuth(token, clientId, clientSecret) {
    const authData = { token, clientId, clientSecret };
    localStorage.setItem("spotifyAuth", JSON.stringify(authData));
  }
  
  export function getAuth() {
    const auth = localStorage.getItem("spotifyAuth");
    return auth ? JSON.parse(auth) : null;
  }
  
  export function removeAuth() {
    localStorage.removeItem("spotifyAuth");
  }
  