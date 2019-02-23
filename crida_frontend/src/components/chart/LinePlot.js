import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Label } from 'recharts';
import './Chart.css';

class LinePlot extends Component {
    render() {
        return (
            <React.Fragment>
                <LineChart width={600} height={300} data={this.props.chartData}
                    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                    <XAxis dataKey={this.props.varname} />
                    <YAxis>
                        <Label angle={-90} value='Delay category' position='insideLeft' style={{textAnchor: 'middle'}} />
                    </YAxis>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Line type="monotone" dataKey="delay" stroke="#8884d8" activeDot={{r: 8}}/>
                </LineChart>
            </React.Fragment>
        );
    }
}

export default LinePlot;
