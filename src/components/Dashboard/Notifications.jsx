import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
    flexGrow: 1,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  jobText: {
    marginTop: theme.spacing.unit,
  },
});

class Notifications extends Component {

  handleDismiss = (notification) => {
    this.props.dispatch({ type: 'DISMISS_NOTIFICATION', payload: notification })
  }
  handleComplete = (notification) => {
    notification = {
      ...notification,
      follow_up_complete: true,
    }
    this.props.dispatch({ type: 'DISMISS_NOTIFICATION', payload: notification })
  }

  render() {
    const { classes, notification } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <Grid container spacing={24}>
            <Grid item xs={9}>
              <Typography className={classes.jobText} component="p">
                {`${notification.position} at ${notification.company}`}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Button size="small" onClick={() => this.handleComplete(notification)}>
                Complete
              </Button>
              <Button size="small" onClick={() => this.handleDismiss(notification)}>
                Dismiss
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications,
})

export default connect(mapStateToProps)(withStyles(styles)(Notifications))
