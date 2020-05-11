import React from 'react'
import './taskItem.css'

const TaskItem = ({ taskName, timeStamp, onEdit, onDelete}) => {
    return (
        <div className="task-item">
            <label className="taskname"> {taskName} </label> <br/> <span className="timestamp">{timeStamp}</span>
            <button onClick={onDelete} className="delete-button">DELETE</button>
            <button onClick={onEdit} className="edit-button">EDIT</button>
        </div>
    )
}

export default TaskItem;