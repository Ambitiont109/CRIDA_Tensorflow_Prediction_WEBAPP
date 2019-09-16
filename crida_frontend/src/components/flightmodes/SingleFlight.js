import React, { Component, Fragment } from 'react';
import TopControls from "./layout/single/TopControls"
import MainContent from "./layout/single/MainContent"
import BottomControls from "./layout/single/BottomControls"
import styles from "./layout/styles/styles";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';

class SingleFlight extends Component {

  constructor(props) {
      super(props);
      this.state = {
          holdingTime: 1,
          plannedArr: "2017-05-24T10:30",
          plannedDep: "2017-05-24T11:15",
          schedTurnd: 45,
          asma40: 100,
          asma60: 500,
          wake: "H",
          temperature: 20,
          visibility: 10000,
          windIntensity: 8.0,
          arrivalDelay: 5,
          airportDepDelay: 15,
          distanceOrigin: 483.93,
          distanceTarget: 483.93,
          arrAirlineICAO: "VLG",
          delay: 0,
          delay_probability: 0,
          delay_cat: "NA",
          chartDataAirportDepDelay: [],
          chartDataTurnaround: [],
          chartDataArrivalDelay: [],
          chartDataDistanceTarget: [],
          labelWidth: 0,
          loading:false,
      };
      this.handleChange = this.handleChange.bind(this);
  };

  updateDelay(predicted_delay,delay_probability) {
    this.setState(prevState => ({
      delay: predicted_delay,
      delay_probability: delay_probability,
      delay_cat: predicted_delay===0 ? "<0" : (predicted_delay===1 ? "[0; 15]" : (predicted_delay===2 ? "(15; 45]" : (predicted_delay===3 ? "(45; 90]" : ">90"))),
      loading:false,

      chartDataAirportDepDelay: [
        ...prevState.chartDataAirportDepDelay,
        {airportDepDelay: prevState.airportDepDelay, delay: predicted_delay}
      ],

      chartDataTurnaround: [
        ...prevState.chartDataTurnaround,
        {turnaround: prevState.schedTurnd, delay: predicted_delay}
      ],

      chartDataArrivalDelay: [
        ...prevState.chartDataArrivalDelay,
        {arrivalDelay: prevState.arrivalDelay, delay: predicted_delay}
      ],

      chartDataDistanceTarget: [
        ...prevState.chartDataDistanceTarget,
        {distanceTarget: prevState.distanceTarget, delay: predicted_delay}
      ]

    }));
  };

  fetchData = () => {
      this.setState({loading:true});
      this.setState((state) => ({
          schedTurnd: (new Date(state.plannedDep)-new Date(state.plannedArr)) / 60000
        }),
        () => {
          const url = "http://0.0.0.0:55002/single_predict?"+
          '&arrivalDelay='+this.state.arrivalDelay+
          '&schedTurnd='+this.state.schedTurnd+
          '&distanceTarget='+this.state.distanceTarget+
          '&plannedDep='+this.state.plannedDep+
          '&asma40='+this.state.asma40+
          '&asma60='+this.state.asma60+
          '&holdingTime='+this.state.holdingTime+
          '&windIntensity='+this.state.windIntensity+
          '&visibility='+this.state.visibility+
          '&temperature='+this.state.temperature+
          '&wake='+this.state.wake+
          '&airportDepDelay='+this.state.airportDepDelay+
          '&distanceOrigin='+this.state.distanceOrigin+
          '&arrAirlineICAO='+this.state.arrAirlineICAO;

          fetch(url, {
            method: "GET",
            dataType: "JSON",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            }
          })
          .then((resp) => {
            return resp.json()
          })
          .then((data) => {
            this.updateDelay(data.prediction,data.probability)
          })
          .catch((error) => {
            console.log(error, "catch the hoop")
            this.setState({loading:false});
          })
        }
      );
  };

  handleChange = (name, event) => {
    this.setState({
      [name]: event.target.value
    }, () => {
      console.log("visibility",this.state.visibility)
    });
  };


  handleReset = () => {
      this.setState({
          chartDataAirportDepDelay: [],
          chartDataTurnaround: [],
          chartDataArrivalDelay: [],
          chartDataDistanceTarget: [],
          delay: 0,
          delay_probability: 0,
          delay_cat: "NA"
      });
  };

  render() {
    let loader;
    if (this.state.loading)
    {
      loader =  <div className={[this.props.classes.spinner_bg, this.props.classes.show].join(" ")}>
              <CircularProgress size={48}/>
            </div>;
    }
    else{
      loader = null;

    }
    return (

        <Fragment>
            {loader}
            <TopControls state={this.state} styles={this.props.classes} handleChange={this.handleChange} />

            <MainContent state={this.state} styles={this.props.classes} />

            <BottomControls state={this.state} styles={this.props.classes} fetchData={this.fetchData} handleReset={this.handleReset}/>

        </Fragment>

    );
  }
}

const StyledSingleFlight = withStyles(styles)(SingleFlight);
export default StyledSingleFlight;
