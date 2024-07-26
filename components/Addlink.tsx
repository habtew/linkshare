// import React, { useState, useEffect } from 'react';
// import styles from './Addlink.module.css';

// type AddlinkProps = {
//   link: {
//     id: number;
//     platform: string;
//     url: string;
//   };
//   updateLink: (id: number, platform: string, url: string) => void;
//   removeLink: (id: number) => void;
// };

// const Addlink: React.FC<AddlinkProps> = ({ link, updateLink, removeLink }) => {
//   const [platform, setPlatform] = useState(link.platform);
//   const [url, setUrl] = useState(link.url);

//   useEffect(() => {
//     updateLink(link.id, platform, url);
//   }, [platform, url]);

//   return (
//     <div className={styles.addlink}>
//       <div className={styles.card}>
//         <div className={styles.head}>
//           <p>Link #{link.id}</p>
//           <span onClick={() => removeLink(link.id)}>remove</span>
//         </div>
//         <form>
//           <div className={styles.platform}>
//             <label>platform</label>
//             <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
//               <option value="Github">Github</option>
//               <option value="LinkedIn">LinkedIn</option>
//               <option value="Twitter">Twitter</option>
//               <option value="youtube">youtube</option>
//               <option value="codewars">codewars</option>
//               <option value="codepen">codepen</option>
//               {/* Add more platforms as needed */}
//             </select>
//           </div>
//           <div className={styles.link}>
//             <label>Link</label>
//             <div className={styles.linkinput}>
//               <img src="/ph_link-bold.svg" alt="" />
//               <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Addlink;


import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Import Image from next/image
import styles from './Addlink.module.css';

type AddlinkProps = {
  link: {
    id: number;
    platform: string;
    url: string;
  };
  updateLink: (id: number, platform: string, url: string) => void;
  removeLink: (id: number) => void;
};

const Addlink: React.FC<AddlinkProps> = ({ link, updateLink, removeLink }) => {
  const [platform, setPlatform] = useState(link.platform);
  const [url, setUrl] = useState(link.url);

  useEffect(() => {
    updateLink(link.id, platform, url);
  }, [link.id, platform, url, updateLink]);

  return (
    <div className={styles.addlink}>
      <div className={styles.card}>
        <div className={styles.head}>
          <p>Link #{link.id}</p>
          <span onClick={() => removeLink(link.id)}>remove</span>
        </div>
        <form>
          <div className={styles.platform}>
            <label>platform</label>
            <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
              <option value="Github">Github</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Twitter">Twitter</option>
              <option value="youtube">youtube</option>
              <option value="codewars">codewars</option>
              <option value="codepen">codepen</option>
              {/* Add more platforms as needed */}
            </select>
          </div>
          <div className={styles.link}>
            <label>Link</label>
            <div className={styles.linkinput}>
              <Image src="/ph_link-bold.svg" alt="Link Icon" width={24} height={24} />
              <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addlink;
