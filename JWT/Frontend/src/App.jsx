// Login.js (React Component)
import React, { useState } from 'react';
import axios from 'axios';
import Sign from './signup';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      localStorage.setItem('token', response.data.token);
      alert('Login successful!');
    } catch (err) {
      console.log('error in login', err)
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <Sign/>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
