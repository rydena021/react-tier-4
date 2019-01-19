const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  const userId = req.user.id;
  const queryText = `SELECT * FROM document
                    WHERE user_id = $1 ORDER BY id ASC;`
  pool.query(queryText, [userId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('GET document error: ', err);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  let { user_id, document_name, document_url } = req.body;
  const queryValues = [document_name, document_url, user_id];
  const queryText = `INSERT INTO document (document_name, document_url, user_id)
                    VALUES ($1, $2, $3);`;
  pool.query(queryText, queryValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('POST document error: ', err);
    });
});

module.exports = router;
