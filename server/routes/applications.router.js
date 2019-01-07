const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET applications
router.get('/', (req, res) => {
  const id = req.user.id;
  const queryText = `SELECT id, user_id, contact_id, position, company, posting_url, comments,
              follow_up_complete, notification_sent, to_char(date_applied, 'MM/DD/YYYY') AS date_applied,
              to_char(date_applied, 'YYYY-MM-DD') AS date_applied_mui
              FROM application WHERE user_id = $1 ORDER BY id ASC;`
  pool.query(queryText, [id])
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

router.put('/:id', (req, res) => {
  let { contact_id, position, company, posting_url, date_applied, comments } = req.body
  if (contact_id === 'none') { contact_id = null }
  const applicationId = req.params.id;
  const queryValues = [contact_id, position, company, posting_url, date_applied, comments, applicationId]
  const queryText = `UPDATE application SET contact_id = $1, position = $2, company = $3,
                    posting_url = $4, date_applied = $5, comments = $6
                    WHERE id=$7`;
  pool.query(queryText, queryValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('PUT application error: ', err);
      res.sendStatus(500);
    });
})

router.delete('/:id', (req, res) => {
  const applicationId = req.params.id;
  const sqlText = `DELETE FROM application WHERE id = $1;`;
  pool.query(sqlText, [applicationId])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`DELETE application error:  `, error);
      res.sendStatus(500);
    });
});

module.exports = router;
