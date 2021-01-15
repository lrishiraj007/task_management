import * as actionTypes from './actionTypes';

const URL = "http://localhost:5000";
const options = (data) => {
    return {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(data)
    };
};

export const getAllTasks = () => {
    return dispatch => {
        fetch(URL + '/')
            .then(res => res.json())
            .then(res => {
                dispatch({ type: actionTypes.GOT_ALL_TASKS, tasks: res.tasks })
            })
    };
};

export const getTask = (taskId) => {
    return dispatch => {
        fetch(URL + '/tasks/' + taskId)
            .then(res => res.json())
            .then(res => {
                dispatch({ type: actionTypes.GOT_SINGLE_TASK, task: res.task })
            })
    };
};

export const submitNewTask = (TaskData) => {
    return dispatch => {
        return fetch(URL + '/tasks/add', options(TaskData))
            .then(res => res.json())
    }
};

export const saveTask = (taskId, TaskData) => {
    return dispatch => {
        return fetch(URL + '/tasks/edit/' + taskId, options(TaskData))
            .then(res => res.json())
    }
}

export const deleteTask = (taskId) => {
    return dispatch => {
        return fetch(URL + '/tasks/delete/' + taskId, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
                'Content-Type': 'application/json'
            },
            method: 'delete'
        })
            .then(res => res.json())
    };
}
