import { SET_LOGIN_USER, GET_ALL_TASKS, SET_LIKED_IDEAS, CLEAR_LIKED_IDEAS, SET_USER_LIKES } from '../actions'
import { combineReducers } from 'redux'

const initialUser = {
    loggedInUser: '',
    isLoggedIn: false,
    ids: []
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
    totalIdeas: 0,
    ids: []
}

const tasks = (state = initialTaskList, action) => {
    switch(action.type) {
        case GET_ALL_TASKS:
            return {
                ...state,
                allTasks: action.allTasks,
                loading: false,
                totalIdeas: action.totalIdeas
            }
        case SET_LIKED_IDEAS:
            return {
                ...state,
                ids: action.likedIds
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