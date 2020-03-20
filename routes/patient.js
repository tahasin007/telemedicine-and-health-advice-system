const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');
const {ensureAuthenticated} = require('../helpers/auth');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const dateFormat = require('dateformat');
const bcrypt = require('bcryptjs');
const moment = require('moment');
  
// Method override middleware
router.use(methodOverride('_method'));

require('../models/Schedule');
require('../models/Users');
require('../models/Appointmet');
require('../models/Disease');
require('../models/Diagnosis');
const Users = mongoose.model('users');
const Schedule = mongoose.model('schedule');
const Appointmet = mongoose.model('appointment');
const Diagnosis = mongoose.model('diagnosis');
const Disease = mongoose.model('disease');

router.get('/:userName',(req, res) => {
  const userName=req.params.userName;
  Users.findOne({userName:userName}).then((users) =>{
    res.render('patient/patientHome',{
    layout:'mainPatient',
    userName:userName,
    user:users
  });
  });
});

router.get('/:userName/notification', (req, res) => {
  const userName=req.params.userName;
  res.render('patient/notification',{
  	layout:'mainPatient',
    userName:userName
  });
});

router.get('/:userName/symptompChecker', (req, res) => {
  const userName=req.params.userName;
  res.render('patient/symptompChecker',{
    layout:'mainPatient',
    userName:userName
  });
});

router.post('/:userName/symptompChecker', (req, res ,next) => {
  const arr=[];
  const userName=req.params.userName;
  var text=req.body.symptom.split(":");
  for(var i=0; i<text.length;i++)text[i]=text[i].trim();
  if(req.body.fever)arr.push(req.body.fever);
  if(req.body.vomiting)arr.push(req.body.vomiting);
  if(req.body.nausea)arr.push(req.body.nausea);
  if(req.body.loss_of_appetite)arr.push(req.body.loss_of_appetite);
  if(req.body.cough)arr.push(req.body.cough);
  if(req.body.abdominal_pain)arr.push(req.body.abdominal_pain);
  if(req.body.fatigue)arr.push(req.body.fatigue);
  if(req.body.sweating)arr.push(req.body.sweating);
  if(req.body.shortness_of_breath)arr.push(req.body.shortness_of_breath);
  if(req.body.headache)arr.push(req.body.headache);
  if(req.body.chest_pain)arr.push(req.body.chest_pain);
  if(req.body.chills)arr.push(req.body.chills);
  if(req.body.breathing_difficulties)arr.push(req.body.breathing_difficulties);
  if(req.body.wheezing)arr.push(req.body.wheezing);
  if(req.body.weight_loss)arr.push(req.body.weight_loss);
  let difference = text.filter(x => !arr.includes(x));
  const aggArr = arr.concat(difference);
  Diagnosis.find().then((report)=>{
        report.forEach(rpt=>{
          rpt.remove();})
        });
  Users.findOne({userName:req.params.userName}).then((user) => {
    Disease.find().then(diseases =>{
    diseases.forEach(disease =>{
      const arrLen = disease.symptom.length;
      var match =0;
      for (var i = 0; i < arrLen;i++){
        for (var j = 0; j < aggArr.length;j++){
            if(disease.symptom[i] == aggArr[j])match++;
        }
      }
      var Res=0;
      if(match>0)Res=(match/arrLen)*90;
      disease.probability = Res;
      disease.save();
      const newDiagnosis =new Diagnosis({
          diseaseId:disease._id,
          patientId:user._id,
          probability:Res
      });
        newDiagnosis.save();
    });
  })
  });
  res.redirect('/patient/'+userName+'/diagnosisRes');
});

router.get('/:userName/doctors', (req, res) => {
  const userName=req.params.userName;
  Users.find({role:'doctor'}).then((users) => {
    res.render('patient/doctors',{
    layout:'mainPatient',
    userName:userName,
    doctors:users
  });
  })
});

