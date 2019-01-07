import React, { Component } from 'react'
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

class Calendar extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography className={classes.header} variant="h4" gutterBottom>
          Calendar
        </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(Calendar)
