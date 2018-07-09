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
    const query = client.query("SELECT *,COALESCE(hm_contact_person, '') as hm_contact_person FROM hotel_master hm LEFT OUTER JOIN customer_master cm on hm.hm_cm_id = cm.cm_id order by hm_id desc");
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
    const query = client.query("SELECT *,COALESCE(hm_contact_person, '') as hm_contact_person FROM hotel_master hm LEFT OUTER JOIN customer_master cm on hm.hm_cm_id = cm.cm_id where hm_id=$1",[id]);
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
    const query = client.query('SELECT * FROM hotel_passenger_master hpm LEFT OUTER JOIN hotel_master hm on hpm.hpm_hm_id = hm.hm_id where hpm.hpm_hm_id=$1',[id]);
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

      const credit = purchaseSingleData.hm_cm_id.cm_balance;
      const amount = purchaseSingleData.hm_total_amount;
      if(credit > amount)
      {
        client.query('update customer_master set cm_balance=cm_balance-$1 where cm_id=$2',[amount,purchaseSingleData.hm_cm_id.cm_id]);
      }
      else
      {
        const debit = amount - credit;
        client.query('update customer_master set cm_balance=cm_balance-$1, cm_debit=cm_debit+$2 where cm_id=$3',[credit,debit,purchaseSingleData.hm_cm_id.cm_id]);
      }

      var singleInsert = 'INSERT INTO hotel_master(hm_invoice_no, hm_date, hm_cm_id, hm_contact_person, hm_net_amount, hm_cgst_per, hm_sgst_per, hm_igst_per, hm_cgst_amount, hm_sgst_amount, hm_igst_amount, hm_round_off, hm_total_amount, hm_other_charges, hm_status) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,0) RETURNING *',
        params = [purchaseSingleData.hm_invoice_no,purchaseSingleData.hm_date,purchaseSingleData.hm_cm_id.cm_id,purchaseSingleData.hm_contact_person,purchaseSingleData.amount,purchaseSingleData.vatper,purchaseSingleData.sgstper,purchaseSingleData.igstper,purchaseSingleData.vat,purchaseSingleData.sgst,purchaseSingleData.igst,purchaseSingleData.roundoff,purchaseSingleData.hm_total_amount,purchaseSingleData.rate_vat]
      client.query(singleInsert, params, function (error, result) {
          results.push(result.rows[0]); // Will contain your inserted rows

          purchaseMultipleData.forEach(function(product, index) {
            client.query('INSERT INTO public.hotel_passenger_master(hpm_hm_id, hpm_passenger_name, hpm_hotel_name, hpm_check_in, hpm_check_out, hpm_total)VALUES ($1, $2, $3, $4, $5, $6)',[result.rows[0].hm_id,product.hpm_passenger_name,product.hpm_hotel_name,product.hpm_check_in,product.hpm_check_out,product.hpm_total]);
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


      const debit = purchaseSingleData.old_hm_cm_id.cm_debit;
      const amount = purchaseSingleData.old_hm_total_amount;
      if(debit > amount)
      {
        client.query('update customer_master set cm_debit=cm_debit-$1 where cm_id=$2',[amount,purchaseSingleData.old_hm_cm_id.cm_id]);
      }
      else
      {
        const credit = amount - debit;
        client.query('update customer_master set cm_balance=cm_balance+$1, cm_debit=cm_debit-$2 where cm_id=$3',[credit,debit,purchaseSingleData.old_hm_cm_id.cm_id]);
      }


      const query = client.query('SELECT * FROM customer_master where cm_id = $1',[purchaseSingleData.hm_cm.cm_id]);
      query.on('row', (row) => {
        const credit = row.cm_balance;
        const amount = purchaseSingleData.hm_total_amount;
        if(credit > amount)
        {
          client.query('update customer_master set cm_balance=cm_balance-$1 where cm_id=$2',[amount,purchaseSingleData.hm_cm.cm_id]);
        }
        else
        {
          const debit = amount - credit;
          client.query('update customer_master set cm_balance=cm_balance-$1, cm_debit=cm_debit+$2 where cm_id=$3',[credit,debit,purchaseSingleData.hm_cm.cm_id]);
        }
      });
      query.on('end', () => {
        done();
      });


      var singleInsert = 'update hotel_master set hm_date=$1, hm_cm_id=$2, hm_contact_person=$3, hm_net_amount=$4, hm_cgst_per=$5, hm_sgst_per=$6, hm_igst_per=$7, hm_cgst_amount=$8, hm_sgst_amount=$9, hm_igst_amount=$10, hm_round_off=$11, hm_total_amount=$12, hm_other_charges=$13, hm_updated_at = now() where hm_id=$14 RETURNING *',
        params = [purchaseSingleData.hm_date,purchaseSingleData.hm_cm.cm_id,purchaseSingleData.hm_contact_person,purchaseSingleData.amount,purchaseSingleData.vatper,purchaseSingleData.sgstper,purchaseSingleData.igstper,purchaseSingleData.vat,purchaseSingleData.sgst,purchaseSingleData.igst,purchaseSingleData.roundoff,purchaseSingleData.hm_total_amount,purchaseSingleData.rate_vat,id]
      client.query(singleInsert, params, function (error, result) {
          results.push(result.rows[0]); // Will contain your inserted rows

          purchaseremove.forEach(function(product, index) {
            client.query('delete from public.hotel_passenger_master where hpm_id=$1',[product.hpm_id]);
          });

          purchaseMultipleData.forEach(function(product, index) {
            client.query('update public.hotel_passenger_master set hpm_passenger_name=$1, hpm_hotel_name=$2, hpm_check_in=$3, hpm_check_out=$4,hpm_total=$5 where hpm_id=$6',[product.hpm_passenger_name,product.hpm_hotel_name,product.hpm_check_in,product.hpm_check_out,product.hpm_total,product.hpm_id]);
          });

          purchaseadd.forEach(function(product, index) {
            client.query('INSERT INTO public.hotel_passenger_master(hpm_hm_id, hpm_passenger_name, hpm_hotel_name, hpm_check_in, hpm_check_out,hpm_total)VALUES ($1, $2, $3, $4, $5, $6)',[id,product.hpm_passenger_name,product.hpm_hotel_name,product.hpm_check_in,product.hpm_check_out,product.hpm_total]);
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
    const amount = req.body.hm_total_amount;
    if(debit > amount)
    {
      client.query('update customer_master set cm_debit=cm_debit-$1 where cm_id=$2',[amount,req.body.cm_id]);
    }
    else
    {
      const credit = amount - debit;
      client.query('update customer_master set cm_balance=cm_balance+$1, cm_debit=cm_debit-$2 where cm_id=$3',[credit,debit,req.body.cm_id]);
    }
    
    client.query('UPDATE hotel_master SET hm_status=1 WHERE hm_id=($1)', [id]);

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
    const query = client.query("SELECT * from hotel_master order by hm_id desc limit 1;");
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
