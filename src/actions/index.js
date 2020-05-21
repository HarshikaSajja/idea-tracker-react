import axios from 'axios'

export const SET_LOGIN_USER = "SET_LOGIN_USER"
export const GET_ALL_TASKS = "GET_ALL_TASKS"
export const SET_LIKED_IDEAS = "SET_LIKED_IDEAS"
export const CLEAR_LIKED_IDEAS = "CLEAR_LIKED_IDEAS"

export const setLoggedInUser = (username, loggedinStatus) => {
    return {
        type: SET_LOGIN_USER,
        loggedInUser: username,
        isLoggedIn: loggedinStatus
    }
}

export const setLikedIdeas = (ids) => {
    return {
        type: SET_LIKED_IDEAS,
        likedIds: ids
    }
}

export const clearLikedIdeas = () => {
    return {
        type: CLEAR_LIKED_IDEAS
    }
}

export const setAllTasksToProps = (data) => {
    return {
        type: GET_ALL_TASKS,
        allTasks: data,
        totalIdeas: data.length
    }
}

export const getAllTasks = () => {
    return (dispatch) => {
        return axios.get(`http://localhost:8000/tasks`)
            .then(({ data }) => {
                dispatch(setAllTasksToProps(data));
        });
    };
}

export  const createNewTask = (body) => {
    return (dispatch) => {
        return axios.post('http://localhost:8000/tasks', body)
            .then(() => {
                dispatch(getAllTasks())
        });
    }
}

export const editTask = (taskId, body) => {
    const username = body.createdBy
    return (dispatch) => {
        return axios.put(`http://localhost:8000/tasks/${taskId}`, body)
            .then(() => {
                dispatch(getUserIdeas(username))
            })
    }
}

export const deleteTask = (taskId, username) => {
    return (dispatch) => {
        return axios.delete(`http://localhost:8000/tasks/${taskId}`)
            .then(() => {
                dispatch(getUserIdeas(username))
            })
            
    }
}

export const searchIdea = (searchTerm, from, username) => {
    return (dispatch) => {
        if(from === 'myIdeas'){
            return axios.get(`http://localhost:8000/tasks?q=${searchTerm}&createdBy_like=${username}`)
                .then(({ data }) => {
                    dispatch(setAllTasksToProps(data));
            });
        }else {
            return axios.get(`http://localhost:8000/tasks?q=${searchTerm}`)
                .then(({ data }) => {
                    dispatch(setAllTasksToProps(data));
            });
        }
    };
}

export const getUserIdeas = (username) => {
    return (dispatch) => {
        return axios.get(`http://localhost:8000/tasks?createdBy_like=${username}`)
            .then(({ data }) => {
                dispatch(setAllTasksToProps(data));
        });
    };
}

export const incLikes = (taskId, body, sortByParam, order, page, limit) => {
    return (dispatch) => {
        return axios.put(`http://localhost:8000/tasks/${taskId}`, body)
            .then(() => {
                dispatch(getSortedTasks(sortByParam, order, page, limit))
            })
    }
}

export const getSortedTasks = (sortByParam, order, page, limit, from, username) => {
    return (dispatch) => {
        if(from === 'myIdeas'){
            return axios.get(`http://localhost:8000/tasks?createdBy_like=${username}&_sort=${sortByParam}&_order=${order}&_page=${page}&_limit=${limit}`)
            .then(({ data }) => {
                dispatch(setAllTasksToProps(data));
            })
        } else{
            return axios.get(`http://localhost:8000/tasks?_sort=${sortByParam}&_order=${order}&_page=${page}&_limit=${limit}`)
                .then(({ data }) => {
                    dispatch(setAllTasksToProps(data));
            })
        }
    };
}

export const getIdeasInRange = (startDate, endDate, from, username) => {
    return (dispatch) => {
        if(from === 'myIdeas'){
            return axios.get(`http://localhost:8000/tasks?createdBy_like=${username}timeStamp_gte=${startDate}&timeStamp_lte=${endDate}`)
            .then(({ data }) => {
                dispatch(setAllTasksToProps(data));
            })
        }else{
            return axios.get(`http://localhost:8000/tasks?timeStamp_gte=${startDate}&timeStamp_lte=${endDate}`)
            .then(({ data }) => {
                dispatch(setAllTasksToProps(data));
            })
        }
        
    };
}
