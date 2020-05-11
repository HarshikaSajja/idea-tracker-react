import React from 'react'
import '../Login/Login.css'
import registerLogo from '../../../assets/app_logo.png'
import { Link } from 'react-router-dom'

class Register extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        usernameError: null,
        emailError: null,
        passwordError: null,
        authError: null,
    }

    inputChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    isformvalid = () => {
        return (this.usernameValidator() && this.emailValidator() && this.passwordValidator()) ? true : false
    }

    usernameValidator = () => {
        if(this.state.username.length < 3) {
            this.setState({usernameError: 'Username must have more than 3 characters'})
            return false
        }else{
            this.setState({
                usernameError: null
            })
            return true
        }
    }

    emailValidator = () => {
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(emailRegex.test(this.state.email)) {
            this.setState({
                emailError: null
            })
            return true
        }else{
            this.setState({emailError: 'Email Address format is incorrect'})
            return false
        }
    }

    passwordValidator = () => {
        if(this.state.password !== this.state.passwordConfirmation) {
            this.setState({passwordError: 'Passwords do not match'})
            return false
        }else if(this.state.password.length < 6) {
            this.setState({passwordError: 'Passwords length must be greater than 6 characters'})
            return false
        }else{
            this.setState({
                passwordError: null
            })
            return true
        }
    }

    submitButtonHandler =(event) => {

    }

    render() {
        return (
            <div>
                <div>
                    <img className="auth-img" src={registerLogo} alt="Register Logo" height="120" width="120"></img>
                    <h3 className="auth-title">Register to get started</h3>
                </div>
                <div className="auth-form-container">
                <form>
                    <label>{this.state.usernameError}</label>
                    <input className="auth-input" type="text" 
                            id="username" 
                            placeholder="&#xF007;   Username"
                            name="username"
                            onChange={this.inputChangeHandler}
                            required></input>
                    <label>{this.state.emailError}</label>
                    <input className="auth-input" type="email" 
                            id="email" 
                            placeholder="&#xF0e0;  Email Address"
                            name="email"
                            onChange={this.inputChangeHandler}></input>
                    <label>{this.state.passwordError}</label>
                    <input className="auth-input" type="password" 
                            id="password" 
                            placeholder="&#xF023;   Password"
                            name="password"
                            onChange={this.inputChangeHandler}></input>
                    <label>{this.state.passwordError}</label>
                    <input className="auth-input" type="password" 
                            id="confirm_password" 
                            placeholder="&#xF058;  Confirm Password"
                            name="passwordConfirmation"
                            onChange={this.inputChangeHandler}></input>
                    <label>{this.state.authError}</label>
                    <button className="auth-button" onClick={this.submitButtonHandler}>Submit</button>
                </form>
                </div>
                <div className="switch-form-div">
                    <h5 className="switch-form-content">Already a user? <Link to="/login">Login</Link> </h5> 
                </div>
            </div>
        )
    }
}

export default Register;