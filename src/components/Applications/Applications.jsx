import React, { Component } from 'react'
import ApplicationForm from './ApplicationForm'
import ApplicationList from './ApplicationList'

class Applications extends Component {

  render() {
    return (
      <div>
        <h1>Applications</h1>
        <ApplicationForm />
        <hr />
        <ApplicationList />
      </div>
    )
  }
}

export default Applications
