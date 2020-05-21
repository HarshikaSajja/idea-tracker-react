import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const style = {
    upload: {
     background: '#1F840A',
     opacity: '0.8',
     color: 'white'
    },
    discard: {
     background: '#C33224',
     opacity: '0.8',
     color: 'white'
    },
    input: {
        margin: '20px auto',
        height: '25px',
        width: '500px',
        margin: '20px 20px',
        border: '1px grey solid',
        padding: '5px'
    },
    dialogContainer: {
        backgroundColor: 'rgba(204,204,204,0.6)'
    },
    radioButton: {
        height: '30px',
        width: '500px',
        margin: '20px 20px',
    }
 };

class Modal extends React.Component {
    state = {
        taskName: this.props.taskName,
        updatedStatus: ''
    }

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    onStatusChanged = (e) => {
        this.setState({ updatedStatus: e.target.value})
    }

    render() {
        const {classes} = this.props;
        const { modal,  closeModal, taskName, currentStatus } = this.props

        return (
            <Dialog
                className={classes.dialogContainer}
                open={ modal }
                onClose={closeModal}>

                    {this.props.invoke === 'radioButtons' ? 
                        <div>
                            <p className={classes.radioButton}>
                                <input  name="status" 
                                        type="radio"
                                        value="In Progress"
                                        onChange={this.onStatusChanged}
                                        defaultChecked={currentStatus === 'In Progress'}
                                        />
                                <span>In Progress</span>
                            </p>
                            <p className={classes.radioButton}>
                                <input  name="status" 
                                        type="radio" 
                                        value="Not Started"
                                        onChange={this.onStatusChanged}
                                        defaultChecked={currentStatus === 'Not Starteds'}/>
                                <span>Not Started</span>
                            </p>
                            <p className={classes.radioButton}>
                                <input  name="status" 
                                        type="radio" 
                                        value="Completed"
                                        onChange={this.onStatusChanged}
                                        defaultChecked={currentStatus === 'Completed'}/>
                                <span>Completed</span>
                            </p>
                        </div>
                        :
                        <input 
                            className={classes.input}
                            type="text"
                            id="editTask"
                            name="taskName"
                            defaultValue={taskName} 
                            onChange={this.onChangeHandler}>
                        </input>
                    }
                    
                    <DialogActions>
                        <Button fullWidth={100} onClick={() => this.props.onSaveHandler(this.state.taskName, this.state.updatedStatus)} variant="contained"  className={classes.upload}>
                            save
                        </Button>
                        <Button fullWidth={100} onClick={closeModal} variant="contained" className={classes.discard}>
                            cancel
                        </Button>
                    </DialogActions>
                    {/* {console.log('####',this.status.updatedStatus)} */}
            </Dialog>
        )
    }
}

export default withStyles(style)(Modal);