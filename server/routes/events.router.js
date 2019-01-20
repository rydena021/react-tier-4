const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  const userId = req.user.id;
  const queryText = `SELECT * FROM event
                    WHERE user_id = $1 ORDER BY id ASC;`
  pool.query(queryText, [userId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('GET event error: ', err);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

  let { user_id, title, start, end } = req.body;
  start = new Date(start);
  end = new Date(end);
  const queryValues = [title, start, end, user_id];
  const queryText = `INSERT INTO event (title, start, end, user_id)
                    VALUES ($1, $2, $3, $4);`;
  console.log(queryValues);
  pool.query(queryText, queryValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('POST event error: ', err);
    });
});

module.exports = router;
