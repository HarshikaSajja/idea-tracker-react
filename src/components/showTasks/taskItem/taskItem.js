import React from 'react'
import './taskItem.css'
import { connect } from 'react-redux'

let color
const TaskItem = ({ taskName, timeStamp, onEdit, onDelete, editDeleteDisable, likesCount, likeClicked, liked, author, toggle, expandable, desc, status}) => {
    if(status === 'In Progress'){
        color = '#5D6BD2'
    }else if(status === 'Not Started'){
        color = '#E7DD05'
    }else if(status === 'Completed'){
        color = '#58D68D'
    }
    return (
        <div className="task-item">
            <div onClick={toggle}>
                {!editDeleteDisable ? <i className="fa fa-square" style={{fontSize:'15px', color: color}}></i> : null}
                <label className={expandable ? 'taskname' : 'collapse'}> {taskName} </label> 
                <br/> 
                <span className="author-name">Added by- {author}</span>
                <button hidden={editDeleteDisable} onClick={onDelete} className="edit-button">DELETE</button>
                <button hidden={editDeleteDisable} onClick={() => onEdit('editText')} className="edit-button">EDIT</button>
                <button hidden={editDeleteDisable} onClick={() => onEdit('radioButtons')} className="edit-button">CHANGE STATUS</button>
            </div>

            <div className="likes-container">
                {liked ? <img hidden={!editDeleteDisable} src="https://img.icons8.com/material-rounded/24/000000/facebook-like.png"/> : <img hidden={!editDeleteDisable} onClick={likeClicked} className="like-button" src="https://img.icons8.com/material-outlined/24/000000/facebook-like.png"/>}                
                <p hidden={!editDeleteDisable} className="likes">{likesCount}</p>
            </div>
            
            <div hidden={expandable}>
                <span className="timestamp">{timeStamp}</span>
                <p>{desc}</p>
            </div>
        </div>
    )
}

export default TaskItem;