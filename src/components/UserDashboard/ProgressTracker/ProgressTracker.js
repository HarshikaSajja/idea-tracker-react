import React, { Component } from 'react'
import './ProgressTracker.css'
import { PieChart, Pie, Cell } from 'recharts';

class ProgressTracker extends Component {
    render() {

        return (
            <div>
                <PieChart className="progress-bar" width={150} height={150}>
                    <text x={59} y={80} className="status-title" style={{fontWeight:'bold'}}>
                        {`${Math.round((this.props.numerator/this.props.denominator)*100)}%`}
                    </text>
                    <Pie
                        data={[
                            {value: 100 - (Math.round((this.props.numerator/this.props.denominator)*100))},
                            {value: Math.round((this.props.numerator/this.props.denominator)*100)}
                        ]}
                        dataKey="value"
                        fill={this.props.color}
                        innerRadius="40%"
                        outerRadius="100%"
                        startAngle={90}
                        endAngle={450}>
                        <Cell fill="#ccc"/>
                    </Pie>
                </PieChart>
                <label className="status-title">{this.props.name}</label>
                <i className="fa fa-square square" style={{color:this.props.color}}></i>
            </div>
        )
    }
}

export default ProgressTracker;