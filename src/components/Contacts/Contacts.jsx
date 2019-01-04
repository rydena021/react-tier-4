import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';

class Contacts extends Component {

  render() {
    return (
      <div>
        <h1>Contacts</h1>
        <ContactForm />
        <hr/>
        <ContactList />
      </div>
    )
  }
}

export default Contacts;
