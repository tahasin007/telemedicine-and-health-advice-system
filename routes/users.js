const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const {ensureAuthenticated} = require('../helpers/auth');

require('../models/Users');
const User = mongoose.model('users');

//Login Route
router.get('/login', (req, res) => {
  res.render('users/login',{
  	layout:'loginLayout'
  });
});

// User Register Route
router.get('/register', (req, res) => {
  res.render('users/register',{
  	layout:'loginLayout'
  });
});

router.get('/docRegister', (req, res) => {
  res.render('users/docRegister',{
    layout:'docRes'
  });
});

// Login Form POST
// router.post('/login', (req, res, next) => {
//   passport.authenticate('local',{
//     successRedirect:'../admin',
//     failureRedirect: '/users/login',
//     failureFlash: true
//   })(req, res, next);
// });

router.post('/login', function(req, res, next) {
  passport.authenticate('local.signup', function(err, user, info) {
    if (err) { 
      return next(err); }
    if (!user) { 
      req.flash('error_msg', info.message);
      return res.redirect('/users/login'); }
    req.logIn(user, function(err) {
      if (err) {
       return next(err); }
      User.findOne({$or:[{email: req.body.email},{userName: req.body.email}]}).then(user => {
        if(user.role=='patient')return res.redirect('../patient/'+user.userName);
        if(user.role=='admin')return res.redirect('../admin/'+user.userName);
        if(user.role=='doctor'){
          if(user.status=='Registered')return res.redirect('../doctor/'+user.userName);
          else{
            req.flash('error_msg','You are not authorized to Login');
            return res.redirect('/users/login');
          }
        }
        });
     // return res.redirect('../admin');
    });
  })(req, res, next);
});


router.post('/register', (req, res) => {
  let errors = [];

  if(req.body.password != req.body.password2){
    errors.push({text:'Passwords do not match'});
  }
  if(req.body.password.length < 4){
      errors.push({text:'Passwords must be at least 4 characters'})
  }

  if(errors.length > 0){
    res.render('users/register', {
      errors: errors,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2,
      layout:'loginLayout'
    });
  } else {
    User.findOne({email: req.body.email})
      .then(user => {
        if(user){
          req.flash('error_msg', 'Email already regsitered');
          res.redirect('/users/register');
        } else {
          const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            role:'patient',
          });
          
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'You are now registered and can log in');
                  res.redirect('/users/login');
                })
                .catch(err => {
                  console.log(err);
                  return;
                });
            });
          });
        }
      });
  }
}); 

router.post('/docRegister', (req, res) => {
  let errors = [];

  if(req.body.password1 != req.body.password2){
    errors.push({text:'Passwords do not match'});
  }
  if(req.body.password1.length < 4){
      errors.push({text:'Passwords must be at least 4 characters'})
  }

  if(errors.length > 0){
    res.render('users/docRegister', {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password1: req.body.password1,
      password2: req.body.password2,
      layout:'loginLayout'
    });
  } else {
    User.findOne({email: req.body.email})
      .then(user => {
        if(user){
          req.flash('error_msg', 'Email already regsitered');
          res.redirect('/users/docRegister');
        } else {
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password1,
            userName: req.body.userName,
            contact: req.body.contact,
            address:req.body.address,
            role:'doctor',
            status:'Pending'
          });
          
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'You are now registered and can log in');
                  res.redirect('/users/login');
                })
                .catch(err => {
                  console.log(err);
                  return;
                });
            });
          });
        }
      });
  }
}); 

// Logout User
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});


module.exports = router;