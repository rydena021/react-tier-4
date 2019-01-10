import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
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
    width: 300,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 300,
  },
});

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  }

  handleLogin = (event) => {
    event.preventDefault()

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      })
      this.props.history.push('/')
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' })
    }
  } // end login

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <form className={classes.container} noValidate>
          <Dialog
            open={true}
          >
            <DialogTitle id="form-dialog-title">Login</DialogTitle>
            <DialogContent>
              <TextField
                required
                label="Username"
                name="username"
                className={classes.textField}
                value={this.state.username}
                onChange={this.handleInputChange}
                margin="normal"
              />
              <br />
              <TextField
                type="password"
                required
                label="Password"
                name="password"
                className={classes.textField}
                value={this.state.password}
                onChange={this.handleInputChange}
                margin="normal"
              />
              <br />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }} color="secondary" type="submit" name="submit" value="Log In">
                Register
              </Button>
              {this.state.username && this.state.password ?
                <Button onClick={this.handleLogin} color="primary" type="submit" name="submit" value="Log In" variant="contained">
                  Submit
                </Button>
                :
                <Button variant="contained" color="primary" disabled >
                  Submit
                </Button>
              }
            </DialogActions>
          </Dialog>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
})

export default withRouter(connect(mapStateToProps)(withStyles(styles)(LoginForm)))
