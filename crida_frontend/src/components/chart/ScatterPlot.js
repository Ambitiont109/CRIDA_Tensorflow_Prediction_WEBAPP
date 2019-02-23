import React, { Component } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Label } from 'recharts';
import './Chart.css';

class ScatterPlot extends Component {
    render() {
        return (
            <React.Fragment>
                <ScatterChart width={600} height={300}
                    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="airport" name="airport"  />
                    <YAxis dataKey="delay" name="delay">
                        <Label angle={-90} value='Delay category' position='insideLeft' style={{textAnchor: 'middle'}} />
                    </YAxis>
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Delay" data={this.props.chartData} fill="#3f51b5" />
                </ScatterChart>
            </React.Fragment>
        );
    }
}

export default ScatterPlot;
