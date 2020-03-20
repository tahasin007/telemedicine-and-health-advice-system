const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');
const {ensureAuthenticated} = require('../helpers/auth');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bcrypt = require('bcryptjs');
const dateFormat = require('dateformat');
const date = require('date-and-time');
const moment = require('moment');

// Method override middleware
router.use(methodOverride('_method'));

require('../models/Schedule');
require('../models/Users');
require('../models/Appointmet');
const Users = mongoose.model('users');
const Schedule = mongoose.model('schedule');
const Appointmet = mongoose.model('appointment');

app.use(express.static(path.join(__dirname, 'public')));
const {
  formatDate,
  formatDateSub
} = require('../helpers/hbs');


const dayArr=['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'];

router.get('/:userName', (req, res) => {
  const userName=req.params.userName;
  Users.findOne({userName:userName}).then((user) => {
      Appointmet.find({$and:[{docId:user._id},{status:'pending'}]}).populate('docId').populate('patientId').exec().then(result => {
      res.render('doctor/doctorHome',{
        helpers : {
        formatDate:formatDate},
        layout:'mainDoc',
        userName:userName,
        apts:result
        });
    });
  });
});


router.get('/:userName/notification', (req, res) => {
  const userName=req.params.userName;
  res.render('doctor/notification',{
  	layout:'mainDoc',
    userName:userName
  });
});


router.get('/:userName/changePassword', (req, res) => {
  const userName=req.params.userName;
  res.render('doctor/changePassword',{
  	layout:'mainDoc',
    userName:userName
  });
});


router.get('/:userName/doctorProfile', (req, res) => {
  const userName=req.params.userName;
  Users.findOne({userName:userName}).then((user) => {
    const dob=dateFormat(user.dob, "isoDate");
    res.render('doctor/doctorProfile',{
  	layout:'mainDoc',
    userName:userName,
    user:user,
    dob:dob
  });
  });
});


router.get('/:userName/patient', (req, res) => {
  const userName=req.params.userName;
  Users.findOne({userName:userName}).then((user) => {
      Appointmet.find({$and:[{docId:user._id},{status:'done'}]}).populate('docId').populate('patientId').exec().then(result => {
      res.render('doctor/patientTable',{
        helpers : {
        formatDate:formatDate},
        layout:'mainDoc',
        userName:userName,
        apts:result
        });
    });
  });
  
});


router.get('/:userName/appointment', (req, res) => {
  const userName=req.params.userName;
  Users.findOne({userName:userName}).then((user) => {
      Appointmet.find({$and:[{docId:user._id},{status:'accepted'}]}).populate('docId').populate('patientId').exec().then(result => {
      res.render('doctor/appointmentTable',{
        helpers : {
        formatDate:formatDate},
        layout:'mainDoc',
        userName:userName,
        apts:result
        });
    });
  });

});


router.get('/:userName/schedule', (req, res) => {
  const userName=req.params.userName;
  Users.findOne({userName:userName}).then((user)=>{
    Schedule.findOne({doctorId:user._id}).then((doctor)=>{

    res.render('doctor/docSchedule',{
    layout:'mainDoc',
    userName:userName,
    schedule:doctor
      });
    });
  });
});


router.get('/:userName/viewPatient/:aptId', (req, res) => {
  const userName=req.params.userName;
  const patient=req.params.patientId;
  const aptId=req.params.aptId;
  Users.findOne({userName:userName}).then((user)=>{
    Appointmet.findOne({_id:aptId}).populate('docId').populate('patientId').exec().then(result => {
      res.render('doctor/viewPatient',{
        helpers : {
        formatDate:formatDate},
        layout:'mainDoc',
        userName:userName,
        apt:result
        });
    });
  })
});


router.get('/:userName/acceptPatient/:aptId', (req, res) => {
  const aptId=req.params.aptId;
  const userName=req.params.userName;
  Appointmet.findById({_id:aptId}).then(result=>{
    result.status = 'accepted';
    result.save().then((r)=>{
      res.redirect('/doctor/'+userName);
    })
  })
  
});


