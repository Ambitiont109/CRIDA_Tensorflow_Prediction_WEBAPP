import React, { Component, Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import InfoIcon from '@material-ui/icons/Info';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';

function BottomControls(props) {

        const [open, setOpen] = React.useState(false);
        function handleClickOpen() { setOpen(true); }
        function handleClose() { setOpen(false); }

        return (
          <Fragment>
              <CssBaseline />
                <AppBar position="fixed" color="primary" className={props.styles.appBar}>
                    <div className={props.styles.toolbar}>
                        <Grid container spacing={24}>
                            <Grid item xs={6} sm={3}>
                                <Button variant="contained" color="primary" onClick={props.fetchData} className={props.styles.button}>
                                    Predict
                                    <Icon className={props.styles.rightIcon}>send</Icon>
                                </Button>
                                <Button variant="contained" color="primary" onClick={props.handleReset} className={props.styles.button}>
                                    Reset
                                    <Icon className={props.styles.rightIcon}>clear</Icon>
                                </Button>
                            </Grid>
                            <Grid item xs={true}>
                                <Card className={props.styles.predictedDelay}>
                                    <CardActionArea>
                                        <CardContent>
                                            <div className={props.styles.predictedDelayText}>
                                                Arrival delay: {props.state.delay_arr_cat} <span> </span>
                                                (Prob.: {props.state.probability_arr})
                                            </div>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item xs={true}>
                                <Card className={props.styles.predictedDelay}>
                                    <CardActionArea>
                                        <CardContent>
                                            <div className={props.styles.predictedDelayText}>
                                                Departure delay: {props.state.delay_dep_cat} <span> </span>
                                                (Prob.: {props.state.probability_dep})
                                            </div>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>

                            <Grid item xs={true}>
                              <Button variant="contained" color="default" onClick={handleClickOpen} className={props.styles.button}>
                                Help
                                <InfoIcon />
                              </Button>
                            </Grid>

                            <Dialog
                              open={open}
                              keepMounted
                              onClose={handleClose}
                              aria-labelledby="alert-dialog-slide-title"
                              aria-describedby="alert-dialog-slide-description"
                            >
                              <DialogTitle id="alert-dialog-slide-title">{"Help page"}</DialogTitle>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    <p>The batch mode allows predicting the median arrival and departure delays for a sequence of 20 flights.
                                    The upper control panel includes input parameters that are shared across all flights in a batch:</p>
                                    <ul>
                                          <li><b>Holding time:</b> median holding time (seconds).</li>
                                          <li><b>Add. ASMA 40:</b> median ASMA 40 additional time (can be negative) (seconds).</li>
                                          <li><b>Add. ASMA 60:</b> median ASMA 60 additional time (can be negative) (seconds).</li>
                                          <li><b>Airport dep. delay:</b> cumulative departure delay in last 2 hours (minutes).</li>
                                          <li><b>Visibility:</b> visibility in the airport where flights arrive to and depart from (meters).</li>
                                          <li><b>Wind intensity:</b> wind intensity in the airport where flights arrive to and depart from (knots).</li>
                                          <li><b>Wind direction:</b> wind direction in the airport where flights arrive to and depart from (e.g. VRB, 360, 350, etc.).</li>
                                          <li><b>Temperature:</b> temperature in the airport where flights arrive to and depart from (Celsius).</li>
                                    </ul>
                                    <p>The detailed information about each of 20 flights in a batch should be specified in a CSV file (Comma separated values).
                                    The data stored in a file should have the format as shown below. It is mandatory for the file to include exactly 20 rows.
                                    The flights must be sorted by DATETIME in ascending order.
                                    </p>
                                    <ul>
                                          <li><b>NUM:</b> a number of row [1...20].</li>
                                          <li><b>AIRLINE_ICAO:</b> ICAO code of the arriving or departing airline. The choice between arriving and departing airline depends on the value TYPE.</li>
                                          <li><b>WAKE:</b> a wake category of an aircraft: H (heavy), M (medium ) or L (light).</li>
                                          <li><b>DATETIME:</b> scheduled in-block time (SIBT) or scheduled off-block time (SOBT) formatted as yyyy-mm-dd hh:mm:ss. The choice between SIBT and SOBT depends on the value TYPE.</li>
                                          <li><b>PLANNED_TURNAROUND:</b> scheduled turnaround time in minutes.</li>
                                          <li><b>DISTANCE:</b> a distance from origin airport or to target airport in kilometers. The choice depends on the value TYPE.</li>
                                          <li><b>TYPE:</b> type of a flight: ARR (arrival) or DEP (departure).</li>
                                    </ul>

                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                  Close
                                </Button>
                              </DialogActions>
                            </Dialog>
                        </Grid>
                    </div>
              </AppBar>
          </Fragment>
        );
}

export default BottomControls;
