import React from 'react'
import './showTasks.css'
import TaskItem from './taskItem/taskItem'
import Modal from '../Modal/Modal'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { connect } from 'react-redux';
import { editTask, deleteTask, searchIdea, incLikes, getSortedTasks, getAllTasks } from '../../actions'
import axios from 'axios'

const DEFAULT = 'default';
const TASKNAME_ASC = 'taskname_asc';
const TASKNAME_DESC  = 'taskname_desc';
const RECENTLY_ADDED = 'recently_added';
const OLDEST_FIRST = 'oldest_first';
let totalIdeasCount = 0


const getDateTime = () => {
    let today = new Date();
    let date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    let time = today.getHours() + ":" + today.getMinutes()
    let dateTime = date+'  '+time;
    return dateTime
}  

class ShowTasks extends React.Component {
    
    state = {
        modal: false,
        taskName: '',
        editTaskId: '',
        updatedList: false,
        allTasks: [],
        searchTerm: '',
        liked: false,
        likes: 0,
        likedIds: [],
        expandable: true,
        expandId: '',
        sort: '',
        order: '',
        page: 0,
        limit: 9999,
        currentPage: 1,
        totalPages: 1,
        pageNoClicked: false
    }

    toggleExpandable = (taskId) => {
        this.setState({expandable: !this.state.expandable, expandId: taskId})
    }

    closeModal = () => {
        this.setState({ 
            modal: false, 
            editTaskId: '' 
        })
    }

    onEditHandler = (taskId, taskName, likes) => {
        this.setState({
            modal: true,
            taskName: taskName,
            editTaskId: taskId,
            likes: likes
        })
    }

    onSaveHandler = (taskname) => {
        const body = {
            taskName: taskname,
            timeStamp: getDateTime(),
            likes: this.state.likes,
            createdBy: this.props.loggedInUser
        }
        this.props.editTask(this.state.editTaskId, body)
            .then(() => {
                this.setState({ modal: false })
            })
    }

