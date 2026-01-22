const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Project = require('../models/Projects');


function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/login');
}



router.post('/:projectId/tasks',ensureAuth, async function(req,res){
    const {title, priority, dueDate} = req.body;

    try{
         const project = await Project.findOne({
            _id: req.params.projectId,
            user: req.user._id,

         })

          if(!project) return res.redirect('/projects');


          await Task.create({
             title,
             priority: priority || 'medium',
             dueDate: dueDate || null,
             project: project._id,
             user: req.user._id
          })

          res.redirect(`/projects/${project._id}`);

    }  catch(error){
           res.status(500).send('Task creation failed');
    }
})

module.exports = router;