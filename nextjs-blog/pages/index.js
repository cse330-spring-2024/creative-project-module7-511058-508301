import Head from 'next/head';
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css';
import { useState } from 'react';

export default function Home() {
  const router = useRouter()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    // Prevent the default form submission
    e.preventDefault();
    // Send request to the server with username and password
    // You can use fetch or any other library to make the request
    // Example using fetch:
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      // For example, you can redirect to another page
      router.push('/about');
    })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error('Error:', error);
    });
  }
//onSubmit={handleSubmit}
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Login
        </h1>
        <form>
          <label>
            Username:
            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit" onClick={() => router.push('/supabasetest/supabasetest')}>Login</button>
        </form>
        <button type="submit" onClick={() => router.push('/supabasetest/supabasetest')}>Login</button>
      </main>

      {/* Rest of the code */}
    </div>
  );
}
