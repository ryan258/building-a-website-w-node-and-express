const express = require('express');

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

// 4) Pass the params down through the index url router
module.exports = (params) => {
  router.get('/', (req, res) => {
    res.render('pages/index', { pageTitle: 'Welcome' });
  });

  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackRoute(params));

  return router;
};

// module.exports = router;
// we'll do it the cool arrow function way!
// - this way we can pass things down through the parameters
