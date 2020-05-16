import React from 'react'
import './Login.css'
import registerLogo from '../../../assets/app_logo.png'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux';
import { setLoggedInUser } from '../../../actions'

class Login extends React.Component {
    state = {
        username: '',
        password: '',
        matchedUser: {},
        authError: null
    }

    inputChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    usernameValidator = () => {
        if(this.state.username.length <= 1 || this.state.password.length <= 1) {
            this.setState({authError: 'Fields connot be empty'})
            return false
        }else{
            this.setState({
                usernameError: null
            })
            return true
        }
    }

    submitButtonHandler = (event) => {
        event.preventDefault();
        if(this.usernameValidator()) {
            axios.get('http://localhost:8000/users')
                .then(response => {
                    const userFound = response.data.some(user => {
                        this.setState({matchedUser: user})
                        return user.username === this.state.username
                    });
                    if(userFound){
                        if(this.state.matchedUser.password === this.state.password) {
                            this.setState({authError: null})
                            console.log('password matched')
                            this.props.setLoggedInUser(this.state.username, true)
                            this.props.history.push('/home')
                        }else {
                            this.setState({ authError: 'Incorrect password' })
                        }
                    }else {
                        this.setState({ authError: 'Username does not exist' })
                    }
                })
        }
    }

    render() {
        return (
            <div>
                <div>
                    <img src={registerLogo} alt="Register Logo" className="auth-img" height="120" width="120"></img>
                    <h3 className="auth-title">Login</h3>
                </div>
                <div>
                <form className="auth-form-container">
                    <input className="auth-input" type="text" 
                            id="username" 
                            placeholder="&#xF007;   Username"
                            name="username"
                            onChange={this.inputChangeHandler}
                            required></input>
                    
                    <input className="auth-input" type="password" 
                            id="password" 
                            placeholder="&#xF023;   Password"
                            name="password"
                            onChange={this.inputChangeHandler}></input>
                    <label className="error-label">{this.state.authError}</label>
                    <button className="auth-button" onClick={this.submitButtonHandler}>Submit</button>
                </form>
                </div>
                <div className="switch-form-div">
                    <h5 className="switch-form-content">Don't have an account? <Link to="/register">Register</Link> </h5> 
                </div>
            </div>
        )
    }
}

export default connect(null,{setLoggedInUser})(Login);