import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { NavLink, Redirect } from 'react-router-dom'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class LoginAlert extends React.Component{
    state = {
        modal: true,
        redirect: false
    }

    onClose = () => {
        this.setState({
            modal: false,
            redirect: true
        })

    }
    render(){
        if(this.state.redirect){
            return <Redirect to="/home"/>
        }
        return (
            <div>
            <Dialog
                open={this.state.modal}
                TransitionComponent={Transition}
                onClose={this.onClose}>

                <DialogTitle id="alert-dialog-slide-title">{"Looks like you are not logged In"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Please Login to add your ideas.
                        </DialogContentText>
                    </DialogContent>
                <DialogActions>
                    <Button color="primary">
                        <NavLink to="/login" style={{textDecoration:'none'}}>Login / Register</NavLink>
                    </Button>
                    <Button onClick={this.onClose} color="primary">
                        Go Back
                    </Button>
                </DialogActions>
            </Dialog>
            </div>
        );
    }
}

export default LoginAlert;