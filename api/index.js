
/**
 * Module dependencies
 */

var Router = require('koa-router');

var router = module.exports = new Router();


// sample API

router.post('/test', function *() {
  this.body = { status: 'ok' };
});