router.get('/:userName/rejectPatient/:aptId', (req, res) => {
  const userName=req.params.userName;
  const aptId=req.params.aptId;
  Appointmet.findById({_id:aptId}).then(result=>{
    result.status = 'rejected';
    result.save().then((r)=>{
      res.redirect('/doctor/'+userName);
    })
  })
  
});


router.get('/:userName/patientForm', (req, res) => {
  const userName=req.params.userName;
  res.render('doctor/patientForm',{
  	layout:'mainDoc',
    userName:userName
  });
});


router.get('/:userName/editDoctorProfile', (req, res) => {
  const userName=req.params.userName;
  Users.findOne({userName:userName}).then((user=>{
    const dob=dateFormat(user.dob, "isoDate");
    res.render('doctor/editDoctorProfile',{
  	layout:'mainDoc',
    userName:userName,
    user:user,
    dob:dob
  });
  }));
});


router.put('/:userName/editDoctorProfile',(req, res) =>{
  const userName=req.params.userName;
  Users.findOne({userName:userName}).then((user) =>{
    user.name = req.body.name;
    user.email = req.body.email;
    user.contact = req.body.contact;
    user.chamber = req.body.chamber;
    user.degree = req.body.degree;
    user.education = req.body.education;
    user.save().then((user) =>{
      res.redirect('/doctor/'+user.userName+'/doctorProfile');
    })
  })
});


router.get('/:userName/changePassword', (req, res) =>{
  const userName=req.params.userName;
  Users.findOne({userName:userName}).then((user=>{
    res.render('doctor/changePassword',{
      layout:'mainDoc',
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
              res.redirect('/doctor/'+user.userName);
            });
          });
        });
      }
    }
    });

  }));
});


router.get('/:userName/doctorMail', (req, res) => {
  const userName=req.params.userName;
  res.render('doctor/doctorMail',{
    layout:'mainDoc',
    userName:userName
  });
});

router.get('/:userName/editSchedule', (req, res) => {
  const userName=req.params.userName;
  Users.findOne({userName:userName}).then((user =>{
    Schedule.findOne({doctorId:user._id}).then((schedule ) =>{
      res.render('doctor/editSchedule',{
      layout:'mainDoc',
      userName:userName,
      schedule:schedule 
      });
    });
  }));
});


