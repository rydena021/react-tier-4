import React, { Component } from 'react'
import ContactTable from './ContactTable'
import ContactModal from './ContactModal'

class Contacts extends Component {

  render() {
    return (
      <div>
        <h1>Contacts</h1>
        <hr/>
        <ContactModal />
        <hr/>
        <ContactTable />
      </div>
    )
  }
}

export default Contacts
