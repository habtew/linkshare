import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Import Image from next/image
import styles from './Profile.module.css';

const Profile = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const fetchProfileImage = async () => {
        const storage = getStorage();
        const imageRef = ref(storage, `profileImages/${user.uid}`);
        try {
          const downloadUrl = await getDownloadURL(imageRef);
          setProfileImageUrl(downloadUrl);
        } catch (error) {
          console.error('Error fetching profile image: ', error);
        }
      };

      fetchProfileImage();
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);

    const storage = getStorage();
    const db = getFirestore();

    try {
      if (profileImage) {
        const imageRef = ref(storage, `profileImages/${user.uid}`);
        await uploadBytes(imageRef, profileImage);
        const downloadUrl = await getDownloadURL(imageRef);
        setProfileImageUrl(downloadUrl);
      }

      const userRef = doc(db, 'users', user.uid);
      const userProfile = {
        firstName,
        lastName,
        email,
        profileImage: profileImageUrl || '',
      };

      await setDoc(userRef, userProfile, { merge: true });

      // Redirect to the preview page after successful submission
      router.push('/preview');
    } catch (error) {
      setError('Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.profile}>
      <div className={styles.profileinfo}>
        <h1>Profile Details</h1>
        <p>Add your details to create a personal touch to your profile.</p>
      </div>
      <div className="profedit">
        <form onSubmit={handleSave}>
          <div className={styles.imgcontainer}>
            <p>Profile picture</p>
            <div className={styles.img} onClick={() => document.getElementById('profileImageInput')?.click()}>
              {profileImageUrl ? (
                <Image
                  src={profileImageUrl}
                  alt="Profile Image"
                  width={1024}
                  height={1024}
                />
              ) : (
                <Image
                  src="/ph_image.svg"
                  alt="Default Profile"
                  width={1024}
                  height={1024}
                />
              )}
              <span>+ upload image</span>
              <input type="file" id="profileImageInput" onChange={handleImageChange} style={{ display: 'none' }} />
            </div>
            <span>Image must be below 1024x1024px. Use PNG or JPG format.</span>
          </div>
          <div className={styles.otherinput}>
            <div className={styles.name}>
              <label>First Name</label>
              <input type="text" placeholder='Ben' value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div className={styles.lastname}>
              <label>Last Name</label>
              <input type="text" placeholder='Wright' value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
            <div className={styles.email}>
              <label>Email</label>
              <input type="email" placeholder='ben@example.com' value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>
          <footer className={styles.footer}>
            <button type="submit" className={styles.saveButton} disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
          </footer>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Profile;
