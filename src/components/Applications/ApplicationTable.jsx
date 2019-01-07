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
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 700,
  },
  tableRow: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.grey[700],
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

class SimpleTable extends Component {

  state = {
    open: false,
    user_id: this.props.user.id,
    contact_id: '',
    position: '',
    company: '',
    posting_url: '',
    date_applied: '',
    comments: '',
  }

  handleClickOpen = (application) => {
    this.setState({
      open: true,
      application_id: application.id,
      user_id: this.props.user.id,
      contact_id: application.contact_id,
      position: application.position,
      company: application.company,
      posting_url: application.posting_url,
      date_applied: application.date_applied_mui,
      comments: application.comments,
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
    })
  }

  handleDelete = (id) => {
    this.props.dispatch({ type: 'DELETE_APPLICATION', payload: {id} })
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
      type: 'EDIT_APPLICATION',
      payload: this.state,
    })
    this.handleClose()
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_APPLICATIONS' })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Position</TableCell>
                <TableCell >Company</TableCell>
                <TableCell >Date Applied</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.applications.map(application => {
                return (
                  <TableRow onClick={() => this.handleClickOpen(application)} className={classes.tableRow} key={application.id}>
                    <TableCell component="th" scope="row">
                      {application.position}
                    </TableCell>
                    <TableCell >{application.company}</TableCell>
                    <TableCell >{application.date_applied}</TableCell>
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
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={() => this.handleDelete(this.state.application_id)} color="secondary">
                Delete
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
  applications: state.applications,
  user: state.user,
  contacts: state.contacts,
})
export default connect(mapStateToProps)(withStyles(styles)(SimpleTable))
