var express = require('express');
var router = express.Router();
var oauth = require('../oauth/index');
var pg = require('pg');
var path = require('path');
var config = require('../config.js');
var encryption = require('../commons/encryption.js');

var pool = new pg.Pool(config);

router.get('/emp/view/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id=req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM employee_master emp left outer join campaign_employee_master cem on cem.cem_emp_id=emp.emp_id where emp_status=0 and cem_cm_id=$1",[id]);
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

router.get('/check/emp/:jobId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id=req.params.jobId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM employee_contact_master where ecm_cdm_id=$1",[id]);
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

router.post('/assign/:employeeId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.employeeId;
  console.log(req.body);
  const newcontactdiscoveryList = req.body;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    client.query('BEGIN;');
        newcontactdiscoveryList.forEach(function(val,key){
          var singleInsert = 'INSERT INTO employee_contact_master(ecm_cdm_id,ecm_emp_id) VALUES ($1,$2) RETURNING *',
          params = [val.cdm_id,id]
          client.query(singleInsert, params, function (error, result) {
          results.push(result.rows[0]);// Will contain your inserted rows
          
          /*client.query('update contact_discovery_master set cdm_status=1, cdm_updated_at=now() where cdm_id=$1 RETURNING *',[val.cdm_id])
        */
      });
    
          client.query('COMMIT;');
        done();
        return res.end("Successfully.");
    
      });  
       
        
    done(err);
  });
});

router.post('/delete/:jobId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.jobId;
  console.log(req.body);
  const remove = req.body;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    client.query('BEGIN;');
        remove.forEach(function(val,key){
          var singleInsert = "delete from employee_contact_master where ecm_cdm_id=$1";
          params = [id]
          client.query(singleInsert, params, function (error, result) {
          results.push(result.rows[0]);// Will contain your inserted rows
          
          /*client.query('update contact_discovery_master set cdm_status=1, cdm_updated_at=now() where cdm_id=$1 RETURNING *',[val.cdm_id])
        */
      });

          client.query('COMMIT;');
        done();
        return res.end("Successfully.");
    });
        
       
        
    done(err);
  });
});


router.post('/edit/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.campaignId;
  const employee=req.body.employee;
  const remove=req.body.remove;
  const newemp=req.body.newemp;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    client.query('BEGIN;');
    employee.forEach(function(val,key){
    var singleInsert = 'update campaign_employee_master set cem_cm_id=$1, cem_emp_id=$2 where cem_id=$3 RETURNING *',
        params = [val.cem_cm_id,val.emp_id,val.cem_id];
        
    client.query(singleInsert, params, function (error, result) {
      
        results.push(result.rows[0]); // Will contain your inserted rows
      });
    });
        remove.forEach(function(val,index){
          client.query("delete from campaign_employee_master where cem_id=$1",[val.cem_id]);
        });
        newemp.forEach(function(value,key){
          client.query('INSERT INTO campaign_employee_master(cem_cm_id,cem_emp_id) VALUES ($1,$2)',[id,value.emp_id]);
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
                    "left outer join campaign_master cm on cem.cem_cm_id=cm.cm_id "+
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
                    "left outer join campaign_master cm on cem.cem_cm_id=cm.cm_id "+
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
                    "and LOWER(cdm_first_name||''||cdm_last_name) LIKE LOWER($1);";

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
                    "left outer join campaign_master cm on cdm.cdm_cm_id=cm.cm_id "+
                    "where cdm.cdm_status = 0 "+
                    "and LOWER(cm_campaign_name||''||cdm_first_name||''||cdm_last_name) LIKE LOWER($1) "+
                    "order by cdm.cdm_id desc LIMIT $2 OFFSET $3";

    const query = client.query(strqry,[ str, req.body.number, req.body.begin]);
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

module.exports = router;