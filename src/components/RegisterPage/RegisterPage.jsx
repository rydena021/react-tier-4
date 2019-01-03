import React, { Component } from 'react';
import {connect} from 'react-redux';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    avatarUrl: '',
    notifications: true,
    applicationGoal: 10,
    commitGoal: 5,
    meetupGoal: 1,
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: this.state,
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
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
                onChange={this.handleInputChangeFor('username')}
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
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="firstName">
              First Name:
              <input
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleInputChangeFor('firstName')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="lastName">
              Last Name:
              <input
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleInputChangeFor('lastName')}
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
                onChange={this.handleInputChangeFor('email')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="avatarUrl">
              Avatar URL:
              <input
                type="text"
                name="avatarUrl"
                value={this.state.avatarUrl}
                onChange={this.handleInputChangeFor('avatarUrl')}
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
                onChange={this.handleInputChangeFor('notifications')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="applicationGoal">
              Application Goal:
              <input
                type="number"
                name="applicationGoal"
                value={this.state.applicationGoal}
                onChange={this.handleInputChangeFor('applicationGoal')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="commitGoal">
              Commit Goal:
              <input
                type="number"
                name="commitGoal"
                value={this.state.commitGoal}
                onChange={this.handleInputChangeFor('commitGoal')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="meetupGoal">
              Meetup Goal:
              <input
                type="number"
                name="meetupGoal"
                value={this.state.meetupGoal}
                onChange={this.handleInputChangeFor('meetupGoal')}
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
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

