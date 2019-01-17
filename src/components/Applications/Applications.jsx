import React, { Component } from 'react'
import AddApplicationModal from './AddApplicationModal'
import ApplicationsTable from './ApplicationsTable'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'

const styles = theme => ({
  header: {
    width: '100%',
    backgroundColor: '#ffffff',
    color: '#686A6C',
    padding: theme.spacing.unit * 3,
  },
});

class Applications extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_APPLICATIONS' })
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <Typography className={classes.header} variant="h4" gutterBottom>
            Applications
          </Typography>
        </div>
        <br/>
        <AddApplicationModal />
        <ApplicationsTable />
      </div>
    )
  }
}

export default connect()(withStyles(styles)(Applications))
