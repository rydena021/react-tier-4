import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'

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

class EditApplicationModal extends Component {
  state = {
    open: true,
    user_id: this.props.user.id,
    contact_id: this.props.contact.id,
    date_met: this.props.contact.date_met_mui,
    first_name: this.props.contact.first_name,
    last_name: this.props.contact.last_name,
    email: this.props.contact.email,
    phone: this.props.contact.phone,
    company: this.props.contact.company,
    linkedin_url: this.props.contact.linkedin_url,
    comments: this.props.contact.comments,
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.dispatch({
      type: 'EDIT_CONTACT',
      payload: this.state,
    })
    this.props.toggleEditMode();
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate>
        <Dialog
          open={this.state.open}
          onClose={this.props.toggleEditMode}
        >
          <DialogTitle id="form-dialog-title">Edit Contact</DialogTitle>
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
            <br />
            <TextField
              label="Last Name"
              name="last_name"
              className={classes.textField}
              value={this.state.last_name}
              onChange={this.handleInputChange}
              margin="normal"
            />
            <br />
            <TextField
              label="Company"
              name="company"
              className={classes.textField}
              value={this.state.company}
              onChange={this.handleInputChange}
              margin="normal"
            />
            <br />
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
            <br />
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
            <Button onClick={() => this.props.toggleEditMode()} color="primary">
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
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(withStyles(styles)(EditApplicationModal))
