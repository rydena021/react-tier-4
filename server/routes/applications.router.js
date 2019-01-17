const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
// GET applications
router.get('/', rejectUnauthenticated, (req, res) => {
  const id = req.user.id;
  const queryText = `SELECT CONCAT("contact".first_name, ' ', "contact".last_name) AS contact_name,
              "application".id, "application".user_id, "application".contact_id, "application".position,
              "application".company, "application".posting_url, "application".comments,
              "application".follow_up_complete, "application".notification_sent,
              to_char("application".date_applied, 'MM/DD/YYYY') AS date_applied,
              to_char("application".date_applied, 'YYYY-MM-DD') AS date_applied_mui
              FROM "application"
              LEFT JOIN "contact" ON "application".contact_id = "contact".id
              WHERE "application".user_id = $1 ORDER BY "application".id ASC;`
  pool.query(queryText, [id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('GET application error: ', err);
    });
});

// POST application
router.post('/', rejectUnauthenticated, (req, res) => {

  let { user_id, contact_id, position, company, posting_url, date_applied, comments } = req.body
  if (contact_id === 'none' || contact_id === '') { contact_id = null }
  const queryValues = [user_id, contact_id, position, company, posting_url, date_applied, comments]
  const queryText = `INSERT INTO application(user_id, contact_id, position, company, posting_url, date_applied, comments)
                    VALUES($1, $2, $3, $4, $5, $6, $7);`;
  const queryText2 = `UPDATE person SET applications_submitted = applications_submitted + 1 WHERE id = $1;`
  pool.query(queryText, queryValues)
    .then(() => {
      pool.query(queryText2, [user_id])
        .then(() => {
          res.sendStatus(201);
        })
        .catch((err) => {
          console.log('PUT apps submitted error: ', err);
        });
    })
    .catch((err) => {
      console.log('POST application error: ', err);
    });
});

router.put('/:id', rejectUnauthenticated, (req, res) => {
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

router.delete('/:id', rejectUnauthenticated, (req, res) => {
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
