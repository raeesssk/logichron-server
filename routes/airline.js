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
    const query = client.query("SELECT *,COALESCE(am_contact_person, '') as am_contact_person FROM airline_master am LEFT OUTER JOIN customer_master cm on am.am_cm_id = cm.cm_id order by am_id desc");
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

router.get('/:smId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.smId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query("SELECT *,COALESCE(am_contact_person, '') as am_contact_person FROM airline_master am LEFT OUTER JOIN customer_master cm on am.am_cm_id = cm.cm_id where am_id=$1",[id]);
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

router.get('/details/:smId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.smId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM airline_passenger_master apm LEFT OUTER JOIN airline_master am on apm.apm_am_id = am.am_id where apm.apm_am_id=$1',[id]);
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
  const purchaseSingleData = req.body.purchaseSingleData;
  const purchaseMultipleData = req.body.purchaseMultipleData;
  
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
      client.query('BEGIN;');

      const credit = purchaseSingleData.am_cm_id.cm_balance;
      const amount = purchaseSingleData.am_total_amount;
      if(credit > amount)
      {
        client.query('update customer_master set cm_balance=cm_balance-$1 where cm_id=$2',[amount,purchaseSingleData.am_cm_id.cm_id]);
      }
      else
      {
        const debit = amount - credit;
        client.query('update customer_master set cm_balance=cm_balance-$1, cm_debit=cm_debit+$2 where cm_id=$3',[credit,debit,purchaseSingleData.am_cm_id.cm_id]);
      }

      var singleInsert = 'INSERT INTO airline_master(am_invoice_no, am_date, am_cm_id, am_contact_person, am_net_amount, am_cgst_per, am_sgst_per, am_igst_per, am_csgt_amount, am_sgst_amount, am_igst_amount, am_round_off, am_total_amount, am_other_charges, am_status) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,0) RETURNING *',
        params = [purchaseSingleData.am_invoice_no,purchaseSingleData.am_date,purchaseSingleData.am_cm_id.cm_id,purchaseSingleData.am_contact_person,purchaseSingleData.amount,purchaseSingleData.vatper,purchaseSingleData.sgstper,purchaseSingleData.igstper,purchaseSingleData.vat,purchaseSingleData.sgst,purchaseSingleData.igst,purchaseSingleData.roundoff,purchaseSingleData.am_total_amount,purchaseSingleData.rate_vat]
      client.query(singleInsert, params, function (error, result) {
          results.push(result.rows[0]); // Will contain your inserted rows

          purchaseMultipleData.forEach(function(product, index) {
            client.query('INSERT INTO public.airline_passenger_master(apm_am_id, apm_passenger_name, apm_pnr_no, apm_sector, apm_class,apm_flight,apm_travel_date,apm_ticket_no, apm_total)VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',[result.rows[0].am_id,product.apm_passenger_name,product.apm_pnr_no,product.apm_sector,product.apm_class,product.apm_flight,product.apm_travel_date,product.apm_ticket_no,product.apm_total]);
          });
      client.query('COMMIT;');
          done();
          return res.json(results);
      });
    done(err);
  });

});