router.get('/:userName/diagnosisRes', (req, res) =>{
  const userName=req.params.userName;
  Users.findOne({userName:userName }).then((user) => {
    Diagnosis.find({patientId:user._id }).populate('diseaseId').limit(3).sort({probability:-1}).then((rpts)=>{
        res.render('patient/symptomRes',{
        layout:'mainPatient',
        userName:userName,
        rpts:rpts
      });
    })
    
  })
  
});

router.get('/:userName/changePassword', (req, res) => {
  const userName=req.params.userName;
  res.render('patient/changePassword',{
  	layout:'mainPatient',
    userName:userName
  });
});



router.get('/:userName/patientProfile', (req, res) => {
  const userName=req.params.userName;
  Users.findOne({userName:userName}).then((users) =>{
    const dob=dateFormat(users.dob, "isoDate");
    res.render('patient/patientProfile',{
    layout:'mainPatient',
    userName:userName,
    user:users,
    dob:dob
  });
  });
});



router.get('/:userName/viewDocProfile/:id', (req, res) => {
  const userName=req.params.userName;
  const id=req.params.id;
  Users.findOne({_id:req.params.id}).then((user) => {
      Schedule.findOne({doctorId:user._id}).then((schedule) => {
        res.render('patient/viewDocProfile',{
      layout:'mainPatient',
      userName:userName,
      doctor:user,
      schedule:schedule
  });
    })
  });
});


router.get('/:userName/patientMail', (req, res) => {
  const userName=req.params.userName;
  res.render('patient/patientMail',{
  	layout:'mainPatient',
    userName:userName
  });
});

router.get('/:userName/editPatientProfile', (req, res) => {
  const userName=req.params.userName;
  Users.findOne({userName:userName}).then((user) => {
    const dob=dateFormat(user.dob, "isoDate");
    res.render('patient/editPatientProfile',{
    layout:'mainPatient',
    userName:userName,
    user:user,
    dob:dob
  });
  })
});

router.put('/:userName/editPatientProfile',(req, res) =>{
  const userName=req.params.userName;
  Users.findOne({userName:userName}).then((user) =>{
    user.name = req.body.name;
    user.email = req.body.email;
    user.contact = req.body.contact;
    user.dob = req.body.dob;
    user.save().then((user) =>{
      res.redirect('/patient/'+user.userName+'/patientProfile');
    })
  })
});



router.get('/:userName/changePassword', (req, res) =>{
  const userName=req.params.userName;
  Users.findOne({userName:userName}).then((user=>{
    res.render('patient/changePassword',{
      layout:'mainPatient',
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
              res.redirect('/patient/'+user.userName);
            });
          });
        });
      }
    }
    });
  }));
});


