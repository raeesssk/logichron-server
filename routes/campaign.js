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
    const query = client.query('SELECT * FROM campaign_master where cm_id=$1',[id]);
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
  const verticalList = req.body.verticalList;
  const geoList = req.body.geoList;
  const campAssetList = req.body.campAssetList;
  const departmentList = req.body.departmentList;
  const methodList = req.body.methodList;

  const revenueList = req.body.revenueList;
  const levelList =  req.body.levelList;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }


      client.query('BEGIN;');

    var singleInsert = "INSERT INTO campaign_master(cm_date,cm_first_dely,cm_end_date,cm_dely_frequency,cm_campaign_name,cm_restrict,cm_account_list,cm_supression_file,cm_domain_limit,cm_emp_size,cm_disqualifies,cm_title,cm_lead_count,cm_geo,cm_allow_domain,cm_revenue,cm_custom_question,cm_denied_domain,cm_campaign_asset,cm_industry,cm_dept,cm_method,cm_job,cm_vertical,cm_userid,cm_status) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,0) RETURNING *",
        params = [campaign.cm_date,campaign.cm_first_dely,campaign.cm_end_date,campaign.cm_dely_frequency,campaign.cm_campaign_name,campaign.cm_restriction,campaign.cm_account_list,campaign.cm_supression_file,campaign.cm_domain_limit,campaign.cm_emp_size,campaign.cm_disqualifies,campaign.cm_title,campaign.cm_lead_count,campaign.cm_geo,campaign.cm_allow_domain,campaign.cm_revenue,campaign.cm_custom_question,campaign.cm_denied_domain,campaign.cm_campaign_asset,campaign.cm_industry,campaign.cm_dept,campaign.cm_method,campaign.cm_job,campaign.cm_vertical,campaign.userid]
    client.query(singleInsert, params, function (error, result) {
        results.push(result.rows[0]); // Will contain your inserted rows


        if(campaign.cm_restriction == 'Yes')
        {
            restrictList.forEach(function(product,index){
              client.query("INSERT into campaign_restriction_master(crm_cm_id,crm_restriction)values ($1,$2) RETURNING *",
                [result.rows[0].cm_id,product.restriction]);
            });
        }
        if(campaign.cm_account_list == 'Yes')
        {
          accountList.forEach(function(product,index){
            client.query("INSERT into account_master_campaign_master(amcm_cm_id,amcm_company,amcm_website,amcm_userid,amcm_status)values ($1,$2,$3,$4,0) RETURNING *",
              [result.rows[0].cm_id,product.company,product.website,product.userid]);
          });
        }
        if(campaign.cm_supression_file == 'Yes')
        {
          supressionList.forEach(function(product,index){
            client.query("INSERT into suppression_campaign_master(scm_cm_id,scm_company,scm_website,scm_userid,scm_status)values ($1,$2,$3,$4,0) RETURNING *",
              [result.rows[0].cm_id,product.company,product.website,product.userid]);
          });
        }
        if(campaign.cm_domain_limit == 'Yes')
        {
          domainList.forEach(function(product,index){
            client.query("INSERT into campaign_domainlimit_master(cdlm_cm_id,cdlm_domainlimit)values ($1,$2) RETURNING *",
              [result.rows[0].cm_id,product.cdlm_domainlimit]);
          });
        }
        if(campaign.cm_emp_size == 'Yes')
        {
          empsizeList.forEach(function(product,index){
            client.query("INSERT into campaign_employee_size_master(cesm_cm_id,cesm_employee_size)values ($1,$2) RETURNING *",
              [result.rows[0].cm_id,product.employee_size]);
          });
        }
        if(campaign.cm_title == 'Yes')
        {
          titleList.forEach(function(product,index){
            client.query("INSERT into campaign_title_master(ctm_cm_id,ctm_title,ctm_userid)values ($1,$2,$3) RETURNING *",
              [result.rows[0].cm_id,product.titles,product.userid]);
          });
        }
        if(campaign.cm_vertical == 'Yes')
        {
          verticalList.forEach(function(product,index){
            client.query("INSERT into campaign_vertical_master(cvm_cm_id,cvm_verticals)values ($1,$2) RETURNING *",
              [result.rows[0].cm_id,product.verticals]);
          });
        }
        if(campaign.cm_geo == 'Yes')
        {
          geoList.forEach(function(product,index){
            client.query("INSERT into campaign_geo_master(cgm_cm_id,cgm_geo)values ($1,$2) RETURNING *",
              [result.rows[0].cm_id,product.geo]);
          });
        }
        if(campaign.cm_allow_domain == 'Yes')
        {
          allowDomainList.forEach(function(product,index){
            client.query("INSERT into allow_domain_campaign_master(adcm_cm_id,adcm_website,adcm_userid,adcm_status)values ($1,$2,$3,0) RETURNING *",
              [result.rows[0].cm_id,product.adcm_website,product.userid]);
          });
        }
        if(campaign.cm_revenue == 'Yes')
        {
          revenueList.forEach(function(product,index){
          client.query("INSERT into campaign_revenue_master(crem_cm_id,crem_revenue)values ($1,$2) RETURNING *",
            [result.rows[0].cm_id,product.revenues]);
        });
        }
        if(campaign.cm_custom_question == 'Yes')
        {
          customQuestionList.forEach(function(product,index){
            client.query("INSERT into custom_question_campaign_master(cmcm_cm_id,cmcm_question,cmcm_answer,cmcm_userid,cmcm_status)values ($1,$2,$3,$4,0) RETURNING *",
              [result.rows[0].cm_id,product.question,product.answer,product.userid]);
          });
        }
        if(campaign.cm_denied_domain == 'Yes')
        {
          deniedDomainList.forEach(function(product,index){
            client.query("INSERT into denied_domain_campaign_master(ddcm_cm_id,ddcm_website,ddcm_userid,ddcm_status)values ($1,$2,$3,0) RETURNING *",
              [result.rows[0].cm_id,product.ddcm_website,product.userid]);
          });
        }
        if(campaign.cm_campaign_asset == 'Yes')
        {
          campAssetList.forEach(function(product,index){
            client.query("INSERT into campaign_asset_master(cam_cm_id,cam_campaign_asset)values ($1,$2) RETURNING *",
              [result.rows[0].cm_id,product.asset]);
          });
        }
        if(campaign.cm_industry == 'Yes')
        {
          industryList.forEach(function(product,index){
            client.query("INSERT into campaign_industry_master(cim_cm_id,cim_industries,cim_userid)values ($1,$2,$3) RETURNING *",
              [result.rows[0].cm_id,product.industries,product.userid]);
          });
        }
        if(campaign.cm_dept == 'Yes')
        {
          departmentList.forEach(function(product,index){
            client.query("INSERT into campaign_department_master(cdm_cm_id,cdm_department)values ($1,$2) RETURNING *",
              [result.rows[0].cm_id,product.department]);
          });
        }
        if(campaign.cm_method == 'Yes')
        {
          methodList.forEach(function(product,index){
            client.query("INSERT into campaign_method_master(cmm_cm_id,cmm_method)values ($1,$2) RETURNING *",
              [result.rows[0].cm_id,product.methodss]);
          });
        }
        if(campaign.cm_job == 'Yes')
        {
          levelList.forEach(function(product,index){
            client.query("INSERT into campaign_joblevel_master(cjlm_cm_id,cjlm_job_level)values ($1,$2) RETURNING *",
              [result.rows[0].cm_id,product.job_level]);
          });
        }

      client.query('COMMIT;');
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
  const verticalList = req.body.verticalList;
  const geoList = req.body.geoList;
  const campAssetList = req.body.campAssetList;
  const departmentList = req.body.departmentList;
  const methodList = req.body.methodList;

  const revenueList = req.body.revenueList;
  const levelList =  req.body.levelList;


  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    client.query('BEGIN;');
    
    var designInsert = 'update public.campaign_master set  cm_first_dely=$1, cm_end_date=$2, cm_dely_frequency=$3, cm_campaign_name=$4, cm_restrict=$5, cm_account_list=$6, cm_supression_file=$7, cm_domain_limit=$8, cm_emp_size=$9, cm_disqualifies=$10, cm_title=$11, cm_lead_count=$12, cm_geo=$13, cm_allow_domain=$14, cm_revenue=$15, cm_custom_question=$16, cm_denied_domain=$17, cm_campaign_asset=$18, cm_industry=$19, cm_dept=$20, cm_method=$21, cm_job=$22, cm_vertical=$23,  cm_updated_at=now() where cm_id=$24 RETURNING *',
        params = [campaign.cm_first_dely,campaign.cm_end_date,campaign.cm_dely_frequency,campaign.cm_campaign_name,campaign.cm_restriction,campaign.cm_account_list,campaign.cm_supression_file,campaign.cm_domain_limit,campaign.cm_emp_size,campaign.cm_disqualifies,campaign.cm_title,campaign.cm_lead_count,campaign.cm_geo,campaign.cm_allow_domain,campaign.cm_revenue,campaign.cm_custom_question,campaign.cm_denied_domain,campaign.cm_campaign_asset,campaign.cm_industry,campaign.cm_dept,campaign.cm_method,campaign.cm_job,campaign.cm_vertical,id];
    client.query(designInsert, params, function (error, result) {
        results.push(result.rows[0]); // Will contain your inserted rows
        //account list edit//
          

        client.query('delete from public.campaign_restriction_master where crm_cm_id=$1', [id]);
        if(campaign.cm_restriction == 'Yes')
        {
            restrictList.forEach(function(product,index){
              client.query("INSERT into campaign_restriction_master(crm_cm_id,crm_restriction)values ($1,$2) RETURNING *",
                [result.rows[0].cm_id,product.restriction]);
            });
        }

        client.query('delete from public.account_master_campaign_master where amcm_cm_id=$1', [id]);
        if(campaign.cm_account_list == 'Yes')
        {
          accountList.forEach(function(product,index){
            client.query("INSERT into account_master_campaign_master(amcm_cm_id,amcm_company,amcm_website,amcm_userid,amcm_status)values ($1,$2,$3,$4,0) RETURNING *",
              [result.rows[0].cm_id,product.company,product.website,product.userid]);
          });
        }

        client.query('delete from public.suppression_campaign_master where scm_cm_id=$1', [id]);
        if(campaign.cm_supression_file == 'Yes')
        {
          supressionList.forEach(function(product,index){
            client.query("INSERT into suppression_campaign_master(scm_cm_id,scm_company,scm_website,scm_userid,scm_status)values ($1,$2,$3,$4,0) RETURNING *",
              [result.rows[0].cm_id,product.company,product.website,product.userid]);
          });
        }

        client.query('delete from public.campaign_domainlimit_master where cdlm_cm_id=$1', [id]);
        if(campaign.cm_domain_limit == 'Yes')
        {
          domainList.forEach(function(product,index){
            client.query("INSERT into campaign_domainlimit_master(cdlm_cm_id,cdlm_domainlimit)values ($1,$2) RETURNING *",
              [result.rows[0].cm_id,product.cdlm_domainlimit]);
          });
        }

        client.query('delete from public.campaign_employee_size_master where cesm_cm_id=$1', [id]);
        if(campaign.cm_emp_size == 'Yes')
        {
          empsizeList.forEach(function(product,index){
            client.query("INSERT into campaign_employee_size_master(cesm_cm_id,cesm_employee_size)values ($1,$2) RETURNING *",
              [result.rows[0].cm_id,product.employee_size]);
          });
        }

        client.query('delete from public.campaign_title_master where ctm_cm_id=$1', [id]);
        if(campaign.cm_title == 'Yes')
        {
          titleList.forEach(function(product,index){
            client.query("INSERT into campaign_title_master(ctm_cm_id,ctm_title,ctm_userid)values ($1,$2,$3) RETURNING *",
              [result.rows[0].cm_id,product.titles,product.userid]);
          });
        }

        client.query('delete from public.campaign_vertical_master where cvm_cm_id=$1', [id]);
        if(campaign.cm_vertical == 'Yes')
        {
          verticalList.forEach(function(product,index){
            client.query("INSERT into campaign_vertical_master(cvm_cm_id,cvm_verticals)values ($1,$2) RETURNING *",
              [result.rows[0].cm_id,product.verticals]);
          });
        }

        client.query('delete from public.campaign_geo_master where cgm_cm_id=$1', [id]);
        if(campaign.cm_geo == 'Yes')
        {
          geoList.forEach(function(product,index){
            client.query("INSERT into campaign_geo_master(cgm_cm_id,cgm_geo)values ($1,$2) RETURNING *",
              [result.rows[0].cm_id,product.geo]);
          });
        }

        client.query('delete from public.allow_domain_campaign_master where adcm_cm_id=$1', [id]);
        if(campaign.cm_allow_domain == 'Yes')
        {
          allowDomainList.forEach(function(product,index){
            client.query("INSERT into allow_domain_campaign_master(adcm_cm_id,adcm_website,adcm_userid,adcm_status)values ($1,$2,$3,0) RETURNING *",
              [result.rows[0].cm_id,product.adcm_website,product.userid]);
          });
        }

        client.query('delete from public.campaign_revenue_master where crem_cm_id=$1', [id]);
        if(campaign.cm_revenue == 'Yes')
        {
          revenueList.forEach(function(product,index){
          client.query("INSERT into campaign_revenue_master(crem_cm_id,crem_revenue)values ($1,$2) RETURNING *",
            [result.rows[0].cm_id,product.revenues]);
        });
        }

        client.query('delete from public.custom_question_campaign_master where cmcm_cm_id=$1', [id]);
        if(campaign.cm_custom_question == 'Yes')
        {
          customQuestionList.forEach(function(product,index){
            client.query("INSERT into custom_question_campaign_master(cmcm_cm_id,cmcm_question,cmcm_answer,cmcm_userid,cmcm_status)values ($1,$2,$3,$4,0) RETURNING *",
              [result.rows[0].cm_id,product.question,product.answer,product.userid]);
          });
        }

        client.query('delete from public.denied_domain_campaign_master where ddcm_cm_id=$1', [id]);
        if(campaign.cm_denied_domain == 'Yes')
        {
          deniedDomainList.forEach(function(product,index){
            client.query("INSERT into denied_domain_campaign_master(ddcm_cm_id,ddcm_website,ddcm_userid,ddcm_status)values ($1,$2,$3,0) RETURNING *",
              [result.rows[0].cm_id,product.ddcm_website,product.userid]);
          });
        }

        client.query('delete from public.campaign_asset_master where cam_cm_id=$1', [id]);
        if(campaign.cm_campaign_asset == 'Yes')
        {
          campAssetList.forEach(function(product,index){
            client.query("INSERT into campaign_asset_master(cam_cm_id,cam_campaign_asset)values ($1,$2) RETURNING *",
              [result.rows[0].cm_id,product.asset]);
          });
        }

        client.query('delete from public.campaign_industry_master where cim_cm_id=$1', [id]);
        if(campaign.cm_industry == 'Yes')
        {
          industryList.forEach(function(product,index){
            client.query("INSERT into campaign_industry_master(cim_cm_id,cim_industries,cim_userid)values ($1,$2,$3) RETURNING *",
              [result.rows[0].cm_id,product.industries,product.userid]);
          });
        }

        client.query('delete from public.campaign_department_master where cdm_cm_id=$1', [id]);
        if(campaign.cm_dept == 'Yes')
        {
          departmentList.forEach(function(product,index){
            client.query("INSERT into campaign_department_master(cdm_cm_id,cdm_department)values ($1,$2) RETURNING *",
              [result.rows[0].cm_id,product.department]);
          });
        }

        client.query('delete from public.campaign_method_master where cmm_cm_id=$1', [id]);
        if(campaign.cm_method == 'Yes')
        {
          methodList.forEach(function(product,index){
            client.query("INSERT into campaign_method_master(cmm_cm_id,cmm_method)values ($1,$2) RETURNING *",
              [result.rows[0].cm_id,product.methodss]);
          });
        }

        client.query('delete from public.campaign_joblevel_master where cjlm_cm_id=$1', [id]);
        if(campaign.cm_job == 'Yes')
        {
          levelList.forEach(function(product,index){
            client.query("INSERT into campaign_joblevel_master(cjlm_cm_id,cjlm_job_level)values ($1,$2) RETURNING *",
              [result.rows[0].cm_id,product.job_level]);
          });
        }

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
                    // "inner join users us on cm.cm_userid=us.id "+
                    "where cm.cm_status=0 "+
                    // "and cm.cm_userid=$1 "+
                    "and LOWER(cm_campaign_name||''||cm_title) LIKE LOWER($1) "+
                    "and cm_date BETWEEN $2 and $3; "

    const query = client.query(strqry,[str,req.body.cm_from_date,req.body.cm_to_date]);
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

    const strqry =  "SELECT * "+
                    "from campaign_master cm "+
                    // "inner join users us on cm.cm_userid=us.id "+
                    "where cm.cm_status=0 "+
                    // "and cm.cm_userid=$1 "+
                    "and LOWER(cm_campaign_name||''||cm_title) LIKE LOWER($1) "+
                    "and cm_date BETWEEN $2 and $3 "+
                    "order by cm.cm_id desc LIMIT $4 OFFSET $5 ";

    const query = client.query(strqry,[ str, req.body.cm_from_date, req.body.cm_to_date, req.body.number, req.body.begin]);
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
                    // "inner join users us on cm.cm_userid=us.id "+
                    "where cm.cm_status = 0 "+
                    // "and cm_userid=$1 "+
                    "and LOWER(cm_campaign_name||' '||cm_title) LIKE LOWER($1) "+
                    "order by cm.cm_id desc LIMIT 10";

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