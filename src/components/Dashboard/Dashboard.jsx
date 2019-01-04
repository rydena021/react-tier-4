import React, { Component } from 'react'
import { connect } from 'react-redux'
import LogOutButton from '../LogOutButton/LogOutButton'

class Dashboard extends Component {

  render() {
    const {
      id,
      username,
      first_name,
      last_name,
      avatar_url,
      notifications,
      application_goal,
      commit_goal,
      meetup_goal
    } = this.props.user
    return (
      <div>
        <h1>Dashboard</h1>
        <h3>Welcome, {username}</h3>
        <img src={avatar_url} alt="" height='150px' width='150px' />
        <br />
        <h3>Weekly Goals</h3>
        <ul>
          <li>Applications: {application_goal}</li>
          <li>Github Commits: {commit_goal}</li>
          <li>Tech Meet Ups: {meetup_goal}</li>
        </ul>
        <LogOutButton />
        <br />
        <br />
        {JSON.stringify(this.props.user)}
      </div>
    )
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user })
const mapStateToProps = state => ({
  user: state.user,
})

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Dashboard)
