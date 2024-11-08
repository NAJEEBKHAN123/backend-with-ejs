// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Send signup request to backend
      const response = await axios.post('http://localhost:3000/signup', { username, password });
      setMessage(response.data.message); // Success message from backend
    } catch (err) {
      // If error occurs, display it
      setError(err.response ? err.response.data.message : 'Something went wrong');
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
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
        <button type="submit">Signup</button>
      </form>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
}

export default Signup;
