/* eslint consistent-return:0 */

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');
const ngrok = require('ngrok');
const WooCommerceAPI = require('woocommerce-api');
const pagseguro = require('pagseguro');
const frontend = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const configAdminUrl = process.env.ADMINURL || require('../config').adminUrl;
const configConsumerKey = process.env.CONSUMERKEY || require('../config').consumerKey;
const configConsumerSecret = process.env.CONSUMERSECRET || require('../config').consumerSecret;

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

const pag = new pagseguro({
  email : 'luandro@gmail.com',
  token: '341CF7978F82449B9672F66A28A73E43',
  mode : 'sandbox'
});
pag.currency('BRL');
pag.reference('12345');
pag.addItem({
    id: 1,
    description: 'Descrição do primeiro produto',
    amount: "4230.00",
    quantity: 3,
    weight: 2342
});
pag.buyer({
    name: 'José Comprador',
    email: 'comprador@uol.com.br',
    phoneAreaCode: '51',
    phoneNumber: '12345678'
});
pag.setRedirectURL("http://loja.repsparta.com");
pag.setNotificationURL("http://loja.repsparta.com/shop");

const WooCommerce = new WooCommerceAPI({
  url: configAdminUrl,
  consumerKey: configConsumerKey,
  consumerSecret: configConsumerSecret,
});

app.get('/api/payment', (req, res) => {
  pag.send((err, res) => {
        if (err) {
            console.log(err);
        }
        console.log(res);
    });
})
app.get('/api/latest', (req, res) => {
  WooCommerce.get('orders/'+req.param, (err, wooRes) => {
    console.log(wooRes);
    console.log('===================================');
    res.send(JSON.parse(wooRes.body));
  })
})
app.get('/api/latests', (req, res) => {
  WooCommerce.get('orders', (err, wooRes) => {
    console.log(wooRes);
    console.log('===================================');
    res.send(JSON.parse(wooRes.body));
  })
})
/**
 * Products API
 */
app.get('/api/products', (req, res) => {
  console.log(WooCommerce);
  console.log(configAdminUrl);
  console.log(configConsumerKey);
  console.log(configConsumerSecret);

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
app.post('/api/order', (req, res) => {
  const data = req.body;
  WooCommerce.post('orders', data, (error, data, wooRes) => {
    console.log(JSON.parse(wooRes));
    console.log('--------------------------------------------------------');
    const formatedWoo = JSON.parse(wooRes);
    if(formatedWoo.order) {
      res.send({
        ok: true,
        order_number: formatedWoo.order.order_number,
        order_key: formatedWoo.order.order_key
      })
    } else {
      res.send({
        ok: false
      })
    }

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
