
/**
 * Module dependencies
 */

var koa = require('koa');
var mount = require('koa-mount');
var logger = require('koa-logger');
var staticCache = require('koa-static-cache');
var compress = require('koa-compress');
var path = require('path');
var views = require('co-views');
var colors = require('colors');

var L = require('./lib/log');


var render = views(path.join(__dirname, 'views'), {
  default: 'jade',
  cache: process.env.NODE_ENV === 'production'
});

var app = module.exports = koa();


// compress

app.use(compress());

// static file server

app.use(staticCache(path.join(__dirname, './public'), {
  maxAge: 60 * 60 * 12 * 1000
}));

// API

app.use(mount('/api', require('./api').middleware() ));

// logger

if (process.env.NODE_ENV !== 'production') app.use(logger());

// client

app.use(function *() {
  this.body = yield render('layout');
});

// Centralized error logging

app.on('error', function(err) {
  L('error', 'api', 'API error: %s\n%s', err.message, err.stack);
});
