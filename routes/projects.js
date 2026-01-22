const express = require('express');
const Project = require('../models/Projects');
const Task = require('../models/Task');

const router = express.Router();

function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/login');
}

// Create project
router.post('/', ensureAuth, async (req, res) => {
  await Project.create({
    name: req.body.name,
    description: req.body.description,
    user: req.user._id
  });
  res.redirect('/projects');
});

// All projects
router.get('/', ensureAuth, async (req, res) => {
  const projects = await Project.find({ user: req.user._id });
  res.render('index', { projects });
});

// Single project + tasks
router.get('/:id', ensureAuth, async (req, res) => {
  const project = await Project.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (!project) return res.redirect('/projects');

  const tasks = await Task.find({
    project: project._id,
    user: req.user._id
  });

  res.render('show', { project, tasks });
});

// Edit project page
router.get('/:id/edit', ensureAuth, async (req, res) => {
  const project = await Project.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (!project) return res.redirect('/projects');

  res.render('edit', { project });
});

// Update project
router.post('/:id/edit', ensureAuth, async (req, res) => {
  await Project.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { name: req.body.name, description: req.body.description }
  );
  res.redirect(`/projects/${req.params.id}`);
});

// Delete project
router.post('/:id/delete', ensureAuth, async (req, res) => {
  await Project.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id
  });
  res.redirect('/projects');
});

module.exports = router;
