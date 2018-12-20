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
    const query = client.query("SELECT * FROM custom_question_campaign_master qm left outer join campaign_master cm on qm.cmcm_cm_id=cm.cm_id where cmcm_cm_id=$1",[id]);
    query.on('row', (row) => {
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