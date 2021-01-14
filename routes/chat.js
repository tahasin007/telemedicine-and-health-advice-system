const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/Users');
const Users = mongoose.model('users');
require('../models/Message');
const Message = mongoose.model('message');

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

router.post('/getProfileImage', (req, res)=>{
Users.findOne({userName:req.body.userName}).then((user)=>{
  res.send(user.profileImage);
})
});

module.exports = router;
