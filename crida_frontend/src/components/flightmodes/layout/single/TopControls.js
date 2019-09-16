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
import {airportDistances, airlines} from './Constants';

class TopControls extends Component {

    render() {
      console.log('==================');
      console.log(this.props);
        return (
        <Fragment>
            <CssBaseline />

            <div className={this.props.styles.header}>
              <h1 className={this.props.styles.h1}>
                Prediction of departure delays for a single flight at LEMD airport
              </h1>
            </div>

            <div className={this.props.styles.topControls}>
              <Grid container spacing={24}>
                <Grid item xs={true}>
                  <TextField
                    name="plannedArr"
                    id="plannedArr"
                    onChange={(event) => this.props.handleChange("plannedArr", event)}
                    value={this.props.state.plannedArr}
                    label="SIBT"
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
                    name="plannedDep"
                    id="plannedDep"
                    onChange={(event) => this.props.handleChange("plannedDep", event)}
                    value={this.props.state.plannedDep}
                    label="SOBT"
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
                  <FormControl
                      className={this.props.styles.formControl}
                      margin="normal">
                      <InputLabel shrink htmlFor="distanceOrigin-label-placeholder">
                          From (ICAO)
                      </InputLabel>
                      <Select
                        onChange={(event) => this.props.handleChange("distanceOrigin", event)}
                        value={this.props.state.distanceOrigin}
                        input={<Input name="distanceOrigin" id="distanceOrigin-label-placeholder" />}
                        displayEmpty
                        name="distanceOrigin"
                      >
                      {airportDistances && airportDistances.length && airportDistances.sort((a, b) => (a.label > b.label) ? 1 : -1).map((option, i) => {
                          if (i===0) {
                            return <MenuItem value={option.value} key={"o"+i} selected={true}>{option.label}</MenuItem>
                          }
                          else {
                            return <MenuItem value={option.value} key={"o"+i}>{option.label}</MenuItem>
                          }
                      })}
                      </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={true}>
                  <FormControl
                      className={this.props.styles.formControl}
                      margin="normal">
                      <InputLabel shrink htmlFor="distanceTarget-label-placeholder">
                          To (ICAO)
                      </InputLabel>
                      <Select
                        onChange={(event) => this.props.handleChange("distanceTarget", event)}
                        value={this.props.state.distanceTarget}
                        input={<Input name="distanceTarget" id="distanceTarget-label-placeholder" />}
                        displayEmpty
                        name="distanceTarget"
                      >
                      {airportDistances && airportDistances.length && airportDistances.sort((a, b) => (a.label > b.label) ? 1 : -1).map((option, i) => {
                          if (i===0) {
                            return <MenuItem value={option.value} key={"t"+i} selected={true}>{option.label}</MenuItem>
                          }
                          else {
                            return <MenuItem value={option.value} key={"t"+i}>{option.label}</MenuItem>
                          }
                      })}
                      </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={true}>
                  <FormControl
                      className={this.props.styles.formControl}
                      margin="normal">
                      <InputLabel shrink htmlFor="arrAirlineICAO-label-placeholder">
                          Airline (ICAO)
                      </InputLabel>
                      <Select
                        onChange={(event) => this.props.handleChange("arrAirlineICAO", event)}
                        value={this.props.state.arrAirlineICAO}
                        input={<Input name="arrAirlineICAO" id="arrAirlineICAO-label-placeholder" />}
                        displayEmpty
                        name="arrAirlineICAO"
                      >
                      {airlines && airlines.length && airlines.sort((a, b) => (a.label > b.label) ? 1 : -1).map((option, i) => {
                          if (i===0) {
                            return <MenuItem value={option.label} key={"a"+i} selected={true}>{option.label}</MenuItem>
                          }
                          else {
                            return <MenuItem value={option.label} key={"a"+i}>{option.label}</MenuItem>
                          }
                      })}
                      </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={true}>
                    <FormControl
                        className={this.props.styles.formControl}
                        margin="normal">
                        <InputLabel shrink htmlFor="wake-label-placeholder">
                            Wake turbulence
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
              </Grid>

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
              </Grid>
            </div>

        </Fragment>
      );
    }
}

export default TopControls;
