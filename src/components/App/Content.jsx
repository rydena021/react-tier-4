import React, {Component} from 'react'
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'

import {connect} from 'react-redux'

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import Dashboard from '../Dashboard/Dashboard'
import Applications from '../Applications/Applications'
import Contacts from '../Contacts/Contacts'
import Resources from '../Resources/Resources'
import Calendar from '../Calendar/Calendar'


class App extends Component {
  componentDidMount () {
    this.props.dispatch({ type: 'FETCH_APPLICATIONS' })
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/dashboard" />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/dashboard will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
          Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/dashboard"
              component={Dashboard}
            />
            <ProtectedRoute
              exact
              path="/applications"
              component={Applications}
            />
            <ProtectedRoute
              exact
              path="/contacts"
              component={Contacts}
            />
            <ProtectedRoute
              exact
              path="/resources"
              component={Resources}
            />
            <ProtectedRoute
              exact
              path="/calendar"
              component={Calendar}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </div>
      </Router>
  )}
}

export default connect()(App)
