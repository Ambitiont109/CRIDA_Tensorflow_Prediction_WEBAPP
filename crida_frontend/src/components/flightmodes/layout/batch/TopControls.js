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
                Prediction of arrival and departure delays for a batch of flights
              </h1>
              <h2 className={this.props.styles.h2}>
                Batch size: 20 flights
              </h2>
            </div>

            <div className={this.props.styles.topControls}>
              <Grid container spacing={24}>
                  <Grid item xs={true}>
                    <TextField
                        id="holdingTime"
                        className={this.props.styles.textField}
                        onChange={(event) => this.props.handleChange("holdingTime", event)}
                        value={this.props.state.holdingTime}
                        margin="normal"
                        label="Holding time"
                        type="number"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">(seconds)</InputAdornment>,
                        }}
                        onInput = {(e) =>{
                            e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,12)
                        }}
                    />
                  </Grid>
                  <Grid item xs={true}>
                    <TextField
                        id="asma40"
                        label="Additional ASMA 40"
                        onChange={(event) => this.props.handleChange("asma40", event)}
                        value={this.props.state.asma40}
                        type="number"
                        className={this.props.styles.textField}
                        margin="normal"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">(seconds)</InputAdornment>,
                        }}
                    />
                  </Grid>
                  <Grid item xs={true}>
                    <TextField
                        id="asma60"
                        label="Additional ASMA 60"
                        onChange={(event) => this.props.handleChange("asma60", event)}
                        value={this.props.state.asma60}
                        type="number"
                        className={this.props.styles.textField}
                        margin="normal"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">(seconds)</InputAdornment>,
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

              <Grid container spacing={24}>
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
                        label="Wind Intensity"
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
                        label="Wind Direction"
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
                        id="airportDepDelay"
                        label="Airport Dep. Delay (last 2 hours)"
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
              </Grid>
            </div>
        </Fragment>
      );
    }
}

export default TopControls;
