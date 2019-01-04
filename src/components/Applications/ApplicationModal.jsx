import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import { withStyles } from '@material-ui/core/styles';
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
    width: 200,
  },
});


class NewApplicationModal extends Component {
  state = {
    open: false,
    user_id: this.props.user.id,
    contact_id: null,
    position: '',
    company: '',
    posting_url: '',
    date_applied: '',
    comments: '',
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CONTACTS' })
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.state);

    // this.props.dispatch({
    //   type: 'ADD_APPLICATION',
    //   payload: this.state,
    // })
    this.handleClose();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Fab color="primary" className={classes.fab} onClick={this.handleClickOpen}>
          <AddIcon />
        </Fab>
        <br/>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Add New Application
        </Button>



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
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleSubmit} color="primary">
                Submit
              </Button>
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

export default connect(mapStateToProps)(withStyles(styles)(NewApplicationModal))
