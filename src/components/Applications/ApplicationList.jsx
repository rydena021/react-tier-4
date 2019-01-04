import React, { Component } from 'react'
import { connect } from 'react-redux'

class ApplicationList extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'FETCH_APPLICATIONS'})
  }

  render() {
    return (
      <div>
        <h3>Application List</h3>
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Company</th>
              <th>Date Applied</th>
            </tr>
          </thead>
          <tbody>
            {this.props.applications.map( application => {
              return (
                <tr key={application.id}>
                  <td>{application.position}</td>
                  <td>{application.company}</td>
                  <td>{application.date_applied}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  applications: state.applications,
})

export default connect(mapStateToProps)(ApplicationList)
