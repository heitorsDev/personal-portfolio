const Project = require('../models/Project');

exports.getAllProjects = async (req, res) => {
  try {
    console.log('GET /api/projects - Headers:', req.headers);
    const projects = await Project.findAll();
    console.log('GET /api/projects - Returning', projects.length, 'projects');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('GET /api/projects/:id - Headers:', req.headers);
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    console.log('Create project - Request body:', req.body);
    const { title, description, imageLink, mainLink, githubLink, youtubeLink, onshapeLink } = req.body;
    const project = await Project.create({ title, description, imageLink, mainLink, githubLink, youtubeLink, onshapeLink });
    console.log('Create project - Created:', project.toJSON());
    res.status(201).json(project);
  } catch (error) {
    console.error('Create project - Error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.editProject = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Edit project - ID:', id, 'Body:', req.body);
    const { title, description, imageLink, mainLink, githubLink, youtubeLink, onshapeLink } = req.body;
    
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    await project.update({ title, description, imageLink, mainLink, githubLink, youtubeLink, onshapeLink });
    console.log('Edit project - Updated:', project.toJSON());
    res.json(project);
  } catch (error) {
    console.error('Edit project - Error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.destroy({ where: { id } });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};