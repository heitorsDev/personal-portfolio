'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { authService } from '@/lib/api';

export default function Project({id, title, description, imageLink, mainLink, githubLink, youtubeLink, onshapeLink}) {
    const [logged, setLogged] = useState(false);

    useEffect(() => {
      checkAuth();
    }, []);

    const checkAuth = async () => {
      try {
        await authService.getMe();
        setLogged(true);
      } catch {
        setLogged(false);
      }
    };
  
    return (
    <div>
      {logged && (
        <Link href={`/manageProject?id=${id}`}>
          <button>Edit</button>
        </Link>
      )}
      <h2>{title}</h2>
      <p>{description}</p>
      <img src={imageLink} alt={title} />
      <a href={mainLink}>Main Link</a>
      <a href={githubLink}>Github Link</a>
      <a href={youtubeLink}>Youtube Link</a>
      <a href={onshapeLink}>Onshape Link</a>

    </div>
  )
}
