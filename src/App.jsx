import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ArtistSearch from './components/ArtistSearch';
import ArtistDetail from './components/ArtistDetail';
import AlbumDetail from './components/AlbumDetail';
import FavoriteSongs from './components/FavoriteSongs';
import Header from './components/Header';

const auth = localStorage.getItem("spotifyAuth");

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={auth ? <ArtistSearch /> : <Navigate to="/login" />} />
        <Route path="/artist/:id" element={auth ? <ArtistDetail /> : <Navigate to="/login" />} />
        <Route path="/album/:id" element={auth ? <AlbumDetail /> : <Navigate to="/login" />} />
        <Route path="/favorites" element={auth ? <FavoriteSongs /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={auth ? "/search" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
