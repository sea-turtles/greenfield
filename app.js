'use strict';

const express = require('express');
const request = require('request');


const kurentoData = {};
const kurentoUrl = 'http://138.197.196.39:7676/repo/item';

const requestOptions = {
  url: kurentoUrl,
  method: 'POST',
  json: kurentoData
};

request(requestOptions, function(err, resp, body) {
  if (err) { console.error(err, 'bad Kurento POST'); }
  console.log(body);
});


let app = express();

app.listen(process.env.PORT || 1337);
