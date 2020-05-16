import React, { Component } from 'react'
import ShowTasks from '../showTasks/showTasks'
import NavBar from '../NavBar/NavBar'
import { connect } from 'react-redux'
import { getUserIdeas } from '../../actions'
import LoginAlert from '../Modal/LoginAlert'

class myIdeas extends Component {
    componentDidMount() {
        this.props.getUserIdeas(this.props.loggedInUser)
    }

    render() {
        return (
            <div>
                <NavBar/>
                {/* {this.props.loggedInUser ?  */}
                    <ShowTasks editDeleteDisable={false}/>  
                     {/* <LoginAlert/> */}
                {/* } */}

                {/* <ShowTasks editDeleteDisable={false}/> */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loggedInUser: state.user.loggedInUser
})

export default connect(mapStateToProps, { getUserIdeas })(myIdeas);