const express = require('express');
const helmet = require('helmet');
const {
  passport,
} = require('./passportHandler');

const { router }  = require('./router.js');

// const { errorHandler } = require('./server/v1/middlewares');

const app = express();

app.use(express.urlencoded({
  extended: true,
}));

app.use(express.json({ limit: '15mb' }));
app.use(helmet());

app.use(passport.initialize());
app.use(passport.session());

//= ==========Registering Router==========
app.use('/user/v1/', router);

//= ======ERROR Handler
// app.use(errorHandler);

module.exports = app;