import React, { Component } from 'react'
import ApplicationForm from './ApplicationForm'
import ApplicationList from './ApplicationList'
import ApplicationModal from './ApplicationModal'


class Applications extends Component {

  render() {
    return (
      <div>
        <h1>Applications</h1>
        <ApplicationForm />
        <hr />
        <ApplicationModal />
        <ApplicationList />
      </div>
    )
  }
}

export default Applications
