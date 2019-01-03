const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET applications
router.get('/', (req, res) => {

});

// POST application
router.post('/', (req, res) => {

  const { user_id, contact_id, position, company, posting_url, date_applied, comments } = req.body
  const queryValues = [user_id, contact_id, position, company, posting_url, date_applied, comments]
  console.log('QV: ', queryValues);
  const queryText = `INSERT INTO application (user_id, contact_id, position, company, posting_url,
                    date_applied, comments)
                    VALUES ($1, $2, $3, $4, $5, $6, $7);`;
  pool.query(queryText, queryValues)
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});

module.exports = router;
