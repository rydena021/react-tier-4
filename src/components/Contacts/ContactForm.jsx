// TO DO: check post to db
import React, { Component } from 'react'
import { connect } from 'react-redux'

class ContactForm extends Component {
  state = {
    user_id: this.props.user.id,
    date_met: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    linkedin_url: '',
    comments: '',
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  addContact = (event) => {
    event.preventDefault()
    this.props.dispatch({
      type: 'ADD_CONTACT',
      payload: this.state,
    })
  } // end addContact

  render() {
    return (
      <div>
        <form onSubmit={this.addContact}>
          <h3>New Contact</h3>
          <div>
            <label htmlFor="date_met">
              Date Met:
              <input
                type="date"
                name="date_met"
                value={this.state.date_met}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="first_name">
              First Name:
              <input
                type="text"
                name="first_name"
                value={this.state.first_name}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="last_name">
              Last Name:
              <input
                type="text"
                name="last_name"
                value={this.state.last_name}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="email">
              Email:
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="phone">
              Phone:
              <input
                type="text"
                name="phone"
                value={this.state.phone}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="company">
              Company:
              <input
                type="text"
                name="company"
                value={this.state.company}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="linkedin_url">
              LinkedIn URL:
              <input
                type="text"
                name="linkedin_url"
                value={this.state.linkedin_url}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="comments">
              Comments:
              <input
                type="text"
                name="comments"
                value={this.state.comments}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <input
              type="submit"
              name="submit"
              value="Submit"
            />
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(ContactForm)
