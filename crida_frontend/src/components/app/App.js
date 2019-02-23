import React, { Component } from "react";
import FlightModeSelectionPage from "../flightmodes/FlightModeSelectionPage";
import SingleFlight from "../flightmodes/SingleFlight";
import BatchFlights from "../flightmodes/BatchFlights";

class App extends Component {
  state = {
    renderView: 0
  };

  clickBtn = e => {
    console.log(e.target.value);
    this.setState({
      renderView: +e.target.parentNode.value
    });
  };

  render() {
    switch (this.state.renderView) {
      case 1:
        return <SingleFlight />;
      case 2:
        return <BatchFlights />;
      default:
        return <FlightModeSelectionPage clickBtn={this.clickBtn} />;
    }
  }
}

export default App;
