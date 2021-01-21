const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');


require('../models/Users');
const Users = mongoose.model('users');
require('../models/Message');
const Message = mongoose.model('message');
require('../models/Notification');
const Notification = mongoose.model('notification');

router.post('/updateNav', (req, res) => {
  Users.findOne({userName:req.body.userName}).exec().then(user => {
    Notification.find({userId:user._id}).then(notifications => {
      notifications.forEach(notification =>{
        notification.unread = 'no';
        notification.save();
      });
    });
  });
  res.send('success');
});

router.post('/getImage', (req, res, next)=>{
  Users.findOne({userName:req.body.userName}).then((user)=>{
    var current_time =  moment().add(6, 'hours').format('LLL');
    var data={
      image:user.profileImage,
      time:current_time
    };
    res.send(data);
  })
});

router.post('/:name',(req,res,next) => {
  const params = req.params.name.split('.');
  const sender=params[0];
  const receiver=params[1];
  if(req.body.message){
    Users.findOne({userName:sender}).then((sender)=>{
      Users.findOne({userName:receiver}).then((receiver)=>{
        const newMessage = new Message();
        newMessage.sender = sender._id;
        newMessage.receiver = receiver._id;
        newMessage.senderName = sender.userName;
        newMessage.receiverName = receiver.userName;
        newMessage.message = req.body.message;
        newMessage.createdAt = new Date();
        newMessage.save().then(result => {
        })
      });
    });
  }
});



module.exports = router;
