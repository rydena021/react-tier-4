import React, { Component } from 'react'
import ApplicationModal from './ApplicationModal'
import ApplicationTable from './ApplicationTable'


class Applications extends Component {

  render() {
    return (
      <div>
        <h1>Applications</h1>
        <hr />
        <ApplicationModal />
        <hr/>
        <ApplicationTable />
      </div>
    )
  }
}

export default Applications
