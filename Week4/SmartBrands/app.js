const express  = require('express');
const exphbs   = require('express-handlebars');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
//Connect to DataBase
mongoose.connect('mongodb://localhost/smartbrands')
.then(()=>console.log('MongoDb Connected'))
.catch(err => console.log(err));

// Load Idea Model
require('./models/Idea');
const Idea = mongoose.model('ideas');

// Handlebars MiddleWare
app.engine('handlebars',exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Method override middleware
app.use(methodOverride('_method'));

// How middleware works?
// app.use((req,res,next)=>{
//     // console.log(Date.now());
//     req.name='Oleg Zakharov';
//     next();
// })

// Index Route
app.get('/',(req,res)=>{
    const title = "SHOP SMART PAY LESS!!!";
    res.render('index',{
        title: title
    });
});

// About page
app.get('/about',(req,res)=>{
    // console.log(req.name);
    res.render('about');
});

// Idea Index Page
app.get('/ideas',(req,res)=>{
    Idea.find({})
    .sort({date:'desc'})
    .then(ideas =>{
        res.render('ideas/index', {
            ideas:ideas
        });
    });
});

// Idea Add Form
app.get('/ideas/add',(req,res)=>{
    res.render('ideas/add');
});

// Idea Edit Form
app.get('/ideas/edit/:id',(req,res)=>{
    Idea.findOne({
        _id: req.params.id
    })
    .then(idea => {
        res.render('ideas/edit',{
            idea:idea
        });
    });
});

// Edit Form process
app.put('/ideas/:id', (req,res)=>{
    Idea.findOne({
        _id: req.params.id
    })
    .then(idea => {
        idea.title = req.body.title;
        idea.details = req.body.details;
        idea.save()
            .then(idea =>{
                res.redirect('/ideas');
            })
    });
});

// Process Form
app.post('/ideas',(req,res)=>{
    let errors =[];
    if(!req.body.title){
        errors.push({text:'Please add a title'});
    }
    if(!req.body.details){
        errors.push({text:'Please add some details'});
    }
    if(errors.length>0){
        res.render('ideas/add',{
            errors: errors,
            title: req.body.title,
            details: req.body.details
        });
    } else {
        let newUser = {
            title: req.body.title,
            details: req.body.details
        }
        new Idea(newUser)
            .save()
            .then(idea => {
                res.redirect('/ideas');
            })
            // .catch(err => console.log(err));
        // res.send(newUser);
    }
});

app.listen(port, ()=>{
    console.log(`Server starting on port ${port}`);
});