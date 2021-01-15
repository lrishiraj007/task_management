import * as actionTypes from '../actions/actionTypes';

const initialState = {
    tasks: [],
    task: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GOT_ALL_TASKS:
            return {
                ...state,
                tasks: action.tasks
            };
        case actionTypes.GOT_SINGLE_TASK:
            return {
                ...state,
                task: action.task
            };
        default:
            return state;
    }
};

export default reducer;
