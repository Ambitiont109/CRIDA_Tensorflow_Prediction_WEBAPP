import React, { Component, Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

class BottomControls extends Component {
    render() {
        return (
          <Fragment>
              <CssBaseline />
                <AppBar position="fixed" color="primary" className={this.props.styles.appBar}>
                    <div className={this.props.styles.toolbar}>
                        <Grid container spacing={24}>
                            <Grid item xs={6} sm={3}>
                                <Button variant="contained" color="primary" onClick={this.props.fetchData} className={this.props.styles.button}>
                                    Predict
                                    <Icon className={this.props.styles.rightIcon}>send</Icon>
                                </Button>
                                <Button variant="contained" color="primary" onClick={this.props.handleReset} className={this.props.styles.button}>
                                    Reset
                                    <Icon className={this.props.styles.rightIcon}>clear</Icon>
                                </Button>
                            </Grid>
                            <Grid item xs={6} sm={2}>
                                <Card className={this.props.styles.predictedDelay}>
                                    <CardActionArea>
                                        <CardContent>
                                            <div className={this.props.styles.predictedDelayText}>
                                                Delay class: {this.props.state.delay_cat} <span> </span>
                                                (Prob.: {this.props.state.delay_probability})
                                            </div>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>
              </AppBar>
          </Fragment>
        );
    }
}

export default BottomControls;
