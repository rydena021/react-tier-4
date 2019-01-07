import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'

import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  fab: {
    margin: theme.spacing.unit,
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
})


class ContactModal extends Component {
  state = {
    open: false,
    user_id: this.props.user.id,
    date_met: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    linkedin_url: '',
    comments: '',
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({
      open: false,
      user_id: this.props.user.id,
      date_met: '',
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      company: '',
      linkedin_url: '',
      comments: '',
    })
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.dispatch({
      type: 'ADD_CONTACT',
      payload: this.state,
    })
    this.handleClose()
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Fab color="primary" className={classes.fab} onClick={this.handleClickOpen}>
          <AddIcon />
        </Fab>
        <br/>
        <form className={classes.container} noValidate>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
          >
            <DialogTitle id="form-dialog-title">New Contact</DialogTitle>
            <DialogContent>
              <TextField
                required
                label="First Name"
                name="first_name"
                className={classes.textField}
                value={this.state.first_name}
                onChange={this.handleInputChange}
                margin="normal"
              />
              <br/>
              <TextField
                label="Last Name"
                name="last_name"
                className={classes.textField}
                value={this.state.last_name}
                onChange={this.handleInputChange}
                margin="normal"
              />
              <br/>
              <TextField
                label="Company"
                name="company"
                className={classes.textField}
                value={this.state.company}
                onChange={this.handleInputChange}
                margin="normal"
              />
              <br/>
              <TextField
                label="Phone"
                name="phone"
                className={classes.textField}
                value={this.state.phone}
                onChange={this.handleInputChange}
                margin="normal"
              />
              <br />
              <TextField
                label="Email"
                name="email"
                className={classes.textField}
                value={this.state.email}
                onChange={this.handleInputChange}
                margin="normal"
              />
              <br />
              <TextField
                label="Date Met"
                name="date_met"
                type="date"
                value={this.state.date_met}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.handleInputChange}
                margin="normal"
              />
              <br/>
              <TextField
                label="LinkedIn URL"
                name="linkedin_url"
                className={classes.textField}
                value={this.state.linkedin_url}
                onChange={this.handleInputChange}
                margin="normal"
              />
              <br />
              <TextField
                label="Comments"
                name="comments"
                multiline
                rowsMax="8"
                value={this.state.comments}
                className={classes.textField}
                onChange={this.handleInputChange}
                margin="normal"
              />

            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              {this.state.first_name ?
                <Button onClick={this.handleSubmit} color="primary">
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
  user: state.user,
  contacts: state.contacts
})

export default connect(mapStateToProps)(withStyles(styles)(ContactModal))
