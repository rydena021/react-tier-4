import React, { Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button';

class LogOutButton extends Component {

  handleClick = (event) => {
    this.props.dispatch({ type: 'LOGOUT' })
    this.props.history.push('/')
  }

  render() {
    return(
      <Button onClick={this.handleClick} size="small" variant="contained" color="primary" >Log Out</Button>
    )
  }
}

// This component doesn't need 'mapStateToProps'
// because it doesn't care what the current state is.
// No matter what the redux state is, this button will always be a log out button
// this component still needs 'connect' though, because it is going to dispatch a redux action
export default withRouter(connect()(LogOutButton))
