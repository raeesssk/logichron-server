var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
var oauth = require('../oauth/index');
var http = require('http');

router.post('/', (req, res, next) => {

  let transporter = nodemailer.createTransport({
      host: 'zakrshkh07@gmail.com',
      port: 465,
      secure: true, // secure:true for port 465, secure:false for port 587
      auth: {
          user: 'info@3commastechnologies.com',
          pass: '#Info3Commas$'
      }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Green Air Conditioning Services" <greenacpune@gmail.com>', // sender address
      to: req.body.recipient, // list of receivers
      subject: 'password', // Subject line
      // text: 'Hello world ?', // plain text body
      html: '<p>this is your password link</p>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
          return res.end(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
      return res.end();

  });

});

module.exports = router;
