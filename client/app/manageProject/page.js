'use client';

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { projectService, authService } from '@/lib/api';
import styles from '@/styles/Form.module.css';

function ManageProjectContent() {
  const searchParams = useSearchParams();
  const projectId = searchParams?.get('id') || null;
  const isEditMode = Boolean(projectId);

  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageLink: '',
    mainLink: '',
    githubLink: '',
    youtubeLink: '',
    onshapeLink: '',
  });
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await authService.getMe();
      setUser(response.user);
    } catch {
      window.location.href = '/auth';
    } finally {
      setCheckingAuth(false);
    }
  };

  useEffect(() => {
    if (isEditMode && user) {
      fetchProject();
    }
  }, [projectId, user]);

  const fetchProject = async () => {
    try {
      const project = await projectService.getById(projectId);
      setFormData({
        title: project.title || '',
        description: project.description || '',
        imageLink: project.imageLink || '',
        mainLink: project.mainLink || '',
        githubLink: project.githubLink || '',
        youtubeLink: project.youtubeLink || '',
        onshapeLink: project.onshapeLink || '',
      });
    } catch (err) {
      setError('Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      if (isEditMode) {
        await projectService.update(projectId, formData);
        setMessage('Project updated successfully!');
      } else {
        const newProject = await projectService.create(formData);
        setMessage(`Project "${newProject.title}" created successfully!`);
        setFormData({
          title: '',
          description: '',
          imageLink: '',
          mainLink: '',
          githubLink: '',
          youtubeLink: '',
          onshapeLink: '',
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to save project');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await projectService.delete(projectId);
      setMessage('Project deleted successfully!');
      window.location.href = '/';
    } catch (err) {
      setError(err.message || 'Failed to delete project');
    }
  };

  if (checkingAuth || loading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <span className={styles.tag}>{isEditMode ? 'Edit Project' : 'New Project'}</span>
            <h1 className={styles.title}>{isEditMode ? 'Edit Project' : 'Create Project'}</h1>
            <p className={styles.subtitle}>
              {isEditMode ? 'Update your project details' : 'Add a new project to your portfolio'}
            </p>
          </div>

          {error && <div className={styles.error}>{error}</div>}
          {message && <div className={styles.success}>{message}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label}>Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter project title"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your project..."
                className={styles.input}
                rows="4"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Image URL</label>
              <input
                type="url"
                name="imageLink"
                value={formData.imageLink}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Main Link</label>
              <input
                type="url"
                name="mainLink"
                value={formData.mainLink}
                onChange={handleChange}
                placeholder="https://example.com/project"
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>GitHub Link</label>
              <input
                type="url"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
                placeholder="https://github.com/username/repo"
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>YouTube Link</label>
              <input
                type="url"
                name="youtubeLink"
                value={formData.youtubeLink}
                onChange={handleChange}
                placeholder="https://youtube.com/watch?v=..."
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Onshape Link</label>
              <input
                type="url"
                name="onshapeLink"
                value={formData.onshapeLink}
                onChange={handleChange}
                placeholder="https://cad.onshape.com/..."
                className={styles.input}
              />
            </div>

            <div className={styles.actions}>
              <button type="submit" className={styles.btnPrimary}>
                {isEditMode ? 'Save Changes' : 'Create Project'}
              </button>

              {isEditMode && (
                <button type="button" onClick={handleDelete} className={styles.btnDanger}>
                  Delete Project
                </button>
              )}
            </div>
          </form>
        </div>

        <div className={styles.linkWrapper}>
          <Link href="/" className={styles.backLink}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ManageProject() {
  return (
    <Suspense fallback={
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    }>
      <ManageProjectContent />
    </Suspense>
  );
}

