import React from 'react'
import './taskItem.css'

const TaskItem = ({ taskName, timeStamp, onEdit, onDelete, editDeleteDisable, likesCount, likeClicked, liked, author, toggle, expandable}) => {
    return (
        <div className="task-item">
            <div onClick={toggle}>
                <label className={expandable ? 'taskname' : 'collapse'}> {taskName} </label> 
                <br/> 
                <span className="author-name">Added by- {author}</span>
                <button hidden={editDeleteDisable} onClick={onDelete} className="edit-button">DELETE</button>
                <button hidden={editDeleteDisable} onClick={onEdit} className="edit-button">EDIT</button>
            </div>

            <div className="likes-container">
                {liked ? <img hidden={!editDeleteDisable} src="https://img.icons8.com/material-rounded/24/000000/facebook-like.png"/> : <img hidden={!editDeleteDisable} onClick={likeClicked} className="like-button" src="https://img.icons8.com/material-outlined/24/000000/facebook-like.png"/>}                
                <p hidden={!editDeleteDisable} className="likes">{likesCount}</p>
            </div>
            
            <div hidden={expandable}>
                <span className="timestamp">{timeStamp}</span>
                <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
            </div>
        </div>
    )
}

export default TaskItem;