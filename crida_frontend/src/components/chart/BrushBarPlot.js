import React, { Component } from 'react';
import { BarChart, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Label } from 'recharts';
import './Chart.css';

class BrushBarPlot extends Component {
    render() {
        return (
            <React.Fragment>
                <BarChart width={600} height={300} data={this.props.chartData}
                    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey={this.props.varname} />
                    <YAxis>
                        <Label angle={-90} value='Delay category' position='insideLeft' style={{textAnchor: 'middle'}} />
                    </YAxis>
                    <Tooltip/>
                    <ReferenceLine y={0} stroke='#000'/>

                    <Bar dataKey="delay" fill="#8884d8" />
                </BarChart>
            </React.Fragment>
        );
    }
}

export default BrushBarPlot;
