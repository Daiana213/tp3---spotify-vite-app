import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ArtistSearch from './components/ArtistSearch';
import ArtistDetail from './components/ArtistDetail';
import AlbumDetail from './components/AlbumDetail';
import FavoriteSongs from './components/FavoriteSongs';
import Header from './components/Header';
import './App.css';

const auth = localStorage.getItem("spotifyAuth");

console.log(auth);

function App() {
  return (
    <BrowserRouter basename='/tp3---spotify-vite-app/'>
      <div className="container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={auth ? <ArtistSearch /> : <Navigate to="/login" />} />
            <Route path="/artist/:id" element={auth ? <ArtistDetail /> : <Navigate to="/login" />} />
            <Route path="/album/:id" element={auth ? <AlbumDetail /> : <Navigate to="/login" />} />
            <Route path="/favorites" element={auth ? <FavoriteSongs /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
