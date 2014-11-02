Koa.js app template
===================

This is a basic (yet powerful) web app template for [Koa](http://koajs.com).

If you're like me and prefer to assemble a web app piece by piece, instead of relying of medium-to-big frameworks, maybe you'll like it.


## Build / run system

I think that [npm-run-script](https://www.npmjs.org/doc/cli/npm-run-script.html) is fair enough for me. So you'll find all building / running scripts in package.json.

```js
"dev": "./node_modules/.bin/supervisor --harmony ./bin/www",
"watch-js": "./node_modules/.bin/watchify -t jadeify ./client/index.js -o ./public/js/bundle.js -dv",
"build-js": "./node_modules/.bin/browserify -t jadeify ./client/index.js | ./node_modules/.bin/uglifyjs -mc > ./public/js/bundle.js",
"watch-css": "./node_modules/.bin/catw -c './node_modules/.bin/lessc ./less/main.less' ./less/*.less -o ./public/css/bundle.css -v",
"build-css": "./node_modules/.bin/lessc -x --clean-css ./less/main.less > ./public/css/bundle.css",
"watch": "npm run watch-js & npm run watch-css",
"build": "npm run build-js && npm run build-css",
"start": "npm run build && node --harmony ./bin/www",
"test": "NODE_ENV=test ./node_modules/.bin/mocha --harmony -t 10000"
```

- When you're in **development**:
    
    `npm run watch` and `npm run dev`

- When you're in **production**:

    `npm run build` then `npm start`

## Tests

I've put in a [mocha](http://mochajs.org) + [should](https://github.com/shouldjs/should.js) suite. Add your tests in `/test`, then run them using:

`npm test`

## Server side

### Logging

I've written a simple [npmlog](https://www.npmjs.org/package/npmlog) wrapper which basically:

- Don't log if NODE_ENV === `TEST`
- Prepend timestamps to every log messages

I've also added a [koa-logger](https://www.npmjs.org/package/koa-logger) middleware, which can be useful when you're not in production environment.

### API

I've used [koa-mount](https://www.npmjs.org/package/koa-mount) to mount a [koa-router](https://www.npmjs.org/package/koa-router) instance on `/api` path.

This way you can simply edit `/api/index.js` or add more mount points.

### Static files

I've used [koa-static-cache](https://www.npmjs.org/package/koa-static-cache) which is **fast** and does a good job.

### Response compression

Handled by [koa-compress](https://www.npmjs.org/package/koa-compress)


## Client side

All client side code is managed by [Browserify](http://browserify.org). 
Client-side entry point is `client/index.js`.

### Routing

All non-api routing is client-side, handled by [page.js](https://github.com/visionmedia/page.js). Why?

- Great feeling of speed and great flexibility
- Very simple and straightforward
- Support `hashbang` option if when browsers don't support HTML5 [History](https://developer.mozilla.org/en-US/docs/Web/API/History) API

### Pages

App pages are placed in `client/pages` folder. Every "page" is a folder and contains two files:

- `template.jade`: the page template (powered by Jade / Jadeify)
- `index.js`: the route handler called by page.js

There's an example for `home` page.

### Components

If you want to add custom / reusable components (e.g.: boxes, [file uploaders](https://github.com/mpangrazzi/html5-uploader), custom forms), I recommend to **build them using Browserify**. 

It's not so hard, I've already write a [simple example](https://github.com/mpangrazzi/browserify-reusable-components) on how to do it.


## License

MIT