var express = require('express');
var router = express.Router();
var oauth = require('../oauth/index');
var pg = require('pg');
var path = require('path');
var config = require('../config.js');

var pool = new pg.Pool(config);

router.get('/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM campaign_master cm left outer join account_master_campaign_master amcm on amcm.amcm_cm_id=cm.cm_id left outer join suppression_campaign_master scm on scm.scm_cm_id=cm.cm_id left outer join allow_domain_campaign_master adcm on adcm.adcm_cm_id=cm.cm_id left outer join custom_question_campaign_master cqcm on cmcm_cm_id=cm.cm_id left outer join denied_domain_campaign_master ddcm on ddcm.ddcm_cm_id=cm.cm_id where cm_id=$1',[id]);
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

router.get('/account/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM campaign_master cm left outer join account_master_campaign_master amcm on amcm.amcm_cm_id=cm.cm_id left outer join suppression_campaign_master scm on scm.scm_cm_id=cm.cm_id left outer join allow_domain_campaign_master adcm on adcm.adcm_cm_id=cm.cm_id left outer join custom_question_campaign_master cqcm on cmcm_cm_id=cm.cm_id left outer join denied_domain_campaign_master ddcm on ddcm.ddcm_cm_id=cm.cm_id where cm_id=$1',[id]);
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

router.get('/suppression/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM campaign_master cm left outer join account_master_campaign_master amcm on amcm.amcm_cm_id=cm.cm_id left outer join suppression_campaign_master scm on scm.scm_cm_id=cm.cm_id left outer join allow_domain_campaign_master adcm on adcm.adcm_cm_id=cm.cm_id left outer join custom_question_campaign_master cqcm on cmcm_cm_id=cm.cm_id left outer join denied_domain_campaign_master ddcm on ddcm.ddcm_cm_id=cm.cm_id where cm_id=$1',[id]);
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

router.get('/allowdomain/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM campaign_master cm left outer join account_master_campaign_master amcm on amcm.amcm_cm_id=cm.cm_id left outer join suppression_campaign_master scm on scm.scm_cm_id=cm.cm_id left outer join allow_domain_campaign_master adcm on adcm.adcm_cm_id=cm.cm_id left outer join custom_question_campaign_master cqcm on cmcm_cm_id=cm.cm_id left outer join denied_domain_campaign_master ddcm on ddcm.ddcm_cm_id=cm.cm_id where cm_id=$1',[id]);
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

router.get('/question/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM campaign_master cm left outer join account_master_campaign_master amcm on amcm.amcm_cm_id=cm.cm_id left outer join suppression_campaign_master scm on scm.scm_cm_id=cm.cm_id left outer join allow_domain_campaign_master adcm on adcm.adcm_cm_id=cm.cm_id left outer join custom_question_campaign_master cqcm on cmcm_cm_id=cm.cm_id left outer join denied_domain_campaign_master ddcm on ddcm.ddcm_cm_id=cm.cm_id where cm_id=$1',[id]);
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

