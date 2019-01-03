import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';

class Dashboard extends Component {

  render () {
    return (
      <div>
        <h1>Dashboard</h1>
        {JSON.stringify(this.props.user)}
        <LogOutButton />
      </div>
    )
  }
};

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Dashboard);
