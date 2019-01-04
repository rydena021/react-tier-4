import React, { Component } from 'react'
import { connect } from 'react-redux'

class ContactList extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CONTACTS' })
  }

  render() {
    return (
      <div>
        <h3>Contact List</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Date Met</th>
            </tr>
          </thead>
          <tbody>
            {this.props.contacts.map(contact => {
              return (
                <tr key={contact.id}>
                  <td>{contact.first_name + ' ' + contact.last_name}</td>
                  <td>{contact.company}</td>
                  <td>{contact.date_met}</td>
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
  contacts: state.contacts,
})

export default connect(mapStateToProps)(ContactList)
