var config = {
  user: 'postgres', //env var: PGUSER 
  database: 'logichron', //env var: PGDATABASE 
  password: 'zeartech', //env var: PGPASSWORD 
  host: 'logichrondb.3commastechnologies.com', // Server hosting the postgres database 
  port: 5432, //env var: PGPORT 
  max: 10, // max number of clients in the pool 
  idleTimeoutMillis: 60000, // how long a client is allowed to remain idle before being closed 
};

module.exports = config;