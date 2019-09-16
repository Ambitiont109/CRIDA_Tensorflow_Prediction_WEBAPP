import React, { Component, Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

class TopControls extends Component {
    render() {
        return (
        <Fragment>
            <CssBaseline />

            <div className={this.props.styles.header}>
              <h1 className={this.props.styles.h1}>
                Prediction of arrival and departure delays for a batch of flights at LEMD airport
              </h1>
              <h2 className={this.props.styles.h2}>
                Batch size: 20 flights
              </h2>
            </div>

            <div className={this.props.styles.topControls_batch}>
              <Grid container spacing={24}>
                  <Grid item xs={true}>
                    <TextField
                        id="airportDepDelay"
                        label="Airport dep. delay (last 2 hours)"
                        onChange={(event) => this.props.handleChange("airportDepDelay", event)}
                        value={this.props.state.airportDepDelay}
                        type="number"
                        className={this.props.styles.textField}
                        margin="normal"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">(minutes)</InputAdornment>,
                        }}
                        onInput = {(e) =>{
                            e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,12)
                        }}
                    />
                  </Grid>
                  <Grid item xs={true}>
                    <TextField
                        id="visibility"
                        label="Visibility"
                        onChange={(event) => this.props.handleChange("visibility", event)}
                        value={this.props.state.visibility}
                        type="number"
                        className={this.props.styles.textField}
                        margin="normal"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">(meters)</InputAdornment>,
                        }}
                        onInput = {(e) =>{
                            e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,12)
                        }}
                    />
                  </Grid>
                  <Grid item xs={true}>
                    <TextField
                        id="windIntensity"
                        label="Wind intensity"
                        onChange={(event) => this.props.handleChange("windIntensity", event)}
                        value={this.props.state.windIntensity}
                        type="number"
                        className={this.props.styles.textField}
                        margin="normal"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">(knots)</InputAdornment>,
                        }}
                        onInput = {(e) =>{
                            e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,12)
                        }}
                    />
                  </Grid>
                  <Grid item xs={true}>
                    <TextField
                        id="windDirection"
                        label="Wind direction"
                        onChange={(event) => this.props.handleChange("windDirection", event)}
                        value={this.props.state.windDirection}
                        type="string"
                        className={this.props.styles.textField}
                        margin="normal"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">(category)</InputAdornment>,
                        }}
                    />
                  </Grid>
                  <Grid item xs={true}>
                    <TextField
                        id="temperature"
                        label="Temperature"
                        onChange={(event) => this.props.handleChange("temperature", event)}
                        value={this.props.state.temperature}
                        type="number"
                        className={this.props.styles.textField}
                        margin="normal"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">(Celsius)</InputAdornment>,
                        }}
                    />
                  </Grid>
              </Grid>
            </div>
        </Fragment>
      );
    }
}

export default TopControls;
