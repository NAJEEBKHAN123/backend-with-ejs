import React, { useState } from "react";
import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Signup() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:3000/api/users';
      const { data: res } = await axios.post(url, data);
      console.log("API Response:", res);
  
      // Save token to localStorage after successful signup
      localStorage.setItem('token', res.token); // Assuming 'token' is part of the response
  
      navigate('/signin');  // Redirect to sign-in after successful signup
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };
  

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/signin">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Enter First Name"
              name="firstName"
              value={data.firstName}
              className={styles.input}
              required
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Enter Last Name"
              name="lastName"
              value={data.lastName}
              className={styles.input}
              required
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={data.email}
              className={styles.input}
              required
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={data.password}
              className={styles.input}
              required
              onChange={handleChange}
            />
            
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
