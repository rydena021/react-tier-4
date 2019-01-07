const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET applications
router.get('/', (req, res) => {
  const id = req.user.id;
  pool.query('SELECT * FROM application WHERE user_id = $1', [id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('GET application error: ', err);
    });
});

// POST application
router.post('/', (req, res) => {

  let { user_id, contact_id, position, company, posting_url, date_applied, comments } = req.body
  if (contact_id === 'none') { contact_id = null }
  const queryValues = [user_id, contact_id, position, company, posting_url, date_applied, comments]
  const queryText = `INSERT INTO application (user_id, contact_id, position, company, posting_url,
                    date_applied, comments)
                    VALUES ($1, $2, $3, $4, $5, $6, $7);`;
  pool.query(queryText, queryValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('POST application error: ', err);
    });
});

module.exports = router;
