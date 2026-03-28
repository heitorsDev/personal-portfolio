'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { projectService, authService } from '@/lib/api';
import AuthStatus from '@/components/AuthStatus';
import Project from '@/components/Project';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
    checkAuth();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await projectService.getAll();
      setProjects(data);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = async () => {
    try {
      await authService.getMe();
      setLogged(true);
    } catch {
      setLogged(false);
    }
  };
  
  return (
    <main>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
        <div />
        <AuthStatus />
      </header>
      
      <h1>Portfolio</h1>
      <h2>Heitor Hillesheim</h2>
      
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Projects</h2>
          {logged && (
            <Link href="/manageProject">
              <button>Create Project</button>
            </Link>
          )}
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <ul>
            {projects.map((project) => (
              <>
                <Project 
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  imageLink={project.imageLink}
                  mainLink={project.mainLink}
                  githubLink={project.githubLink}
                  youtubeLink={project.youtubeLink}
                  onshapeLink={project.onshapeLink}
                />
              </>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
