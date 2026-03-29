'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { projectService, authService } from '@/lib/api';
import AuthStatus from '@/components/AuthStatus';
import Project from '@/components/Project';
import styles from './page.module.css';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [activeProjects, setActiveProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
    checkAuth();
  }, []);

  useEffect(() => {
    const filtered = projects.filter(project =>
      project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchQuery, projects]);

  const fetchProjects = async () => {
    try {
      const data = await projectService.getAll();
      setProjects(data);
      const active = data.filter(project => project.active);
      setActiveProjects(active);
      setFilteredProjects(data);
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
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>
          <AuthStatus />
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroGrid}>
              <div className={styles.heroContent}>
                <span className={styles.tag}>Mechatronics Engineering</span>
                <h1 className={styles.title}>Heitor Hillesheim</h1>
                <p className={styles.description}>
                  mudar
                </p>
                <div className={styles.socialLinks}>
                  <a 
                    href="https://www.linkedin.com/in/heitor-hillesheim-dos-santos-hillesheim-220931374/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                  <a 
                    href="https://github.com/heitorsDev" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
              <div className={styles.heroImages}>
                <div className={styles.photoFrame}>
                  <div className={styles.photoPlaceholder}>
                    <svg viewBox="0 0 24 24" width="48" height="48" fill="#adb5bd">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    <span>Profile Photo</span>
                  </div>
                </div>
                <div className={styles.photoFrameSecondary}>
                  <div className={styles.photoPlaceholderSmall}>
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="#adb5bd">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                    </svg>
                    <span>Workspace</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.projects} id="projects">
          <div className={styles.container}>
            <div className={styles.projectsHeader}>
              <div>
                <h2 className={styles.sectionTitle}>Projects</h2>
                <p className={styles.sectionSubtitle}>{filteredProjects.length} projects</p>
              </div>
              {logged && (
                <Link href="/manageProject" className={styles.createBtn}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                  New Project
                </Link>
              )}
            </div>
            <h2>Currently working on: </h2>
            {loading ? (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading projects...</p>
              </div>
            ) : activeProjects.length === 0 ? (
              <div className={styles.emptyState}>
                <svg viewBox="0 0 24 24" width="48" height="48" fill="#adb5bd">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                </svg>
                <p>{searchQuery ? 'No projects match your search' : 'No projects found'}</p>
              </div>
            ) : (
              <div className={styles.projectsGrid}>
                {activeProjects.map((project) => (
                  <Project 
                    key={project.id}
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    imageLink={project.imageLink}
                    mainLink={project.mainLink}
                    githubLink={project.githubLink}
                    youtubeLink={project.youtubeLink}
                    onshapeLink={project.onshapeLink}
                    active={project.active}
                  />
                ))}
              </div>
            )}
            <div className={styles.searchBar}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="#6c757d">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            {loading ? (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading projects...</p>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className={styles.emptyState}>
                <svg viewBox="0 0 24 24" width="48" height="48" fill="#adb5bd">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                </svg>
                <p>{searchQuery ? 'No projects match your search' : 'No projects found'}</p>
              </div>
            ) : (
              <div className={styles.projectsGrid}>
                {filteredProjects.map((project) => (
                  <Project 
                    key={project.id}
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    imageLink={project.imageLink}
                    mainLink={project.mainLink}
                    githubLink={project.githubLink}
                    youtubeLink={project.youtubeLink}
                    onshapeLink={project.onshapeLink}
                    active={project.active}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>© 2026 Heitor Hillesheim. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