    onDeleteHandler = (taskId) => {
        this.props.deleteTask(taskId, this.props.loggedInUser)
    }

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => this.props.searchIdea(this.state.searchTerm))
        
    }

    likesHandler = ({id, taskName, timeStamp, likes, createdBy}) => {
        const body = {
            taskName: taskName,
            timeStamp: timeStamp,
            likes: likes+1,
            createdBy: createdBy
        }
        this.props.incLikes(id, body, this.state.sort, this.state.order, this.state.currentPage, this.state.limit)
            .then(() => {
                const ids = this.state.likedIds
                ids.push(id)
                this.setState({
                    likedIds: ids,
                    liked: true
                })
            })
    }

    filtersHandler = () => {
        const sortBy = this.refs.sortBy.value
        const ideasPerPage = this.refs.limit.value
        // console.log('page clicked??: ',this.state.pageNoClicked)
        if(!this.state.pageNoClicked){
            this.setState({ currentPage: 1})
        }
        if(sortBy === DEFAULT){
            this.setState({
                sort: '',
                order: '',
                limit: ideasPerPage,
                pageNoClicked: false
            }, () => {
                this.props.getSortedTasks(this.state.sort,this.state.order, this.state.currentPage, this.state.limit)
                this.calculatePageNumbers()
            })  
        }else if(sortBy === TASKNAME_ASC) {
            this.setState({
                sort: 'taskName',
                order: 'asc',
                limit: ideasPerPage,
                pageNoClicked: false
            }, () => {
                this.props.getSortedTasks(this.state.sort,this.state.order, this.state.currentPage, this.state.limit)
                this.calculatePageNumbers()
            })            
        }else if(sortBy === TASKNAME_DESC) {
            this.setState({
                sort: 'taskName',
                order: 'desc',
                limit: ideasPerPage,
                pageNoClicked: false
            }, () => {
                this.props.getSortedTasks(this.state.sort,this.state.order, this.state.currentPage, this.state.limit)
                this.calculatePageNumbers()
            })
        }else if(sortBy === RECENTLY_ADDED) {
            this.setState({
                sort: 'timeStamp',
                order: 'desc',
                limit: ideasPerPage,
                pageNoClicked: false
            }, () => {
                this.props.getSortedTasks(this.state.sort,this.state.order, this.state.currentPage, this.state.limit)
                this.calculatePageNumbers()
            })
        }else if(sortBy === OLDEST_FIRST) {
            this.setState({
                sort: 'timeStamp',
                order: 'asc',
                limit: ideasPerPage,
                pageNoClicked: false
            }, () => {
                this.props.getSortedTasks(this.state.sort,this.state.order, this.state.currentPage, this.state.limit)
                this.calculatePageNumbers()
            })
        }
    }

    onPageClicked = (e) => {
        this.setState({ currentPage: parseInt(e.target.value), pageNoClicked: true}, () => this.filtersHandler())
    }

    calculatePageNumbers = () => {
        if(this.props.totalIdeas > totalIdeasCount) {
            totalIdeasCount = this.props.totalIdeas
        }
        let totalPages
        let pages = this.state.limit==='9999' ? 1 : totalIdeasCount/this.state.limit
        Number.isInteger(pages) ? totalPages = pages : totalPages = Math.ceil(pages)
        this.setState({totalPages: totalPages})
    }

    render() {
        // {[...Array(this.state.totalPages)].map((_, i) => {
        //     console.log(`i+1==> ${(this.state.currentPage)} : ${i+1} : ${this.state.currentPage===i+1}`)
        // })}
        const taskList = (
            <div className="task-list">
                {
                (this.props.allTasks.length > 0) ? 
                this.props.allTasks.map(task => <TaskItem   key={task.id}
                                                            taskName={task.taskName}
                                                            author={task.createdBy}
                                                            toggle={() => this.toggleExpandable(task.id)}
                                                            expandable={this.state.expandId === task.id ? this.state.expandable : true}
                                                            likesCount={task.likes}
                                                            liked={(this.state.likedIds.includes(task.id) ? true : false)}
                                                            likeClicked={() => this.likesHandler(task)}
                                                            editDeleteDisable={this.props.editDeleteDisable}
                                                            timeStamp={task.timeStamp}
                                                            onEdit={() => this.onEditHandler(task.id, task.taskName, task.likes)} 
                                                            onDelete={() => this.onDeleteHandler(task.id)}/>) : 
                <p style={{marginLeft:'20px'}}>No Ideas Found</p>
                }

                    <Modal
                        modal={this.state.modal}
                        taskName={this.state.taskName}
                        onSaveHandler = {this.onSaveHandler}
                        closeModal={this.closeModal}/>
                </div>
        )

        return (
            <div className="tasks-container">
                 <div className="task-nav">
                    <input className="search-box"
                            type="text" 
                            placeholder="Search Idea/Author"
                            name="searchTerm"
                            onChange={this.onChangeHandler}>
                    </input>
                    <select ref="sortBy" onChange={this.filtersHandler} className="dropdown-boxes">
                        <option value="default">Sort By</option>
                        <option value="taskname_asc">Taskname (asc)</option>
                        <option value="taskname_desc">Taskname (desc)</option>
                        <option value="recently_added">Recently Added</option>
                        <option value="oldest_first">Oldest First</option>
                    </select>

                    <select ref="limit" onChange={this.filtersHandler} className="dropdown-boxes">
                        <option value="9999">All ideas</option>
                        <option value="2">2 per page</option>
                        <option value="5">5 per page</option>
                        <option value="10">10 per page</option>
                    </select>

                    
                </div>
                {this.props.loading ? <LoadingSpinner/> : taskList}
                <div className="task-nav" style={{backgroundColor: 'white', textAlign:'center'}}>
                    {[...Array(this.state.totalPages)].map((_, i) => (
                        <button key={i+1} className={this.state.currentPage===i+1 ? "active-page" : "page-numbers"} value={i+1} onClick={this.onPageClicked}>{i+1}</button>
                    ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loggedInUser: state.user.loggedInUser,
    allTasks: state.tasks.allTasks,
    loading: state.tasks.loading,
    totalIdeas: state.tasks.totalIdeas
})

export default connect(mapStateToProps,{editTask, deleteTask, searchIdea, incLikes, getSortedTasks, getAllTasks})(ShowTasks);