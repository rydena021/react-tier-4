import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

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
    application_id: this.props.application.id,
    user_id: this.props.user.id,
    contact_id: this.props.application.contact_id,
    position: this.props.application.position,
    company: this.props.application.company,
    posting_url: this.props.application.posting_url,
    date_applied: this.props.application.date_applied_mui,
    comments: this.props.application.comments,
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.dispatch({
      type: 'EDIT_APPLICATION',
      payload: this.state,
    })
    this.props.toggleEditMode();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <form className={classes.container} noValidate>
          <Dialog
            open={this.state.open}
            onClose={this.props.toggleEditMode}
          >
            <DialogTitle id="form-dialog-title">Edit Application</DialogTitle>
            <DialogContent>
              <TextField
                required
                label="Position"
                name="position"
                className={classes.textField}
                value={this.state.position}
                onChange={this.handleInputChange}
                margin="normal"
              />
              <br />
              <TextField
                required
                label="Company"
                name="company"
                className={classes.textField}
                value={this.state.company}
                onChange={this.handleInputChange}
                margin="normal"
              />
              <br />
              <TextField
                required
                label="Date Applied"
                name="date_applied"
                type="date"
                value={this.state.date_applied}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.handleInputChange}
                margin="normal"
              />
              <br />
              <TextField
                label="Posting URL"
                name="posting_url"
                className={classes.textField}
                value={this.state.posting_url}
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
              <br />
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="contact_id">Contact</InputLabel>
                <Select
                  value={this.state.contact_id || ''}
                  onChange={this.handleInputChange}
                  name="contact_id"
                  id="contact_id"
                // displayEmpty
                >
                  <MenuItem value='none'>
                    <em>None</em>
                  </MenuItem>
                  {this.props.contacts.map(contact => {
                    return (
                      <MenuItem value={contact.id} key={contact.id}>{contact.first_name + ' ' + contact.last_name}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.props.toggleEditMode()} color="primary">
                Cancel
              </Button>
              {this.state.position && this.state.company && this.state.date_applied ?
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
  contacts: state.contacts,
  modal: state.modal
})

export default connect(mapStateToProps)(withStyles(styles)(EditApplicationModal))
