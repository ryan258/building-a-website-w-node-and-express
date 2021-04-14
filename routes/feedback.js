const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;

  router.get('/', async (req, res) => {
    const feedback = await feedbackService.getList();
    // return res.send('Feedback page');
    return res.json(feedback);
  });

  router.post('/', (req, res) => {
    return res.send(`Feedback form posted!`);
  });

  return router;
};

// module.exports = router;
// we'll do it the cool arrow function way!
// - this way we can pass things down through the parameters
