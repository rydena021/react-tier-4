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


router.put('/goals/:id', rejectUnauthenticated, (req, res) => {
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

router.put('/:id', rejectUnauthenticated, (req, res) => {
  const userId = req.params.id;
  const { first_name, last_name, email, avatar_url, notifications, application_goal, commit_goal, meetup_goal } = req.body;
  const queryValues = [first_name, last_name, email, avatar_url, notifications, application_goal, commit_goal, meetup_goal, userId];
  const queryText = `UPDATE person SET first_name = $1, last_name = $2, email = $3, avatar_url = $4,
                    notifications = $5, application_goal = $6, commit_goal = $7, meetup_goal = $8
                    WHERE id = $9`;
  pool.query(queryText, queryValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('PUT user error: ', err);
      res.sendStatus(500);
    });
})

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const userId = req.params.id;
  const sqlText = `DELETE FROM person WHERE id = $1;`;
  pool.query(sqlText, [userId])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`DELETE contact error: `, error);
      res.sendStatus(500);
    });
});


router.put('/goal/:id', rejectUnauthenticated, (req, res) => {
  const userId = req.params.id;
  const { github_commits, applications_submitted, meetups_attended } = req.body;
  const queryValues = [github_commits, meetups_attended, applications_submitted, userId];
  const queryText = `UPDATE person SET github_commits = $1, meetups_attended = $2, applications_submitted = $3
                    WHERE id = $4`;
  pool.query(queryText, queryValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('PUT goal error: ', err);
      res.sendStatus(500);
    });
})

module.exports = router;
