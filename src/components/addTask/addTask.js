import React from 'react'
import './addTask.css'
import axios from 'axios'
import ShowTasks from '../showTasks/showTasks'


const getDateTime = () => {
    var today = new Date();
    var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes()
    var dateTime = date+'  '+time;
    return dateTime
  }

class AddTask extends React.Component {
    state = {
        taskName: '',
        timeStamp: '',
        error: '',
        updatedPostData: [],
        allTasks: [],

    }

    componentDidMount() {
        axios.get('http://localhost:8000/tasks')
            .then(response => {
                this.setState({
                    allTasks: response.data
                })
            })
    }

    onChangeHandler = (event) => {
        const dateTime = getDateTime()
        this.setState({
            [event.target.name]: event.target.value,
            timeStamp: dateTime
        })

    }

    isFieldValid = () => {
        return (this.state.taskName !== '') ? true : false
    }

    addTaskHandler = (event) => {
        event.preventDefault();
        document.getElementById("taskname").value = "";

        if(this.isFieldValid()) {
            const body = {
                taskName: this.state.taskName,
                timeStamp: this.state.timeStamp
            }

            axios.post('http://localhost:8000/tasks', body)
                .then(response => {
                    axios.get('http://localhost:8000/tasks')
                        .then(response => {
                            this.setState({
                                allTasks: response.data
                            })
                        })
                })
        }else {
            this.setState({
                error: 'field cannot be empty'
            })
        }
    }

    render() {
        return (
            <div>
                <form>
                    <input id="taskname" className="add-task-input" type="text" name="taskName" onChange={this.onChangeHandler} placeholder="Add Todo"></input>
                    <label className="error">{this.state.error}</label>
                    <button onClick={this.addTaskHandler} className="add-task-button">ADD</button>
                </form>

                {}

                <ShowTasks getDateTime={getDateTime()}
                            allTasks={this.state.allTasks}/>
            </div>
        )
    }
}

export default AddTask;