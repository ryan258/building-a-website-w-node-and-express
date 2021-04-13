const express = require('express');

const router = express.Router();

module.exports = () => {
  router.get('/', (req, res) => {
    return res.send('Feedback page');
  });

  router.post('/', (req, res) => {
    return res.send(`Feedback form posted!`);
  });

  return router;
};

// module.exports = router;
// we'll do it the cool arrow function way!
// - this way we can pass things down through the parameters
