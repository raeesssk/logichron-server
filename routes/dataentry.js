var express = require('express');
var router = express.Router();
var oauth = require('../oauth/index');
var pg = require('pg');
var path = require('path');
var config = require('../config.js');

var pool = new pg.Pool(config);

router.get('/', oauth.authorise(), (req, res, next) => {
  const results = [];
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM dataentry_master order by dm_id desc");
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

router.post('/add', oauth.authorise(), (req, res, next) => {
  const results = [];
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }

    var singleInsert = "INSERT INTO dataentry_master(dm_first_name, dm_last_name, dm_job_title, dm_job_level, dm_dept, dm_email_id, dm_mobile, dm_company_name, dm_address, dm_city, dm_state, dm_postal_code, dm_country, dm_industry, dm_company_size, dm_revenue, dm_asset, dm_domain, dm_status) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,'pending') RETURNING *",
        params = [req.body.dm_first_name,req.body.dm_last_name,req.body.dm_job_title,req.body.dm_job_level,req.body.dm_dept,req.body.dm_email_id,req.body.dm_mobile,req.body.dm_company_name,req.body.dm_address,req.body.dm_city,req.body.dm_state,req.body.dm_postal_code,req.body.dm_country,req.body.dm_industry,req.body.dm_company_size,req.body.dm_revenue,req.body.dm_asset,req.body.dm_domain]
    client.query(singleInsert, params, function (error, result) {
        results.push(result.rows[0]); // Will contain your inserted rows
        done();
        return res.json(results);
    });

    done(err);
  });
});

router.post('/dataentry/total', oauth.authorise(), (req, res, next) => {
  const results = [];
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const str = "%"+req.body.search+"%";

    console.log(str);
    const strqry =  "SELECT count(dm_id) as total "+
                    "from dataentry_master "+
                    "where dm_status='pending' "+
                    "and LOWER(dm_first_name||''||dm_last_name||''||dm_job_title||''||dm_job_level||''||dm_dept) LIKE LOWER($1);";

    const query = client.query(strqry,[str]);
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

router.post('/dataentry/limit', oauth.authorise(), (req, res, next) => {
  const results = [];
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const str = "%"+req.body.search+"%";
    // SQL Query > Select Data

    const strqry =  "SELECT * "+
                    "FROM dataentry_master dm "+
                    "where dm.dm_status = 'pending' "+
                    "and LOWER(dm_first_name||''||dm_last_name||''||dm_job_title||''||dm_job_level||''||dm_dept) LIKE LOWER($1) "+
                    "order by dm.dm_id desc LIMIT $2 OFFSET $3";

    const query = client.query(strqry,[ str, req.body.number, req.body.begin]);
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