import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PeopleIcon from '@material-ui/icons/People';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button'
import moment from 'moment';
import EditUserModal from './EditUserModal'
import Notifications from './Notifications'

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
  fab: {
    margin: theme.spacing.unit,
  },
});

class Dashboard extends Component {
  state = {
    editMode: false,
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_APPLICATIONS' })
    this.isNewWeek()
  }

  isNewWeek = () => {
    let start_of_week = moment(this.props.user.start_of_week)
    let today = moment(new Date());
    if (today.diff(start_of_week, 'days') > 7) {
      start_of_week = today.day(0)._d;
      this.props.dispatch({ type: 'RESET_GOALS', payload: { start_of_week, user_id: this.props.user.id } })
    }
  }

  handleClick = (name, value) => {
    if (this.props.user[name] + value < 0) {
      return
    }
    let payload = {
      user_id: this.props.user.id,
      github_commits: this.props.user.github_commits,
      meetups_attended: this.props.user.meetups_attended,
      [name]: this.props.user[name] + value,
    }
    this.props.dispatch({ type: 'UPDATE_GOAL', payload })
  }

  toggleEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  }

  handleDelete = () => {
    var result = window.confirm("Want to delete?");
    if (result) {
      this.props.dispatch({ type: "DELETE_USER", payload: this.props.user.id })
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
          <br />
          <Button onClick={this.toggleEditMode} size="small" variant="contained" color="primary" className={classes.button}>Edit</Button>
          {'  '}
          <Button onClick={this.handleDelete} size="small" variant="contained" color="secondary" className={classes.button}>Delete</Button>
          <br />
          <br />
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
              <Fab size="small" color="secondary" className={classes.fab} onClick={() => this.handleClick('github_commits', -1)}>
                <MinusIcon />
              </Fab>
              <Fab size="small" color="secondary" className={classes.fab} onClick={() => this.handleClick('github_commits', 1)}>
                <AddIcon />
              </Fab>
            </ListItem>
            <ListItem>
              <Avatar>
                <PeopleIcon />
              </Avatar>
              <ListItemText primary="Meet Ups Attended:" secondary={`${meetups_attended + '/' + meetup_goal}`} />
              <Fab size="small" color="secondary" className={classes.fab} onClick={() => this.handleClick('meetups_attended', -1)}>
                <MinusIcon />
              </Fab>
              <Fab size="small" color="secondary" className={classes.fab} onClick={() => this.handleClick('meetups_attended', 1)}>
                <AddIcon />
              </Fab>
            </ListItem>
          </List>
          <br/>
          <Typography variant="h5" gutterBottom>
            Notifications
          </Typography>
          {this.props.notifications.map( (notification, i) => {
            return (
              <Notifications notification={notification} key={i}/>
            )
          })}
          <br/>
          <br />
        </Paper>
        {this.state.editMode ?
          <EditUserModal toggleEditMode={this.toggleEditMode} user={this.props.user} />
          :
          null
        }
      </div>
    )
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user })
const mapStateToProps = state => ({
  notifications: state.notifications,
  user: state.user,
})

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(withStyles(styles)(Dashboard))
