var express = require('express');
var router = express.Router();
var oauth = require('../oauth/index');
var pg = require('pg');
var path = require('path');
var config = require('../config.js');

var pool = new pg.Pool(config);

router.post('/add', oauth.authorise(), (req, res, next) => {
  const results = [];
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
		client.query('BEGIN;');

      	var singleInsert = "INSERT INTO users_activity_master(uam_users_id,uam_url) values($1,$2) RETURNING *",
        params = [ req.body.user_id, req.body.url ]
        client.query(singleInsert, params, function (error, result) {
        results.push(result.rows[0]); // Will contain your inserted rows
        client.query('COMMIT;');
            done();
            return res.json(results);
        });

    done(err);
  });
});

module.exports = router;