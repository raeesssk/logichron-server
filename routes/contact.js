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
  const id=req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    const query = client.query("select * from contact_discovery_master cdm left outer join campaign_master cm on cdm.cdm_cm_id=cm.cm_id where cdm_status=0 order by cdm_id asc");
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
      row.cdm_ip_address=encryption.decrypt(row.cdm_ip_address);
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
    const query = client.query("SELECT * from contact_discovery_master cdm LEFT OUTER JOIN campaign_master cm on cdm.cdm_cm_id=cm.cm_id where cdm_id=$1",[id]);
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
      row.cdm_ip_address=encryption.decrypt(row.cdm_ip_address);
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


router.get('/accountList/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id=req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    const query = client.query("SELECT * FROM account_master_campaign_master amcm inner join campaign_master cm on amcm.amcm_cm_id=cm.cm_id left outer join suppression_campaign_master scm on scm.scm_cm_id=cm.cm_id where amcm_cm_id=$1",[id]);
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

router.get('/AllDomain/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id=req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    const query = client.query("SELECT * FROM allow_domain_campaign_master adcm inner join campaign_master cm on adcm.adcm_cm_id=cm.cm_id where adcm_cm_id=$1",[id]);
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

router.get('/questionans/:jobId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.jobId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
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

router.get('/supp/:jobId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.jobId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    const query = client.query("SELECT * FROM suppression_campaign_master scm left outer join campaign_master cm on scm.scm_cm_id=cm.cm_id where scm_cm_id=$1",[id]);
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

router.get('/denydomain/:jobId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.jobId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    const query = client.query("SELECT * FROM denied_domain_campaign_master ddcm left outer join campaign_master cm on ddcm.ddcm_cm_id=cm.cm_id where ddcm_cm_id=$1",[id]);
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

router.get('/jobtitle/:jobId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.jobId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    const query = client.query("SELECT * FROM campaign_title_master ctm left outer join campaign_master cm on ctm.ctm_cm_id=cm.cm_id where ctm_cm_id=$1",[id]);
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

router.get('/joblevel/:jobId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.jobId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    const query = client.query("SELECT * FROM campaign_joblevel_master cjlm left outer join campaign_master cm on cjlm.cjlm_cm_id=cm.cm_id where cjlm_cm_id=$1",[id]);
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

router.get('/dept/:jobId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.jobId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    const query = client.query("SELECT * FROM campaign_department_master cdm left outer join campaign_master cm on cdm.cdm_cm_id=cm.cm_id where cdm_cm_id=$1",[id]);
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

router.get('/company/:jobId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.jobId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    const query = client.query("SELECT * FROM account_master_campaign_master amcm left outer join campaign_master cm on amcm.amcm_cm_id=cm.cm_id where amcm_cm_id=$1",[id]);
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

router.get('/industry/:jobId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.jobId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    const query = client.query("SELECT * FROM campaign_industry_master cim left outer join campaign_master cm on cim.cim_cm_id=cm.cm_id where cim_cm_id=$1",[id]);
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

router.get('/size/:jobId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.jobId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    const query = client.query("SELECT * FROM campaign_employee_size_master cesm left outer join campaign_master cm on cesm.cesm_cm_id=cm.cm_id where cesm_cm_id=$1",[id]);
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

router.get('/revenue/:jobId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.jobId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    const query = client.query("SELECT * FROM campaign_revenue_master crem left outer join campaign_master cm on crem.crem_cm_id=cm.cm_id where crem_cm_id=$1",[id]);
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

router.get('/asset/:jobId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.jobId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    const query = client.query("SELECT * FROM campaign_asset_master cam left outer join campaign_master cm on cam.cam_cm_id=cm.cm_id where cam_cm_id=$1",[id]);
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

router.get('/allowdomain/:jobId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.jobId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    const query = client.query("SELECT * FROM allow_domain_campaign_master adcm left outer join campaign_master cm on adcm.adcm_cm_id=cm.cm_id where adcm_cm_id=$1",[id]);
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



router.post('/check/accountList/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id=req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM account_master_campaign_master amcm inner join campaign_master cm on amcm.amcm_cm_id=cm.cm_id left outer join suppression_campaign_master scm on scm.scm_cm_id=cm.cm_id where amcm_cm_id=$1 and amcm_company=$2",[id,req.body.cdm_company_name]);
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

router.post('/check/suppression/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id=req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM suppression_campaign_master scm inner join campaign_master cm on scm.scm_cm_id=cm.cm_id where scm_company=$1 and scm_cm_id=$2",[req.body.cdm_company_name,id]);
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


router.post('/check/domain/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  // console.log(req.body);
  const id=req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM denied_domain_campaign_master ddcm inner join campaign_master cm on ddcm.ddcm_cm_id=cm.cm_id where ddcm_website=$1 and ddcm_cm_id=$2",[req.body.cdm_domain,id]);
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

router.post('/check/AllDomain/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  // console.log(req.body);
  const id=req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM allow_domain_campaign_master adcm inner join campaign_master cm on adcm.adcm_cm_id=cm.cm_id where adcm_website=$1 and adcm_cm_id=$2",[req.body.cdm_domain,id]);
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


router.post('/getcountryname', oauth.authorise(), (req, res, next) => {
  const results = [];
  // console.log(req.body);
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT *, sortname||' - '||name as c_search FROM countries where name=$1 ",[req.body.cdm_country]);
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

router.post('/getstatename', oauth.authorise(), (req, res, next) => {
  const results = [];
  // console.log(req.body);
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT *, name as state_name FROM states where name=$1 ",[req.body.cdm_state]);
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

router.post('/getcityname', oauth.authorise(), (req, res, next) => {
  const results = [];
  // console.log(req.body);
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT *, name as city_name FROM cities where name=$1 ",[req.body.cdm_city]);
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

  console.log(req.body.contact.country.cdm_country);
  const contact=req.body.contact;
  const user = req.body.userid;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    client.query('BEGIN;');

       // var singleInsert = "INSERT INTO contact_discovery_master(cdm_cm_id,cdm_mobile,cdm_first_name,cdm_last_name,cdm_job_title,cdm_job_level,cdm_dept,cdm_email_id,cdm_company_name,cdm_address,cdm_city,cdm_state,cdm_postal_code,cdm_country,cdm_industry,cdm_company_size,cdm_revenue,cdm_asset,cdm_domain,cdm_ip_address,cdm_userid,cdm_status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,0) RETURNING *",
       //  params = [contact.cdm_cm_id.cm_id,encryption.encrypt(contact.cdm_contact_number),encryption.encrypt(contact.cdm_first_name),encryption.encrypt(contact.cdm_last_name),encryption.encrypt(contact.cdm_job_title),encryption.encrypt(contact.levels.cjlm_job_level),encryption.encrypt(contact.departments.cdm_department),encryption.encrypt(contact.cdm_email),encryption.encrypt(contact.cdm_company_name),encryption.encrypt(contact.cdm_address),encryption.encrypt(contact.city.city_name),encryption.encrypt(contact.state.state_name),encryption.encrypt(contact.cdm_postal_code),encryption.encrypt(contact.country.country_name),encryption.encrypt(contact.industries.cim_industries),encryption.encrypt(contact.sizes.cesm_employee_size),encryption.encrypt(contact.revenues.crem_revenue),encryption.encrypt(contact.assets.cam_campaign_asset),encryption.encrypt(contact.cdm_domain),encryption.encrypt(contact.cdm_ip_address),user]
       
        var singleInsert = "INSERT INTO contact_discovery_master(cdm_cm_id,cdm_mobile,cdm_first_name,cdm_last_name,cdm_job_title,cdm_job_level,cdm_dept,cdm_email_id,cdm_company_name,cdm_address,cdm_city,cdm_state,cdm_postal_code,cdm_country,cdm_industry,cdm_company_size,cdm_revenue,cdm_asset,cdm_domain,cdm_ip_address,cdm_userid,cdm_status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,0) RETURNING *",
        params = [contact.cdm_cm_id.cm_id,encryption.encrypt(contact.cdm_contact_number),encryption.encrypt(contact.cdm_first_name),encryption.encrypt(contact.cdm_last_name),encryption.encrypt(contact.cdm_job_title),encryption.encrypt(contact.levels.cjlm_job_level),encryption.encrypt(contact.departments.cdm_department),encryption.encrypt(contact.cdm_email),encryption.encrypt(contact.cdm_company_name),encryption.encrypt(contact.cdm_address),encryption.encrypt(contact.city.city_name),encryption.encrypt(contact.state.state_name),encryption.encrypt(contact.cdm_postal_code),encryption.encrypt(contact.country.c_search),encryption.encrypt(contact.industries.cim_industries),encryption.encrypt(contact.sizes.cesm_employee_size),encryption.encrypt(contact.revenues.crem_revenue),encryption.encrypt(contact.assets.cam_campaign_asset),encryption.encrypt(contact.cdm_domain),encryption.encrypt(contact.cdm_ip_address),user]
       
        client.query(singleInsert, params, function (error, result) {
        results.push(result.rows[0]);// Will contain your inserted rows
      
        client.query('COMMIT;');
        done();
        return res.json(results);
    });
    done(err);
  });
});

router.post('/import', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.jobId;
  const contact = req.body.contact;
  const userid = req.body.userid;
  console.log(userid);
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    client.query('BEGIN;');
        contact.forEach(function(val,key){
          var singleInsert = "INSERT INTO contact_discovery_master(cdm_mobile,cdm_first_name,cdm_last_name,cdm_job_title,cdm_job_level,cdm_dept,cdm_email_id,cdm_company_name,cdm_address,cdm_postal_code,cdm_city,cdm_state,cdm_country,cdm_industry,cdm_company_size,cdm_revenue,cdm_asset,cdm_domain,cdm_ip_address,call_status,cdm_userid,cdm_status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,0) RETURNING *",
        params = [encryption.encrypt(val.no),encryption.encrypt(val.First_Name),encryption.encrypt(val.Last_Name),encryption.encrypt(val.Job_Title),encryption.encrypt(val.Job_Level),encryption.encrypt(val.Department),encryption.encrypt(val.Email_Id),encryption.encrypt(val.Company_Name),encryption.encrypt(val.Address),encryption.encrypt(val.postal_code),encryption.encrypt(val.City),encryption.encrypt(val.State),encryption.encrypt(val.Countryt),encryption.encrypt(val.Industry),encryption.encrypt(val.Company_Size),encryption.encrypt(val.Revenue),encryption.encrypt(val.Asset),encryption.encrypt(val.Domain),encryption.encrypt(val.ip_address),val.Status,userid]
        
        client.query(singleInsert, params, function (error, result) {
        results.push(result.rows[0]);// Will contain your inserted rows
          
          /*client.query('update contact_discovery_master set cdm_status=1, cdm_updated_at=now() where cdm_id=$1 RETURNING *',[val.cdm_id])
        */
      });
    });     
        
        client.query('COMMIT;');
        done();
        return res.json(results);
    done(err);
  });
});

router.post('/edit/:jobId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.jobId;
  const contact=req.body.contact;

  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, contact: err});
    }
    client.query('BEGIN;');
    
    var singleInsert = 'update contact_discovery_master set cdm_first_name=$1, cdm_last_name=$2, cdm_job_title=$3, cdm_job_level=$4, cdm_dept=$5, cdm_email_id=$6, cdm_mobile=$7, cdm_company_name=$8, cdm_address=$9, cdm_city=$10, cdm_state=$11, cdm_postal_code=$12, cdm_country=$13, cdm_industry=$14, cdm_company_size=$15, cdm_revenue=$16, cdm_asset=$17, cdm_domain=$18, cdm_ip_address=$19, cdm_updated_at=now() where cdm_id=$20 RETURNING *',
        params = [encryption.encrypt(contact.cdm_first_name),encryption.encrypt(contact.cdm_last_name),encryption.encrypt(contact.cdm_job_title),encryption.encrypt(contact.cjlm_job_level),encryption.encrypt(contact.cdm_department),encryption.encrypt(contact.cdm_email),encryption.encrypt(contact.cdm_contact_number),encryption.encrypt(contact.cdm_company_name),encryption.encrypt(contact.cdm_address),encryption.encrypt(contact.city_name),encryption.encrypt(contact.state_name),encryption.encrypt(contact.cdm_postal_code),encryption.encrypt(contact.c_search),encryption.encrypt(contact.cim_industries),encryption.encrypt(contact.cesm_employee_size),encryption.encrypt(contact.crem_revenue),encryption.encrypt(contact.cam_campaign_asset),encryption.encrypt(contact.cdm_domain),encryption.encrypt(contact.cdm_ip_address),id];
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


router.post('/domain_limit/typeahead/search', oauth.authorise(), (req, res, next) => {

  var email = req.body.cdm_email.toLowerCase();
  var name = email.split('@');
  var em = encryption.encrypt(name[1]);
  console.log(name);
  const results = [];
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    // const strqry =  "SELECT cm_id, cm_domain_limit "+
    const strqry =  "SELECT cm_id, cm_domain_limit, count(cdm_domain) as domain "+
                    "FROM contact_discovery_master con "+
                    "inner join campaign_master cm on con.cdm_cm_id=cm.cm_id "+
                    "where con.cdm_cm_id = $1 "+
                    "and con.cdm_status = 0  "+
                    "and LOWER(cdm_domain) LIKE LOWER($2) "+
                    "group by cm_id, cm_domain_limit ";
                    // "and LOWER(ccnm_last_name) LIKE LOWER($3) "

    const query = client.query(strqry,[req.body.cdm_cm_id.cm_id,em]);
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

router.post('/domain_limit_edit/typeahead/search', oauth.authorise(), (req, res, next) => {

  var email = req.body.cdm_email.toLowerCase();
  var name = email.split('@');
  var em = encryption.encrypt(name[1]);
  console.log(name);
  const results = [];
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    // const strqry =  "SELECT cm_id, cm_domain_limit "+
    const strqry =  "SELECT cm_id, cm_domain_limit, count(cdm_domain) as domain "+
                    "FROM contact_discovery_master con "+
                    "inner join campaign_master cm on con.cdm_cm_id=cm.cm_id "+
                    "where con.cdm_cm_id = $1 "+
                    "and con.cdm_status = 0  "+
                    "and LOWER(cdm_domain) LIKE LOWER($2) "+
                    "group by cm_id, cm_domain_limit ";
                    // "and LOWER(ccnm_last_name) LIKE LOWER($3) "

    const query = client.query(strqry,[req.body.cm_id,em]);
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

router.post('/allow_domain_limit/typeahead/search', oauth.authorise(), (req, res, next) => {

  var email = req.body.cdm_email.toLowerCase();
  var name = email.split('@');
  var em = encryption.encrypt(name[1]);
  
  const results = [];
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    // const strqry =  "SELECT cm_id, cm_domain_limit "+
    // const strqry =  "SELECT cm_id, cm_domain_limit, count(cdm_domain) as domain "+
    //                 "FROM contact_discovery_master con "+
    //                 "inner join campaign_master cm on con.cdm_cm_id=cm.cm_id "+
    //                 "where con.cdm_cm_id = $1 "+
    //                 "and LOWER(cdm_domain) LIKE LOWER($2) "+
    //                 "group by cm_id, cm_domain_limit ";
    //                 // "and LOWER(ccnm_last_name) LIKE LOWER($3) "

    const strqry = "select cm_id, adcm_domain_limit, count(cdm_domain) as domain "+
                    "from contact_discovery_master cdm "+ 
                    "inner join campaign_master cm on cdm.cdm_cm_id = cm.cm_id "+ 
                    "inner join allow_domain_campaign_master adcm on cm.cm_id = adcm.adcm_cm_id "+
                    "where cdm.cdm_cm_id = $1  "+
                    "and cdm.cdm_status = 0  "+
                    "and LOWER(adcm_website) LIKE LOWER($2) "+
                    "and LOWER(cdm_domain) LIKE LOWER($3) "+
                    "group by cm_id, adcm_domain_limit ";

    const query = client.query(strqry,[req.body.cdm_cm_id.cm_id,name[1],em]);
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

router.post('/allow_domain_limit_edit/typeahead/search', oauth.authorise(), (req, res, next) => {

  var email = req.body.cdm_email.toLowerCase();
  var name = email.split('@');
  var em = encryption.encrypt(name[1]);
  console.log(em);
  const results = [];
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }

    const strqry = "select cm_id, adcm_domain_limit, count(cdm_domain) as domain "+
                    "from contact_discovery_master cdm "+ 
                    "inner join campaign_master cm on cdm.cdm_cm_id = cm.cm_id "+ 
                    "inner join allow_domain_campaign_master adcm on cm.cm_id = adcm.adcm_cm_id "+
                    "where cdm.cdm_cm_id = $1  "+
                    "and cdm.cdm_status = 0  "+
                    "and LOWER(adcm_website) LIKE LOWER($2) "+
                    "and LOWER(cdm_domain) LIKE LOWER($3) "+
                    "group by cm_id, adcm_domain_limit ";

    const query = client.query(strqry,[req.body.cm_id,name[1],em]);
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
                    "from contact_discovery_master cdm "+
                    "left outer join campaign_master cm on cdm.cdm_cm_id=cm.cm_id "+
                    "inner join users us on cdm.cdm_userid=us.id "+
                    "where cdm_status=0 "+
                    "and cdm_userid=$1 "+
                    "and LOWER(cdm_first_name||''||cdm_last_name ||''||cm_campaign_name) LIKE LOWER($2) "+
                    "and date(cdm_created_at)::date BETWEEN $3 and $4; ";

    const query = client.query(strqry,[req.body.userid,str,req.body.cdm_from_date,req.body.cdm_to_date]);
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
                    "from contact_discovery_master cdm "+
                    "left outer join campaign_master cm on cdm.cdm_cm_id=cm.cm_id "+
                    "inner join users us on cdm.cdm_userid=us.id "+
                    "where cdm_status=0 "+
                    "and cdm_userid=$1 "+
                    "and LOWER(cdm_first_name||''||cdm_last_name ||''||cm_campaign_name) LIKE LOWER($2) "+
                    "and date(cdm_created_at)::date BETWEEN $3 and $4 "+
                    "order by cdm.cdm_id desc LIMIT $5 OFFSET $6";

    const query = client.query(strqry,[req.body.userid, str, req.body.cdm_from_date, req.body.cdm_to_date, req.body.number, req.body.begin]);
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
      row.cdm_ip_address=encryption.decrypt(row.cdm_ip_address);
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

router.post('/assign/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.campaignId;
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
          var singleInsert = "update contact_discovery_master set cdm_cm_id=$1, cdm_updated_at=now() where cdm_id=$2 RETURNING *",
          params = [id,val.cdm_id]
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

router.post('/assignCampaign/total', oauth.authorise(), (req, res, next) => {
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
                    "from contact_discovery_master cdm "+
                    "where cdm_cm_id is null "+
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

router.post('/assignCampaign/limit', oauth.authorise(), (req, res, next) => {
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

    const strqry =  "SELECT cdm_id,cdm_first_name,cdm_last_name,cdm_job_title,cdm_job_level,cdm_dept,cdm_email_id,cdm_company_name,cdm_address,cdm_city,cdm_state,cdm_postal_code,cdm_country,cdm_industry,cdm_revenue,cdm_asset,cdm_domain,cdm_company_size,cdm_mobile,cdm_ip_address,call_status "+
                    "FROM contact_discovery_master cdm "+
                    "where cdm.cdm_cm_id is null "+
                    "and cdm_status = 0 "+
                    "and LOWER(cdm_first_name||''||cdm_last_name) LIKE LOWER($1) "+
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
      row.cdm_ip_address=encryption.decrypt(row.cdm_ip_address);

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


module.exports = router;