import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import ApplicationRow from './ApplicationRow'


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  tableRow: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
})

class SimpleTable extends Component {

  handleClick = () => {
    console.log('hello');
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_APPLICATIONS' })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Position</TableCell>
                <TableCell >Company</TableCell>
                <TableCell >Date Applied</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.applications.map(application => {
                return (
                  <TableRow onClick={this.handleClick} className={classes.tableRow} key={application.id}>
                    <TableCell component="th" scope="row">
                      {application.position}
                    </TableCell>
                    <TableCell >{application.company}</TableCell>
                    <TableCell >{application.date_applied}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  applications: state.applications,
})

export default connect(mapStateToProps)(withStyles(styles)(SimpleTable))
