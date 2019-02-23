import React, { Component, Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LinePlot from '../../../chart/LinePlot';
import BrushBarPlot from '../../../chart/BrushBarPlot';


class MainContent extends Component {
    render() {
        return (
          <Fragment>
              <CssBaseline />
              <main className={this.props.styles.mainPart}>
                  <Grid container spacing={24}>
                      <Grid item xs={12} sm={6} >
                          <div className={this.props.styles.h3}>Avg. Airport's Departure Delay (last 2 hours)</div>
                          <BrushBarPlot chartData={this.props.state.chartDataAirportDepDelay} varname="airportDepDelay"/>
                      </Grid>
                      <Grid item xs={12} sm={6} className={this.props.styles.card}>
                          <div className={this.props.styles.h3}>Turnaround time</div>
                          <LinePlot chartData={this.props.state.chartDataTurnaround} varname="turnaround"/>
                      </Grid>
                      <Grid item xs={12} sm={6} >
                          <div className={this.props.styles.h3}>Arrival delay of a flight</div>
                          <LinePlot chartData={this.props.state.chartDataArrivalDelay} varname="arrivalDelay"/>
                      </Grid>
                      <Grid item xs={12} sm={6} className={this.props.styles.card}>
                          <div className={this.props.styles.h3}>Distance to target</div>
                          <LinePlot chartData={this.props.state.chartDataDistanceTarget} varname="distanceTarget"/>
                      </Grid>
                  </Grid>
              </main>
          </Fragment>
        );
    }
}

export default MainContent;
