const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;

  router.get('/', async (req, res) => {
    // 5) Grab speakerServices from the params we've been passing down
    const speakers = await speakersService.getList();
    // return res.send('Speakers list');
    return res.json(speakers);
  });

  router.get('/:shortname', (req, res) => {
    return res.send(`Detail pageof ${req.params.shortname}`);
  });

  return router;
};

// module.exports = router;
// we'll do it the cool arrow function way!
// - this way we can pass things down through the parameters
