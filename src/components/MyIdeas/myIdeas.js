import React, { Component } from 'react'
import ShowTasks from '../showTasks/showTasks'
import NavBar from '../NavBar/NavBar'
import LoginAlert from '../Modal/LoginAlert'
import { connect } from 'react-redux'
import { getUserIdeas } from '../../actions'
import UserDashboard from '../UserDashboard/UserDashboard'

class myIdeas extends Component {
    state = { ideasCount: 0}
    componentDidMount() {
        this.props.getUserIdeas(this.props.loggedInUser)
            .then(() => this.setTotalIdeas(this.props.totalIdeas))
    }

    setTotalIdeas = value => {
        this.setState({ideasCount: value})
    }
    
    render() {
        return (
            <div>
                {this.props.loggedInUser ? 
                    <div>
                    <NavBar/>
                    <UserDashboard totalCount={this.state.ideasCount}/>
                    <ShowTasks editDeleteDisable={false}
                                hideRange={true}
                                history={this.props.history}
                                from={'myIdeas'}/>
                    </div>
                    :
                    <LoginAlert/>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loggedInUser: state.user.loggedInUser,
    totalIdeas: state.tasks.totalIdeas
})

export default connect(mapStateToProps, { getUserIdeas })(myIdeas);