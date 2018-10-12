var express = require('express');
var router = express.Router();
var oauth = require('../oauth/index');
var pg = require('pg');
var path = require('path');
var config = require('../config.js');
var encryption = require('../commons/encryption.js');
var multer = require('multer');

var pool = new pg.Pool(config);

router.get('/:roleId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.roleId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      done(err);
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('select * from users us left outer join role_master rm on us.role_id=rm.rm_id left outer join role_permission_master rpm on rpm.rpm_rm_id=rm.rm_id left outer join permission_master pm on rpm.rpm_pm_id=pm.pm_id left outer join permission_sub_master psm on rpm.rpm_psm_id=psm.psm_id where role_id=$1',[id]);
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
    done(err);
  });
});

router.post('/changepassword', oauth.authorise(), (req, res, next) => {
  const results = [];
  pool.connect(function(err, client, done){
    if(err) {
      done();
      done(err);
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data

    var singleInsert = "update users set password=$1 where username=$2 RETURNING *",
        params = [req.body.conpassword,req.body.username]
    client.query(singleInsert, params, function (error, result) {
        results.push(result.rows[0]); // Will contain your inserted rows
        done();
        return res.json(results);
    });
    done(err);
  });
});


router.post('/isonline', oauth.authorise(), (req, res, next) => {
  const results = [];
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    client.query('BEGIN;');

    var singleInsert = 'update users set is_online=1, last_login=now() where username=$1 RETURNING *',
        params = [req.body.username]
    client.query(singleInsert, params, function (error, result) {
        results.push(result.rows[0]); // Will contain your inserted rows
        done();
        client.query('COMMIT;');
        return res.json(results);
    });

    done(err);
  });
});

router.post('/isoffline', oauth.authorise(), (req, res, next) => {
  const results = [];
  pool.connect(function(err, client, done){
    if(err) {
      done();
      done(err);
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    // // SQL Query > Select Data
    client.query('update users set is_online=0, last_logout=now() where username=$1',[req.body.username]);
    const query = client.query('SELECT username,first_name,icon_image FROM users where username=$1',[req.body.username]);
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
    done(err);
  });
});

router.post('/profile/image/:userId', oauth.authorise(), (req, res, next) => {

  var filenamestore = "";

  var Storage = multer.diskStorage({
      destination: function (req, file, callback) {
          // callback(null, "../nginx/html/images");
          callback(null, "../logichron/resources/images-new");
      },
      filename: function (req, file, callback) {
          var fi = file.fieldname + "_" + Date.now() + "_" + file.originalname;
          filenamestore = "../logichron/resources/images-new/"+fi;
          callback(null, fi);
      }
  });

  var upload = multer({ storage: Storage }).array("imgUploader", 3); 

  const results = [];
  const id = req.params.userId;
  upload(req, res, function (err) { 
    if (err) { 
        return res.end("Something went wrong!"+err); 
    } 
    pool.connect(function(err, client, done){
      if(err) {
        done();
        done(err);
        console.log("the error is"+err);
        return res.status(500).json({success: false, data: err});
      }
      // // SQL Query > Select Data
      client.query('update users set icon_image=$1, first_name=$2 where username=$3',[filenamestore,req.body.firstname,id]);
      const query = client.query('SELECT username,first_name,icon_image FROM users where username=$1',[id]);
      // Stream results back one row at a time
      query.on('row', (row) => {
        results.push(row);
      });
      // After all data is returned, close connection and return results
      query.on('end', () => {
        done();
        return res.json(results);
      });
      done(err);
    });
  });
}); 
// 25178 381 1
// router.get('/backup', oauth.authorise(), (req, res, next) => {
//   const results = [];
//   pool.connect(function(err, client, done){
//     if(err) {
//       done();
//       done(err);
//       console.log("the error is"+err);
//       return res.status(500).json({success: false, data: err});
//     }
//     mysqlDump({
//         host: 'localhost',
//         port: '5432',
//         user: 'postgres',
//         password: 'zeartech',
//         database: 'citymotors',
//         tables:['users'], // only these tables 
//         dest:'D:/zeartech/orient-furniture-palace/backup.sql' // destination file 
//     },function(err){
//         // create data.sql file; 
//     })
//     // SQL Query > Select Data
//     // const query = client.query('pg_dump citymotors > D:/zeartech/orient-furniture-palace/backup.sql');
//     // // Stream results back one row at a time
//     // query.on('row', (row) => {
//     //   results.push(row);
//     // });
//     // // After all data is returned, close connection and return results
//     // query.on('end', () => {
//     //   done();
//     //   return res.json(results);
//     // });
//     done(err);
//   });
// });

router.get('/check/permission', oauth.authorise(), (req, res, next) => {
  const results = [];
  pool.connect(function(err, client, done){
    if(err) {
      done();
      done(err);
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM role_master');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
    done(err);
  });
});
module.exports = router;
