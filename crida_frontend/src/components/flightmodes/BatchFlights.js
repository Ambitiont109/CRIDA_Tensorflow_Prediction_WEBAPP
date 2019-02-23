import React, { Component, Fragment } from 'react';
import TopControls from "./layout/batch/TopControls"
import MainContent from "./layout/batch/MainContent"
import BottomControls from "./layout/batch/BottomControls"
import styles from "./layout/styles/styles";
import { withStyles } from "@material-ui/core/styles";


class BatchFlights extends Component {

  constructor(props) {
      super(props);
      this.state = {
          csvData: [],
          holdingTime: 0,
          asma40: 49,
          asma60: 18,
          temperature: 9,
          visibility: 9999.00,
          windIntensity: 1.5,
          windDirection: "VRB",
          airportDepDelay: 8,
          prediction_arr: 0,
          prediction_dep: 0,
          probability_arr: 0.00,
          probability_dep: 0.00,
          delay_arr_cat: "NA",
          delay_dep_cat: "NA",
          chartDataAirportDepDelay: [],
          chartDataTurnaround: [],
          chartDataArrivalDelay: [],
          chartDataDistanceTarget: [],
          labelWidth: 0
      };
      this.handleChange = this.handleChange.bind(this);
  };

  updateDelay(prediction_arr,
              prediction_dep,
              probability_arr,
              probability_dep) {
    this.setState(prevState => ({
      prediction_arr: prediction_arr,
      prediction_dep: prediction_dep,
      delay_arr_cat: prediction_arr===0 ? "<15" : (prediction_arr===1 ? "[15; 60]" : ">60"),
      delay_dep_cat: prediction_dep===0 ? "==0" : (prediction_dep===1 ? "[0; 25]" : ">25"),
      probability_arr: probability_arr,
      probability_dep: probability_dep,

      chartDataAirportDepDelay: [
        ...prevState.chartDataAirportDepDelay,
        {airportDepDelay: prevState.airportDepDelay, delay: prediction_arr}
      ],

      chartDataTurnaround: [
        ...prevState.chartDataTurnaround,
        {turnaround: prevState.schedTurnd, delay: prediction_arr}
      ],

      chartDataArrivalDelay: [
        ...prevState.chartDataArrivalDelay,
        {arrivalDelay: prevState.arrivalDelay, delay: prediction_arr}
      ],

      chartDataDistanceTarget: [
        ...prevState.chartDataDistanceTarget,
        {distanceTarget: prevState.distanceTarget, delay: prediction_arr}
      ]

    }));
  };

  setCsvData = csvData => {
    this.setState({
      csvData
    }, () => {
      console.log(JSON.stringify(csvData))
    });
  }

  fetchData = () => {
      fetch("http://localhost:8000/batch_predict", {
        method: "POST",
        headers: {
          'Accept': 'application/jsonp, text/plain, */*',
            //'Content-Type': 'application/json'
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" // otherwise $_POST is empty
        },
        body: JSON.stringify({
          holdingTime: this.state.holdingTime,
          asma40: this.state.asma40,
          asma60: this.state.asma60,
          temperature: this.state.temperature,
          visibility: this.state.visibility,
          windIntensity: this.state.windIntensity,
          windDirection: this.state.windDirection,
          airportDepDelay: this.state.airportDepDelay,
          csvData: this.state.csvData
        })
      })
      .then((resp) => {
        return resp.json()
      })
      .then((data) => {
        this.updateDelay(data.prediction_arr,
                         data.prediction_dep,
                         data.probability_arr,
                         data.probability_dep)
      })
      .catch((error) => {
        console.log(error, "catch the hoop")
      })
  };

  handleChange = (name, event) => {
    this.setState({
      [name]: event.target.value
    }, () => {
      console.log("plannedDep",this.state.plannedDep)
    });
  };


  handleReset = () => {
      this.setState({
          chartDataAirportDepDelay: [],
          chartDataTurnaround: [],
          chartDataArrivalDelay: [],
          chartDataDistanceTarget: [],
          prediction_arr: 0,
          prediction_dep: 0,
          probability_arr: 0.00,
          probability_dep: 0.00,
          delay_arr_cat: "NA",
          delay_dep_cat: "NA"
      });
  };

  render() {
    return (

        <Fragment>

            <TopControls state={this.state} styles={this.props.classes} handleChange={this.handleChange} />

            <MainContent state={this.state} styles={this.props.classes} setCsvData={this.setCsvData} />

            <BottomControls state={this.state} styles={this.props.classes} fetchData={this.fetchData} handleReset={this.handleReset}/>

        </Fragment>

    );
  }
}

const StyledBatchFlights = withStyles(styles)(BatchFlights);
export default StyledBatchFlights;