router.post('/edit/:smId', oauth.authorise(), (req, res, next) => {
  const id = req.params.smId;
  const results = [];
  const purchaseSingleData = req.body.purchaseSingleData;
  const purchaseMultipleData = req.body.purchaseMultipleData;
  const purchaseadd = req.body.purchaseadd;
  const purchaseremove = req.body.purchaseremove;
  
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
      client.query('BEGIN;');


      const debit = purchaseSingleData.old_am_cm_id.cm_debit;
      const amount = purchaseSingleData.old_am_total_amount;
      if(debit > amount)
      {
        client.query('update customer_master set cm_debit=cm_debit-$1 where cm_id=$2',[amount,purchaseSingleData.old_am_cm_id.cm_id]);
      }
      else
      {
        const credit = amount - debit;
        client.query('update customer_master set cm_balance=cm_balance+$1, cm_debit=cm_debit-$2 where cm_id=$3',[credit,debit,purchaseSingleData.old_am_cm_id.cm_id]);
      }


      const query = client.query('SELECT * FROM customer_master where cm_id = $1',[purchaseSingleData.am_cm.cm_id]);
      query.on('row', (row) => {
        const credit = row.cm_balance;
        const amount = purchaseSingleData.am_total_amount;
        if(credit > amount)
        {
          client.query('update customer_master set cm_balance=cm_balance-$1 where cm_id=$2',[amount,purchaseSingleData.am_cm.cm_id]);
        }
        else
        {
          const debit = amount - credit;
          client.query('update customer_master set cm_balance=cm_balance-$1, cm_debit=cm_debit+$2 where cm_id=$3',[credit,debit,purchaseSingleData.am_cm.cm_id]);
        }
      });
      query.on('end', () => {
        done();
      });


      var singleInsert = 'update airline_master set am_date=$1, am_cm_id=$2, am_contact_person=$3, am_net_amount=$4, am_cgst_per=$5, am_sgst_per=$6, am_igst_per=$7, am_csgt_amount=$8, am_sgst_amount=$9, am_igst_amount=$10, am_round_off=$11, am_total_amount=$12, am_other_charges=$13, am_updated_at = now() where am_id=$14 RETURNING *',
        params = [purchaseSingleData.am_date,purchaseSingleData.am_cm.cm_id,purchaseSingleData.am_contact_person,purchaseSingleData.amount,purchaseSingleData.vatper,purchaseSingleData.sgstper,purchaseSingleData.igstper,purchaseSingleData.vat,purchaseSingleData.sgst,purchaseSingleData.igst,purchaseSingleData.roundoff,purchaseSingleData.am_total_amount,purchaseSingleData.rate_vat,id]
      client.query(singleInsert, params, function (error, result) {
          results.push(result.rows[0]); // Will contain your inserted rows

          purchaseremove.forEach(function(product, index) {
            client.query('delete from public.airline_passenger_master where apm_id=$1',[product.apm_id]);
          });

          purchaseMultipleData.forEach(function(product, index) {
            client.query('update public.airline_passenger_master set apm_passenger_name=$1, apm_pnr_no=$2, apm_sector=$3, apm_class=$4,apm_flight=$5,apm_travel_date=$6,apm_ticket_no=$7, apm_total=$8 where apm_id=$9',[product.apm_passenger_name,product.apm_pnr_no,product.apm_sector,product.apm_class,product.apm_flight,product.apm_travel_date,product.apm_ticket_no,product.apm_total,product.apm_id]);
          });

          purchaseadd.forEach(function(product, index) {
            client.query('INSERT INTO public.airline_passenger_master(apm_am_id, apm_passenger_name, apm_pnr_no, apm_sector, apm_class,apm_flight,apm_travel_date,apm_ticket_no, apm_total)VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',[id,product.apm_passenger_name,product.apm_pnr_no,product.apm_sector,product.apm_class,product.apm_flight,product.apm_travel_date,product.apm_ticket_no,product.apm_total]);
          });
      client.query('COMMIT;');
          done();
          return res.json(results);
      });
    done(err);
  });

});

router.post('/delete/:smId', oauth.authorise(), (req, res, next) => {
  const results = [];
  const id = req.params.smId;
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    client.query('BEGIN;');

    const debit = req.body.cm_debit;
    const amount = req.body.am_total_amount;
    if(debit > amount)
    {
      client.query('update customer_master set cm_debit=cm_debit-$1 where cm_id=$2',[amount,req.body.cm_id]);
    }
    else
    {
      const credit = amount - debit;
      client.query('update customer_master set cm_balance=cm_balance+$1, cm_debit=cm_debit-$2 where cm_id=$3',[credit,debit,req.body.cm_id]);
    }
    
    client.query('UPDATE airline_master SET am_status=1 WHERE am_id=($1)', [id]);

    client.query('COMMIT;');
      done();
    return res.end("Successfully.");
    done(err);
  });
});

router.get('/serial/no', oauth.authorise(), (req, res, next) => {
  const results = [];
  pool.connect(function(err, client, done){
    if(err) {
      done();
      // pg.end();
      console.log("the error is"+err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query("SELECT * from airline_master order by am_id desc limit 1;");
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
