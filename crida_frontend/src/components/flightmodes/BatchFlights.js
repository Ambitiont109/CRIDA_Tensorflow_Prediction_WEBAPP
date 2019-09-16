import React, { Component, Fragment } from 'react';
import TopControls from "./layout/batch/TopControls"
import MainContent from "./layout/batch/MainContent"
import BottomControls from "./layout/batch/BottomControls"
import styles from "./layout/styles/styles";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
        labelWidth: 0,
        loading:false,
        loadingStatus:false,
        loadingStatusText:"",
        open:false,
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
      delay_arr_cat: prediction_arr===0 ? "<=15" : (prediction_arr===1 ? "(15; 60]" : ">60"),
      delay_dep_cat: prediction_dep===0 ? "<=15" : (prediction_dep===1 ? "(15; 35]" : ">35"),
      probability_arr: probability_arr,
      probability_dep: probability_dep,
      loading:false,
      loadingStatus:true,
      loadingStatusText:"success",

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
    // this.state.csvData = csvData;
    this.setState({
      csvData
    }, () => {
      console.log(JSON.stringify(csvData))
    });
  }

  validateCSVData = () => {
    
  }
  fetchData = () => {
      this.setState({loading:true});

      fetch("http://0.0.0.0:55002/batch_predict", {
        method: "POST",
        headers: {
          'Accept': 'application/jsonp, text/plain, */*',
            //'Content-Type': 'application/json'
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" // otherwise $_POST is empty
        },
        body: JSON.stringify({
          //holdingTime: this.state.holdingTime,
          //asma40: this.state.asma40,
          //asma60: this.state.asma60,
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
        if(data['success'] == true)
        {
          this.updateDelay(data.prediction_arr,
                             data.prediction_dep,
                             data.probability_arr,
                             data.probability_dep)          
        }else{
          this.setState({ loading:false,
                          loadingStatus:false,
                          loadingStatusText: data['error_msg'],
                          open:true
          });
        }
      })
      .catch((error) => {
        console.log(error)
        this.setState({ loading:false,
                        loadingStatus:false,
                        loadingStatusText: "error",
                        open:true
        });
      })
  };

  handleClickOpen = () => {
    this.state.open = true;
  };

  handleClose = () => {
    this.setState({open:false});
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
    console.log(this.props);
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

            <MainContent state={this.state} styles={this.props.classes} setCsvData={this.setCsvData} />

            <BottomControls state={this.state} styles={this.props.classes} fetchData={this.fetchData} handleReset={this.handleReset}/>
            <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">{"Error has been issued while predicting?"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                      {this.state.loadingStatusText}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleClose} color="primary" autoFocus>
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
        </Fragment>


    );
  }
}

const StyledBatchFlights = withStyles(styles)(BatchFlights);
export default StyledBatchFlights;
