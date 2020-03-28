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
const socketIO =require('socket.io')

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
mongoose.connect('mongodb+srv://padawan:OYhfnJKfwTYksOWC@firstcluster-cyefr.mongodb.net/myapp', {
	useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


//Load Users Model
require('./models/Users');
const Users = mongoose.model('users');

// Passport Config
require('./config/passport')(passport);


app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Cookie Parser middleware
app.use(cookieParser('secret'));

// Express session midleware
app.use(session({
  secret: 'secret',
  resave: true,
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

//socketIO
const server = http.createServer(app);
const io=socketIO(server);
require('./socket/chat')(io);

app.use('/users', users);
app.use('/admin', admin);
app.use('/patient',patient);
app.use('/doctor',doctor);

const port = 5000;
server.listen(port,()=>{
	console.log(`Server started on port ${port}`);
});