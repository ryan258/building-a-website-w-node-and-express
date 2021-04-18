const express = require('express');

const { check, validationResult } = require('express-validator');

const router = express.Router();
module.exports = (params) => {
  const { feedbackService } = params;

  //! ALWAYS WHEN YOU SEE ASYNC IN A ROUTE, USE TRYCATCH
  router.get('/', async (req, res, next) => {
    try {
      const feedback = await feedbackService.getList();

      const errors = req.session.feedback ? req.session.feedback.errors : false;

      const successMessage = req.session.feedback ? req.session.feedback.message : false;

      req.session.feedback = {};

      return res.render('layout', {
        pageTitle: 'Feedback',
        template: 'feedback',
        feedback,
        errors,
        successMessage,
      });
    } catch (error) {
      return next(error);
    }
  });

  router.post(
    '/',
    // run validation on user input
    [
      check('name').trim().isLength({ min: 3 }).escape().withMessage('A name is required'),
      check('email').trim().isEmail().normalizeEmail().withMessage('A valid email is required'),
      check('title').trim().isLength({ min: 3 }).escape().withMessage('A title is required'),
      check('message').trim().isLength({ min: 5 }).escape().withMessage('A message is required'),
    ],
    async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // store errors in session object
        req.session.feedback = {
          errors: errors.array(),
        };
        return res.redirect('/feedback');
      }

      const { name, email, title, message } = req.body;

      await feedbackService.addEntry(name, email, title, message);
      // flash message
      req.session.feedback = {
        message: 'Thank you for your feedback! 👻',
      };

      // console.log(req.body);
      // return res.send(`Feedback form posted!`);
      return res.redirect('/feedback');
    }
  );

  return router;
};
