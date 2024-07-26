"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig'; // Import Firebase auth
import styles from './signup.module.css';
import Image from 'next/image'; // Import Image from next/image

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/login');
    } catch (error) {
      setError("Failed to create an account");
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.login}>
        <div className={styles.header}>
          <Image className={styles.solarlink} src="/solar_link-circle-bold.svg" alt="Solar Link" width={100} height={100} />
          <Image src="/devlinks.svg" alt="Dev Links" width={100} height={100} />
        </div>
        <div className={styles.loginsection}>
          <div className={styles.logininfo}>
            <h1>Signup</h1>
            <p>Create a new account</p>
          </div>
          <div className={styles.formcontainer}>
            <form onSubmit={handleSignup}>
              <div className={styles.email}>
                <label>Email address</label>
                <div className={styles.emailinput}>
                  <Image src="/ph_envelope-simple-fill.svg" alt="Envelope" width={24} height={24} />
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
                  <Image src="/ph_lock-key-fill.svg" alt="Lock" width={24} height={24} />
                  <input
                    type='password'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.password}>
                <label>Confirm Password</label>
                <div className={styles.passwordinput}>
                  <Image src="/ph_lock-key-fill.svg" alt="Lock" width={24} height={24} />
                  <input
                    type='password'
                    placeholder='Confirm your password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <button className={styles.btn} type="submit">Create new account</button>
            </form>
            <div className={styles.create}>
              <p>Already have an account </p>
              <a href="/login">Login</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signup;
