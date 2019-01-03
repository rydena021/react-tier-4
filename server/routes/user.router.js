const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted

router.post('/register', (req, res, next) => {
  const username = req.body.username,
        password = encryptLib.encryptPassword(req.body.password),
        first_name = req.body.firstName,
        last_name = req.body.lastName,
        email = req.body.email,
        avatar_url = req.body.avatarUrl,
        notifications = req.body.notifications,
        application_goal = req.body.applicationGoal,
        commit_goal = req.body.commitGoal,
        meetup_goal = req.body.meetupGoal;
  const queryValues = [username, password, first_name, last_name, email, avatar_url,
                        notifications, application_goal, commit_goal, meetup_goal]
  const queryText = `INSERT INTO person (username, password, first_name, last_name, email, avatar_url,
                    notifications, application_goal, commit_goal, meetup_goal)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id;`;
  pool.query(queryText, queryValues)
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;