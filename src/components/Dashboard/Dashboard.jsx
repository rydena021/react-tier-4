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
  }

  render() {
    const { classes } = this.props;
    const { username, avatar_url, application_goal, commit_goal, meetup_goal } = this.props.user
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
              <ListItemText primary="Applications Submitted:" secondary={`0/${application_goal}`} />
            </ListItem>
            <ListItem>
              <Avatar>
                <CloudUploadIcon />
              </Avatar>
              <ListItemText primary="GitHub Commits:" secondary={`0/${commit_goal}`} />
            </ListItem>
            <ListItem>
              <Avatar>
                <PeopleIcon />
              </Avatar>
              <ListItemText primary="Meet Ups Attended:" secondary={`0/${meetup_goal}`} />
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
