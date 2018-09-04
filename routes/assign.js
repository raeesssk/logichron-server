var express = require('express');
var router = express.Router();
var oauth = require('../oauth/index');
var pg = require('pg');
var path = require('path');
var config = require('../config.js');

var pool = new pg.Pool(config);

router.get('/emp/view', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id=req.params.dmId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT emp_id,emp_name,emp_mobile FROM employee_master where emp_status=0");
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

router.get('/campaign/view/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id=req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT cm_id,cm_first_dely,cm_end_date,cm_dely_frequency,cm_campaign_name,cm_restrict,cm_account_list,cm_supression_file,cm_domain_limit,cm_emp_size,cm_disqualifies,cm_title,cm_lead_count,cm_geo,cm_allow_domain,cm_revenue,cm_custom_question,cm_denied_domain,cm_campaign_asset,cm_industry,cm_dept,cm_method,cm_job,cm_vertical,cm_id FROM campaign_master where cm_id=$1",[id]);
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

router.post('/assign/:jobId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.jobId;
  console.log(req.body);
  const contact = req.body;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    client.query('BEGIN;');
        contact.forEach(function(val,key){
          var singleInsert = "INSERT INTO employee_contact_master(ecm_cdm_id,ecm_emp_id) VALUES ($1,$2) RETURNING *",
          params = [val.cdm_id,id]
          client.query(singleInsert, params, function (error, result) {
          results.push(result.rows[0]);// Will contain your inserted rows
          
          client.query('update contact_discovery_master set cdm_status=1, cdm_updated_at=now() where cdm_id=$1 RETURNING *',[val.cdm_id])
        
      });
          client.query('COMMIT;');
        done();
        return res.end("Successfully.");
    });
        
       
        
    done(err);
  });
});



router.post('/add/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.campaignId;
  const employee=req.body;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    client.query('BEGIN;');
        employee.forEach(function(val,key){
          var singleInsert = "INSERT INTO campaign_employee_master(cem_cm_id,cem_emp_id,cem_select) VALUES ($1,$2,$3) RETURNING *",
        params = [id,val.emp_id,val.select]
       
        client.query(singleInsert, params, function (error, result) {
        results.push(result.rows[0]);// Will contain your inserted rows
        
    });
        client.query('COMMIT;');
        done();
        return res.json(results);
  });
        
    done(err);
  });
});



router.post('/edit', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.campaignId;
  const employee=req.body.employee;
  const remove=req.body.remove;
  console.log(remove);
  console.log(employee)
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    client.query('BEGIN;');
    employee.forEach(function(val,key){
    var singleInsert = 'update campaign_employee_master set cem_cm_id=$1, cem_emp_id=$2, cem_updated_at=now()  where cem_id=$3 RETURNING *',
        params = [val.cem_cm_id,val.emp_id,val.cem_id];
        console.log(params);
    client.query(singleInsert, params, function (error, result) {
      console.log(result);
        results.push(result.rows[0]); // Will contain your inserted rows
        
     
       
        
      });

    });

    remove.forEach(function(val,index){
           client.query("delete from campaign_employee_master where cem_id=$1",[val.cem_id]);
        });
    client.query('COMMIT;');
        done();
        return res.json(results);
    done(err);
  });
});

router.get('/campemp/:assignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id=req.params.assignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM employee_master emp left outer join campaign_employee_master cem on cem.cem_emp_id=emp.emp_id where cem_cm_id=$1",[id]);
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

router.post('/employee/total', oauth.authorise(), (req, res, next) => {
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
    const strqry =  "SELECT count(emp_id) as total "+
                    "from employee_master emp "+
                    "left outer join campaign_employee_master cem on cem.cem_emp_id=emp.emp_id "+
                    "where emp_status = 0 "+
                    "and LOWER(emp_name||''||emp_mobile||''||emp_designation) LIKE LOWER($1);";

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

router.post('/employee/limit', oauth.authorise(), (req, res, next) => {
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
                    "FROM employee_master emp "+
                    "left outer join campaign_employee_master cem on cem.cem_emp_id=emp.emp_id "+
                    "where emp.emp_status = 0 "+
                    "and LOWER(emp_name||''||emp_mobile||''||emp_designation) LIKE LOWER($1) "+
                    "order by emp.emp_id desc LIMIT $2 OFFSET $3";

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