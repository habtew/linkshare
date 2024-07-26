"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig'; // Import Firebase auth
import Image from 'next/image'; // Import Image from next/image
import styles from './login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error) {
      setError("Failed to login");
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.login}>
        <div className={styles.header}>
          <Image className={styles.solarlink} src="/solar_link-circle-bold.svg" alt="" width={50} height={50} />
          <Image src="/devlinks.svg" alt="" width={100} height={50} />
        </div>
        <div className={styles.loginsection}>
          <div className={styles.logininfo}>
            <h1>Login</h1>
            <p>Add your details below to get back into the app</p>
          </div>
          <div className={styles.formcontainer}>
            <form onSubmit={handleLogin}>
              <div className={styles.email}>
                <label>Email address</label>
                <div className={styles.emailinput}>
                  <Image src="/ph_envelope-simple-fill.svg" alt="" width={20} height={20} />
                  <input
                    type='email'
                    placeholder='e.g: alex@email.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.password}>
                <label>Password</label>
                <div className={styles.passwordinput}>
                  <Image src="/ph_lock-key-fill.svg" alt="" width={20} height={20} />
                  <input
                    type='password'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <button className={styles.btn} type="submit">Login</button>
            </form>
            <div className={styles.create}>
              <p>Don&apos;t have an account?</p>
              <a href="/signup">Create account</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
