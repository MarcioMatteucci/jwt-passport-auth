const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConfig = require('../passport');

const UsersController = require('../controllers/users');

const { validateBody, schema } = require('../helpers/routeHelpers');

router.route('/signup')
   .post(validateBody(schema.signUpSchema), UsersController.signUp);

router.route('/signin')
   .post(validateBody(schema.signInSchema), passport.authenticate('local', { session: false }), UsersController.signIn);

router.route('/secret')
   .get(passport.authenticate('jwt', { session: false }), UsersController.secret);

module.exports = router;