import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAccessToken } from '../api/spotify';
import { saveAuth } from '../utils/auth';

const Login = () => {
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await fetchAccessToken(clientId, clientSecret);
      saveAuth(token, clientId, clientSecret);
      navigate('/search');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login – Ingresa tus credenciales de Spotify</h2>
        <div className="form-group">
          <label htmlFor="clientId">CLIENT_ID:</label>
          <input
            id="clientId"
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            required
            placeholder="Ingresa tu Client ID"
          />
        </div>
        <div className="form-group">
          <label htmlFor="clientSecret">CLIENT_SECRET:</label>
          <input
            id="clientSecret"
            type="password"
            value={clientSecret}
            onChange={(e) => setClientSecret(e.target.value)}
            required
            placeholder="Ingresa tu Client Secret"
          />
        </div>
        <button type="submit" className="login-button">
          Obtener Token y Continuar
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
