import React, { useState } from 'react';
import styles from '../styles/login.module.css';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if(username === "admin" && password === "admin") {
      localStorage.setItem('logged_in', 'true');
      window.location.href = '/dashboard';
    } else {
      alert("Incorrect username or password");
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Protocol Manager</h2>
        <label>
          <input 
            className={styles.input}
            type="text" 
            placeholder="Username"
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </label>
        <label>
          <input 
            
            className={styles.input}
            type="password" 
            placeholder="Password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </label>
        <input className={styles.button} type="submit" value="Login" />
      </form>
    </div>
  )
}
