const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'FINNER' });
});

module.exports = router;
