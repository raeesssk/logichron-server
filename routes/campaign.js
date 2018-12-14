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
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM campaign_master cm left outer join account_master_campaign_master amcm on amcm.amcm_cm_id=cm.cm_id left outer join suppression_campaign_master scm on scm.scm_cm_id=cm.cm_id left outer join allow_domain_campaign_master adcm on adcm.adcm_cm_id=cm.cm_id left outer join custom_question_campaign_master cqcm on cmcm_cm_id=cm.cm_id left outer join denied_domain_campaign_master ddcm on ddcm.ddcm_cm_id=cm.cm_id where cm_status=0 order by cm_id asc');
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

router.get('/supression/:campaignId', oauth.authorise(), (req, res, next) => {
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
  const titleList = req.body.titleList;
  const industryList = req.body.industryList;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }

    var singleInsert = "INSERT INTO campaign_master(cm_date,cm_first_dely,cm_end_date,cm_dely_frequency,cm_campaign_name,cm_restrict,cm_account_list,cm_supression_file,cm_domain_limit,cm_emp_size,cm_disqualifies,cm_title,cm_lead_count,cm_geo,cm_allow_domain,cm_revenue,cm_custom_question,cm_denied_domain,cm_campaign_asset,cm_industry,cm_dept,cm_method,cm_job,cm_vertical,cm_userid,cm_status) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,0) RETURNING *",
        params = [campaign.cm_date,campaign.cm_first_dely,campaign.cm_end_date,campaign.cm_dely_frequency,campaign.cm_campaign_name,campaign.cm_restrict,campaign.cm_account_list,campaign.cm_supression_file,campaign.cm_domain_limit,campaign.cm_emp_size,campaign.cm_disqualifies,campaign.cm_title,campaign.cm_lead_count,campaign.cm_geo,campaign.cm_allow_domain,campaign.cm_revenue,campaign.cm_custom_question,campaign.cm_denied_domain,campaign.cm_campaign_asset,campaign.cm_industry,campaign.cm_dept,campaign.cm_method,campaign.cm_job,campaign.cm_vertical,campaign.userid]
    client.query(singleInsert, params, function (error, result) {
        results.push(result.rows[0]); // Will contain your inserted rows

        accountList.forEach(function(product,index){
          client.query("INSERT into account_master_campaign_master(amcm_cm_id,amcm_company,amcm_website,amcm_userid,amcm_status)values ($1,$2,$3,$4,0) RETURNING *",
            [result.rows[0].cm_id,product.company,product.website,product.userid]);
        });

        supressionList.forEach(function(product,index){
          client.query("INSERT into suppression_campaign_master(scm_cm_id,scm_company,scm_website,scm_userid,scm_status)values ($1,$2,$3,$4,0) RETURNING *",
            [result.rows[0].cm_id,product.company,product.website,product.userid]);
        });

        allowDomainList.forEach(function(product,index){
          client.query("INSERT into allow_domain_campaign_master(adcm_cm_id,adcm_website,adcm_userid,adcm_status)values ($1,$2,$3,0) RETURNING *",
            [result.rows[0].cm_id,product.adcm_website,product.userid]);
        });

        customQuestionList.forEach(function(product,index){
          client.query("INSERT into custom_question_campaign_master(cmcm_cm_id,cmcm_question,cmcm_userid,cmcm_status)values ($1,$2,$3,0) RETURNING *",
            [result.rows[0].cm_id,product.cmcm_question,product.userid]);
        });

        deniedDomainList.forEach(function(product,index){
          client.query("INSERT into denied_domain_campaign_master(ddcm_cm_id,ddcm_website,ddcm_userid,ddcm_status)values ($1,$2,$3,0) RETURNING *",
            [result.rows[0].cm_id,product.ddcm_website,product.userid]);
        });

        industryList.forEach(function(product,index){
          client.query("INSERT into campaign_industry_master(cim_cm_id,cim_industries,cim_userid)values ($1,$2,$3) RETURNING *",
            [result.rows[0].cm_id,product.industries,product.userid]);
        });

        titleList.forEach(function(product,index){
          client.query("INSERT into denied_domain_campaign_master(ctm_cm_id,ctm_title,ctm_userid)values ($1,$2,$3) RETURNING *",
            [result.rows[0].cm_id,product.titles,product.userid]);
        });

        done();
        return res.json(results);
    });

    done(err);
  });
});

