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
    <div style={{ padding: "20px" }}>
      <h2>Login – Ingresa tus credenciales de Spotify</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>CLIENT_ID:</label>
          <input
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>CLIENT_SECRET:</label>
          <input
            type="password"
            value={clientSecret}
            onChange={(e) => setClientSecret(e.target.value)}
            required
          />
        </div>
        <button type="submit">Obtener Token y Continuar</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
