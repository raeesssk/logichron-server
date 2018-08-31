var express = require('express');
var router = express.Router();
var oauth = require('../oauth/index');
var pg = require('pg');
var path = require('path');
var config = require('../config.js');
var encryption = require('../commons/encryption.js');

var pool = new pg.Pool(config);

router.get('/view/:jobId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id=req.params.jobId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT qm_questions,qm_answers,qm_cdm_id FROM question_master qm left outer join contact_discovery_master cdm on qm.qm_cdm_id=cdm.cdm_id where cdm_id=$1",[id]);
    query.on('row', (row) => {
      row.qm_questions=encryption.decrypt(row.qm_questions);
      row.qm_answers=encryption.decrypt(row.qm_answers);
      results.push(row);

    });
    query.on('end', () => {
      done();
      // pg.end();
      return res.json(results);
    });
  done(err);
  });
});

module.exports = router;