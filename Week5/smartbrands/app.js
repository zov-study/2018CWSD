const express  = require('express');
const exphbs   = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');

const app = express();
const port = process.env.PORT || 3000;

// Load routes
const customers = require('./routes/customers');
const users = require('./routes/users');

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/database');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
//Connect to DataBase
mongoose.connect(db.mongoURI)
.then(()=>console.log('MongoDb Connected'))
.catch(err => console.log(err));

// Handlebars MiddleWare
app.engine('handlebars',exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname,'public')));


// Method override middleware
app.use(methodOverride('_method'));

// Express session middleware
app.use(session({
    secret: 'smartbrands key',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Flash middleware
app.use(flash());

// Global variable
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Index Route
app.get('/',(req,res)=>{
    res.redirect('/customers/subscribe');
    // const title = "SHOP SMART PAY LESS!!!";
    // res.render('index',{
    //     title: title
    // });
});

// About page
app.get('/about',(req,res)=>{
    const title = 'OUR PRODUCTS';
    // console.log(req.name);
    res.render('about',{
        title:title
    });
});

// Use routes
app.use('/customers',customers);
app.use('/users',users);


app.listen(port, ()=>{
    console.log(`Server starting on port ${port}`);
});