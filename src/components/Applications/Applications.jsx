import React, { Component } from 'react'
import ApplicationModal from './ApplicationModal'
import Table from './Table'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  header: {
    width: '100%',
    backgroundColor: '#ffffff',
    color: '#686A6C',
    padding: theme.spacing.unit * 3,
  },
});

class Applications extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography className={classes.header} variant="h4" gutterBottom>
          Applications
        </Typography>
        <ApplicationModal />
        <Table />
      </div>
    )
  }
}

export default withStyles(styles)(Applications)
