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
                            <Grid item xs={6} sm={7}>
                                <Card className={props.styles.predictedDelay}>
                                    <CardActionArea>
                                        <CardContent>
                                            <div className={props.styles.predictedDelayText}>
                                                Delay class: {props.state.delay_cat} <span> </span>
                                                (Prob.: {props.state.delay_probability})
                                            </div>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>

                            <Grid item xs={6} sm={1}>
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
                              <DialogTitle id="alert-dialog-slide-title">{"Definition of input parameters"}</DialogTitle>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    <p>The single-flight mode allows predicting the departure delay for a scheduled flight. The following input parameters should de specified in order to get the prediction:</p>
                                    <ul>
                                          <li><b>SIBT:</b> scheduled in-block time (UTC).</li>
                                          <li><b>SOBT:</b> scheduled off-block time (UTC).</li>
                                          <li><b>Arrival delay:</b> the difference between scheduled (SIBT) and actual (AIBT) arrival times (minutes).</li>
                                          <li><b>From:</b> ICAO code of an origin airport.</li>
                                          <li><b>To:</b> ICAO code of a destination airport.</li>
                                          <li><b>Airline:</b> ICAO code of an airline operator.</li>
                                          <li><b>Wake turbulence:</b> wake turbulence category of an airplane (heavy, medium or light).</li>
                                          <li><b>Airport dep. delay:</b> cumulative departure delay in last 2 hours (minutes).</li>
                                          <li><b>Holding time:</b> flight holding time (seconds).</li>
                                          <li><b>Add. ASMA 40:</b> ASMA 40 additional time (can be negative) (seconds).</li>
                                          <li><b>Add. ASMA 60:</b> ASMA 60 additional time (can be negative) (seconds).</li>
                                          <li><b>Temperature:</b> temperature in the airport where turnaround is performed (Celsius).</li>
                                          <li><b>Visibility:</b> visibility in the airport where turnaround is performed (meters).</li>
                                          <li><b>Wind intensity:</b> wind intensity in the airport where turnaround is performed (knots).</li>
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
