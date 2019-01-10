import React, { Component } from 'react'
import {connect} from 'react-redux'
import moment from 'moment';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    avatar_url: '',
    notifications: true,
    application_goal: 10,
    commit_goal: 5,
    meetup_goal: 1,
    start_of_week: moment(new Date()).day(0)._d,
  }

  registerUser = (event) => {
    event.preventDefault()
    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: this.state,
      })
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'})
    }
  } // end registerUser

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form onSubmit={this.registerUser}>
          <h1>Register User</h1>
          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="first_name">
              First Name:
              <input
                type="text"
                name="first_name"
                value={this.state.first_name}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="last_name">
              Last Name:
              <input
                type="text"
                name="last_name"
                value={this.state.last_name}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="email">
              Email:
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="avatar_url">
              Avatar URL:
              <input
                type="text"
                name="avatar_url"
                value={this.state.avatar_url}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="notifications">
              Notifications:
              <input
                type="text"
                name="notifications"
                value={this.state.notifications}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="application_goal">
              Application Goal:
              <input
                type="number"
                name="application_goal"
                value={this.state.application_goal}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="commit_goal">
              Commit Goal:
              <input
                type="number"
                name="commit_goal"
                value={this.state.commit_goal}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="meetup_goal">
              Meetup Goal:
              <input
                type="number"
                name="meetup_goal"
                value={this.state.meetup_goal}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="Register"
            />
          </div>
        </form>
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            Login
          </button>
        </center>
      </div>
    )
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors })
const mapStateToProps = state => ({
  errors: state.errors,
})

export default connect(mapStateToProps)(RegisterPage)

