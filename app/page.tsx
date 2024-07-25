"use client"
// import Image from "next/image";
// import styles from "./page.module.css";

// export default function Home() {
//   return (
//     <main className={styles.main}>
//       main page
//     </main>
//   );
// }

// app/page.tsx
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/context/AuthContext'; // Correctly import AuthContext
// import styles from './page.module.css';

// export default function Home() {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading) {
//       if (!user) {
//         router.push('/login'); // Redirect to login if not authenticated
//       }
//     }
//   }, [user, loading, router]);

//   if (loading) {
//     return <p>Loading...</p>; // Show a loading message while checking auth state
//   }

//   return (
//     <main className={styles.main}>
//       main page in the dom
//     </main>
//   );
// }


// app/page.tsx
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/context/AuthContext';
// import Navbar from '@/components/Navbar';
// import Links from '@/components/Links';
// import Profile from '@/components/Profile';
// import styles from './page.module.css';

// export default function Home() {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading) {
//       if (!user) {
//         router.push('/login'); // Redirect to login if not authenticated
//       }
//     }
//   }, [user, loading, router]);

//   if (loading) {
//     return <p>Loading...</p>; // Show a loading message while checking auth state
//   }

//   return (
//     <main className={styles.main}>
//       <Navbar />
//       <Links />
//     </main>
//   );
// }



// app/page.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Links from '@/components/Links';
import Profile from '@/components/Profile';
import styles from './page.module.css';
import Preview from './preview/page';
export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [view, setView] = useState('links');

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login'); // Redirect to login if not authenticated
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <p>Loading...</p>; // Show a loading message while checking auth state
  }

  const renderView = () => {
    switch (view) {
      case 'links':
        return <Links />;
      case 'profile':
        return <Profile />;
      case 'preview':
        return <Preview />
        // return <div>Preview</div>; // Replace this with your Preview component
      default:
        return <Links />;
    }
  };

  return (
    <main className={styles.main}>
      <Navbar setView={setView} />
      {renderView()}
    </main>
  );
}
