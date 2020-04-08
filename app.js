const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const passport = require('passport')
const helpers = require('handlebars-helpers')();
const helperDateFormat=require('handlebars-dateformat');
const cookieParser = require('cookie-parser');
const validator = require('express-validator')
const socketIO =require('socket.io');
const async = require("async");

//Routes
const users = require('./routes/users');
const admin = require('./routes/admin');
const patient = require('./routes/patient');
const doctor = require('./routes/doctor');

// Handlebars Middleware

app.engine('handlebars', expressHandlebars({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  helpers: helpers

}));


app.set('view engine', 'handlebars');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose.connect('mongodb+srv://padawan:dfcdzQYAVdogSBWI@firstcluster-cyefr.mongodb.net/myapp', {
	useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));


//Load Users Model
require('./models/Users');
const Users = mongoose.model('users');
require('./models/Contact');
const Contact = mongoose.model('contact');
require('./models/Message');
const Message = mongoose.model('message');

// Passport Config
require('./config/passport')(passport);


app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Cookie Parser middleware
app.use(cookieParser());


// Express session midleware
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
// Global variables
app.use(function(req, res, next){
  res.locals.message = req.session.message;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  delete req.session.message;
  next();
});

// Method override middleware
app.use(methodOverride('_method'));



//Landing Page Route
app.get('/', (req, res) => {
  res.render('home',{
    layout: 'landingPage'
  });
});

//Contact Page Route
app.get('/contact', (req, res) => {
  res.render('contact',{
    layout: 'landingPage'
  });
});

app.post('/contact',(req, res) => {
  const contact =new Contact({
    name:req.body.name,
    email:req.body.email,
    country:req.body.country,
    phone:req.body.phone,
    message:req.body.message
  });
  contact.save().then((result) =>{
    req.session.message ={
      type:'success',
      msg:'Message sent to admin successfully'
    }
    res.redirect('/');
  });
});

app.post('/chat/:name',(req,res,next) => {
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
          if(sender.role =='patient'){
            res.redirect('/patient/'+sender+'/chat/'+receiver);
          }
          else if(sender.role =='doctor'){
            res.redirect('/doctor/'+sender+'/chat/'+receiver);
          } 
        })

      });
    });
  }
});
// app.get('/doctor/:sender/chat/:receiver',(req,res)=>{
//   Message.find({$or:[{$and:[{senderName:req.params.sender},{receiverName:req.params.receiver}]},
//     {$and:[{senderName:req.params.receiver},{receiverName:req.params.sender}]}]})
//   .populate('sender').populate('receiver').exec((result)=>{
//     console.log(result)
//   });
// });


// app.get('/patient/:sender/chat/:receiver',(req,res)=>{
//   Message.find({$or:[{$and:[{senderName:req.params.sender},{receiverName:req.params.receiver}]},
//     {$and:[{senderName:req.params.receiver},{receiverName:req.params.sender}]}]})
//   .populate('receiver').exec((result)=>{
//     console.log(result)
//   });
// });

//socketIO
const server = http.createServer(app);
const io=socketIO(server);
require('./socket/chat')(io);
require('./socket/videoChat')(io);

app.use('/users', users);
app.use('/admin', admin);
app.use('/patient',patient);
app.use('/doctor',doctor);

const port = 5000;
server.listen(port,()=>{
	console.log(`Server started on port ${port}`);
});