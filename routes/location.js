var express = require('express');
var router = express.Router();
var oauth = require('../oauth/index');
var pg = require('pg');
var path = require('path');
var config = require('../config.js');

var pool = new pg.Pool(config);

router.post('/countries/typeahead/search', oauth.authorise(), (req, res, next) => {
  const results = [];
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const str = req.body.search+"%";
    // SQL Query > Select Data

    const strqry =  "SELECT *, sortname||' - '||name as c_search "+
                    "FROM countries "+
                    "where LOWER(name) LIKE LOWER($1) "+
                    "or LOWER(sortname) LIKE LOWER($2) "+
                    "order by name asc LIMIT 10";

    const query = client.query(strqry,[str,str]);
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

router.post('/states/typeahead/search', oauth.authorise(), (req, res, next) => {
  const results = [];
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const str = req.body.search+"%";
    // SQL Query > Select Data

    const strqry =  "SELECT *,name as state_name "+
                    "FROM states "+
                    "where LOWER(name) LIKE LOWER($1) "+
                    "and country_id = $2"+
                    "order by name asc LIMIT 10";

    const query = client.query(strqry,[str,req.body.c_id]);
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

router.post('/cities/typeahead/search', oauth.authorise(), (req, res, next) => {
  const results = [];
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const str = req.body.search+"%";
    // SQL Query > Select Data

    const strqry =  "SELECT *,name as city_name "+
                    "FROM cities "+
                    "where LOWER(name) LIKE LOWER($1) "+
                    "and state_id = $2"+
                    "order by name asc LIMIT 10";

    const query = client.query(strqry,[str,req.body.s_id]);
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