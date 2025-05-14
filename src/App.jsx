import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import ArtistSearch from './components/ArtistSearch/ArtistSearch';
import ArtistDetail from './components/ArtistDetail/ArtistDetail';
import AlbumDetail from './components/AlbumDetail/AlbumDetail';
import FavoriteSongs from './components/FavoriteSongs/FavoriteSongs';
import Header from './components/Header/Header';
import './App.css';
import FavoriteArtists from './components/FavoriteArtists/FavoriteArtists';

// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
  const auth = localStorage.getItem("spotifyAuth");
  if (!auth) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Componente para la página 404
const NotFound = () => (
  <div style={{ 
    textAlign: 'center', 
    padding: '2rem',
    color: '#fff',
    marginTop: '100px'
  }}>
    <h1>404 - Página no encontrada</h1>
    <p>Lo sentimos, la página que buscas no existe.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter basename='/tp3---spotify-vite-app/'>
      <div className="container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/search" 
              element={
                <ProtectedRoute>
                  <ArtistSearch />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/artist/:id" 
              element={
                <ProtectedRoute>
                  <ArtistDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/album/:id" 
              element={
                <ProtectedRoute>
                  <AlbumDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/favorites" 
              element={
                <ProtectedRoute>
                  <FavoriteSongs />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/favorite-artists" 
              element={
                <ProtectedRoute>
                  <FavoriteArtists />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
