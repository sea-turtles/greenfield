'use strict';

const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const kurentoData = {};
const kurentoUrl = 'http://138.197.196.39:7676/repo/item';
let kurentoResp;

const requestOptions = {
  url: kurentoUrl,
  method: 'POST',
  json: kurentoData
};

request(requestOptions, function(err, resp, body) {
  if (err) { console.error(err, 'bad Kurento POST'); }
  kurentoResp = body;
});


let app = express();

app.use(bodyParser.json());

app.get('/api/index', function(req, res) {
  res.status(200).json(kurentoResp);
});

app.listen(process.env.PORT || 1337);
