import React, { Component } from 'react';
import {Typography} from '@material-ui/core';

class DataView extends Component {
  constructor () {
    super();
    this.state = {
      rows: []
    }
  }

  tick () {
    fetch('http://APPSERVER:8080/api/indirectCount/?dept=DES-S')
    .then(results => {
      return results.json();
    }).then(data => {
    console.log (data)
      let rows = data[0].IndirectCount;
      this.setState({rows:rows})
    }).catch(error => {
        console.error(error);
    })
  }

  componentDidMount () {
    this.interval = setInterval(() => this.tick(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render () {
    return (
        <Typography variant="h3">
        {this.state.rows}
        </Typography>
    )
  }
}

export default DataView