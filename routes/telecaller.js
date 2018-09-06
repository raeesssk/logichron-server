var express = require('express');
var router = express.Router();
var oauth = require('../oauth/index');
var pg = require('pg');
var path = require('path');
var config = require('../config.js');
var encryption = require('../commons/encryption.js');

var pool = new pg.Pool(config);

router.get('/', oauth.authorise(), (req, res, next) => {
  const results = [];
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    const query = client.query("SELECT * FROM contact_discovery_master cdm left outer join campaign_master cm on cdm.cdm_cm_id=cm.cm_id where cdm_status=0 and call_status='open' ORDER BY cdm_id ASC LIMIT 1");
    query.on('row', (row) => {
      row.cdm_mobile=encryption.decrypt(row.cdm_mobile);
      row.cdm_first_name=encryption.decrypt(row.cdm_first_name);
      row.cdm_last_name=encryption.decrypt(row.cdm_last_name);
      row.cdm_job_title=encryption.decrypt(row.cdm_job_title);
      row.cdm_job_level=encryption.decrypt(row.cdm_job_level);
      row.cdm_dept=encryption.decrypt(row.cdm_dept);
      row.cdm_email_id=encryption.decrypt(row.cdm_email_id);
      row.cdm_company_name=encryption.decrypt(row.cdm_company_name);
      row.cdm_address=encryption.decrypt(row.cdm_address);
      row.cdm_city=encryption.decrypt(row.cdm_city);
      row.cdm_state=encryption.decrypt(row.cdm_state);
      row.cdm_postal_code=encryption.decrypt(row.cdm_postal_code);
      row.cdm_country=encryption.decrypt(row.cdm_country);
      row.cdm_industry=encryption.decrypt(row.cdm_industry);
      row.cdm_company_size=encryption.decrypt(row.cdm_company_size);
      row.cdm_revenue=encryption.decrypt(row.cdm_revenue);
      row.cdm_asset=encryption.decrypt(row.cdm_asset);
      row.cdm_domain=encryption.decrypt(row.cdm_domain);
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

router.post('/status/:jobId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.jobId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    client.query('BEGIN;');

    var singleInsert = "update contact_discovery_master set call_status=$1, cdm_updated_at=now() where cdm_id=$2 RETURNING *",
        params = [req.body.call_status,id]
    client.query(singleInsert, params, function (error, result) {
        results.push(result.rows[0]); // Will contain your inserted rows
        done();
        client.query('COMMIT;');
        return res.json(results);
    });

    done(err);
  });
});

router.post('/add', oauth.authorise(), (req, res, next) => {
  const results = [];
  const contact = req.body.contact;
  const follow = req.body.follow;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    client.query('BEGIN;');
    var singleInsert = "INSERT INTO followup_master(fm_date,fm_comment) values($1,$2) RETURNING *",
        params = [follow.fm_date,follow.fm_comment]
    client.query(singleInsert, params, function (error, result) {
        results.push(result.rows[0]); // Will contain your inserted rows

        contact.forEach(function(val,key){
          client.query('update followup_master set fm_cdm_id=$1 where fm_id=$2',[val.cdm_id,result.rows[0].fm_id]);
        });
        client.query('COMMIT;');
        done();
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
      return res.status(500).json({success: false, contact: err});
    }
    const query = client.query("SELECT fm_date,fm_comment,fm_cdm_id FROM followup_master where fm_cdm_id=$1",[id]);
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