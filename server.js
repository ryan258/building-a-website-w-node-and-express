const express = require('express');
const path = require('path');

// 1) require the service classes
const FeedbackService = require('./services/FeedbackService');
const SpeakersService = require('./services/SpeakerService');
// 2) instantiate an obj of each service
const feedbackService = new FeedbackService('./data/feedback.json');
const speakersService = new SpeakersService('./data/speakers.json');

const routes = require('./routes');

const app = express();

const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// use some middleware to serve static assets
app.use(express.static(path.join(__dirname, './static')));

app.use(
  '/',
  routes({
    // 3) Pass the service instances into the router
    feedbackService,
    speakersService,
  })
);

/*
app.get('/speakers', (req, res) => {
  // respond to a root req w/ the home page html
  res.sendFile(path.join(__dirname, './static/speakers.html'));
});

app.get('/feedback', (req, res) => {
  // respond to a root req w/ the home page html
  res.sendFile(path.join(__dirname, './static/feedback.html'));
});
*/

app.listen(port, () => {
  console.log(`Express server is listening on ${port}!`);
});
