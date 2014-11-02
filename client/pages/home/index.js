
/**
 * Module dependencies
 */

var template = require('./template.jade');

module.exports = function() {
  document.querySelector('#app').innerHTML = template();
  console.log('Route - on home page');
};
