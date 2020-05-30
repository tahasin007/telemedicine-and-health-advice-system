const mongoose = require('mongoose');
const async = require("async");
const express = require('express');
const router = express.Router();
require('../models/Users');
const Users = mongoose.model('users');

router.post('/:receiver',(req,res)=>{
  async.parallel([
    function(callback){
      if(req.body.receiver){
        Users.updateOne({
          'userName':req.body.receiver,
          'request.userId':{$ne:req.body.senderId},
          'friendList.friendId':{$ne:req.body.senderId}
        },
        {
          $push:{
            request:{
              userId:req.body.senderId,
              userName:req.body.sender
            }
          },
          $inc:{totalRequest: 1}
        },(err,count) =>{
          callback(err,count);
        }
        );
      }
    },
    function(callback){
      if(req.body.receiver){
        Users.updateOne({
          'userName':req.body.sender,
          'sentRequest.userName':{$ne: req.body.receiver}
        },{
          $push:{
            sentRequest:{
              userId:req.body.receiverId,
              userName:req.body.receiver
            }
          }
        },(err,count)=>{
          callback(err,count);
        })
      }
    }
    ],(err,result)=>{
      res.redirect('/patient/'+req.body.sender);
    });
  async.parallel([
    function(callback){
      if(req.body.senderId){
        Users.updateOne({
          'userName' : req.body.user,
          'friendList.friendId' : {$ne: req.body.senderId}
        },{
          $push:{
            friendList :{
              friendId:req.body.senderId,
              friendName:req.body.senderName 
            }
          },
          $pull:{
            request:{
              userId:req.body.senderId,
              userName:req.body.senderName
            }
          },
          $inc:{totalRequest:-1}
        },(err,count)=>{
          callback(err,count); 
        });
      }
    },
    function(callback){
      if(req.body.senderId){
        Users.updateOne({
          'userName' : req.body.senderName,
          'friendList.friendId' : {$ne: req.body.userId}
        },{
          $push:{
            friendList :{
              friendId:req.body.userId,
              friendName:req.body.user 
            }
          },
          $pull:{
            sentRequest:{
              userId:req.body.userId,
              userName:req.body.user    
            }
          }
        },(err,count)=>{
          callback(err,count);
        });
      }
    },
    function(callback){
      if(req.body.user_id){
        Users.updateOne({
          '_id' : req.body.user_id,
          'request.userId' : {$eq: req.body.sender_id}
        },{
          $pull:{
            request:{
              userId:req.body.sender_id,
              userName:req.body.sender_name    
            }
          },
          $inc:{totalRequest:-1}
        },(err,count)=>{
          callback(err,count);
        });
      }
    },
    function(callback){
      if(req.body.user_id){
        Users.updateOne({
          '_id' : req.body.sender_id,
          'sentRequest.userId' : {$eq: req.body.user_id}
        },{
          $pull:{
            sentRequest:{
              userId:req.body.user_id,
              userName:req.body.user_name    
            }
          }
        },(err,count)=>{
          callback(err,count);
        });
      }
    }
    ],(err, results)=>{
      res.redirect('/patient/'+req.body.sender);
    })
});

module.exports = router;
