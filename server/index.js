/* eslint consistent-return:0 */

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');
const ngrok = require('ngrok');
const WooCommerceAPI = require('woocommerce-api');
const pagseguro = require('pagseguro');
const XMLparser = require('xml2json');
const uuid = require('node-uuid').v4;
const frontend = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const configAdminUrl = process.env.ADMINURL || require('../config').adminUrl;
const configConsumerKey = process.env.CONSUMERKEY || require('../config').consumerKey;
const configConsumerSecret = process.env.CONSUMERSECRET || require('../config').consumerSecret;
const configToken = process.env.TOKEN || require('../config').token;
const configEmail = process.env.EMAIL || require('../config').email;
// If you need a backend, e.g. an API, add your custom backend-specific middleware here

const pag = new pagseguro({
  email : configEmail,
  token: configToken,
  mode : 'sandbox'
});

const WooCommerce = new WooCommerceAPI({
  url: configAdminUrl,
  consumerKey: configConsumerKey,
  consumerSecret: configConsumerSecret,
});

/**
 * Payment API
 */
app.post('/api/payment', (req, res) => {
  const data = req.body.order;
  // data.line_items.map((item) => {
  //   pag.addItem({
  //       id: item.id,
  //       description: item.name,
  //       amount: item.price+'.00',
  //       quantity: item.quantity,
  //       weight: ''
  //   });
  // });
  pag.addItem({
      id: 1,
      description: 'Descrição do primeiro produto',
      amount: "4230.00",
      quantity: 3,
      weight: 2342
  });

  // const areaCode = data.billing_address.phone.substring(0, 2);
  // const phoneNumber = data.billing_address.phone.substring(2);
  pag.currency('BRL');
  pag.setRedirectURL("http://loja.repsparta.com");
  pag.setNotificationURL("http://loja.repsparta.com/shop");

  pag.reference(uuid());
  pag.buyer({
      // name: data.billing_address.first_name+' '+data.billing_address.last_name,
      // email: data.billing_address.email,
      // name: 'Calor Montoya',
      // email: 'luandro@sandbox.pagseguro.com',
      // phoneAreaCode: areaCode,
      // phoneNumber: phoneNumber,
      // street: data.billing_address.street,
      // number: data.billing_address.number,
      // postalCode: data.billing_address.cep,
      // city: data.billing_address.city,
      // state: data.billing_address.state,
      name: 'Louco Abreu',
      email: 'louco_abreu@gmail.com',
      phoneAreaCode: '31',
      phoneNumber: '38922827',
      street: 'Rua',
      number: '18',
      postalCode: '36570000',
      city: 'VICOSA',
      state: 'MG',
      country: 'BRA'
  });
  pag.send((err, payRes) => {
    if (err) {
      console.log(err);
    }
    const formatedData = XMLparser.toJson(payRes, {object: true});
    console.log(formatedData);
    if(formatedData.checkout) {
      res.status(200).json({
        ok: true,
        code: formatedData.checkout.code
      });
    } else {
      res.status(404).json({
        ok: false
      })
    }
  });
  console.log('========================= PAYMENT ==============================');
});
/**
 * tests
 */
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
    if(data && data.statusCode === 200) {
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
