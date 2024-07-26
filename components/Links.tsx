import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Import Image from next/image
import styles from './Links.module.css';
import Addlink from './Addlink';
import { db } from '@/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';

type Link = {
  id: number;
  platform: string;
  url: string;
};

const Links = () => {
  const { user } = useAuth();
  const [links, setLinks] = useState<Link[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchLinks = async () => {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            const existingLinks = data.links || [];
            setLinks(existingLinks);
          }
        } catch (error) {
          console.error('Error fetching links: ', error);
        }
      };

      fetchLinks();
    }
  }, [user]);

  const handleAddLinkClick = () => {
    const newId = links.length > 0 ? Math.max(...links.map(link => link.id)) + 1 : 1;
    setLinks([...links, { id: newId, platform: '', url: '' }]);
  };

  const updateLink = (id: number, platform: string, url: string) => {
    setLinks(links.map(link => link.id === id ? { ...link, platform, url } : link));
  };

  const removeLink = (id: number) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);

    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { links }, { merge: true });
      console.log('Links saved successfully');
      setLinks([]); // Clear the links state
    } catch (error) {
      console.error('Error saving links: ', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.mainContent}>
      <div className={styles.customizecontainer}>
        <div className={styles.info}>
          <h1>Customize your links</h1>
          <p>Add/edit/remove links below and then share all your profiles with the world!</p>
        </div>
        <button onClick={handleAddLinkClick}>+ Add new link</button>
      </div>
      {links.length === 0 ? (
        <div className={styles.emptycontainer}>
          <Image src="/Group 273.svg" alt="Empty State" width={100} height={100} /> {/* Updated Image component */}
          <h1>Let’s get you started</h1>
          <p>Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!</p>
        </div>
      ) : (
        links.map(link => (
          <Addlink key={link.id} link={link} updateLink={updateLink} removeLink={removeLink} />
        ))
      )}
      <footer className={styles.footer}>
        <button className={styles.saveButton} onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </footer>
    </div>
  );
};

export default Links;
