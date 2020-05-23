import React from 'react'
import './showTasks.css'
import TaskItem from './taskItem/taskItem'
import Modal from '../Modal/Modal'
import UserDashboard from '../UserDashboard/UserDashboard'
import App from '../../App'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { connect } from 'react-redux';
import { editTask, deleteTask, searchIdea, incLikes, getSortedTasks, getAllTasks, getIdeasInRange, setLikedIdeas } from '../../actions'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { compose } from 'redux'

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
        pageNoClicked: false,
        dateRange: null,
        description: '',
        from: this.props.from,
        status: '',
        action: ''
        
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

    onEditHandler = ({id, taskName, likes, description, status}, action) => {
        this.setState({
            modal: true,
            taskName: taskName,
            editTaskId: id,
            likes: likes,
            description: description,
            status: status,
            action: action
        })
    }

    onSaveHandler = (taskname, updatedStatus) => {
        (updatedStatus === '') ? updatedStatus = this.state.action : updatedStatus=updatedStatus;
        (taskname === '') ? taskname = this.state.taskName : taskname=taskname
        const body = {
            taskName: taskname,
            timeStamp: getDateTime(),
            likes: this.state.likes,
            createdBy: this.props.loggedInUser,
            description: this.state.description,
            status: updatedStatus
        }
        this.props.editTask(this.state.editTaskId, body)
            .then(() => {
                this.setState({ modal: false })
            })
            .then(() => {
                this.props.history.push('/home')
                this.props.history.push('/my_ideas')
            })
    }

    onDeleteHandler = (taskId) => {
        this.props.deleteTask(taskId, this.props.loggedInUser)
            .then(() => {
                if(this.state.from === 'myIdeas'){
                    this.props.history.push('/home')
                    this.props.history.push('/my_ideas')
                }
            })
    }

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => this.props.searchIdea(this.state.searchTerm, this.state.from, this.props.loggedInUser))
        
    }

    likesHandler = ({id, taskName, timeStamp, likes, createdBy, description, status}) => {
        const body = {
            taskName: taskName,
            timeStamp: timeStamp,
            likes: likes+1,
            createdBy: createdBy,
            description: description,
            status: status
        }
        this.props.incLikes(id, body, this.state.sort, this.state.order, this.state.currentPage, this.state.limit)
            .then(() => {
                const ids = this.state.likedIds
                ids.push(id)
                this.props.setLikedIdeas(ids)
                this.setState({
                    likedIds: ids,
                    liked: true
                })
            })
    }

    filtersHandler = () => {
        const sortBy = this.refs.sortBy.value
        const ideasPerPage = this.refs.limit.value
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
                this.props.getSortedTasks(this.state.sort,this.state.order, this.state.currentPage, this.state.limit, this.state.from, this.props.loggedInUser)
                this.calculatePageNumbers()
            })  
        }else if(sortBy === TASKNAME_ASC) {
            this.setState({
                sort: 'taskName',
                order: 'asc',
                limit: ideasPerPage,
                pageNoClicked: false
            }, () => {
                this.props.getSortedTasks(this.state.sort,this.state.order, this.state.currentPage, this.state.limit, this.state.from, this.props.loggedInUser)
                this.calculatePageNumbers()
            })            
        }else if(sortBy === TASKNAME_DESC) {
            this.setState({
                sort: 'taskName',
                order: 'desc',
                limit: ideasPerPage,
                pageNoClicked: false
            }, () => {
                this.props.getSortedTasks(this.state.sort,this.state.order, this.state.currentPage, this.state.limit, this.state.from, this.props.loggedInUser)
                this.calculatePageNumbers()
            })
        }else if(sortBy === RECENTLY_ADDED) {
            this.setState({
                sort: 'timeStamp',
                order: 'desc',
                limit: ideasPerPage,
                pageNoClicked: false
            }, () => {
                this.props.getSortedTasks(this.state.sort,this.state.order, this.state.currentPage, this.state.limit, this.state.from, this.props.loggedInUser)
                this.calculatePageNumbers()
            })
        }else if(sortBy === OLDEST_FIRST) {
            this.setState({
                sort: 'timeStamp',
                order: 'asc',
                limit: ideasPerPage,
                pageNoClicked: false
            }, () => {
                this.props.getSortedTasks(this.state.sort,this.state.order, this.state.currentPage, this.state.limit, this.state.from, this.props.loggedInUser)
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

    handleDateEvent = (event, picker) => {
        this.props.getIdeasInRange(picker.startDate.format('DD/MM/YYYY'), picker.endDate.format('DD/MM/YYYY'), this.props.isLoggedIn, this.props.loggedInUser)
            .then(() => this.setState({dateRange: `${picker.startDate.format('DD/MM/YYYY')} - ${picker.endDate.format('DD/MM/YYYY')}`}))
    }

    resetCalendar = () => {
        this.props.getAllTasks()
            .then(() => this.setState({dateRange: 'Select Date Range'}))
    }

    render() {
        const taskList = (
            <div className="task-list">
                {console.log('@@@@@',this.props)}
                {
                (this.props.allTasks.length > 0) ? 
                this.props.allTasks.map(task => <TaskItem   key={task.id}
                                                            taskName={task.taskName}
                                                            desc={task.description}
                                                            status={task.status}
                                                            author={task.createdBy}
                                                            toggle={() => this.toggleExpandable(task.id)}
                                                            expandable={this.state.expandId === task.id ? this.state.expandable : true}
                                                            likesCount={task.likes}
                                                            liked={this.props.ids.includes(task.id) ? true : false}
                                                            // liked={(this.state.likedIds.includes(task.id) ? true : false)}
                                                            likeClicked={() => this.likesHandler(task)}
                                                            editDeleteDisable={this.props.editDeleteDisable}
                                                            timeStamp={task.timeStamp}
                                                            onEdit={(action) => this.onEditHandler(task,action)} 
                                                            onDelete={() => this.onDeleteHandler(task.id)}/>) : 
                <p style={{marginLeft:'20px'}}>No Ideas Found</p>
                }
                    <Modal
                        invoke={this.state.action}
                        modal={this.state.modal}
                        taskName={this.state.taskName}
                        currentStatus={this.state.status}
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

                    <DateRangePicker
                        onCancel={this.resetCalendar}
                        onApply={this.handleDateEvent}>
                        <button 
                            hidden={this.props.hideRange}
                            style={{height:'30px', borderRadius:'5px',border:'1px white solid',backgroundColor:'white',marginLeft:'3px'}}>
                            {this.state.dateRange ? this.state.dateRange : 'Select Date Range'}
                            &nbsp;<i className="fa fa-calendar"></i>
                        </button>
                    </DateRangePicker>
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
    totalIdeas: state.tasks.totalIdeas,
    isLoggedIn: state.user.isLoggedIn,
    ids: state.tasks.ids
})

export default connect(mapStateToProps,{editTask,setLikedIdeas, deleteTask, searchIdea, incLikes, getSortedTasks, getAllTasks, getIdeasInRange})(ShowTasks);