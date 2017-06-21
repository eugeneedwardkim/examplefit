const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const client = require('../lib/client');

const isAuthenticated = (req, res, next) => {
  if (req.user)
    next();
   else
     return res.json({ })
}

router.post('/signup', (req, res) => {
  let { email, password, weight, age, height, sex, goals, restrictions, activity, bmr } = req.body;
  console.log(activity, bmr);
  User.register(new User({username: email}), password, (err, user) => {
    if (err)
      return res.status(500).json(err);
    // get values from req.body
    // user.thing = req.body.thing
    user.weight = weight,
    user.age = age,
    user.height = height,
    user.sex = sex,
    user.goals = goals,
    user.restrictions = restrictions,
    user.activity = activity,
    user.bmr = bmr
    user.save( (err, user) => {
      if (err)
        return res.status(500).json(err);
      return res.json(user)
    });
  });
});

// udate the user with info and goals in the server database
router.put('/about-diet', (req, res) => {
  console.log("got to the about diet route");
  console.log(req.body._id);
  let { goals, restrictions, activity, bmr } = req.body;
  let userId = req.body._id;
  User.findByIdAndUpdate(
    userId,
    { $set: { goals, restrictions, activity, bmr} },
    { new: true },
    (err, user) => {
      res.json(user);
  });
});

router.put('/meals', (req, res) => {
  console.log("got to meals");
  console.log(req.body._id);
  let { meal } = req.body;
  let userId = req.body._id;
  User.findByIdAndUpdate(
    userId,
    { $set: { meal } },
    { new: true },
    (err, user) => {
      res.json(user);
  });
});

// router.post('/meals', (req, res) => {
//   let { diet, exclusion, bmr } = req.body;
//   client('/recipes/mealplans/generate', { method: 'GET', query: { diet, exclude: exclusion, targetCalories: bmr} }, (err, data) => {
//     return res.json(data);
//   })
  
// });

router.post('/signin', (req, res) => {
 let { email, password } = req.body
 User.findOne({ username: req.body.email}, (err, user) => {
   if (!user)
     return res.status(500).json({ message: 'Invalid Username Or Password' });
   user.authenticate(req.body.password, (err, user, passwordErr) => {
     if (err)
       return res.status(500).json({ message: 'Invalid Username Or Password' });
     if (passwordErr)
       return res.status(500).json({ message: 'Invalid Username Or Password' });

     req.logIn(user, (err) => {
       return res.json(user);
     })
   });
  });
});

router.get('/user', isAuthenticated, (req,res) => {
  return res.json(req.user)
});

router.delete('/sign_out', (req, res) => {
  req.logout();
  res.status(200).json({});
});

router.get('/joke', (req, res) => {
  console.log("I got to the joke route!");
  client('/food/jokes/random', { method: 'GET', query: {} }, (err, data) => {
    return res.json(data);
  });
  
});


module.exports = router;
