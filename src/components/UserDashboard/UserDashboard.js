import React, { Component } from 'react'
import './UserDashboard.css'
import ProgressTracker from './ProgressTracker/ProgressTracker'
import YourActivity from './YourActivity/YourActivity'
import { connect } from 'react-redux'
import axios from 'axios'

class UserDashboard extends Component {
    state = {
        ideasInProgress: '',
        ideasNotStarted: '',
        ideasCompleted: '',
        allStats: [],
    }

    async componentDidMount() {
        const [firstResponse, secondResponse, thirdResponse] = await Promise.all([
            axios.get(`http://localhost:8000/tasks?createdBy_like=${this.props.loggedInUser}&status_like=In Progress`),
            axios.get(`http://localhost:8000/tasks?createdBy_like=${this.props.loggedInUser}&status_like=Not Started`),
            axios.get(`http://localhost:8000/tasks?createdBy_like=${this.props.loggedInUser}&status_like=Completed`)
        ]);

        const allStats = [
            {
                name: 'In Progress',
                totalIdeas: firstResponse.data.length,
                color: '#5D6BD2'
            },
            {
                name: 'Not Started',
                totalIdeas: secondResponse.data.length,
                color: '#E7DD05'
            },
            {
                name: 'Completed',
                totalIdeas: thirdResponse.data.length,
                color: '#58D68D'
            },
        ]
        this.setState({
            allStats: allStats
        });
    }

    render() {
        return (
            <div className="dashboard-container">
                <div className="dashboard-items" id="statistics">
                <label className="your-activity">Progress</label>
                <div className="progress-container">
                    {this.state.allStats.map(obj => (
                        <ProgressTracker    key={obj.name}
                                            denominator={this.props.totalCount}
                                            numerator={obj.totalIdeas}
                                            name={obj.name}
                                            color={obj.color}/>
                    ))}
                </div>
                </div>
                <div className="dashboard-items" id="avg-likes">
                    <label className="your-activity">Your Activity</label>
                    <YourActivity   numerator={this.props.totalCount}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loggedInUser: state.user.loggedInUser,
    totalIdeas: state.tasks.totalIdeas
})

export default connect(mapStateToProps)(UserDashboard);