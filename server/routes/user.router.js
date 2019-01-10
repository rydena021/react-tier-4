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

  const { username, first_name, last_name, email, notifications, application_goal, commit_goal, meetup_goal, start_of_week} = req.body;
  const password = encryptLib.encryptPassword(req.body.password);
  const avatar_url = req.body.avatar_url || 'images/avatar-placeholder.png'
  const queryValues = [username, password, first_name, last_name, email, avatar_url,
                        notifications, application_goal, commit_goal, meetup_goal, start_of_week];
  const queryText = `INSERT INTO person (username, password, first_name, last_name, email, avatar_url,
                    notifications, application_goal, commit_goal, meetup_goal, start_of_week)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id;`;
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


router.put('/goals/:id', (req, res) => {
  const userId = req.params.id;
  const { start_of_week } = req.body;
  const queryValues = [start_of_week, userId];
  const queryText = `UPDATE person SET start_of_week = $1, applications_submitted = 0, meetups_attended = 0, github_commits = 0
                    WHERE id = $2`;
  pool.query(queryText, queryValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('PUT goals error: ', err);
      res.sendStatus(500);
    });
})

module.exports = router;
