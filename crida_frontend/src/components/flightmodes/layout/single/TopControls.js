import React, { Component, Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

class TopControls extends Component {
    render() {
        return (
        <Fragment>
            <CssBaseline />

            <div className={this.props.styles.header}>
              <h1 className={this.props.styles.h1}>
                Prediction of departure delays for a single flight
              </h1>
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
                      label="Add. ASMA 40"
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
                      label="Add. ASMA 60"
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
                    name="plannedDep"
                    id="plannedDep"
                    onChange={(event) => this.props.handleChange("plannedDep", event)}
                    value={this.props.state.plannedDep}
                    label="Scheduled departure"
                    type="datetime-local"
                    className={this.props.styles.textField}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={true}>
                  <TextField
                      id="schedTurnd"
                      label="Planned turnd"
                      onChange={(event) => this.props.handleChange("schedTurnd", event)}
                      value={this.props.state.schedTurnd}
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
                <Grid item xs={true}>
                  <TextField
                    name="arrAirlineICAO"
                    id="arrAirlineICAO"
                    label="Airline (ICAO)"
                    onChange={(event) => this.props.handleChange("arrAirlineICAO", event)}
                    value={this.props.state.arrAirlineICAO}
                    type="string"
                    className={this.props.styles.textField}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={24}>
                <Grid item xs={true}>
                    <FormControl
                        className={this.props.styles.formControl}
                        margin="normal">
                        <InputLabel shrink htmlFor="wake-label-placeholder">
                            Wake
                        </InputLabel>
                        <Select
                          onChange={(event) => this.props.handleChange("wake", event)}
                          value={this.props.state.wake}
                          input={<Input name="wake" id="wake-label-placeholder" />}
                          displayEmpty
                          name="wake"
                        >
                          <MenuItem value={"H"}>Heavy</MenuItem>
                          <MenuItem value={"M"}>Medium</MenuItem>
                          <MenuItem value={"L"}>Light</MenuItem>
                        </Select>
                    </FormControl>
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
                      id="arrivalDelay"
                      label="Arrival delay"
                      onChange={(event) => this.props.handleChange("arrivalDelay", event)}
                      value={this.props.state.arrivalDelay}
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
                      id="distanceOrigin"
                      label="Distance from origin"
                      onChange={(event) => this.props.handleChange("distanceOrigin", event)}
                      value={this.props.state.distanceOrigin}
                      type="number"
                      className={this.props.styles.textField}
                      margin="normal"
                      InputProps={{
                          startAdornment: <InputAdornment position="start">(km)</InputAdornment>
                      }}
                      onInput = {(e) =>{
                          e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,12)
                      }}
                  />
                </Grid>
                <Grid item xs={true}>
                  <TextField
                      id="distanceTarget"
                      label="Distance to target"
                      onChange={(event) => this.props.handleChange("distanceTarget", event)}
                      value={this.props.state.distanceTarget}
                      type="number"
                      className={this.props.styles.textField}
                      margin="normal"
                      InputProps={{
                          startAdornment: <InputAdornment position="start">(km)</InputAdornment>
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
