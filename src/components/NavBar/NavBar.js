import React from 'react'
import './NavBar.css'
import Logo from '../../assets/app_logo.png'

class NavBar extends React.Component {
    render() {
        return (
            <div className="navbar">
                <img src={Logo} height="30px" width="40px"></img>
                <label className="app-title">Task Tracker</label>
                <button className="navbar-buttons">Profile</button>
                <button className="navbar-buttons">Completed Tasks</button>
            </div>
        )
    }
}

export default NavBar;