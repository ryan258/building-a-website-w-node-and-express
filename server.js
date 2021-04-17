/* eslint-disable arrow-body-style */
const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const createError = require('http-errors');

const FeedbackService = require('./services/FeedbackService');
const SpeakersService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakersService = new SpeakersService('./data/speakers.json');

const routes = require('./routes');

const app = express();

const port = 3000;

app.set('trust proxy', 1);
app.use(
  cookieSession({
    name: 'session',
    keys: ['fiosdjfsidjofsjfia', 'adsfjhsdkasdf'],
  })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = 'ROUX Meetups ';

app.use(express.static(path.join(__dirname, './static')));

//! THROWING FROM AN ASYNC FUNCTION WILL CRASH AN APP
//! NEVER THROW FROM EXPRESS ROUTES and MIDDLEWARES bc it can take down your app.

/*
app.get('/throw', (req, res, next) => {
  setTimeout(() => {
    //! - so you HAVE TO USE NEXT in ASYNC function
    // throw new Error('Something did throw! 3 seconds later...')
    return next(new Error('Something did throw! 3 seconds later...'));
  }, 3000);
  // throw new Error('Something did throw!');
});
*/

app.use(async (req, res, next) => {
  // this someVariable would become available to any template/partial file
  // res.locals.someVariable = 'hello';
  try {
    const names = await speakersService.getNames();
    res.locals.speakerNames = names;
    console.log(res.locals);
    next();
  } catch (err) {
    next(err);
  }
  // return next();
});

app.use(
  '/',
  routes({
    feedbackService,
    speakersService,
  })
);

// Catch and send people to a 404 page
app.use((req, res, next) => {
  return next(createError(404, 'File not found'));
});

// so here is express's error handling middleware
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  console.error(err);
  const status = err.status || 500;
  res.locals.status = status;
  res.status(status);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Express server is listening on ${port}!`);
});
