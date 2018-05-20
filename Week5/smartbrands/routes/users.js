const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');
const router = express.Router();

// Load User Model
require('../models/User');
const User = mongoose.model('users');

// User login route
router.get('/login',(req,res)=>{
    res.render('users/login');
});

// Login Form POST
router.post('/login',(req, res, next)=>{
    passport.authenticate('local', {
        successRedirect: '/customers',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// User register route
router.get('/register',(req,res)=>{
    res.render('users/register');
});

// Register Form POST
router.post('/register',(req,res)=>{
    let errors= []

    if (req.body.password != req.body.password2){
        errors.push({text: 'Password does not match!'});
    }

    if (req.body.password.length < 4 ){
        errors.push({text: 'Password must be at least 4!'});
    }
    // console.log(req.body);
    if (errors.length > 0){
        res.render('users/register', {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2
        });

    } else {
        User.findOne({email: req.body.email})
            .then(user => {
                if (user){
                    req.flash('error_msg','Email already registered');
                    res.redirect('/users/register');
                } else {
                        let newUser  = new User({
                            name: req.body.name,
                            email: req.body.email,
                            password: req.body.password,
                        });
                        
                        bcrypt.genSalt(15,(err,salt)=>{
                            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                                if(err) throw err;
                                newUser.password = hash;
                                newUser.save()
                                .then(user => {
                                    req.flash('success_msg','You are now registered and can log in');
                                    res.redirect('/users/login');
                                })
                                .catch(err =>{
                                    console.log(err);
                                    return;
                                });
                            });
                        });
                    }
            })
        }

    });

// Logout User
router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg', 'You are logget out');
    res.redirect('/users/login');
});

module.exports = router;