router.post('/edit/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.campaignId;
  const campaign=req.body.campaign;
  const oldaccountList=req.body.oldaccountList;
  const accountList=req.body.accountList;
  const removeAccount=req.body.removeAccount;
  const oldsupressionList=req.body.oldsupressionList;
  const supressionList=req.body.supressionList;
  const removesuppressionList=req.body.removesuppressionList;
  const oldallowDomainList=req.body.oldallowDomainList;
  const allowDomainList=req.body.allowDomainList;
  const removeAllowedDomain=req.body.removeAllowedDomain;
  const oldcustomQuestionList=req.body.oldcustomQuestionList;
  const customQuestionList=req.body.customQuestionList;
  const removecustomQuestion=req.body.removecustomQuestion;
  const olddeniedDomainList=req.body.olddeniedDomainList;
  const deniedDomainList=req.body.deniedDomainList;
  const removeDeniedDomain=req.body.removeDeniedDomain;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    client.query('BEGIN;');
    
    var designInsert = 'update public.campaign_master set  cm_first_dely=$1, cm_end_date=$2, cm_dely_frequency=$3, cm_campaign_name=$4, cm_restrict=$5, cm_account_list=$6, cm_supression_file=$7, cm_domain_limit=$8, cm_emp_size=$9, cm_disqualifies=$10, cm_title=$11, cm_lead_count=$12, cm_geo=$13, cm_allow_domain=$14, cm_revenue=$15, cm_custom_question=$16, cm_denied_domain=$17, cm_campaign_asset=$18, cm_industry=$19, cm_dept=$20, cm_method=$21, cm_job=$22, cm_vertical=$23,  cm_updated_at=now() where cm_id=$24 RETURNING *',
        params = [campaign.cm_first_dely,campaign.cm_end_date,campaign.cm_dely_frequency,campaign.cm_campaign_name,campaign.cm_restrict,campaign.cm_account_list,campaign.cm_supression_file,campaign.cm_domain_limit,campaign.cm_emp_size,campaign.cm_disqualifies,campaign.cm_title,campaign.cm_lead_count,campaign.cm_geo,campaign.cm_allow_domain,campaign.cm_revenue,campaign.cm_custom_question,campaign.cm_denied_domain,campaign.cm_campaign_asset,campaign.cm_industry,campaign.cm_dept,campaign.cm_method,campaign.cm_job,campaign.cm_vertical,id];
    client.query(designInsert, params, function (error, result) {
        results.push(result.rows[0]); // Will contain your inserted rows
        //account list edit//
          removeAccount.forEach(function(product, index) {
          client.query('delete from public.account_master_campaign_master where amcm_id=$1',
            [product.amcm_id]);
        });

        oldaccountList.forEach(function(product, index) {
          client.query('update account_master_campaign_master set amcm_company=$1, amcm_website=$2, amcm_cm_id=$3, amcm_updated_at=now() where amcm_id=$4',
            [product.amcm_company,product.amcm_website,result.rows[0].cm_id,product.amcm_id]);
        });

        accountList.forEach(function(product, index) {
          client.query("INSERT into account_master_campaign_master(amcm_cm_id,amcm_company,amcm_website,amcm_status)values ($1,$2,$3,0) RETURNING *",
            [result.rows[0].cm_id,product.amcm_company,product.amcm_website]);
        //client.query('update design_product_master set dtm_part_no=$1, dtm_part_name=$2, dtm_qty=$3, dtm_updated_at=now() where dtm_id=$4',[product.dtm_part_no,product.dtm_part_name,product.dtm_qty,result.rows[0].dm_id]);
        });
        //end of account list
        //start of suppression list
        removesuppressionList.forEach(function(product, index) {
          client.query('delete from public.suppression_campaign_master where scm_id=$1',
            [product.scm_id]);
        });

        oldsupressionList.forEach(function(product, index) {
          client.query('update suppression_campaign_master set scm_company=$1, scm_website=$2, scm_cm_id=$3, scm_updated_at=now() where scm_id=$4',
            [product.scm_company,product.scm_website,result.rows[0].cm_id,product.scm_id]);
        });

        supressionList.forEach(function(product, index) {
          client.query("INSERT into suppression_campaign_master(scm_cm_id,scm_company,scm_website,scm_status)values ($1,$2,$3,0) RETURNING *",
            [result.rows[0].cm_id,product.scm_company,product.scm_website]);
        //client.query('update design_product_master set dtm_part_no=$1, dtm_part_name=$2, dtm_qty=$3, dtm_updated_at=now() where dtm_id=$4',[product.dtm_part_no,product.dtm_part_name,product.dtm_qty,result.rows[0].dm_id]);
        });
        //end of suppression list
        /*start of allowed domain list*/
        removeAllowedDomain.forEach(function(product, index) {
          client.query('delete from public.allow_domain_campaign_master where adcm_id=$1',
            [product.adcm_id]);
        });

        oldallowDomainList.forEach(function(product, index) {
          client.query('update allow_domain_campaign_master set adcm_website=$1, adcm_cm_id=$2, adcm_updated_at=now() where adcm_id=$3',
            [product.adcm_website,result.rows[0].cm_id,product.adcm_id]);
        });

        allowDomainList.forEach(function(product, index) {
          client.query("INSERT into allow_domain_campaign_master(adcm_cm_id,adcm_website,adcm_status)values ($1,$2,0) RETURNING *",
            [result.rows[0].cm_id,product.adcm_website]);
        //client.query('update design_product_master set dtm_part_no=$1, dtm_part_name=$2, dtm_qty=$3, dtm_updated_at=now() where dtm_id=$4',[product.dtm_part_no,product.dtm_part_name,product.dtm_qty,result.rows[0].dm_id]);
        });
        /*end*/
        /*start of customquestion*/
        removecustomQuestion.forEach(function(product, index) {
          client.query('delete from public.custom_question_campaign_master where cmcm_id=$1',
            [product.cmcm_id]);
        });

        oldcustomQuestionList.forEach(function(product, index) {
          client.query('update custom_question_campaign_master set cmcm_question=$1, cmcm_cm_id=$2, cmcm_updated_at=now() where cmcm_id=$3',
            [product.cmcm_question,result.rows[0].cm_id,product.cmcm_id]);
        });

        customQuestionList.forEach(function(product, index) {
          client.query("INSERT into custom_question_campaign_master(cmcm_cm_id,cmcm_question,cmcm_status)values ($1,$2,0) RETURNING *",
            [result.rows[0].cm_id,product.cmcm_question]);
        //client.query('update design_product_master set dtm_part_no=$1, dtm_part_name=$2, dtm_qty=$3, dtm_updated_at=now() where dtm_id=$4',[product.dtm_part_no,product.dtm_part_name,product.dtm_qty,result.rows[0].dm_id]);
        });
        /*end*/
        /*start of deniedomain*/
        removeDeniedDomain.forEach(function(product, index) {
          client.query('delete from public.denied_domain_campaign_master where ddcm_id=$1',
            [product.ddcm_id]);
        });

        olddeniedDomainList.forEach(function(product, index) {
          client.query('update denied_domain_campaign_master set ddcm_website=$1, ddcm_cm_id=$2, ddcm_updated_at=now() where ddcm_id=$3',
            [product.ddcm_website,result.rows[0].cm_id,product.ddcm_id]);
        });

        deniedDomainList.forEach(function(product, index) {
          client.query("INSERT into denied_domain_campaign_master(ddcm_cm_id,ddcm_website,ddcm_status)values ($1,$2,0) RETURNING *",
            [result.rows[0].cm_id,product.ddcm_website]);
        //client.query('update design_product_master set dtm_part_no=$1, dtm_part_name=$2, dtm_qty=$3, dtm_updated_at=now() where dtm_id=$4',[product.dtm_part_no,product.dtm_part_name,product.dtm_qty,result.rows[0].dm_id]);
        });
        /*end of denied domain*/
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

    const strqry =  "SELECT count(cm.cm_id) as total "+
                    "from campaign_master cm "+
                    "inner join users us on cm.cm_userid=us.id "+
                    "where cm.cm_status=0 "+
                    "and cm.cm_userid=$1 "+
                    "and LOWER(cm_campaign_name||''||cm_title) LIKE LOWER($2) "+
                    "and cm_date BETWEEN $3 and $4; "

    const query = client.query(strqry,[req.body.userid,str,req.body.cm_from_date,req.body.cm_to_date]);
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

    const strqry =  "SELECT cm_id,cm_first_dely,cm_end_date,cm_dely_frequency,cm_campaign_name,cm_restrict,cm_account_list,cm_supression_file,cm_domain_limit,cm_emp_size,cm_disqualifies,cm_title,cm_lead_count,cm_geo,cm_allow_domain,cm_revenue,cm_custom_question,cm_denied_domain,cm_campaign_asset,cm_industry,cm_dept,cm_method,cm_job,cm_vertical "+
                    "from campaign_master cm "+
                    "inner join users us on cm.cm_userid=us.id "+
                    "where cm.cm_status=0 "+
                    "and cm.cm_userid=$1 "+
                    "and LOWER(cm_campaign_name||''||cm_title) LIKE LOWER($2) "+
                    "and cm_date BETWEEN $3 and $4 "+
                    "order by cm.cm_id desc LIMIT $5 OFFSET $6 ";

    const query = client.query(strqry,[ req.body.userid,str, req.body.cm_from_date, req.body.cm_to_date, req.body.number, req.body.begin]);
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



router.get('/contact/goal/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id=req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("select count(cdm_id) as total from contact_discovery_master where call_status='Qualify' and cdm_status=0 and cdm_cm_id=$1",[id]);
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

router.get('/contact/count/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id=req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("select count(cdm_id) as total from contact_discovery_master where cdm_status=0 and cdm_cm_id=$1",[id]);
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

router.get('/Accview/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id=req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM account_master_campaign_master  where amcm_cm_id=$1",[id]);
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
router.get('/Suppview/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id=req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM suppression_campaign_master  where scm_cm_id=$1",[id]);
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
router.get('/Allowview/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id=req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM allow_domain_campaign_master  where adcm_cm_id=$1",[id]);
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
router.get('/Custview/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id=req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM custom_question_campaign_master  where cmcm_cm_id=$1",[id]);
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

router.get('/Denyview/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id=req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM denied_domain_campaign_master  where ddcm_cm_id=$1",[id]);
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
                    "FROM campaign_master cm "+
                    "inner join users us on cm.cm_userid=us.id "+
                    "where cm.cm_status = 0 "+
                    "and cm_userid=$1 "+
                    "and LOWER(cm_campaign_name||' '||cm_title) LIKE LOWER($2) "+
                    "order by cm.cm_id desc LIMIT 10";

    const query = client.query(strqry,[req.body.userid,str]);
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