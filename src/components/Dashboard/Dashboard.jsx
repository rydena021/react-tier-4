import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import LogOutButton from '../LogOutButton/LogOutButton'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PeopleIcon from '@material-ui/icons/People';
import moment from 'moment';

const styles = theme => ({
  header: {
    width: '100%',
    backgroundColor: '#ffffff',
    color: '#686A6C',
    padding: theme.spacing.unit * 3,
  },
  root: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 3,
    margin: theme.spacing.unit * 5,
  },
  listRoot: {
    width: '100%',
    maxWidth: 360,
  },
});

class Dashboard extends Component {

  componentDidMount(){
    this.props.dispatch({ type: 'FETCH_APPLICATIONS' })
    this.isNewWeek()
  }

  isNewWeek = () => {
    let start_of_week = moment(this.props.user.start_of_week)
    let today = moment(new Date());
    if (today.diff(start_of_week, 'days') > 7) {
      start_of_week = today.day(0)._d;
      this.props.dispatch({ type: 'RESET_GOALS', payload: {start_of_week, user_id: this.props.user.id } })
    }
  }

  render() {
    const { classes } = this.props;
    const { username, avatar_url, application_goal, commit_goal, meetup_goal, applications_submitted, github_commits, meetups_attended } = this.props.user

    return (
      <div>
        <Typography className={classes.header} variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="h5" gutterBottom>
            Welcome, {username}!
          </Typography>
          <br />
          <img src={avatar_url} alt="" height='150px' width='150px' />
          <br />
          <br/>
          <Typography variant="h5" gutterBottom>
            Weekly Goals
          </Typography>
          <List className={classes.listRoot}>
            <ListItem>
              <Avatar>
                <AssignmentIcon />
              </Avatar>
              <ListItemText primary="Applications Submitted:" secondary={`${applications_submitted + '/' + application_goal}`} />
            </ListItem>
            <ListItem>
              <Avatar>
                <CloudUploadIcon />
              </Avatar>
              <ListItemText primary="GitHub Commits:" secondary={`${github_commits + '/' + commit_goal}`} />
            </ListItem>
            <ListItem>
              <Avatar>
                <PeopleIcon />
              </Avatar>
              <ListItemText primary="Meet Ups Attended:" secondary={`${meetups_attended + '/' + meetup_goal}`} />
            </ListItem>
          </List>

          <LogOutButton />
        </Paper>
      </div>
    )
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user })
const mapStateToProps = state => ({
  user: state.user,
})

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(withStyles(styles)(Dashboard))
