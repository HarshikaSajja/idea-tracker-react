import React from 'react'
import './Login.css'
import registerLogo from '../../../assets/app_logo.png'
import { Link } from 'react-router-dom'

class Login extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <img src={registerLogo} alt="Register Logo" className="auth-img" height="120" width="120"></img>
                    <h3 className="auth-title">Login</h3>
                </div>
                <div>
                <form className="auth-form-container">
                {/* <label>{this.state.emailError}</label> */}
                    <input className="auth-input" type="email" 
                            id="email" 
                            placeholder="&#xF0e0;  Email Address"
                            name="email"
                            onChange={this.inputChangeHandler}></input>
                    
                    {/* <label>{this.state.passwordError}</label> */}
                    <input className="auth-input" type="password" 
                            id="password" 
                            placeholder="&#xF023;   Password"
                            name="password"
                            onChange={this.inputChangeHandler}></input>
                    {/* <label>{this.state.authError}</label> */}
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

export default Login;