//routing for  appointment
router.get('/:userName/viewDocProfile/:doc/:dayNo', (req, res) => {
  const patient=req.params.userName;
  const docID = req.params.doc;
  const dayNo=req.params.dayNo;
  Users.findOne({userName:patient}).then((user) => {
    Schedule.findOne({doctorId:docID}).then((schedule) => {
    Appointmet.countDocuments({$and:[{scheduleId:schedule._id},{docId:docID}]}).then((appointment) => {

        let nextDay = (Number(dayNo)+6-1)%6;
        if(dayNo == 0)nextDay = 6; 

      if (appointment == 0 ){//if no appointment
        for(let i=0;i<schedule.slot[dayNo].length;i++){
          if(schedule.slot[dayNo][i]==0){
            schedule.slot.set(dayNo,changeSlotToOne(schedule.slot[dayNo],i));
            schedule.save();
            createAppointment(nextDay,schedule.start[dayNo],docID,user._id,schedule._id,'regular',i,'pending');
            req.session.message ={
              type:'success',
              msg:'Appointmet has been scheduled'
            }
            res.redirect('/patient/'+user.userName+'/viewDocProfile/'+docID);
          break;
          }//end  inner if
        }//end for
      }//end if
      else{
        Appointmet.find({$and:[{scheduleId:schedule._id},{docId:docID}]}).then((appointments) => {
          let count = 0 ;
          var slot = [];
          appointments.forEach((apt) => {
            const d = setDate(nextDay,schedule.start[dayNo]);
            if(dateFormat(d,"shortDate")==dateFormat(apt.appointmentDate,"shortDate")){
              count++;
              slot.push(apt.slotNo);
            }
          });
          if(count==0){
            for(let i=0;i<schedule.slot[dayNo].length; i++){
              if(schedule.slot[dayNo][i] == 0){
                schedule.slot.set(dayNo,changeSlotToOne(schedule.slot[dayNo],i));
                schedule.save();
                createAppointment(nextDay,schedule.start[dayNo],docID,user._id,schedule._id,'regular',i,'pending');
                req.session.message ={
                type:'success',
                msg:'Appointmet Schedule has been scheduled'
                }
                res.redirect('/patient/'+user.userName+'/viewDocProfile/'+docID);
                break;
              }
            }
          }
          else if(slot.length>0){
            let arr=[];
            for(var i = 0; i < schedule.slot[dayNo].length; i++){
              if(schedule.slot[dayNo][i]==0)arr.push(i);
            }
            arr = arr.filter(item => !slot.includes(item));
            if(arr.length > 0){
           
              const slotNo=arr.shift();
              const start=schedule.start[dayNo];
              const time=start.split(':');
              var i1=Number(time[0]*60)+Number(time[1]);
              for(var j=0; j<slotNo; j++)i1=i1+30;
              const div=Math.floor(i1/60);
              const rem=i1%60;
              let s1,s2,startTime;
              if(div<10)s1='0'+String(div);
              if(div>=10)s1=String(div);
              if(rem==0)s2=String("00")
              if(rem>0)s2=String(rem);
              startTime=s1+":"+s2;
              schedule.slot.set(dayNo,changeSlotToOne(schedule.slot[dayNo],slotNo));
              schedule.save();
              createAppointment(nextDay,startTime,docID,user._id,schedule._id,'regular',slotNo,'pending');
              req.session.message ={
              type:'success',
              msg:'Appointmet Schedule has been scheduled'
            }
              res.redirect('/patient/'+user.userName+'/viewDocProfile/'+docID);
            }
            else{
              //message no empty slot
              req.session.message ={
              type:'danger',
              msg:'Schedule Busy'
            }
              res.redirect('/patient/'+user.userName+'/viewDocProfile/'+docID);
            }//end else no slot found
          }
          else{
            // total fail
            req.session.message ={
              type:'danger',
              msg:'Schedule Busy'
            }
            res.redirect('/patient/'+user.userName+'/viewDocProfile/'+docID);
          }
        });
    }//end else
    }) 
  });
  })
   // res.redirect('/patient/'+req.params.userName+'/patientProfile');
});


function createAppointment(datNo,stime,docId,patientId,scheduleId,type,slotNo,status){
        const d = new Date();
        d.setDate(d.getDate() + (datNo - 1 - d.getDay() + 7) % 7 + 1);
        const year=d.getFullYear();
        const month=d.getMonth();
        const day=d.getDate();
        const str=stime;
        const time=str.split(":");
        const date = new Date(year, month, day, time[0], time[1]);
        const newAppointment = new Appointmet(
        {
          docId:docId,
          patientId:patientId,
          scheduleId:scheduleId,
          appointmentType:type,
          appointmentDate:date,
          appointmentEnd:findEndTime(date),
          slotNo:slotNo,
          status:status
        });
        newAppointment.save();

}

function findEndTime(date){
  return moment(new Date(date)).add(30, 'm').toDate();
}

function setDate(datNo,stime){
  const d = new Date();
  d.setDate(d.getDate() + (datNo - 1 - d.getDay() + 7) % 7 + 1);
  const year=d.getFullYear();
  const month=d.getMonth();
  const day=d.getDate();
  const str=stime;
  const time=str.split(":");
  const date = new Date(year, month, day, time[0], time[1]);
  return date;
}

function changeSlotToOne(slotArr,changeSlot){
  slotArr[changeSlot] = 1;
  return slotArr;
}

module.exports = router;