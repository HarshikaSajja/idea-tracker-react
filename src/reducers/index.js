import { SET_LOGIN_USER, GET_ALL_TASKS } from '../actions'
import { combineReducers } from 'redux'

const initialUser = {
    loggedInUser: '',
    isLoggedIn: false
}

const user = (state = initialUser, action) => {
    switch(action.type) {
        case SET_LOGIN_USER:
            return {
                loggedInUser: action.loggedInUser,
                isLoggedIn: action.isLoggedIn
            }
        default:
            return state;
    }
}

const initialTaskList = {
    allTasks: [],
    loading: true,
    totalIdeas: 0
}

const tasks = (state = initialTaskList, action) => {
    switch(action.type) {
        case GET_ALL_TASKS:
            return {
                allTasks: action.allTasks,
                loading: false,
                totalIdeas: action.totalIdeas
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    user: user,
    tasks: tasks
});

export default rootReducer