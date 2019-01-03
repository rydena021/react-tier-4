import React, { Component } from 'react';
import ApplicationsForm from './ApplicationsForm';
import ApplicationsTable from './ApplicationsTable';

class Applications extends Component {

  render() {
    return (
      <div>
        <h1>Applications</h1>
        <ApplicationsForm />
        <hr />
        <ApplicationsTable />
      </div>
    )
  }
}

export default Applications;