router.get('/deniedomain/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM campaign_master cm left outer join account_master_campaign_master amcm on amcm.amcm_cm_id=cm.cm_id left outer join suppression_campaign_master scm on scm.scm_cm_id=cm.cm_id left outer join allow_domain_campaign_master adcm on adcm.adcm_cm_id=cm.cm_id left outer join custom_question_campaign_master cqcm on cmcm_cm_id=cm.cm_id left outer join denied_domain_campaign_master ddcm on ddcm.ddcm_cm_id=cm.cm_id where cm_id=$1',[id]);
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
  const campaign=req.body.campaign;
  const accountList=req.body.accountList;
  const supressionList=req.body.supressionList;
  const allowDomainList=req.body.allowDomainList;
  const customQuestionList=req.body.customQuestionList;
  const deniedDomainList=req.body.deniedDomainList;
  console.log(accountList);
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }

    var singleInsert = "INSERT INTO campaign_master(cm_first_dely,cm_end_date,cm_dely_frequency,cm_campaign_name,cm_restrict,cm_account_list,cm_supression_file,cm_domain_limit,cm_emp_size,cm_disqualifies,cm_title,cm_lead_count,cm_geo,cm_allow_domain,cm_revenue,cm_custom_question,cm_denied_domain,cm_campaign_asset,cm_industry,cm_dept,cm_method,cm_job,cm_status) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,0) RETURNING *",
        params = [campaign.cm_first_dely,campaign.cm_end_date,campaign.cm_dely_frequency,campaign.cm_campaign_name,campaign.cm_restrict,campaign.cm_account_list,campaign.cm_supression_file,campaign.cm_domain_limit,campaign.cm_emp_size,campaign.cm_disqualifies,campaign.cm_title,campaign.cm_lead_count,campaign.cm_geo,campaign.cm_allow_domain,campaign.cm_revenue,campaign.cm_custom_question,campaign.cm_denied_domain,campaign.cm_campaign_asset,campaign.cm_industry,campaign.cm_dept,campaign.cm_method,campaign.cm_job]
    client.query(singleInsert, params, function (error, result) {
        results.push(result.rows[0]); // Will contain your inserted rows

        accountList.forEach(function(product,index){
          client.query("INSERT into account_master_campaign_master(amcm_cm_id,amcm_company,amcm_website,amcm_status)values ($1,$2,$3,0) RETURNING *",
            [result.rows[0].cm_id,product.amcm_company,product.amcm_website]);
        });

        supressionList.forEach(function(product,index){
          client.query("INSERT into suppression_campaign_master(scm_cm_id,scm_company,scm_website,scm_status)values ($1,$2,$3,0) RETURNING *",
            [result.rows[0].cm_id,product.scm_company,product.scm_website]);
        });

        allowDomainList.forEach(function(product,index){
          client.query("INSERT into allow_domain_campaign_master(adcm_cm_id,adcm_website,adcm_status)values ($1,$2,0) RETURNING *",
            [result.rows[0].cm_id,product.adcm_website]);
        });

        customQuestionList.forEach(function(product,index){
          client.query("INSERT into custom_question_campaign_master(cmcm_cm_id,cmcm_question,cmcm_status)values ($1,$2,0) RETURNING *",
            [result.rows[0].cm_id,product.cmcm_question]);
        });

        deniedDomainList.forEach(function(product,index){
          client.query("INSERT into denied_domain_campaign_master(ddcm_cm_id,ddcm_website,ddcm_status)values ($1,$2,0) RETURNING *",
            [result.rows[0].cm_id,product.dd_cm_website]);
        });

        done();
        return res.json(results);
    });

    done(err);
  });
});

router.post('/edit/:projectId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.projectId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    client.query('BEGIN;');
    
    var singleInsert = 'update campaign_master set mm_pm_name=$1, mm_pm_details=$2, mm_pm_type=$3, mm_pm_assign=$4, mm_updated_at=now() where mm_id=$5 RETURNING *',
        params = [req.body.mm_pm_name,req.body.mm_pm_details,req.body.mm_pm_type,req.body.mm_pm_assign,id];
    client.query(singleInsert, params, function (error, result) {
        results.push(result.rows[0]); // Will contain your inserted rows
        
        client.query('COMMIT;');
        done();
        return res.json(results);
    });

    done(err);
  });
});

router.post('/delete/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.campaignId; 
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    client.query('BEGIN;');

    var singleInsert = "update campaign_master set cm_status=1, cm_updated_at=now() where cm_id=$1 RETURNING *",
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

router.post('/campaign/total', oauth.authorise(), (req, res, next) => {
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
    const strqry =  "SELECT count(cm.cm_id) as total "+
                    "from campaign_master cm "+
                    "where cm.cm_status=0 "+
                    "and LOWER(cm_campaign_name||''||cm_title) LIKE LOWER($1);";

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

router.post('/campaign/limit', oauth.authorise(), (req, res, next) => {
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

    const strqry =  "SELECT cm_id,cm_first_dely,cm_end_date,cm_dely_frequency,cm_campaign_name,cm_restrict,cm_account_list,cm_supression_file,cm_domain_limit,cm_emp_size,cm_disqualifies,cm_title,cm_lead_count,cm_geo,cm_allow_domain,cm_revenue,cm_custom_question,cm_denied_domain,cm_campaign_asset,cm_industry,cm_dept,cm_method,cm_job "+
                    "from campaign_master cm "+
                    "where cm.cm_status=0 "+
                    "and LOWER(cm_campaign_name||''||cm_title) LIKE LOWER($1) "+
                    "order by cm.cm_id desc LIMIT $2 OFFSET $3";

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

router.post('/typeahead/search', oauth.authorise(), (req, res, next) => {
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
                    "FROM manager_master mm "+
                    "where mm.mm_status = 0 "+
                    "and LOWER(mm_pm_name) LIKE LOWER($1) "+
                    "order by mm.mm_id desc LIMIT 10";

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

module.exports = router;