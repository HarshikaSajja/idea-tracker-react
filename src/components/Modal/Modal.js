import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const style = {
    upload: {
     background: '#37B903',
     opacity: '0.8'
    },
    discard: {
     background: '#EA5A46',
     opacity: '0.8'
    },
    input: {
        margin: '20px auto',
        height: '25px',
        padding: '5px'
    },
    dialogContainer: {
        backgroundColor: 'rgba(204,204,204,0.6)'
    },
 };

class Modal extends React.Component {
    state = {
        timeStamp: '',
        taskName: ''
    }

    onChangeHandler = (event) => {
        const dateTime = this.props.getDateTime
        this.setState({
            [event.target.name]: event.target.value,
            timeStamp: dateTime,
        })
    }

    render() {
        const {classes} = this.props;
        const { modal,  closeModal, taskName } = this.props

        return (
            <Dialog
                className={classes.dialogContainer}
                open={ modal }
                onClose={closeModal}>

                    <input 
                        className={classes.input}
                        type="text"
                        id="editTask"
                        name="taskName"
                        defaultValue={taskName} 
                        onChange={this.onChangeHandler}></input>
                    
                    <DialogActions>
                        <Button onClick={() => this.props.onSaveHandler(this.state.taskName, this.state.timeStamp)} variant="contained"  className={classes.upload}>
                            save
                        </Button>
                        <Button onClick={closeModal} variant="contained" className={classes.discard}>
                            cancel
                        </Button>
                    </DialogActions>
            </Dialog>
        )
    }
}

export default withStyles(style)(Modal);