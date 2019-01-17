import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    marginLeft: theme.spacing.unit * 3,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 380,
  },
  textFieldHalf: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 182,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 117,
  },
  formGroup: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class EditUserModal extends Component {
  state = {
    user_id: this.props.user.id,
    first_name: this.props.user.first_name,
    last_name: this.props.user.last_name,
    email: this.props.user.email,
    avatar_url: this.props.user.avatar_url,
    notifications: this.props.user.notifications,
    application_goal: this.props.user.application_goal,
    commit_goal: this.props.user.commit_goal,
    meetup_goal: this.props.user.meetup_goal,
  }

  updateUser = (event) => {
    event.preventDefault()
    this.props.dispatch({
      type: 'EDIT_USER',
      payload: this.state,
    })
    this.props.history.push('/')
  } // end registerUser

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSwitchChange = (event) => {
    this.setState({
      notifications: !this.state.notifications,
    })
  }
  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form className={classes.container} noValidate>
          <Dialog
            open={true}
            onClose={this.props.toggleEditMode}
          >
            <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
            <DialogContent>
              <TextField
                label="First Name"
                name="first_name"
                className={classes.textFieldHalf}
                value={this.state.first_name}
                onChange={this.handleInputChange}
                margin="normal"
              />
              <TextField
                label="Last Name"
                name="last_name"
                className={classes.textFieldHalf}
                value={this.state.last_name}
                onChange={this.handleInputChange}
                margin="normal"
              />
              <br />
              <TextField
                label="Email"
                name="email"
                type="email"
                className={classes.textField}
                value={this.state.email}
                onChange={this.handleInputChange}
                margin="normal"
              />
              <br />
              <TextField
                label="Avatar URL"
                name="avatar_url"
                className={classes.textField}
                value={this.state.avatar_url}
                onChange={this.handleInputChange}
                margin="normal"
              />
              <br />
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="application-goal">Application Goal</InputLabel>
                <Select
                  name="application_goal"
                  value={this.state.application_goal}
                  onChange={this.handleInputChange}
                  inputProps={{
                    name: "application_goal",
                    id: "application-goal",
                  }}
                >
                  <MenuItem value={0}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="commit-goal">Commit Goal</InputLabel>
                <Select
                  name="commit_goal"
                  value={this.state.commit_goal}
                  onChange={this.handleInputChange}
                  inputProps={{
                    name: "commit_goal",
                    id: "commit-goal",
                  }}
                >
                  <MenuItem value={0}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="meetup-goal">Meet Up Goal</InputLabel>
                <Select
                  name="meetup_goal"
                  value={this.state.meetup_goal}
                  onChange={this.handleInputChange}
                  inputProps={{
                    name: "meetup_goal",
                    id: "meetup-goal",
                  }}
                >
                  <MenuItem value={0}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </FormControl>
              <br />
              <FormGroup className={classes.formGroup} row>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.notifications}
                      onChange={this.handleSwitchChange}
                      value="notifications"
                      color="primary"

                    />
                  }
                  label="Notifications"
                />
              </FormGroup>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.toggleEditMode} color="secondary">
                Cancel
              </Button>
              <Button onClick={this.updateUser} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </form>
      </div>
    )
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors })
const mapStateToProps = state => ({
  errors: state.errors,
})

export default withRouter(connect(mapStateToProps)(withStyles(styles)(EditUserModal)))

