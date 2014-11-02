
/**
 * Client-side entry point
 */

var page = require('page');


// pages

var home = require('./pages/home');

// routes

page('/', home);

// 404

page('*', function() {
  var template = require('./pages/404/template.jade');
  document.querySelector('#app').innerHTML = template();
});

// init routing

page({ hashbang: true });
