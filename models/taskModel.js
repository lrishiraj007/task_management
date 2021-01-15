import mongoose from 'mongoose';

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    authorID: {
        type: String
    },
    body: {
        type: String,
        required: true
    },
    addedOn: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const Task = mongoose.model('Task', TaskSchema);

export default Task;
