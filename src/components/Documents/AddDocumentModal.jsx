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
import ReactFilestack from 'filestack-react'

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

const FILESTACK_API_KEY = process.env.REACT_APP_FILESTACK_API_KEY

const basicOptions = {
  accept: '.pdf',
  fromSources: ['local_file_system'],
  maxSize: 1024 * 1024,
  maxFiles: 1,
}

class AddContactModal extends Component {
  state = {
    open: false,
    user_id: this.props.user.id,
    document_name: '',
    document_url: '',
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_DOCUMENTS'})
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({
      open: false,
      user_id: this.props.user.id,
      document_name: '',
      document_url: '',
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
      type: 'ADD_DOCUMENT',
      payload: this.state,
    })
    this.handleClose()
  }

  onSuccess = (result) => {
    this.setState({
      document_url: result.filesUploaded[0].url
    })
  }
  onError = (error) => {
    console.error('error', error)
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Container>
          <div>
            <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleClickOpen}>
              Add New File
            </Button>
          </div>
        </Container>
        <br />
        <form className={classes.container} noValidate>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
          >
            <DialogTitle id="form-dialog-title">New File Upload</DialogTitle>
            <DialogContent>
              <TextField
                required
                label="Document Name"
                name="document_name"
                className={classes.textField}
                value={this.state.document_name}
                onChange={this.handleInputChange}
                margin="normal"
              />
              <br/>
              <br/>
              <ReactFilestack
                apikey={FILESTACK_API_KEY}
                buttonText="Upload Document"
                buttonClass="upload-button"
                options={basicOptions}
                onSuccess={this.onSuccess}
                onError={this.onError}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              {this.state.document_name ?
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

export default connect(mapStateToProps)(withStyles(styles)(AddContactModal))
