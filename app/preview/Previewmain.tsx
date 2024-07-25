"use client"

import React, { useEffect, useState } from 'react';
import styles from './previewmain.module.css';
import { db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';

type Link = {
  id: number;
  platform: string;
  url: string;
};

type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  links: Link[];
  profileImage: string;
};

const Previewmain = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const data = userDoc.data() as UserProfile;
            setProfile(data);
          }
        } catch (error) {
          console.error('Error fetching profile: ', error);
        }
      };

      fetchProfile();
    }
  }, [user]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.previewmain}>
      <div className={styles.profilecontainer}>
        <img src={profile.profileImage} alt="Profile" />
        <h1>{`${profile.firstName} ${profile.lastName}`}</h1>
        <p>{profile.email}</p>
      </div>
      <div className={styles.linkscontainer}>
        {profile.links.map((link) => (
          <div className={`${styles.linkcard} ${styles[link.platform]}`} key={link.id}>
            <img src={`/${link.platform}.svg`} alt={link.platform} />
            <p>{link.platform}</p>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              <img src="/mdi_arrow-right.svg" alt="Link" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Previewmain;
