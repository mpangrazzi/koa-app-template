/**
 * Log
 */

var L = require('npmlog');
var moment = require('moment');

var env = process.env.NODE_ENV || 'development';

L.enableColor();
L.addLevel('boot', 6000, { fg: 'green'});

L.heading = 'login';
L.level = env !== 'production' ? 'verbose' : 'info';

module.exports = function() {
  if (env === 'test') return;

  var args = [].slice.call(arguments);
  args[2] = moment().format('DD-MM-YYYY HH:mm:ss') + ' ' + args[2];

  return L.log.apply(this, args);
};
