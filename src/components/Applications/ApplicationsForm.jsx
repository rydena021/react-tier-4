import React, { Component } from 'react';
import { connect } from 'react-redux';

class ApplicationsForm extends Component {
  state = {
    user_id: this.props.user.id,
    contact_id: null,
    position: '',
    company: '',
    posting_url: '',
    date_applied: '',
    comments: '',
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  addApplication = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.props.dispatch({
      type: 'ADD_APPLICATION',
      payload: this.state,
    });
  } // end addApplication

  render() {
    return (
      <div>
        <form onSubmit={this.addApplication}>
          <h3>New Application</h3>
          <div>
            <label htmlFor="date_applied">
              Date Applied:
              <input
                type="date"
                name="date_applied"
                value={this.state.date_applied}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="position">
              Position:
              <input
                type="text"
                name="position"
                value={this.state.position}
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
            <label htmlFor="posting_url">
              Job Posting URL:
              <input
                type="text"
                name="posting_url"
                value={this.state.posting_url}
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
});

export default connect(mapStateToProps)(ApplicationsForm);
