import React from 'react'
import './showTasks.css'
import TaskItem from './taskItem/taskItem'
import axios from 'axios'
import Modal from '../Modal/Modal'

class ShowTasks extends React.Component {
    state = {
        modal: false,
        taskName: '',
        editTaskId: '',
        updatedList: false,
        allTasks: []
    }

    closeModal = () => {
        this.setState({ 
            modal: false, 
            editTaskId: '' 
        })
    }

    onEditHandler = (taskId, taskName) => {
        this.setState({
            modal: true,
            taskName: taskName,
            editTaskId: taskId
        })
    }

    onSaveHandler = (taskname, timestamp) => {
        const body = {
            taskName: taskname,
            timeStamp: timestamp
        }

        axios.put(`http://localhost:8000/tasks/${this.state.editTaskId}`, body)
            .then(response => {
                axios.get('http://localhost:8000/tasks')
                        .then(response => {
                            this.setState({
                                updatedList: true,
                                allTasks: response.data,
                                modal: false
                            })
                        })  
            })
    }

    onDeleteHandler = (taskId) => {
        axios.delete(`http://localhost:8000/tasks/${taskId}`)
            .then(response => {
                axios.get('http://localhost:8000/tasks')
                        .then(response => {
                            this.setState({
                                updatedList: true,
                                allTasks: response.data
                            })
                        })
            })
    }

    render() {
        let tasks = []
        this.state.updatedList ? tasks = this.state.allTasks : tasks = this.props.allTasks

        return (
            <div className="tasks-container">
                {tasks.map(task => <TaskItem key={task.id}
                                                            taskName={task.taskName}
                                                            timeStamp={task.timeStamp}
                                                            onEdit={() => this.onEditHandler(task.id, task.taskName)} 
                                                            onDelete={() => this.onDeleteHandler(task.id)}/>)}

                <Modal
                    modal={this.state.modal}
                    taskName={this.state.taskName}
                    onSaveHandler = {this.onSaveHandler}
                    getDateTime={this.props.getDateTime}
                    closeModal={this.closeModal}/>
            </div>
        )
    }
}

export default ShowTasks;