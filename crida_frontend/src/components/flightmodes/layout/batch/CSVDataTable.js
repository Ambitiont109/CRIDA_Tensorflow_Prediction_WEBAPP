import React, { Component } from 'react';
import { CsvToHtmlTable } from 'react-csv-to-table';
import ReactFileReader from 'react-file-reader';
import Button from '@material-ui/core/Button';

const sampleData = `
NUM,AIRLINE_ICAO,WAKE,DATETIME,PLANNED_TURNAROUND,DISTANCE,TYPE
1,VLG,H,2016-01-02 04:05:00,605,9920.67,ARR
2,AEA,H,2016-01-02 04:25:00,125.0,10060.80,DEP
3,AVA,H,2016-01-02 05:05:00,120.0,8033.86,DEP
4,IBE,H,2016-01-02 05:20:00,320.0,6000.00,ARR
5,IBE,H,2016-01-02 05:25:00,325.0,6698.42,DEP
6,IBE,H,2016-01-02 05:30:00,160.0,10699.06,ARR
7,IBE,H,2016-01-02 05:30:00,330.0,9081.35,ARR
8,IBE,H,2016-01-02 05:40:00,355.0,5776.89,ARR
9,VLG,M,2016-01-02 05:50:00,540.0,284.73,DEP
10,ETD,H,2016-01-02 06:35:00,85.0,5647.10,DEP
11,IBS,M,2016-01-02 06:50:00,70.0,547.36,ARR
12,IBE,H,2016-01-02 06:50:00,225.0,6763.16,ARR
13,IBE,H,2016-01-02 06:50:00,240.0,7120.40,ARR
14,IBE,H,2016-01-02 06:50:00,245.0,7010.08,DEP
15,QTR,H,2016-01-02 06:55:00,95.0,5338.52,ARR
16,IBS,M,2016-01-02 07:00:00,45.0,485.52,DEP
17,IBS,M,2016-01-02 07:00:00,45.0,394.98,ARR
18,ELY,M,2016-01-02 07:05:00,85.0,3550.48,ARR
19,AAL,H,2016-01-02 07:05:00,300.0,5925.61,ARR
20,TVF,M,2016-01-02 07:30:00,40.0,1030.31,DEP
`;

class CSVDataTable extends Component {

    state={
      csvData: sampleData
    };

    handleFiles = files => {
        var reader = new FileReader();
        reader.onload =  (e) => {
          // Use reader.result
          this.setState({
            csvData: reader.result
          })
          this.props.setCsvData(reader.result)
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
