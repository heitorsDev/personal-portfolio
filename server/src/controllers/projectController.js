const Project = require('../models/Project');

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.createProject = async (req, res) => {
  try {
    const { title, description, imageLink, mainLink, githubLink, youtubeLink, onshapeLink } = req.body;
    const project = await Project.create({ title, description, imageLink, mainLink, githubLink, youtubeLink, onshapeLink });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.editProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, imageLink, mainLink, githubLink, youtubeLink, onshapeLink } = req.body;
    const project = await Project.update({ title, description, imageLink, mainLink, githubLink, youtubeLink, onshapeLink }, { where: { id } });
    res.json(project);
  } catch (error) {
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