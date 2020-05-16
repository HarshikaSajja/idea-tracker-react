import React from 'react'
import './NavBar.css'
import Logo from '../../assets/app_logo.png'
import { connect } from 'react-redux';
import { setLoggedInUser } from '../../actions'
import { Redirect, NavLink, withRouter } from "react-router-dom";

class NavBar extends React.Component {
    logoutHandler = () => {
        this.props.setLoggedInUser('', false)
        this.props.history.push('/login')
    }


    render() {
        
        return (
            <div className="navbar">
                <img src={Logo} alt="App_logo" height="30px" width="40px"></img>
                <label className="app-title">Idea Tracker</label>
                <button onClick={this.logoutHandler} className="navbar-buttons">
                {this.props.loggedin ? 'Logout' : 'Login'} 
                </button>
                <button hidden={!this.props.loggedin} className="navbar-buttons">
                    <NavLink to="/my_ideas" activeClassName="active-button" style={{ textDecoration: 'none', color:'#890763' }}>My Ideas</NavLink>
                </button>
                <button className="navbar-buttons">
                    <NavLink to="/add" activeClassName="active-button" style={{ textDecoration: 'none', color:'#890763' }}>Add Idea</NavLink>
                </button>
                <button className="navbar-buttons">
                    <NavLink exact to="/home" activeClassName="active-button" style={{ textDecoration: 'none', color:'#890763' }}>Home</NavLink>
                </button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loggedin: state.user.isLoggedIn
})

export default withRouter(connect(mapStateToProps,{setLoggedInUser})(NavBar));