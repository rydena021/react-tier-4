import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  tableRow: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
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

class ContactTable extends Component {

  state = {
    open: false,
    user_id: this.props.user.id,
    contact_id: '',
    date_met: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    linkedin_url: '',
    comments: '',
  }

  handleClickOpen = (contact) => {
    this.setState({
      open: true,
      contact_id: contact.id,
      user_id: this.props.user.id,
      date_met: contact.date_met_mui,
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
      company: contact.company,
      linkedin_url: contact.linkedin_url,
      comments: contact.comments,
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
    })
  }

  handleDelete = (id) => {
    this.props.dispatch({ type: 'DELETE_CONTACT', payload: { id } })
    this.handleClose()
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
    this.handleClose()
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CONTACTS' })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell >Company</TableCell>
                <TableCell >Date Met</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.contacts.map(contact => {
                return (
                  <TableRow onClick={() => this.handleClickOpen(contact)} className={classes.tableRow} key={contact.id}>
                    <TableCell component="th" scope="row">
                      {contact.first_name + ' ' + contact.last_name}
                    </TableCell>
                    <TableCell >{contact.company}</TableCell>
                    <TableCell >{contact.date_met}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
        <form className={classes.container} noValidate>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
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
                required
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
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={() => this.handleDelete(this.state.contact_id)} color="secondary">
                Delete
              </Button>
              {this.state.first_name && this.state.date_met ?
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
  contacts: state.contacts,
  user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(ContactTable))
