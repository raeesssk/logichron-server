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
    const query = client.query('select * from account_master_campaign_master where amcm_cm_id=$1',[id]);
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
    const query = client.query('select * from suppression_campaign_master where scm_cm_id=$1',[id]);
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
    const query = client.query('select * from allow_domain_campaign_master where adcm_cm_id=$1',[id]);
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
    const query = client.query('select * from custom_question_campaign_master where cmcm_cm_id=$1',[id]);
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
    const query = client.query('select * from denied_domain_campaign_master where ddcm_cm_id=$1',[id]);
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

router.get('/titles/:campaignId', oauth.authorise(), (req, res, next) => {
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
    const query = client.query('select * from campaign_title_master where ctm_cm_id=$1',[id]);
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

router.get('/industries/:campaignId', oauth.authorise(), (req, res, next) => {
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
    const query = client.query('select * from campaign_industry_master where cim_cm_id=$1',[id]);
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

router.get('/restrict/:campaignId', oauth.authorise(), (req, res, next) => {
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
    const query = client.query('select * from campaign_restriction_master where crm_cm_id=$1',[id]);
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

router.get('/dlimit/:campaignId', oauth.authorise(), (req, res, next) => {
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
    const query = client.query('select * from campaign_domainlimit_master where cdlm_cm_id=$1',[id]);
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

router.get('/empsize/:campaignId', oauth.authorise(), (req, res, next) => {
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
    const query = client.query('select * from campaign_employee_size_master where cesm_cm_id=$1',[id]);
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

router.get('/vertical/:campaignId', oauth.authorise(), (req, res, next) => {
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
    const query = client.query('select * from campaign_vertical_master where cvm_cm_id=$1',[id]);
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

router.get('/geo/:campaignId', oauth.authorise(), (req, res, next) => {
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
    const query = client.query('select * from campaign_geo_master where cgm_cm_id=$1',[id]);
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

router.get('/asset/:campaignId', oauth.authorise(), (req, res, next) => {
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
    const query = client.query('select * from campaign_asset_master where cam_cm_id=$1',[id]);
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

router.get('/dept/:campaignId', oauth.authorise(), (req, res, next) => {
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
    const query = client.query('select * from campaign_department_master where cdm_cm_id=$1',[id]);
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

router.get('/method/:campaignId', oauth.authorise(), (req, res, next) => {
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
    const query = client.query('select * from campaign_method_master where cmm_cm_id=$1',[id]);
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

router.get('/revenue/:campaignId', oauth.authorise(), (req, res, next) => {
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
    const query = client.query('select * from campaign_revenue_master where crem_cm_id=$1',[id]);
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

router.get('/level/:campaignId', oauth.authorise(), (req, res, next) => {
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
    const query = client.query('select * from campaign_joblevel_master where cjlm_cm_id=$1',[id]);
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

  const restrictList = req.body.restrictList;
  const domainList = req.body.domainList;
  const empsizeList = req.body.empsizeList;
  const VerticalList = req.body.VerticalList;
  const geoList = req.body.geoList;
  const campAssetList = req.body.campAssetList;
  const departmentList = req.body.departmentList;
  const methodList = req.body.methodList;

  const revenueList = req.body.revenueList;
  const levelList =  req.body.levelList
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }

    var singleInsert = "INSERT INTO campaign_master(cm_date,cm_first_dely,cm_end_date,cm_dely_frequency,cm_campaign_name,cm_restrict,cm_account_list,cm_supression_file,cm_domain_limit,cm_emp_size,cm_disqualifies,cm_title,cm_lead_count,cm_geo,cm_allow_domain,cm_revenue,cm_custom_question,cm_denied_domain,cm_campaign_asset,cm_industry,cm_dept,cm_method,cm_job,cm_vertical,cm_userid,cm_status) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,0) RETURNING *",
        params = [campaign.cm_date,campaign.cm_first_dely,campaign.cm_end_date,campaign.cm_dely_frequency,campaign.cm_campaign_name,campaign.cm_restriction,campaign.cm_account_list,campaign.cm_supression_file,campaign.cm_domain_limit,campaign.cm_emp_size,campaign.cm_disqualifies,campaign.cm_title,campaign.cm_lead_count,campaign.cm_geo,campaign.cm_allow_domain,campaign.cm_revenue,campaign.cm_custom_question,campaign.cm_denied_domain,campaign.cm_campaign_asset,campaign.cm_industry,campaign.cm_dept,campaign.cm_method,campaign.cm_job,campaign.cm_vertical,campaign.userid]
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
          client.query("INSERT into custom_question_campaign_master(cmcm_cm_id,cmcm_question,cmcm_answer,cmcm_userid,cmcm_status)values ($1,$2,$3,$4,0) RETURNING *",
            [result.rows[0].cm_id,product.question,product.answer,product.userid]);
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

        restrictList.forEach(function(product,index){
          client.query("INSERT into campaign_restriction_master(crm_cm_id,crm_restriction)values ($1,$2) RETURNING *",
            [result.rows[0].cm_id,product.restriction]);
        });

        domainList.forEach(function(product,index){
          client.query("INSERT into campaign_domainlimit_master(cdlm_cm_id,cdlm_domainlimit)values ($1,$2) RETURNING *",
            [result.rows[0].cm_id,product.cdlm_domainlimit]);
        });

        empsizeList.forEach(function(product,index){
          client.query("INSERT into campaign_employee_size_master(cesm_cm_id,cesm_employee_size)values ($1,$2) RETURNING *",
            [result.rows[0].cm_id,product.employee_size]);
        });

        VerticalList.forEach(function(product,index){
          client.query("INSERT into campaign_vertical_master(cvm_cm_id,cvm_verticals)values ($1,$2) RETURNING *",
            [result.rows[0].cm_id,product.verticals]);
        });

        geoList.forEach(function(product,index){
          client.query("INSERT into campaign_geo_master(cgm_cm_id,cgm_geo)values ($1,$2) RETURNING *",
            [result.rows[0].cm_id,product.geo]);
        });

        campAssetList.forEach(function(product,index){
          client.query("INSERT into campaign_asset_master(cam_cm_id,cam_campaign_asset)values ($1,$2) RETURNING *",
            [result.rows[0].cm_id,product.asset]);
        });

        departmentList.forEach(function(product,index){
          client.query("INSERT into campaign_department_master(cdm_cm_id,cdm_department)values ($1,$2) RETURNING *",
            [result.rows[0].cm_id,product.department]);
        });

        methodList.forEach(function(product,index){
          client.query("INSERT into campaign_method_master(cmm_cm_id,cmm_method)values ($1,$2) RETURNING *",
            [result.rows[0].cm_id,product.methodss]);
        });

        revenueList.forEach(function(product,index){
          client.query("INSERT into campaign_revenue_master(crem_cm_id,crem_revenue)values ($1,$2) RETURNING *",
            [result.rows[0].cm_id,product.revenues]);
        });

        levelList.forEach(function(product,index){
          client.query("INSERT into campaign_joblevel_master(cjlm_cm_id,cjlm_job_level)values ($1,$2) RETURNING *",
            [result.rows[0].cm_id,product.job_level]);
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
  const oldtitleList=req.body.oldtitleList;
  const titleList=req.body.titleList;
  const removetitle=req.body.removetitle;
  const oldindustryList=req.body.oldindustryList;
  const industryList=req.body.industryList;
  const removeindustry=req.body.removeindustry;
  const oldrestrictList=req.body.oldrestrictList;
  const restrictList=req.body.restrictList;
  const removerestrict=req.body.removerestrict;
  const olddlimitList=req.body.olddlimitList;
  const domainList=req.body.domainList;
  const removedlimit=req.body.removedlimit;
  const oldempsizeList=req.body.oldempsizeList;
  const empsizeList=req.body.empsizeList;
  const removeempsize=req.body.removeempsize;
  const oldverticalList=req.body.oldverticalList;
  const VerticalList=req.body.VerticalList;
  const removevertical=req.body.removevertical;
  const oldgeoList=req.body.oldgeoList;
  const geoList=req.body.geoList;
  const removegeo=req.body.removegeo;
  const oldassetList=req.body.oldassetList;
  const campAssetList=req.body.campAssetList;
  const removeasset=req.body.removeasset;
  const olddeptList=req.body.olddeptList;
  const departmentList=req.body.departmentList;
  const removdept=req.body.removdept;
  const oldmethodList=req.body.oldmethodList;
  const methodList=req.body.methodList;
  const removemethod=req.body.removemethod;

  const oldrevenueList=req.body.oldrevenueList;
  const revenueList=req.body.revenueList;
  const removerevenue=req.body.removerevenue;

  const oldlevelList=req.body.oldlevelList;
  const levelList=req.body.levelList;
  const removelevel=req.body.removelevel;


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
        if(result.rows[0].cm_account_list == 'No'){
            oldaccountList.forEach(function(product, index) {
              client.query('delete from public.account_master_campaign_master where amcm_id=$1',
                [product.amcm_id]);
            });
        }
        else
        {
          oldaccountList.forEach(function(product, index) {
          client.query('update account_master_campaign_master set amcm_company=$1, amcm_website=$2, amcm_cm_id=$3, amcm_updated_at=now() where amcm_id=$4',
            [product.amcm_company,product.amcm_website,result.rows[0].cm_id,product.amcm_id]);
          });
        }

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
        if(result.rows[0].cm_supression_file == 'No'){
            oldsupressionList.forEach(function(product, index) {
          client.query('delete from public.suppression_campaign_master where scm_id=$1',
            [product.scm_id]);
          });
        }
        else{
            oldsupressionList.forEach(function(product, index) {
          client.query('update suppression_campaign_master set scm_company=$1, scm_website=$2, scm_cm_id=$3, scm_updated_at=now() where scm_id=$4',
            [product.scm_company,product.scm_website,result.rows[0].cm_id,product.scm_id]);
          });
        }
        

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
        if(result.rows[0].cm_allow_domain == 'No'){
            oldallowDomainList.forEach(function(product, index) {
          client.query('delete from public.allow_domain_campaign_master where adcm_id=$1',
            [product.adcm_id]);
          });
        }
        else{
            oldallowDomainList.forEach(function(product, index) {
          client.query('update allow_domain_campaign_master set adcm_website=$1, adcm_cm_id=$2, adcm_updated_at=now() where adcm_id=$3',
            [product.adcm_website,result.rows[0].cm_id,product.adcm_id]);
          });
        }
        

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
        if(result.rows[0].cm_custom_question == 'No'){
            oldcustomQuestionList.forEach(function(product, index) {
          client.query('delete from public.custom_question_campaign_master where cmcm_id=$1',
            [product.cmcm_id]);
          });
        }
        else{
            oldcustomQuestionList.forEach(function(product, index) {
          client.query('update custom_question_campaign_master set cmcm_question=$1, cmcm_cm_id=$2, cmcm_updated_at=now() where cmcm_id=$3',
            [product.cmcm_question,result.rows[0].cm_id,product.cmcm_id]);
          });
        }
        

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
        if(result.rows[0].cm_denied_domain == 'No'){
          olddeniedDomainList.forEach(function(product, index) {
          client.query('delete from public.denied_domain_campaign_master where ddcm_id=$1',
            [product.ddcm_id]);
          });
        }
        else{
            olddeniedDomainList.forEach(function(product, index) {
          client.query('update denied_domain_campaign_master set ddcm_website=$1, ddcm_cm_id=$2, ddcm_updated_at=now() where ddcm_id=$3',
            [product.ddcm_website,result.rows[0].cm_id,product.ddcm_id]);
          });
        }
        

        deniedDomainList.forEach(function(product, index) {
          client.query("INSERT into denied_domain_campaign_master(ddcm_cm_id,ddcm_website,ddcm_status)values ($1,$2,0) RETURNING *",
            [result.rows[0].cm_id,product.ddcm_website]);
        //client.query('update design_product_master set dtm_part_no=$1, dtm_part_name=$2, dtm_qty=$3, dtm_updated_at=now() where dtm_id=$4',[product.dtm_part_no,product.dtm_part_name,product.dtm_qty,result.rows[0].dm_id]);
        });
        /*end of denied domain*/
        /*start of title*/
        removetitle.forEach(function(product, index) {
          client.query('delete from public.campaign_title_master where ctm_id=$1',
            [product.ctm_id]);
        });
        if(result.rows[0].cm_title == 'No')
        {
          oldtitleList.forEach(function(product, index) {
          client.query('delete from public.campaign_title_master where ctm_id=$1',
            [product.ctm_id]);
          });
        }
        else{
          oldtitleList.forEach(function(product, index) {
          client.query('update campaign_title_master set ctm_title=$1 where ctm_id=$2',
            [product.ctm_title,product.ctm_id]);
          });
        }
        

        titleList.forEach(function(product, index) {
          client.query("INSERT into campaign_title_master(ctm_cm_id,ctm_title)values ($1,$2) RETURNING *",
            [result.rows[0].cm_id,product.titles]);
        //client.query('update design_product_master set dtm_part_no=$1, dtm_part_name=$2, dtm_qty=$3, dtm_updated_at=now() where dtm_id=$4',[product.dtm_part_no,product.dtm_part_name,product.dtm_qty,result.rows[0].dm_id]);
        });
        /*end of title domain*/
        /*start of industry*/
        removeindustry.forEach(function(product, index) {
          client.query('delete from public.campaign_industry_master where cim_id=$1',
            [product.cim_id]);
        });
        if(result.rows[0].cm_industry == 'No')
        {
          oldindustryList.forEach(function(product, index) {
          client.query('delete from public.campaign_industry_master where cim_id=$1',
            [product.cim_id]);
          });
        }
        else
        {
          oldindustryList.forEach(function(product, index) {
          client.query('update campaign_industry_master set cim_industries=$1 where cim_id=$2',
            [product.cim_industries,product.cim_id]);
          });

        }
        
        industryList.forEach(function(product, index) {
          client.query("INSERT into campaign_industry_master(cim_cm_id,cim_industries)values ($1,$2) RETURNING *",
            [result.rows[0].cm_id,product.industries]);
        //client.query('update design_product_master set dtm_part_no=$1, dtm_part_name=$2, dtm_qty=$3, dtm_updated_at=now() where dtm_id=$4',[product.dtm_part_no,product.dtm_part_name,product.dtm_qty,result.rows[0].dm_id]);
        });
        /*end of industry domain*/
        /*start of industry*/
        removerestrict.forEach(function(product, index) {
          client.query('delete from public.campaign_restriction_master where crm_id=$1',
            [product.crm_id]);
        });
        if(result.rows[0].cm_restrict == 'No')
        {
          oldrestrictList.forEach(function(product, index) {
          client.query('delete from public.campaign_restriction_master where crm_id=$1',
            [product.crm_id]);
        });
        }
        else
        {
          oldrestrictList.forEach(function(product, index) {
          client.query('update campaign_restriction_master set crm_restriction=$1 where crm_id=$2',
            [product.crm_restriction,product.crm_id]);
          });
        }
        

        restrictList.forEach(function(product, index) {
          client.query("INSERT into campaign_restriction_master(crm_cm_id,crm_restriction)values ($1,$2) RETURNING *",
            [result.rows[0].cm_id,product.restriction]);
        //client.query('update design_product_master set dtm_part_no=$1, dtm_part_name=$2, dtm_qty=$3, dtm_updated_at=now() where dtm_id=$4',[product.dtm_part_no,product.dtm_part_name,product.dtm_qty,result.rows[0].dm_id]);
        });
        /*end of industry domain*/
        /*start of industry*/
        removedlimit.forEach(function(product, index) {
          client.query('delete from public.campaign_domainlimit_master where cdlm_id=$1',
            [product.cdlm_id]);
        });
        if(result.rows[0].cm_domain_limit == 'No'){
          olddlimitList.forEach(function(product, index) {
          client.query('delete from public.campaign_domainlimit_master where cdlm_id=$1',
            [product.cdlm_id]);
          });
        }
        else{
            olddlimitList.forEach(function(product, index) {
            client.query('update campaign_domainlimit_master set cdlm_domainlimit=$1 where cdlm_id=$2',
            [product.cdlm_domainlimit,product.cdlm_id]);
          });
        }
        

        domainList.forEach(function(product, index) {
          client.query("INSERT into campaign_domainlimit_master(cdlm_cm_id,cdlm_domainlimit)values ($1,$2) RETURNING *",
            [result.rows[0].cm_id,product.cdlm_domainlimit]);
        //client.query('update design_product_master set dtm_part_no=$1, dtm_part_name=$2, dtm_qty=$3, dtm_updated_at=now() where dtm_id=$4',[product.dtm_part_no,product.dtm_part_name,product.dtm_qty,result.rows[0].dm_id]);
        });
        /*end of industry domain*/
        /*start of industry*/
        removeempsize.forEach(function(product, index) {
          client.query('delete from public.campaign_employee_size_master where cesm_master=$1',
            [product.cesm_master]);
        });
        if(result.rows[0].cm_emp_size == 'No'){
          oldempsizeList.forEach(function(product, index) {
          client.query('delete from public.campaign_employee_size_master where cesm_master=$1',
            [product.cesm_master]);
          });
        }
        else
        {
          oldempsizeList.forEach(function(product, index) {
          client.query('update campaign_employee_size_master set cesm_employee_size=$1 where cesm_master=$2',
            [product.cesm_employee_size,product.cesm_master]);
          });
        }
        

        empsizeList.forEach(function(product, index) {
          client.query("INSERT into campaign_employee_size_master(cesm_cm_id,cesm_employee_size)values ($1,$2) RETURNING *",
            [result.rows[0].cm_id,product.employee_size]);
        //client.query('update design_product_master set dtm_part_no=$1, dtm_part_name=$2, dtm_qty=$3, dtm_updated_at=now() where dtm_id=$4',[product.dtm_part_no,product.dtm_part_name,product.dtm_qty,result.rows[0].dm_id]);
        });
        /*end of industry domain*/
        /*start of industry*/
        removevertical.forEach(function(product, index) {
          client.query('delete from public.campaign_vertical_master where cvm_id=$1',
            [product.cvm_id]);
        });
        if(result.rows[0].cm_vertical == 'No'){
          oldverticalList.forEach(function(product, index) {
          client.query('delete from public.campaign_vertical_master where cvm_id=$1',
            [product.cvm_id]);
        });
        }
        else{
            oldverticalList.forEach(function(product, index) {
            client.query('update campaign_vertical_master set cvm_verticals=$1 where cvm_id=$2',
            [product.cvm_verticals,product.cvm_id]);
          });
        }
        

        VerticalList.forEach(function(product, index) {
          client.query("INSERT into campaign_vertical_master(cvm_cm_id,cvm_verticals)values ($1,$2) RETURNING *",
            [result.rows[0].cm_id,product.verticals]);
        //client.query('update design_product_master set dtm_part_no=$1, dtm_part_name=$2, dtm_qty=$3, dtm_updated_at=now() where dtm_id=$4',[product.dtm_part_no,product.dtm_part_name,product.dtm_qty,result.rows[0].dm_id]);
        });
        /*end of industry domain*/
        /*start of industry*/
        removegeo.forEach(function(product, index) {
          client.query('delete from public.campaign_geo_master where cgm_id=$1',
            [product.cgm_id]);
        });
        if(result.rows[0].cm_geo == 'No'){
          oldgeoList.forEach(function(product, index) {
          client.query('delete from public.campaign_geo_master where cgm_id=$1',
            [product.cgm_id]);
        });
        }
        else{
          oldgeoList.forEach(function(product, index) {
          client.query('update campaign_geo_master set cgm_geo=$1 where cgm_id=$2',
            [product.cgm_geo,product.cgm_id]);
          });
        }
        

        geoList.forEach(function(product, index) {
          client.query("INSERT into campaign_geo_master(cgm_cm_id,cgm_geo)values ($1,$2) RETURNING *",
            [result.rows[0].cm_id,product.geo]);
        //client.query('update design_product_master set dtm_part_no=$1, dtm_part_name=$2, dtm_qty=$3, dtm_updated_at=now() where dtm_id=$4',[product.dtm_part_no,product.dtm_part_name,product.dtm_qty,result.rows[0].dm_id]);
        });
        /*end of industry domain*/
        /*start of industry*/
        removeasset.forEach(function(product, index) {
          client.query('delete from public.campaign_asset_master where cam_id=$1',
            [product.cam_id]);
        });
        if(result.rows[0].cm_campaign_asset == 'No'){
          oldassetList.forEach(function(product, index) {
          client.query('delete from public.campaign_asset_master where cam_id=$1',
            [product.cam_id]);
        });
        }
        else
        {
          oldassetList.forEach(function(product, index) {
          client.query('update campaign_asset_master set cam_campaign_asset=$1 where cam_id=$2',
            [product.cam_campaign_asset,product.cam_id]);
        });
        }
        

        campAssetList.forEach(function(product, index) {
          client.query("INSERT into campaign_asset_master(cam_cm_id,cam_campaign_asset)values ($1,$2) RETURNING *",
            [result.rows[0].cm_id,product.asset]);
        //client.query('update design_product_master set dtm_part_no=$1, dtm_part_name=$2, dtm_qty=$3, dtm_updated_at=now() where dtm_id=$4',[product.dtm_part_no,product.dtm_part_name,product.dtm_qty,result.rows[0].dm_id]);
        });
        /*end of industry domain*/
        /*start of industry*/
        removdept.forEach(function(product, index) {
          client.query('delete from public.campaign_department_master where cdm_id=$1',
            [product.cdm_id]);
        });
        if(result.rows[0].cm_dept == 'No'){
          olddeptList.forEach(function(product, index) {
          client.query('delete from public.campaign_department_master where cdm_id=$1',
            [product.cdm_id]);
          });
        }
        else
        {
          olddeptList.forEach(function(product, index) {
          client.query('update campaign_department_master set cdm_department=$1 where cdm_id=$2',
            [product.cdm_department,product.cdm_id]);
          });
        }
        

        departmentList.forEach(function(product, index) {
          client.query("INSERT into campaign_department_master(cdm_cm_id,cdm_department)values ($1,$2) RETURNING *",
            [result.rows[0].cm_id,product.department]);
        //client.query('update design_product_master set dtm_part_no=$1, dtm_part_name=$2, dtm_qty=$3, dtm_updated_at=now() where dtm_id=$4',[product.dtm_part_no,product.dtm_part_name,product.dtm_qty,result.rows[0].dm_id]);
        });
        /*end of industry domain*/
        /*start of industry*/
        removemethod.forEach(function(product, index) {
          client.query('delete from public.campaign_method_master where cmm_id=$1',
            [product.cmm_id]);
        });
        if(result.rows[0].cm_method == 'No'){
          oldmethodList.forEach(function(product, index) {
          client.query('delete from public.campaign_method_master where cmm_id=$1',
            [product.cmm_id]);
        });
        }
        else{
          oldmethodList.forEach(function(product, index) {
          client.query('update campaign_method_master set cmm_method=$1 where cmm_id=$2',
            [product.cmm_method,product.cmm_id]);
        });
        }
        

        methodList.forEach(function(product, index) {
          client.query("INSERT into campaign_method_master(cmm_cm_id,cmm_method)values ($1,$2) RETURNING *",
            [result.rows[0].cm_id,product.methodss]);
        //client.query('update design_product_master set dtm_part_no=$1, dtm_part_name=$2, dtm_qty=$3, dtm_updated_at=now() where dtm_id=$4',[product.dtm_part_no,product.dtm_part_name,product.dtm_qty,result.rows[0].dm_id]);
        });
        /*end of industry domain*/
        removerevenue.forEach(function(product, index) {
          client.query('delete from public.campaign_revenue_master where crem_id=$1',
            [product.crem_id]);
        });
        if(result.rows[0].cm_revenue == 'No'){
          oldrevenueList.forEach(function(product, index) {
          client.query('delete from public.campaign_revenue_master where crem_id=$1',
            [product.crem_id]);
        });
        }
        else{
          oldrevenueList.forEach(function(product, index) {
            client.query('update campaign_revenue_master set crem_revenue=$1 where crem_id=$2',
              [product.crem_revenue,product.crem_id]);
          });
        }
        revenueList.forEach(function(product, index) {
          client.query("INSERT into campaign_revenue_master(crem_cm_id,crem_revenue)values ($1,$2) RETURNING *",
            [result.rows[0].cm_id,product.revenues]);
        //client.query('update design_product_master set dtm_part_no=$1, dtm_part_name=$2, dtm_qty=$3, dtm_updated_at=now() where dtm_id=$4',[product.dtm_part_no,product.dtm_part_name,product.dtm_qty,result.rows[0].dm_id]);
        });

        removelevel.forEach(function(product, index) {
          client.query('delete from public.campaign_joblevel_master where cjlm_id=$1',
            [product.cjlm_id]);
        });
        if(result.rows[0].cm_job == 'No')
        {
          oldlevelList.forEach(function(product, index) {
          client.query('delete from public.campaign_joblevel_master where cjlm_id=$1',
            [product.cjlm_id]);
          });
        }
        else{
          oldlevelList.forEach(function(product, index) {
          client.query('update campaign_joblevel_master set cjlm_job_level=$1 where cjlm_id=$2',
            [product.cjlm_job_level,product.cjlm_id]);
          });
        }

        levelList.forEach(function(product, index) {
          client.query("INSERT into campaign_joblevel_master(cjlm_cm_id,cjlm_job_level)values ($1,$2) RETURNING *",
            [result.rows[0].cm_id,product.job_level]);
        //client.query('update design_product_master set dtm_part_no=$1, dtm_part_name=$2, dtm_qty=$3, dtm_updated_at=now() where dtm_id=$4',[product.dtm_part_no,product.dtm_part_name,product.dtm_qty,result.rows[0].dm_id]);
        });

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

router.get('/titleview/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id=req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM campaign_title_master  where ctm_cm_id=$1",[id]);
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

router.get('/industryview/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id=req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM campaign_industry_master where cim_cm_id=$1",[id]);
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

router.get('/restview/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id=req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM campaign_restriction_master where crm_cm_id=$1",[id]);
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

router.get('/dlimitview/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id=req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM campaign_domainlimit_master where cdlm_cm_id=$1",[id]);
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

router.get('/empsizeview/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id=req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM campaign_employee_size_master where cesm_cm_id=$1",[id]);
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

router.get('/verticalview/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id=req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM campaign_vertical_master where cvm_cm_id=$1",[id]);
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

router.get('/geoview/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id=req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM campaign_geo_master where cgm_cm_id=$1",[id]);
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

router.get('/assetview/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id=req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM campaign_asset_master where cam_cm_id=$1",[id]);
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

router.get('/deptview/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id=req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM campaign_department_master where cdm_cm_id=$1",[id]);
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

router.get('/methodview/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id=req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM campaign_method_master where cmm_cm_id=$1",[id]);
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

router.get('/revenueview/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id=req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM campaign_revenue_master where crem_cm_id=$1",[id]);
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

router.get('/levelview/:campaignId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id=req.params.campaignId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * FROM campaign_joblevel_master where cjlm_cm_id=$1",[id]);
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