const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');

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

app.listen(port, () => {
  console.log(`Express server is listening on ${port}!`);
});
