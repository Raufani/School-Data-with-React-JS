import React from 'react';
import {Table} from './table';


import '../../App.css';

class TableShow extends React.Component {
  render() {
    return (
        <div className="App-text">
          <Table data={this.dataSet}/>
        </div>
    );
  }
}

export default TableShow;