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
    const query = client.query("SELECT *,COALESCE(vm_contact_person, '') as vm_contact_person FROM visa_master vm LEFT OUTER JOIN customer_master cm on vm.vm_cm_id = cm.cm_id order by vm_id desc");
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
    const query = client.query("SELECT *,COALESCE(vm_contact_person, '') as vm_contact_person FROM visa_master vm LEFT OUTER JOIN customer_master cm on vm.vm_cm_id = cm.cm_id where vm_id=$1",[id]);
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
    const query = client.query('SELECT * FROM visa_passenger_master vpm LEFT OUTER JOIN visa_master vm on vpm.vpm_vm_id = vm.vm_id where vpm.vpm_vm_id=$1',[id]);
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

      const credit = purchaseSingleData.vm_cm_id.cm_balance;
      const amount = purchaseSingleData.vm_total_amount;
      if(credit > amount)
      {
        client.query('update customer_master set cm_balance=cm_balance-$1 where cm_id=$2',[amount,purchaseSingleData.vm_cm_id.cm_id]);
      }
      else
      {
        const debit = amount - credit;
        client.query('update customer_master set cm_balance=cm_balance-$1, cm_debit=cm_debit+$2 where cm_id=$3',[credit,debit,purchaseSingleData.vm_cm_id.cm_id]);
      }

      var singleInsert = 'INSERT INTO visa_master(vm_invoice_no, vm_date, vm_cm_id, vm_contact_person, vm_net_amount, vm_cgst_per, vm_sgst_per, vm_igst_per, vm_cgst_amount, vm_sgst_amount, vm_igst_amount, vm_round_off, vm_total_amount, vm_other_charges, vm_status) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,0) RETURNING *',
        params = [purchaseSingleData.vm_invoice_no,purchaseSingleData.vm_date,purchaseSingleData.vm_cm_id.cm_id,purchaseSingleData.vm_contact_person,purchaseSingleData.amount,purchaseSingleData.vatper,purchaseSingleData.sgstper,purchaseSingleData.igstper,purchaseSingleData.vat,purchaseSingleData.sgst,purchaseSingleData.igst,purchaseSingleData.roundoff,purchaseSingleData.vm_total_amount,purchaseSingleData.rate_vat]
      client.query(singleInsert, params, function (error, result) {
          results.push(result.rows[0]); // Will contain your inserted rows

          purchaseMultipleData.forEach(function(product, index) {
            client.query('INSERT INTO public.visa_passenger_master(vpm_vm_id, vpm_passenger_name, vpm_country, vpm_total)VALUES ($1, $2, $3, $4)',[result.rows[0].vm_id,product.vpm_passenger_name,product.vpm_country,product.vpm_total]);
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


      const debit = purchaseSingleData.old_vm_cm_id.cm_debit;
      const amount = purchaseSingleData.old_vm_total_amount;
      if(debit > amount)
      {
        client.query('update customer_master set cm_debit=cm_debit-$1 where cm_id=$2',[amount,purchaseSingleData.old_vm_cm_id.cm_id]);
      }
      else
      {
        const credit = amount - debit;
        client.query('update customer_master set cm_balance=cm_balance+$1, cm_debit=cm_debit-$2 where cm_id=$3',[credit,debit,purchaseSingleData.old_vm_cm_id.cm_id]);
      }


      const query = client.query('SELECT * FROM customer_master where cm_id = $1',[purchaseSingleData.vm_cm.cm_id]);
      query.on('row', (row) => {
        const credit = row.cm_balance;
        const amount = purchaseSingleData.vm_total_amount;
        if(credit > amount)
        {
          client.query('update customer_master set cm_balance=cm_balance-$1 where cm_id=$2',[amount,purchaseSingleData.vm_cm.cm_id]);
        }
        else
        {
          const debit = amount - credit;
          client.query('update customer_master set cm_balance=cm_balance-$1, cm_debit=cm_debit+$2 where cm_id=$3',[credit,debit,purchaseSingleData.vm_cm.cm_id]);
        }
      });
      query.on('end', () => {
        done();
      });


      var singleInsert = 'update visa_master set vm_date=$1, vm_cm_id=$2, vm_contact_person=$3, vm_net_amount=$4, vm_cgst_per=$5, vm_sgst_per=$6, vm_igst_per=$7, vm_cgst_amount=$8, vm_sgst_amount=$9, vm_igst_amount=$10, vm_round_off=$11, vm_total_amount=$12, vm_other_charges=$13, vm_updated_at = now() where vm_id=$14 RETURNING *',
        params = [purchaseSingleData.vm_date,purchaseSingleData.vm_cm.cm_id,purchaseSingleData.vm_contact_person,purchaseSingleData.amount,purchaseSingleData.vatper,purchaseSingleData.sgstper,purchaseSingleData.igstper,purchaseSingleData.vat,purchaseSingleData.sgst,purchaseSingleData.igst,purchaseSingleData.roundoff,purchaseSingleData.vm_total_amount,purchaseSingleData.rate_vat,id]
      client.query(singleInsert, params, function (error, result) {
          results.push(result.rows[0]); // Will contain your inserted rows

          purchaseremove.forEach(function(product, index) {
            client.query('delete from public.visa_passenger_master where vpm_id=$1',[product.vpm_id]);
          });

          purchaseMultipleData.forEach(function(product, index) {
            client.query('update public.visa_passenger_master set vpm_passenger_name=$1, vpm_country=$2, vpm_total=$3 where vpm_id=$4',[product.vpm_passenger_name,product.vpm_country,product.vpm_total,product.vpm_id]);
          });

          purchaseadd.forEach(function(product, index) {
            client.query('INSERT INTO public.visa_passenger_master(vpm_vm_id, vpm_passenger_name, vpm_country, vpm_total)VALUES ($1, $2, $3, $4)',[id,product.vpm_passenger_name,product.vpm_country,product.vpm_total]);
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
    const amount = req.body.vm_total_amount;
    if(debit > amount)
    {
      client.query('update customer_master set cm_debit=cm_debit-$1 where cm_id=$2',[amount,req.body.cm_id]);
    }
    else
    {
      const credit = amount - debit;
      client.query('update customer_master set cm_balance=cm_balance+$1, cm_debit=cm_debit-$2 where cm_id=$3',[credit,debit,req.body.cm_id]);
    }
    
    client.query('UPDATE visa_master SET vm_status=1 WHERE vm_id=($1)', [id]);

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
    const query = client.query("SELECT * from visa_master order by vm_id desc limit 1;");
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
