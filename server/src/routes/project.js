const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { authenticate } = require('../middlewares/authMiddleware');

router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.post('/', authenticate, projectController.createProject);
router.put('/:id', authenticate, projectController.editProject);
router.delete('/:id', authenticate, projectController.deleteProject);

module.exports = router;
