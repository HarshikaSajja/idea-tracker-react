import React, { Component } from 'react'
import './YourActivity.css'
import { connect } from 'react-redux'
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner'
import axios from 'axios'

class YourActivity extends Component {
    state = {
        contibutionHover: false,
        likesHover: false,
        denominator: 0,
        contribution: 0,
        totalLikes: 0
    }

    componentDidMount() {
        this.setState({denominator: this.props.totalIdeas})
    }

    setContributionValues = () => {
        console.log('^^^',this.props.numerator)
        this.setState({ 
            contibutionHover: true,
            contribution: Math.round((this.props.numerator/this.state.denominator)*100)
        })
    }

    clearContributionValues = () => {
        this.setState({ contibutionHover: false })
    }

    setTotalLikes = () => {
        axios.get(`http://localhost:8000/tasks?createdBy_like=${this.props.loggedInUser}`)
            .then(({data}) => {
                let totalLikes = 0;
                data.map(idea => {
                    totalLikes += idea.likes
                })
                this.setState({totalLikes: totalLikes, likesHover: true})
            })
    }

    clearTotalLikes = () => {
        this.setState({ likesHover: false })
    }

    render() {

        return (
            <div>
                <div>
                    <div onMouseOver={this.setContributionValues} onMouseLeave={this.clearContributionValues} className="activity">
                        {this.state.contibutionHover ? `Your Contribution:\u00A0\u00A0${this.state.contribution}%` : 'Your Contribution'}
                    </div>
                    <div onMouseOver={this.setTotalLikes} onMouseLeave={this.clearTotalLikes} className="activity">
                        {this.state.likesHover ? `Total likes received:\u00A0\u00A0${this.state.totalLikes}` : 'Total likes received'}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loggedInUser: state.user.loggedInUser,
    totalIdeas: state.tasks.totalIdeas
})

export default connect(mapStateToProps)(YourActivity);