router.put('/:userName/editSchedule', (req, res) => {
  const userName=req.params.userName;
  const satStart=req.body.satStart;
  const satEnd=req.body.satEnd;

  const sunStart=req.body.sunStart;
  const sunEnd=req.body.sunEnd;

  const monStart=req.body.monStart;
  const monEnd=req.body.monEnd;

  const tueStart=req.body.tueStart;
  const tueEnd=req.body.tueEnd;

  const wedStart=req.body.wedStart;
  const wedEnd=req.body.wedEnd;

  const thurStart=req.body.thurStart;
  const thurEnd=req.body.thurEnd;

  const friStart=req.body.friStart;
  const friEnd=req.body.friEnd;


    Users.findOne({userName:userName}).then((user) => {
      Schedule.findOne({doctorId:user._id}).then((result) => {
        if(result){
          result.start = [];
          result.end = [];
          result.slot =[];
          result.start.push(satStart,sunStart,monStart,tueStart,wedStart,thurStart,friStart);
          result.end.push(satEnd,sunEnd,monEnd,tueEnd,wedEnd,thurEnd,friEnd);

          const satSlot = [];
          if(satStart && satEnd){
            const arr=calCulateSlot(satStart,satEnd);
            for(let i=0;i<arr.length;i++){satSlot.push(arr[i]);}
          }
          result.slot.push(satSlot);

          const sunSlot = [];
          if(sunStart && sunEnd){
            const arr=calCulateSlot(sunStart,sunEnd);
            for(let i=0;i<arr.length;i++){sunSlot.push(arr[i]);}
          }
          result.slot.push(sunSlot);

          const monSlot =[];
          if(monStart && monEnd){
            const arr=calCulateSlot(monStart,monEnd);
            for(let i=0;i<arr.length;i++){monSlot.push(arr[i]);}
          }
          result.slot.push(monSlot);

          const tueSlot =[];
          if(tueStart && tueEnd){
            const arr=calCulateSlot(tueStart,tueEnd);
            for(let i=0;i<arr.length;i++){tueSlot.push(arr[i]);}
          }
          result.slot.push(tueSlot);

          const wedSlot =[];
          if(wedStart && wedEnd){
            const arr=calCulateSlot(wedStart,wedEnd);
            for(let i=0;i<arr.length;i++){wedSlot.push(arr[i]);}
          }
          result.slot.push(wedSlot);

          const thurSlot =[];
          if(thurStart && thurEnd){
            const arr=calCulateSlot(thurStart,thurEnd);
            for(let i=0;i<arr.length;i++){thurSlot.push(arr[i]);}
          }
          result.slot.push(thurSlot);

          const friSlot =[];
          if(friStart && friEnd){
            const arr=calCulateSlot(friStart,friEnd);
            for(let i=0;i<arr.length;i++){friSlot.push(arr[i]);}
          }
          result.slot.push(friSlot);
          result.save();
        }//end if
        else{
          const newSchedule = new Schedule({
              doctorId : user._id,

              start:[
              satStart,sunStart,monStart,tueStart,wedStart,thurStart,friStart
              ],
              end:[
              satEnd,sunEnd,monEnd,tueEnd,wedEnd,thurEnd,friEnd
              ],

              slot:[
              calCulateSlot(satStart,satEnd),
              calCulateSlot(sunStart,sunEnd),
              calCulateSlot(monStart,monEnd),
              calCulateSlot(tueStart,tueEnd),
              calCulateSlot(wedStart,wedEnd),
              calCulateSlot(thurStart,thurEnd),
              calCulateSlot(friStart,friEnd),
              ],
          });
          newSchedule.save().then((res)=>{
          });
        }//end else
      });
    });
  res.redirect('/doctor/'+userName+'/schedule');
});

//Will show Slots of a Particular Day
router.get('/:userName/:dayNo',(req,res) =>{
  const timeObj = [];
  const userName=req.params.userName;
  const dayNo=req.params.dayNo;
  var tempTime;
  Users.findOne({userName:userName}).then((user) =>{
    Schedule.findOne({doctorId:user._id}).then((schedule) =>{
      tempTime=schedule.start[dayNo];
        for(let i=0;i<schedule.slot[dayNo].length;i++){
          const tempArr=addThirtyMin(tempTime);
          tempTime=tempArr[1];
          const status = schedule.slot[dayNo][i];
          let condition;
          if(status == 0)condition = 'Free'
          else if(status == 1)condition = 'Booked'
          timeObj.push({start:tempArr[0],end:tempArr[1],status:condition})
        }
        res.render('doctor/docScheduleSlot',{
        layout:'mainDoc',
        userName:userName,
        day:dayArr[dayNo],
        timeObj:timeObj
      });
    });
  });
});

//Calculate Number of Slot
function calCulateSlot(start,end){
  const s=start.split(":");
  const e=end.split(":");
  const i1=Number(s[0]*60)+Number(s[1]);
  const i2=Number(e[0]*60)+Number(e[1]);
  const arr=[];
  for(let i=i1;i<i2;i=i+30)arr.push(0)
  return arr;
}


//Parameter will be a string(12:30/HH:MM) and will return two string inverval Ex:12:30,13:00
function addThirtyMin(str){
const start=str.split(':');
const minS=Number(start[0]*60)+Number(start[1]);
const minE=minS+30;
return [minToStrTime(minS),minToStrTime(minE)];
}

//Parameter will be  minutes in number and will return HH:MM formatted string
function minToStrTime(min){
  const div=Math.floor(min/60);
  const rem=min%60;
  let s1,s2,time;
  if(div<10)s1='0'+String(div);
  if(div>=10)s1=String(div);
  if(div>=24)s1=String("00");
  if(rem==0)s2=String("00");
  if(rem>0)s2=String(rem);
  time=s1+":"+s2;
  return time;
}


module.exports = router;