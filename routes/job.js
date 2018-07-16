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
    const query = client.query("SELECT * FROM job_master order by dm_id desc");
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

router.get('/:jobId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.jobId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM job_master where dm_id=$1",[id]);
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

    var singleInsert = "INSERT INTO job_master(dm_first_name, dm_last_name, dm_job_title, dm_job_level, dm_dept, dm_email_id, dm_mobile, dm_company_name, dm_address, dm_city, dm_state, dm_postal_code, dm_country, dm_industry, dm_company_size, dm_revenue, dm_asset, dm_domain, dm_status) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,'pending') RETURNING *",
        params = [req.body.dm_first_name,req.body.dm_last_name,req.body.dm_job_title,req.body.dm_job_level,req.body.dm_dept,req.body.dm_email_id,req.body.dm_mobile,req.body.dm_company_name,req.body.dm_address,req.body.dm_city,req.body.dm_state,req.body.dm_postal_code,req.body.dm_country,req.body.dm_industry,req.body.dm_company_size,req.body.dm_revenue,req.body.dm_asset,req.body.dm_domain]
    client.query(singleInsert, params, function (error, result) {
        results.push(result.rows[0]); // Will contain your inserted rows
        done();
        return res.json(results);
    });

    done(err);
  });
});

router.post('/edit/:jobId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.jobId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    client.query('BEGIN;');
    
    var singleInsert = 'update job_master set dm_first_name=$1, dm_last_name=$2, dm_job_title=$3, dm_job_level=$4, dm_dept=$5, dm_email_id=$6, dm_mobile=$7, dm_company_name=$8, dm_address=$9, dm_city=$10, dm_state=$11, dm_postal_code=$12, dm_country=$13, dm_industry=$14, dm_company_size=$15, dm_revenue=$16, dm_asset=$17, dm_domain=$18, dm_updated_at=now() where dm_id=$19 RETURNING *',
        params = [req.body.dm_first_name,req.body.dm_last_name,req.body.dm_job_title,req.body.dm_job_level,req.body.dm_dept,req.body.dm_email_id,req.body.dm_mobile,req.body.dm_company_name,req.body.dm_address,req.body.dm_city,req.body.dm_state,req.body.dm_postal_code,req.body.dm_country,req.body.dm_industry,req.body.dm_company_size,req.body.dm_revenue,req.body.dm_asset,req.body.dm_domain,id];
    client.query(singleInsert, params, function (error, result) {
        results.push(result.rows[0]); // Will contain your inserted rows
        
        client.query('COMMIT;');
        done();
        return res.json(results);
    });

    done(err);
  });
});

router.post('/delete/:jobId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.jobId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    client.query('BEGIN;');

    var singleInsert = "update job_master set dm_status='incorrect', dm_updated_at=now() where dm_id=$1 RETURNING *",
        params = [id]
    client.query(singleInsert, params, function (error, result) {
        results.push(result.rows[0]); // Will contain your inserted rows
        done();
        client.query('COMMIT;');
        return res.json(results);
    });

    done(err);
  });
});

router.post('/job/total', oauth.authorise(), (req, res, next) => {
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
                    "from job_master "+
                    "where dm_status='pending' "+
                    "and LOWER(dm_first_name||''||dm_last_name) LIKE LOWER($1);";

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

router.post('/job/limit', oauth.authorise(), (req, res, next) => {
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
                    "FROM job_master dm "+
                    "where dm.dm_status = 'pending' "+
                    "and LOWER(dm_first_name||''||dm_last_name) LIKE LOWER($1) "+
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