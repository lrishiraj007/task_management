import express from 'express';
import Task from '../models/taskModel.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';

let router = express.Router();

const checkForErrors = ({ title, author, body }) => {
    let errors = {};
    let isValid = false;
    if (title === '') {
        errors = { ...errors, title: 'This field is required' }
    }
    if (author === '') {
        errors = { ...errors, author: 'This field is required' }
    }
    if (body === '') {
        errors = { ...errors, body: 'This field is required' }
    }

    if (Object.keys(errors).length > 0) {
        return { isValid, errors };
    }
    isValid = true;
    return { isValid, errors };
}

const isAuthenticated = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    const authorizationToken = authorizationHeader.split(' ')[1];
    if (authorizationToken) {
        jwt.verify(authorizationToken, config.jwtSecret, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: 'Failed to authenticate' });
            } else {
                next();
            }
        });
    } else {
        res.status(403).json({ error: 'No token provided' })
    }
}

router.get('/:id', (req, res) => {
    Task.findById(req.params.id, (err, Task) => {
        if (err) throw err;
        res.json({ Task: Task });
    })
})

router.post('/add', isAuthenticated, (req, res) => {
    const title = req.body.title || '';
    const author = req.body.author || '';
    const body = req.body.body || '';

    const { isValid, errors } = checkForErrors({ title, author, body });

    if (isValid) {
        const newTask = new Task({
            title: title,
            author: author,
            body: body
        });

        newTask.save((err) => {
            if (err) throw err;
            else {
                res.json({ success: 'success' });
            }
        });
    } else {
        res.json({ errors: errors });
    }
});

router.post('/edit/:id', isAuthenticated, (req, res) => {
    const title = req.body.title || '';
    const author = req.body.author || '';
    const body = req.body.body || '';

    const { isValid, errors } = checkForErrors({ title, author, body });

    if (isValid) {
        const updatedTask = {
            title: req.body.title,
            author: req.body.author,
            body: req.body.body
        };

        Task.findByIdAndUpdate(req.params.id, updatedTask, (err, doc) => {
            if (err) throw err;
            else res.json({ success: 'success' });
        });
    } else {
        res.json({ errors: errors });
    }
});

router.delete('/delete/:id', isAuthenticated, (req, res) => {
    Task.remove({ _id: req.params.id }, err => {
        res.json({ success: 'success' });
    });
});

export default router;
