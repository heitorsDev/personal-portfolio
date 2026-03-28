'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { projectService } from '@/lib/api';

export default function ManageProject() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('id');
  const isEditMode = Boolean(projectId);

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
    if (isEditMode) {
      fetchProject();
    }
  }, [projectId]);

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
        await projectService.create(formData);
        setMessage('Project created successfully!');
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

  if (loading) return <main><p>Loading...</p></main>;

  return (
    <main>
      <h1>{isEditMode ? 'Edit Project' : 'Create Project'}</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div>
          <label>Image URL</label>
          <input
            type="url"
            name="imageLink"
            value={formData.imageLink}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Main Link</label>
          <input
            type="url"
            name="mainLink"
            value={formData.mainLink}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>GitHub Link</label>
          <input
            type="url"
            name="githubLink"
            value={formData.githubLink}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>YouTube Link</label>
          <input
            type="url"
            name="youtubeLink"
            value={formData.youtubeLink}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Onshape Link</label>
          <input
            type="url"
            name="onshapeLink"
            value={formData.onshapeLink}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button type="submit">
            {isEditMode ? 'Save Changes' : 'Create Project'}
          </button>

          {isEditMode && (
            <button
              type="button"
              onClick={handleDelete}
              style={{ backgroundColor: 'red', color: 'white' }}
            >
              Delete Project
            </button>
          )}
        </div>
      </form>
    </main>
  );
}

