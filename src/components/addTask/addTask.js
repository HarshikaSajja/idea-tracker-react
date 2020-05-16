import React from 'react'
import './addTask.css'
import NavBar from '../NavBar/NavBar'
import LoginAlert from '../Modal/LoginAlert'
import { connect } from 'react-redux';
import { getAllTasks, createNewTask } from '../../actions'

const getDateTime = () => {
    let today = new Date();
    let date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    let time = today.getHours() + ":" + today.getMinutes()
    let dateTime = date+'  '+time;
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
                timeStamp: this.state.timeStamp,
                likes: 0,
                createdBy: this.props.loggedInUser
            }
            this.props.createNewTask(body)
                .then(() => this.props.history.push('/home'))
        }else {
            this.setState({
                error: 'field cannot be empty'
            })
        }
    }

    render() {
        const form = (
            <form>
                <input id="taskname" className="add-task-input" type="text" name="taskName" onChange={this.onChangeHandler} placeholder="Add an Idea"></input>
                <label className="error">{this.state.error}</label>
                <button onClick={this.addTaskHandler} className="add-task-button">ADD</button>
            </form>
        )

        return (
            <div>
                <NavBar/>
                 {this.props.loggedInUser ? form : <LoginAlert/>}
                {/* <LoginAlert/> */}
            </div>
        )
    }
}


const mapStateToProps = state => ({
    loggedInUser: state.user.loggedInUser
})

export default connect(mapStateToProps,{getAllTasks, createNewTask})(AddTask);