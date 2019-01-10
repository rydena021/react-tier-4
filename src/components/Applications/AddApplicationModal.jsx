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
import styled from 'styled-components';

const Container = styled.div`
 text-align: center;
`;

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

class ApplicationModal extends Component {
  state = {
    open: false,
    user_id: this.props.user.id,
    contact_id: '',
    position: '',
    company: '',
    posting_url: '',
    date_applied: getDate(),
    comments: '',
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CONTACTS' })
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({
      open: false,
      user_id: this.props.user.id,
      contact_id: '',
      position: '',
      company: '',
      posting_url: '',
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
      type: 'ADD_APPLICATION',
      payload: this.state,
    })
    this.handleClose();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Container>
          <div>
            <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleClickOpen}>
              Add New Application
            </Button>
          </div>
        </Container>
        <br/>
        <form className={classes.container} noValidate>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
          >
            <DialogTitle id="form-dialog-title">New Application</DialogTitle>
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
              <br/>
              <TextField
                required
                label="Company"
                name="company"
                className={classes.textField}
                value={this.state.company}
                onChange={this.handleInputChange}
                margin="normal"
              />
              <br/>
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
              <br/>
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
              <br/>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="contact_id">Contact</InputLabel>
                <Select
                  value={this.state.contact_id}
                  onChange={this.handleInputChange}
                  name="contact_id"
                  id="contact_id"
                  // displayEmpty
                >
                  <MenuItem value='none'>
                    <em>None</em>
                  </MenuItem>
                  {this.props.contacts.map( contact => {
                    return (
                      <MenuItem value={contact.id} key={contact.id}>{contact.first_name + ' ' + contact.last_name}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
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
  contacts: state.contacts
})

export default connect(mapStateToProps)(withStyles(styles)(ApplicationModal))
