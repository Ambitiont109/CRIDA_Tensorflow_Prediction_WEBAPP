import React, { Component, Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import CSVDataTable from './CSVDataTable';

class MainContent extends Component {
    render() {
        return (
          <Fragment>
              <CssBaseline />
              <main className={this.props.styles.mainPart}>
                  <CSVDataTable setCsvData={this.props.setCsvData} />
              </main>
          </Fragment>
        );
    }
}

export default MainContent;
