// routes/tasks.js
const router = require('express').Router();
let Task = require('../task.model');

// GET: Retrieve all tasks
router.route('/').get((req, res) => {
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err));
});

// POST: Add a new task
router.route('/').post((req, res) => {
    const { title, description, dueDate } = req.body;
    const newTask = new Task({
        title,
        description,
        dueDate,
        status: 'Pending',
    });

    newTask.save()
        .then(() => res.json('Task added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// GET: Retrieve a single task by ID
router.route('/:id').get((req, res) => {
    Task.findById(req.params.id)
        .then(task => res.json(task))
        .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE: Delete a task by ID
router.route('/:id').delete((req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then(() => res.json('Task deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// PUT: Update a task by ID
router.route('/:id').put((req, res) => {
    Task.findById(req.params.id)
        .then(task => {
            task.title = req.body.title;
            task.description = req.body.description;
            task.dueDate = Date.parse(req.body.dueDate);
            task.status = req.body.status;

            task.save()
                .then(() => res.json('Task updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;