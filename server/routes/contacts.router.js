const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET contacts
router.get('/', rejectUnauthenticated, (req, res) => {
  const id = req.user.id;
  const queryText = `SELECT id, user_id, first_name, last_name, phone, email, company,
                    linkedin_url, comments, to_char(date_met, 'MM/DD/YYYY') AS date_met, to_char(date_met, 'YYYY-MM-DD') AS date_met_mui
                    FROM contact WHERE user_id = $1 ORDER BY id ASC;`
  pool.query(queryText, [id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('GET contact error: ', err);
    });
});

// POST contact
router.post('/', rejectUnauthenticated, (req, res) => {
  let { user_id, date_met, first_name, last_name, email, phone, company, linkedin_url, comments } = req.body;
  if (date_met === '') { date_met = null }
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

router.put('/:id', rejectUnauthenticated, (req, res) => {
  const { date_met, first_name, last_name, email, phone, company, linkedin_url, comments } = req.body;
  const contactId = req.params.id;
  const queryValues = [date_met, first_name, last_name, email, phone, company, linkedin_url, comments, contactId];
  const queryText = `UPDATE contact SET date_met = $1, first_name = $2, last_name = $3,
                    email = $4, phone = $5, company = $6, linkedin_url = $7, comments = $8
                    WHERE id = $9`;
  pool.query(queryText, queryValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('PUT contact error: ', err);
      res.sendStatus(500);
    });
})

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const contactId = req.params.id;
  const firstSqlText = `UPDATE Application
                        SET contact_id = null
                        WHERE contact_id = $1;`
  pool.query(firstSqlText, [contactId])
    .then((result) => {
      const secondSqlText = `DELETE FROM contact WHERE id = $1;`;
      pool.query(secondSqlText, [contactId])
        .then((result) => {
          res.sendStatus(201);
        })
        .catch((error) => {
          console.log(`DELETE contact error: `, error);
          res.sendStatus(500);
        });
    })
    .catch((error) => {
      console.log(`DELETE contact error: `, error);
      res.sendStatus(500);
    });
});

module.exports = router;
