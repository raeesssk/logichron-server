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
    const query = client.query("SELECT * from job_master jm LEFT OUTER JOIN manager_master mm on jm.dm_mm_id=mm.mm_id where dm_id=$1",[id]);
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
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * from question_master where qm_status=0 and qm_dm_id=$1",[id]);
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
  const multiple=req.body.answer;
  const data=req.body.dataentry;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    client.query('BEGIN;');
    var singleInsert = "INSERT INTO job_master(dm_first_name, dm_last_name, dm_job_title, dm_job_level, dm_dept, dm_email_id, dm_mobile, dm_company_name, dm_address, dm_city, dm_state, dm_postal_code, dm_country, dm_industry, dm_company_size, dm_revenue, dm_asset, dm_domain, dm_mm_id,dm_status) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,0) RETURNING *",
        params = [data.dm_first_name,data.dm_last_name,data.dm_job_title,data.dm_job_level,data.dm_dept,data.dm_email_id,data.dm_mobile,data.dm_company_name,data.dm_address,data.dm_city,data.dm_state,data.dm_postal_code,data.dm_country,data.dm_industry,data.dm_company_size,data.dm_revenue,data.dm_asset,data.dm_domain,data.dm_mm_id.mm_id]
    client.query(singleInsert, params, function (error, result) {
        results.push(result.rows[0]); // Will contain your inserted rows
        multiple.forEach(function(product,index){
          client.query("INSERT into question_master(qm_questions,qm_answers,qm_dm_id,qm_status) values($1,$2,$3,0) RETURNING *",[product.qm_questions,product.qm_answers,result.rows[0].dm_id]);
        
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
  const answer=req.body.answers;
  const data=req.body.dataentry;
  const ansadd=req.body.answersadd;
  const remove=req.body.remove;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    client.query('BEGIN;');
    
    var singleInsert = 'update job_master set dm_first_name=$1, dm_last_name=$2, dm_job_title=$3, dm_job_level=$4, dm_dept=$5, dm_email_id=$6, dm_mobile=$7, dm_company_name=$8, dm_address=$9, dm_city=$10, dm_state=$11, dm_postal_code=$12, dm_country=$13, dm_industry=$14, dm_company_size=$15, dm_revenue=$16, dm_asset=$17, dm_domain=$18,dm_mm_id=$19, dm_updated_at=now() where dm_id=$20 RETURNING *',
        params = [data.dm_first_name,data.dm_last_name,data.dm_job_title,data.dm_job_level,data.dm_dept,data.dm_email_id,data.dm_mobile,data.dm_company_name,data.dm_address,data.dm_city,data.dm_state,data.dm_postal_code,data.dm_country,data.dm_industry,data.dm_company_size,data.dm_revenue,data.dm_asset,data.dm_domain,data.dm_mm_id.mm_id,id];
    client.query(singleInsert, params, function (error, result) {
        results.push(result.rows[0]); // Will contain your inserted rows
        answer.forEach(function(product,index){
          client.query("update question_master set qm_questions=$1,qm_answers=$2 where qm_dm_id=$3 RETURNING *",[product.qm_questions,product.qm_answers,result.rows[0].dm_id]);
        client.query('update manager_master set mm_pm_name=$1 where mm_id=$2',[req.body.mm_pm_name,req.body.mm_id]);
        });
        ansadd.forEach(function(value,index){
          client.query("INSERT into question_master(qm_questions,qm_answers,qm_dm_id,qm_status) values($1,$2,$3,0) RETURNING *",[value.qm_questions,value.qm_answers,result.rows[0].dm_id]);/*
          client.query("update question_master set qm_questions=$1,qm_answers=$2 where qm_dm_id=$3 RETURNING *",[value.qm_questions,value.qm_answers,result.rows[0].dm_id]);*/
        });
        remove.forEach(function(val,index){
           client.query("update question_master set qm_status=1 where qm_id=$1",[val.qm_id]);
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
      return res.status(500).json({success: false, data: err});
    }
    client.query('BEGIN;');

    var singleInsert = "update job_master set dm_status=1, dm_updated_at=now() where dm_id=$1 RETURNING *",
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
                    "where dm_status=0 "+
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
                    "where dm.dm_status = 0 "+
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