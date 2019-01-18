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
  textFieldSmall: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 117,
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
              <TextField
                label="Application Goal"
                name="application_goal"
                className={classes.textFieldSmall}
                value={this.state.application_goal}
                onChange={this.handleInputChange}
                type="number"
                margin="normal"
              />
              <TextField
                label="Commit Goal"
                name="commit_goal"
                className={classes.textFieldSmall}
                value={this.state.commit_goal}
                onChange={this.handleInputChange}
                type="number"
                margin="normal"
              />
              <TextField
                label="Meet Up Goal"
                name="meetup_goal"
                className={classes.textFieldSmall}
                value={this.state.meetup_goal}
                onChange={this.handleInputChange}
                type="number"
                margin="normal"
              />
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

