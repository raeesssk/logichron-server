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
    const query = client.query("SELECT * from contact_discovery_master cdm LEFT OUTER JOIN question_master qm on qm.qm_cdm_id=cdm.cdm_id LEFT OUTER JOIN campaign_master cm on cdm.cdm_cm_id=cm.cm_id where cdm_id=$1",[id]);
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
    const query = client.query("SELECT qm_questions,qm_answers,qm_cdm_id FROM question_master qm left outer join contact_discovery_master cdm on qm.qm_cdm_id=cdm.cdm_id where cdm_id=$1",[id]);
    query.on('row', (row) => {
      row.qm_questions=encryption.decrypt(row.qm_questions);
      row.qm_answers=encryption.decrypt(row.qm_answers);
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

        var singleInsert = "INSERT INTO contact_discovery_master(cdm_cm_id,cdm_mobile,cdm_first_name,cdm_last_name,cdm_job_title,cdm_job_level,cdm_dept,cdm_email_id,cdm_company_name,cdm_address,cdm_city,cdm_state,cdm_postal_code,cdm_country,cdm_industry,cdm_company_size,cdm_revenue,cdm_asset,cdm_domain,cdm_userid,cdm_status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,0) RETURNING *",
        params = [contact.cdm_cm_id.cm_id,encryption.encrypt(contact.cdm_mobile),encryption.encrypt(contact.cdm_first_name),encryption.encrypt(contact.cdm_last_name),encryption.encrypt(contact.cdm_job_title),encryption.encrypt(contact.cdm_job_level),encryption.encrypt(contact.cdm_dept),encryption.encrypt(contact.cdm_email_id),encryption.encrypt(contact.cdm_company_name),encryption.encrypt(contact.cdm_address),encryption.encrypt(contact.cdm_city),encryption.encrypt(contact.cdm_state),encryption.encrypt(contact.cdm_postal_code),encryption.encrypt(contact.cdm_country),encryption.encrypt(contact.cdm_industry),encryption.encrypt(contact.cdm_company_size),encryption.encrypt(contact.cdm_revenue),encryption.encrypt(contact.cdm_asset),encryption.encrypt(contact.cdm_domain),contact.userid]
        
        client.query(singleInsert, params, function (error, result) {
        results.push(result.rows[0]);// Will contain your inserted rows
        
        answer.forEach(function(product,index){
          client.query("INSERT into question_master(qm_questions,qm_answers,qm_cdm_id,qm_userid,qm_status) values($1,$2,$3,$4,0) RETURNING *",
            [encryption.encrypt(product.qm_questions),encryption.encrypt(product.qm_answers),result.rows[0].cdm_id],product.userid);
        
        });
        client.query('COMMIT;');
        done();
        return res.json(results);
    });
    done(err);
  });
});

router.post('/import', (req, res, next) => {
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
          var singleInsert = "INSERT INTO contact_discovery_master(cdm_mobile,cdm_first_name,cdm_last_name,cdm_job_title,cdm_job_level,cdm_dept,cdm_email_id,cdm_company_name,cdm_address,cdm_postal_code,cdm_city,cdm_state,cdm_country,cdm_industry,cdm_company_size,cdm_revenue,cdm_asset,cdm_domain,call_status,cdm_userid,cdm_status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,0) RETURNING *",
        params = [encryption.encrypt(val.no),encryption.encrypt(val.First_Name),encryption.encrypt(val.Last_Name),encryption.encrypt(val.Job_Title),encryption.encrypt(val.Job_Level),encryption.encrypt(val.Department),encryption.encrypt(val.Email_Id),encryption.encrypt(val.Company_Name),encryption.encrypt(val.Address),encryption.encrypt(val.postal_code),encryption.encrypt(val.City),encryption.encrypt(val.State),encryption.encrypt(val.Countryt),encryption.encrypt(val.Industry),encryption.encrypt(val.Company_Size),encryption.encrypt(val.Revenue),encryption.encrypt(val.Asset),encryption.encrypt(val.Domain),val.Status,userid]
        
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
        params = [encryption.encrypt(contact.cdm_first_name),encryption.encrypt(contact.cdm_last_name),encryption.encrypt(contact.cdm_job_title),encryption.encrypt(contact.cdm_job_level),encryption.encrypt(contact.cdm_dept),encryption.encrypt(contact.cdm_email_id),encryption.encrypt(contact.cdm_mobile),encryption.encrypt(contact.cdm_company_name),encryption.encrypt(contact.cdm_address),encryption.encrypt(contact.cdm_city),encryption.encrypt(contact.cdm_state),encryption.encrypt(contact.cdm_postal_code),encryption.encrypt(contact.cdm_country),encryption.encrypt(contact.cdm_industry),encryption.encrypt(contact.cdm_company_size),encryption.encrypt(contact.cdm_revenue),encryption.encrypt(contact.cdm_asset),encryption.encrypt(contact.cdm_domain),id];
    client.query(singleInsert, params, function (error, result) {
        results.push(result.rows[0]); // Will contain your inserted rows

        remove.forEach(function(val,index){
           client.query("delete from question_master where qm_id=$1",[val.qm_id]);
        });
        answers.forEach(function(product,index){
          client.query("update question_master set qm_questions=$1,qm_answers=$2 where qm_cdm_id=$3",[encryption.encrypt(product.qm_questions),encryption.encrypt(product.qm_answers),result.rows[0].cdm_id]);
        });
        answersadd.forEach(function(value,index){
          client.query("INSERT into question_master(qm_questions,qm_answers,qm_cdm_id,qm_status) values($1,$2,$3,0)",[encryption.encrypt(value.qm_questions),encryption.encrypt(value.qm_answers),result.rows[0].cdm_id]);
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
                    "from contact_discovery_master cdm "+
                    "left outer join campaign_master cm on cdm.cdm_cm_id=cm.cm_id "+
                    "inner join users us on cdm.cdm_userid=us.id "+
                    "where cdm_status=0 "+
                    "and cdm_userid=$1 "+
                    "and LOWER(cdm_first_name||''||cdm_last_name) LIKE LOWER($2) "+
                    "and date(cdm_created_at)::date BETWEEN $3 and $4; "

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
                    "FROM contact_discovery_master cdm "+
                    "left outer join campaign_master cm on cdm.cdm_cm_id=cm.cm_id "+
                    "inner join users us on cdm.cdm_userid=us.id "+
                    "where cdm.cdm_status = 0 "+
                    "and cdm_userid=$1 "+
                    "and LOWER(cm_campaign_name||''||cdm_first_name||''||cdm_last_name) LIKE LOWER($2) "+
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

    const strqry =  "SELECT cdm_id,cdm_first_name,cdm_last_name,cdm_job_title,cdm_job_level,cdm_dept,cdm_email_id,cdm_company_name,cdm_address,cdm_city,cdm_state,cdm_postal_code,cdm_country,cdm_industry,cdm_revenue,cdm_asset,cdm_domain,cdm_company_size,cdm_mobile,call_status "+
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