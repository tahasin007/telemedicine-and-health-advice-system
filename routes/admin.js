const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');
const {ensureAuthenticated} = require('../helpers/auth');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const dateFormat = require('dateformat');
const bcrypt = require('bcryptjs');
 
// Method override middleware
router.use(methodOverride('_method'));

require('../models/Users');
const Users = mongoose.model('users');


router.get('/:userName',(req,res) => {
  const userName=req.params.userName;
	Users.find({}).then(users =>{
    Users.countDocuments({role:'patient'}).then(countUser =>{
      Users.countDocuments({role:'doctor'}).then(countDocs =>{
      res.render('admin/adminHome',{
      layout:'mainAdmin',
      users: users,
      userName:userName,
      userCount:countUser,
      docCount:countDocs
    });
      });
    });
	});
});


router.get('/:userName/notification', (req, res) => {
  const userName=req.params.userName;
  res.render('admin/notification',{
  	layout:'mainAdmin',
    userName:userName
  });
});

router.get('/:userName/patientTable', (req, res) => {
  const userName=req.params.userName;
  Users.find({role:'patient'}).then((users) => {
    res.render('admin/patientTable',{
    layout:'mainAdmin',
    userName:userName,
    users:users
  });
  })
});

router.get('/:userName/doctorTable', (req, res) => {
  const userName=req.params.userName;
  Users.find({role:'doctor'}).then((users) => {
    res.render('admin/doctorTable',{
    layout:'mainAdmin',
    userName:userName,
    users:users
  });
  })
});

router.get('/:userName/adminProfile', (req, res) => {
  const userName=req.params.userName;
  Users.findOne({userName:userName}).then((user) => {
    const dob=dateFormat(user.dob, "isoDate");
    res.render('admin/adminProfile',{
    layout:'mainAdmin',
    userName:userName,
    user:user,
    dob:dob
  });
  })
});

router.get('/:userName/changePassword', (req, res) => {
  const userName=req.params.userName;
  res.render('admin/changePassword',{
  	layout:'mainAdmin',
    userName:userName
  });
});


router.get('/:userName/adminMail', (req, res) => {
  const userName=req.params.userName;
  res.render('admin/adminMail',{
  	layout:'mainAdmin',
    userName:userName
  });
});

router.get('/:userName/patientTable/:id', (req, res) => {
  const userName=req.params.userName;
  const id=req.params.id;
  Users.findOne({_id:id}).then((user) =>{
    const dob=dateFormat(user.dob, "isoDate");
    res.render('admin/viewPatient',{
    layout:'mainAdmin',
    userName:userName,
    patient:user,
    ptDob:dob
  });
  });
});

router.delete('/:userName/patientTable/:id', (req,res) =>{
  const id=req.params.id;
  const userName=req.params.userName;
  Users.deleteOne({_id:id}).then(() => {
    res.redirect('/admin/'+userName+'/patientTable')});
});

router.get('/:userName/doctorTable/:id', (req, res) => {
  const userName=req.params.userName;
  const id=req.params.id;
  Users.findOne({_id:id}).then((user) =>{
    const dob=dateFormat(user.dob, "isoDate");
    res.render('admin/viewDoctor',{
    layout:'mainAdmin',
    userName:userName,
    doctor:user,
    docDob:dob
  });
  });
});
router.delete('/:userName/doctorTable/:id', (req,res) =>{
  const id=req.params.id;
  const userName=req.params.userName;
  Users.deleteOne({_id:id}).then(() => {
    res.redirect('/admin/'+userName+'/doctorTable')});
});



router.get('/:userName/editAdminProfile', (req, res) =>{
  const userName=req.params.userName;
  Users.findOne({userName:userName}).then((user=>{
    const dob=dateFormat(user.dob, "isoDate");
    res.render('admin/editAdminProfile',{
    layout:'mainAdmin',
    userName:userName,
    user:user,
    dob:dob
  });
  }));
});

router.put('/:userName/editAdminProfile',(req, res) =>{
  const userName=req.params.userName;
  Users.findOne({userName:userName}).then((user) =>{
    user.name = req.body.name;
    user.email = req.body.email;
    user.contact = req.body.contact;
    user.dob = req.body.dob;
    user.save().then((user) =>{
      res.redirect('/admin/'+user.userName+'/adminProfile');
    })
  })
});



router.get('/:userName/changePassword', (req, res) =>{
  const userName=req.params.userName;
  Users.findOne({userName:userName}).then((user=>{
    res.render('admin/changePassword',{
      layout:'mainAdmin',
      userName:userName,
      user:user
    })
  }));
});

router.put('/:userName/changePassword', (req, res) =>{
  const userName=req.params.userName;
  Users.findOne({userName:userName}).then((user =>{
    bcrypt.compare(req.body.currentPassword, user.password, function(err, result) {
    if(result){
      if(req.body.newPassword==req.body.newPasswordCheck){
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
            if(err) throw err;
            user.password = hash;
            user.save().then((user) =>{
              res.redirect('/admin/'+user.userName);
            });
          });
        });
      }
    }
    });
  }));
});

module.exports = router;