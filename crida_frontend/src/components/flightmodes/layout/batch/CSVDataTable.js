import React, { Component } from 'react';
import { CsvToHtmlTable } from 'react-csv-to-table';
import ReactFileReader from 'react-file-reader';
import Button from '@material-ui/core/Button';
import {airportDistances} from './Constants';

const sampleData = 
`NUM,AIRLINE_ICAO,WAKE,DATETIME,PLANNED_TURNAROUND,DISTANCE,TYPE,HOLDING,ASMA40,ASMA60
1,VLG,H,2016-01-02 04:05:00,605,LEBL,ARR,0,"49,23",18
2,AEA,H,2016-01-02 04:25:00,125.0,LEBL,DEP,0,49,18
3,AVA,H,2016-01-02 05:05:00,120.0,LEBL,DEP,0,49,18
4,IBE,H,2016-01-02 05:20:00,320.0,LEBL,ARR,0,49,18
5,IBE,H,2016-01-02 05:25:00,325.0,LEBL,DEP,0,49,18
6,IBE,H,2016-01-02 05:30:00,160.0,LEBL,ARR,0,49,18
7,IBE,H,2016-01-02 05:30:00,330.0,LEBL,ARR,0,49,18
8,IBE,H,2016-01-02 05:40:00,355.0,LEBL,ARR,0,49,18
9,VLG,M,2016-01-02 05:50:00,540.0,LEBL,DEP,0,49,18
10,ETD,H,2016-01-02 06:35:00,85.0,LEBL,DEP,0,49,18
11,IBS,M,2016-01-02 06:50:00,70.0,LEBL,ARR,0,49,18
12,IBE,H,2016-01-02 06:50:00,225.0,LEBL,ARR,0,49,18
13,IBE,H,2016-01-02 06:50:00,240.0,LEBL,ARR,0,49,18
14,IBE,H,2016-01-02 06:50:00,245.0,LEBL,DEP,0,49,18
15,QTR,H,2016-01-02 06:55:00,95.0,LEBL,ARR,0,49,18
16,IBS,M,2016-01-02 07:00:00,45.0,LEBL,DEP,0,49,18
17,IBS,M,2016-01-02 07:00:00,45.0,LEBL,ARR,0,49,18
18,ELY,M,2016-01-02 07:05:00,85.0,LEBL,ARR,0,49,18
19,AAL,H,2016-01-02 07:05:00,300.0,LEBL,ARR,0,49,18
20,TVF,M,2016-01-02 07:30:00,40.0,LEBL,DEP,0,49,18
`;

const replaceAirportsByDistances = data =>
  airportDistances.reduce(
    (acc, d) => acc.replace(new RegExp(`,${d.label},`, "g"), `,${d.value},`),
    data
);

class CSVDataTable extends Component {

    constructor(props){
      super(props);
      let converted = replaceAirportsByDistances(sampleData);
      this.state = {
        csvData: converted
      }
      this.props.setCsvData(converted);
    }

    handleFiles = files => {
        var reader = new FileReader();
        reader.onload =  (e) => {
          // Use reader.result
          let converted = replaceAirportsByDistances(reader.result);
          this.setState({
            csvData: converted
          });
          console.log("=================");
          console.log(converted);
          this.props.setCsvData(converted);
        }
        reader.readAsText(files[0]);
    }
    render() {

        return <div>
          <ReactFileReader
            multipleFiles={false}
            fileTypes={[".csv"]}
            handleFiles={this.handleFiles}>
            <Button
                variant="contained"
                color="primary"
            >
                Load data
            </Button>

          </ReactFileReader>
          <CsvToHtmlTable
            data={this.state.csvData || sampleData}
            csvDelimiter=","
            tableClassName="table table-striped table-hover"
          />
    </div>
    }
}

export default CSVDataTable;
