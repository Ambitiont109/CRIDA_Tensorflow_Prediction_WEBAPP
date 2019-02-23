import React, { Component } from 'react';
import { CsvToHtmlTable } from 'react-csv-to-table';
import ReactFileReader from 'react-file-reader';
import Button from '@material-ui/core/Button';

const sampleData = `
NUM,AIRLINE_ARR_ICAO,WAKE,SIBT,SOBT,PLANNED_TURNAROUND,DISTANCE_FROM_ORIGIN,DISTANCE_TO_TARGET
1,VLG,M,2016-01-01 04:05:00,2016-01-01 14:10:00,45,2000,2000
2,VLG,M,2016-01-01 04:05:00,2016-01-01 14:10:00,45,2000,2000
3,VLG,M,2016-01-01 04:05:00,2016-01-01 14:10:00,45,2000,2000
4,VLG,M,2016-01-01 04:05:00,2016-01-01 14:10:00,45,2000,2000
5,VLG,M,2016-01-01 04:05:00,2016-01-01 14:10:00,45,2000,2000
6,VLG,M,2016-01-01 04:05:00,2016-01-01 14:10:00,45,2000,2000
7,VLG,M,2016-01-01 04:05:00,2016-01-01 14:10:00,45,2000,2000
8,VLG,M,2016-01-01 04:05:00,2016-01-01 14:10:00,45,2000,2000
9,VLG,M,2016-01-01 04:05:00,2016-01-01 14:10:00,45,2000,2000
10,VLG,M,2016-01-01 04:05:00,2016-01-01 14:10:00,45,2000,2000
11,VLG,M,2016-01-01 04:05:00,2016-01-01 14:10:00,45,2000,2000
12,VLG,M,2016-01-01 04:05:00,2016-01-01 14:10:00,45,2000,2000
13,VLG,M,2016-01-01 04:05:00,2016-01-01 14:10:00,45,2000,2000
14,VLG,M,2016-01-01 04:05:00,2016-01-01 14:10:00,45,2000,2000
15,VLG,M,2016-01-01 04:05:00,2016-01-01 14:10:00,45,2000,2000
16,VLG,M,2016-01-01 04:05:00,2016-01-01 14:10:00,45,2000,2000
17,VLG,M,2016-01-01 04:05:00,2016-01-01 14:10:00,45,2000,2000
18,VLG,M,2016-01-01 04:05:00,2016-01-01 14:10:00,45,2000,2000
19,VLG,M,2016-01-01 04:05:00,2016-01-01 14:10:00,45,2000,2000
20,VLG,M,2016-01-01 04:05:00,2016-01-01 14:10:00,45,2000,2000
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
