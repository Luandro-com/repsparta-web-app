/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');
const ngrok = require('ngrok');
const WooCommerceAPI = require('woocommerce-api');

const frontend = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';

const app = express();

const configUrl = process.env.URL || require('../config').url;
const configConsumerKey = process.env.CONSUMERKEY || require('../config').consumerKey;
const configConsumerSecret = process.env.CONSUMERSECRET || require('../config').consumerSecret;

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

const WooCommerce = new WooCommerceAPI({
  url: configUrl,
  consumerKey: configConsumerKey,
  consumerSecret: configConsumerSecret,
});

/**
 * Products API
 */
app.get('/api/products', (req, res) => {
  WooCommerce.get('products', (err, data, response) => {
    if(data.statusCode === 200) {
      const formatedData = JSON.parse(response)
      res.status(200).json(formatedData);
    } else {
      res.status(data.statusCode).send(response);
    }
  })
})
/**
 * Orders API
 */
app.get('/api/order', (req, res) => {
  WooCommerce.post('orders', data, (err, data, res) => {
   console.log(res);
  });
})
// Initialize frontend middleware that will serve your JS app
const webpackConfig = isDev
  ? require('../internals/webpack/webpack.dev.babel')
  : require('../internals/webpack/webpack.prod.babel');

app.use(frontend(webpackConfig));

const port = process.env.PORT || 3000;

// Start your app.
app.listen(port, (err) => {
  if (err) {
    return logger.error(err);
  }

  // Connect to ngrok in dev mode
  if (isDev) {
    // ngrok.connect(port, (innerErr, url) => {
    //   if (innerErr) {
    //     return logger.error(innerErr);
    //   }
    //
    //   logger.appStarted(port, url);
    // });
    logger.appStarted(port);
  } else {
    logger.appStarted(port);
  }
});
