var express = require('express');
var router = express.Router();
var oauth = require('../oauth/index');
var pg = require('pg');
var path = require('path');
var config = require('../config.js');

var pool = new pg.Pool(config);

router.post('/accountList', oauth.authorise(), (req, res, next) => {
  const results = [];
  console.log(req.body);
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    const query = client.query("SELECT * FROM account_master_campaign_master amcm inner join campaign_master cm on amcm.amcm_cm_id=cm.cm_id left outer join suppression_campaign_master scm on scm.scm_cm_id=cm.cm_id where amcm_company=$1 and cm_account_list='Yes' ",[req.body.cdm_company_name]);
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
      return res.status(500).json({success: false, contact: err});
    }
    const query = client.query("SELECT * from contact_discovery_master cdm LEFT OUTER JOIN question_master qm on qm.qm_cdm_id=cdm.cdm_id where cdm_id=$1",[id]);
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

router.get('/question/:jobId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.jobId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    const query = client.query("SELECT * from question_master where qm_status=0 and qm_cdm_id=$1",[id]);
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

router.post('/check/accountList', oauth.authorise(), (req, res, next) => {
  const results = [];
  console.log(req.body);
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM account_master_campaign_master amcm inner join campaign_master cm on amcm.amcm_cm_id=cm.cm_id left outer join suppression_campaign_master scm on scm.scm_cm_id=cm.cm_id where amcm_company=$1",[req.body.cdm_company_name]);
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

router.post('/check/suppression', oauth.authorise(), (req, res, next) => {
  const results = [];
  console.log(req.body);
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM suppression_campaign_master scm inner join campaign_master cm on scm.scm_cm_id=cm.cm_id where scm_company=$1",[req.body.cdm_company_name]);
    query.on('row', (row) => {
      console.log(row);
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


router.post('/check/domain', oauth.authorise(), (req, res, next) => {
  const results = [];
  // console.log(req.body);
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM denied_domain_campaign_master ddcm inner join campaign_master cm on ddcm.ddcm_cm_id=cm.cm_id where ddcm_website=$1",[req.body.cdm_domain]);
    query.on('row', (row) => {
      console.log(row);
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

router.post('/check/AllDomain', oauth.authorise(), (req, res, next) => {
  const results = [];
  // console.log(req.body);
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM allow_domain_campaign_master adcm inner join campaign_master cm on adcm.adcm_cm_id=cm.cm_id where adcm_website=$1",[req.body.cdm_domain]);
    query.on('row', (row) => {
      console.log(row);
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
  const answer=req.body.answer;
  const contact=req.body.contact;
  console.log(contact);
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    client.query('BEGIN;');

        var singleInsert = "INSERT INTO contact_discovery_master(cdm_campaign,cdm_first_name,cdm_last_name,cdm_job_title,cdm_job_level,cdm_dept,cdm_email_id,cdm_mobile,cdm_company_name,cdm_address,cdm_city,cdm_state,cdm_postal_code,cdm_country,cdm_industry,cdm_company_size,cdm_revenue,cdm_asset,cdm_domain,cdm_status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,0) RETURNING *",
        params = [contact.cdm_campaign_name.cm_campaign_name,contact.cdm_first_name,contact.cdm_last_name,contact.cdm_job_title,contact.cdm_job_level,contact.cdm_dept,contact.cdm_email_id,contact.cdm_mobile,contact.cdm_company_name,contact.cdm_address,contact.cdm_city,contact.cdm_state,contact.cdm_postal_code,contact.cdm_country,contact.cdm_industry,contact.cdm_company_size,contact.cdm_revenue,contact.cdm_asset,contact.cdm_domain]
        console.log(params);
        client.query(singleInsert, params, function (error, result) {
        results.push(result.rows[0]);// Will contain your inserted rows
        
        answer.forEach(function(product,index){
          client.query("INSERT into question_master(qm_questions,qm_answers,qm_cdm_id,qm_status) values($1,$2,$3,0) RETURNING *",
            [product.qm_questions,product.qm_answers,result.rows[0].cdm_id]);
        
        });
        client.query('COMMIT;');
        done();
        return res.json(results);
    });
    done(err);
  });
});

router.post('/edit/:jobId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.jobId;
  const answers=req.body.answers;
  const contact=req.body.contact;
  const answersadd=req.body.answersadd;
  const remove=req.body.remove;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    client.query('BEGIN;');
    
    var singleInsert = 'update contact_discovery_master set cdm_first_name=$1, cdm_last_name=$2, cdm_job_title=$3, cdm_job_level=$4, cdm_dept=$5, cdm_email_id=$6, cdm_mobile=$7, cdm_company_name=$8, cdm_address=$9, cdm_city=$10, cdm_state=$11, cdm_postal_code=$12, cdm_country=$13, cdm_industry=$14, cdm_company_size=$15, cdm_revenue=$16, cdm_asset=$17, cdm_domain=$18, cdm_updated_at=now() where cdm_id=$19 RETURNING *',
        params = [contact.cdm_first_name,contact.cdm_last_name,contact.cdm_job_title,contact.cdm_job_level,contact.cdm_dept,contact.cdm_email_id,contact.cdm_mobile,contact.cdm_company_name,contact.cdm_address,contact.cdm_city,contact.cdm_state,contact.cdm_postal_code,contact.cdm_country,contact.cdm_industry,contact.cdm_company_size,contact.cdm_revenue,contact.cdm_asset,contact.cdm_domain,id];
    client.query(singleInsert, params, function (error, result) {
        results.push(result.rows[0]); // Will contain your inserted rows

        remove.forEach(function(val,index){
           client.query("delete from question_master where qm_id=$1",[val.qm_id]);
        });
        answers.forEach(function(product,index){
          client.query("update question_master set qm_questions=$1,qm_answers=$2 where qm_cdm_id=$3",[product.qm_questions,product.qm_answers,result.rows[0].cdm_id]);
        });
        answersadd.forEach(function(value,index){
          client.query("INSERT into question_master(qm_questions,qm_answers,qm_cdm_id,qm_status) values($1,$2,$3,0)",[value.qm_questions,value.qm_answers,result.rows[0].cdm_id]);
        });
        
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
      return res.status(500).json({success: false, contact: err});
    }
    client.query('BEGIN;');

    var singleInsert = "update contact_discovery_master set cdm_status=1, cdm_updated_at=now() where cdm_id=$1 RETURNING *",
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

router.post('/contact/total', oauth.authorise(), (req, res, next) => {
  const results = [];
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    const str = "%"+req.body.search+"%";

    console.log(str);
    const strqry =  "SELECT count(cdm_id) as total "+
                    "from contact_discovery_master "+
                    "where cdm_status=0 "+
                    "and LOWER(cdm_campaign||''||cdm_first_name||''||cdm_last_name) LIKE LOWER($1);";

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

router.post('/contact/limit', oauth.authorise(), (req, res, next) => {
  const results = [];
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    const str = "%"+req.body.search+"%";
    // SQL Query > Select contact

    const strqry =  "SELECT * "+
                    "FROM contact_discovery_master cdm "+
                    "where cdm.cdm_status = 0 "+
                    "and LOWER(cdm_campaign||''||cdm_first_name||''||cdm_last_name) LIKE LOWER($1) "+
                    "order by cdm.cdm_id desc LIMIT $2 OFFSET $3";

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