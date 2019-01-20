import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import styled from 'styled-components'
import moment from 'moment'

function getDate() {
  var today = new Date();
  var dateString =
    padStr(today.getFullYear()) + '-' +
    padStr(1 + today.getMonth()) + '-' +
    padStr(today.getDate())
  return dateString
}

function padStr(i) {
  return (i < 10) ? "0" + i : "" + i;
}


const Container = styled.div`
 text-align: center
`

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    margin: theme.spacing.unit * 3,
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

class AddEventModal extends Component {
  state = {
    open: false,
    user_id: this.props.user.id,
    title: '',
    start: getDate() + "T12:00",
    end: getDate() + "T13:00",
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
      start: getDate() + "T12:00",
      end: getDate() + "T13:00",
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
      user_id: this.props.user.id,
      title: '',
      start: '',
      end: '',
    })
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.state);
    this.props.dispatch({
      type: 'ADD_EVENT',
      payload: {
        ...this.state,
        start: moment(this.state.start),
        end: moment(this.state.end),
      }
    })
    this.handleClose()
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Container>
          <div>
            <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleClickOpen}>
              Add New Event
            </Button>
          </div>
        </Container>
        <br />
        <form className={classes.container} noValidate>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
          >
            <DialogTitle id="form-dialog-title">New Event</DialogTitle>
            <DialogContent>
              <TextField
                required
                label="Event Name"
                name="title"
                className={classes.textField}
                value={this.state.title}
                onChange={this.handleInputChange}
                margin="normal"
              />
              <br />
              <TextField
                required
                label="Start Time"
                name="start"
                type="datetime-local"
                className={classes.textField}
                value={this.state.start}
                onChange={this.handleInputChange}
                margin="normal"
              />
              <br />
              <TextField
                required
                label="End Time"
                name="end"
                type="datetime-local"
                className={classes.textField}
                value={this.state.end}
                onChange={this.handleInputChange}
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              {this.state.start && this.state.end && this.state.title ?
                <Button onClick={this.handleSubmit} variant="contained" color="primary">
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

export default connect(mapStateToProps)(withStyles(styles)(AddEventModal))
