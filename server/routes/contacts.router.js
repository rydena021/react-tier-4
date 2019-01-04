const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET contacts
router.get('/', (req, res) => {
  const id = req.user.id;
  pool.query('SELECT * FROM contact WHERE user_id = $1', [id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('GET contact error: ', err);
    });
});

// POST contact
router.post('/', (req, res) => {
  const { user_id, date_met, first_name, last_name, email, phone, company, linkedin_url, comments } = req.body;
  const queryValues = [user_id, date_met, first_name, last_name, email, phone, company, linkedin_url, comments];
  const queryText = `INSERT INTO contact (user_id, date_met, first_name, last_name, email, phone,
                    company, linkedin_url, comments)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
  pool.query(queryText, queryValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('POST contact error: ', err);
    });
});

module.exports = router;
