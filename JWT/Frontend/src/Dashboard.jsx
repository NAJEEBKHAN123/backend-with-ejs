// Dashboard.js
import React, { useEffect, useState } from 'react';
import axiosInstance from './axiosInstance.js';

function Dashboard() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axiosInstance.get('/dashboard')
      .then(response => setMessage(response.data.message))
      .catch(err => setMessage('You are not authorized', err));
  }, []);

  return <div>{message}</div>;
}

export default Dashboard;
