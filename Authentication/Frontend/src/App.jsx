import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './Components/Main';
import Signup from './Components/Signup';
import Signin from './Components/SignIn';

function App() {
  const user = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        {/* If user is logged in, show Main at "/" */}
        <Route path="/" element={user ? <Main /> : <Navigate replace to="/signin" />} />
        
        {/* Signup and Signin routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        
        {/* Catch-all redirect to Signin if no matching route is found */}
        <Route path="*" element={<Navigate replace to="/signin" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
