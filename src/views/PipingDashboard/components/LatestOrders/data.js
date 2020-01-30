import React, { Component } from 'react';
import {
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const ConvertToWord = (value) => {
  switch (value) {
    case "1":
      return "Tender";
    case "2":
      return "In Progress";
    case "3":
      return "Submitted to Client";
    case "4":
      return "Approved by Client";
    case "5":
      return "Internal Review";
    case "6": 
      return "Ready to Submit";
    case "7": 
      return "Closed";
    case "8":
      return "On Hold";
    case "9":
      return "Awaiting Comments";
    default:
      return "Unknown";
  }
}

const useStyles = makeStyles(theme => ({
  good : {
    backgroundColor:"#33cc33", color:"black", fontSize:"16px"
  },
  warning : {
    backgroundColor:"#ffcc00", color:"black", fontSize:"16px"
  },
  bad : {
    backgroundColor:"#ff3300", color:"white", fontSize:"16px"
  },
  onhold : {
    backgroundColor:"#6666", color:"black", fontSize:"16px"
  },
  submit : {
    backgroundColor:"#cc66ff", color:"white", fontSize:"16px"
  },
  default : {
    fontSize:"16px"
  }
}));

const today = new Date();
const sevenDays = new Date();
sevenDays.setDate(sevenDays.getDate() + 7);

const DetermineRowFormat = props => {
  const classes = useStyles();
  const row = props.row;

  var jobStatus = classes.default;

  switch ((row.jmpOnHold) ? "8" : row.ujmpStatusID) {
    case "3":
      jobStatus = classes.good;
      break;
    case "4":
        jobStatus = classes.good;
      break;
    case "6": 
        jobStatus = classes.submit;
      break;
    case "8":
        jobStatus = classes.onhold;
      break;
  }

  var dueStatus = (sevenDays >= new Date(row.DueDate)) ? classes.warning : classes.default;
  dueStatus = (today >= new Date(row.DueDate)) ? classes.bad : dueStatus;

  if (row.DueDate == null || row.DueDate === undefined)
    dueStatus = classes.default;

  var budgetStatus = (row.Actual >= (row.Budget * 0.7)) ? classes.warning : classes.default
  budgetStatus = (row.Actual >= (row.Budget)) ? classes.bad : budgetStatus;
  
    return (
      <TableRow key={row.jmpJobID}>
        <TableCell className={jobStatus} style={{width: "448px"}}>{row.jmpProjectID}</TableCell>
        <TableCell className={jobStatus} style={{width: "182px"}}>{row.jmpJobID}</TableCell>
        <TableCell className={jobStatus} style={{width: "132px"}}>{row.Revision}</TableCell>
        <TableCell className={jobStatus} style={{width: "232px"}}>{ConvertToWord((row.jmpOnHold) ? "8" : row.ujmpStatusID)}</TableCell>
        <TableCell className={dueStatus} style={{width: "122px"}}>
          {((row.DueDate != null && row.DueDate !== undefined) ? moment(row.DueDate).format('DD/MM/YYYY') : "")}
        </TableCell>
        <TableCell className={classes.default} style={{width: "82px"}}>{row.Budget}</TableCell>
        <TableCell className={budgetStatus} style={{width: "82px"}}>{row.Actual}</TableCell>
        <TableCell>{row.ActiveEmployees}</TableCell>
      </TableRow>
    )

}

DetermineRowFormat.propTypes = {
  row: PropTypes.node
};

class DataView extends Component {
  constructor () {
    super();
    this.state = {
      rows: []
    }
  }

  tick () {
    try {
      fetch('http://APPSERVER:8080/api/openJobs/?part=DES-P')
      .then(results => {
        return results.json();
      }).then(data => {
        if (Array.isArray(data))
        {
        let rows = data.map((row) => {
          return (
            <DetermineRowFormat row={row} />
          )
        })
        this.setState({rows:rows})
        }
      })
    }
    catch (err) {
      console.log (err);
      this.setState({rows:[]})
    }
  }

  componentDidMount () {
    this.interval = setInterval(() => this.tick(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render () {
    return (
        <TableBody>
          {this.state.rows}
        </TableBody>
    )
  }
}

export default DataView