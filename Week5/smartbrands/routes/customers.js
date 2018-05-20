const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');
// Load Customer Model
require('../models/Customer');
const Customer = mongoose.model('customers');


// Customers Index Page
router.get('/', ensureAuthenticated, (req,res)=>{
    // Customer.find({user: req.user.id})
    Customer.find()
    .sort({date:'desc'})
    .then(customers =>{
        res.render('customers/index', {
            customers:customers
        });
    });
});

// Customer Subscribe Form ensureAuthenticated,
router.get('/subscribe',  (req,res)=>{
    res.render('customers/subscribe');
});

// Customer Edit Form
router.get('/edit/:id', ensureAuthenticated, (req,res)=>{
    Customer.findOne({
        _id: req.params.id
    })
    .then(customer => {
        // if(customer.user!= req.user.id){
        //     req.flash('error_msg', 'Not Authorized');
        //     res.redirect('/customers');
        // } else {
            res.render('customers/edit',{
                customer:customer
            });
        // }    
    });
});

// Edit Form submit
router.put('/:id', ensureAuthenticated, (req,res)=>{
    Customer.findOne({
        _id: req.params.id
    })
    .then(customer => {
        customer.name = req.body.name;
        customer.phone = req.body.phone;
        customer.district = req.body.district;
        customer.email = req.body.email;
        customer.save()
            .then(customer =>{
                req.flash('success_msg','Customer details updated!');
                res.redirect('/customers');
            })
    });
});

// Delete Form process
router.delete('/:id', ensureAuthenticated, (req, res) =>{
    Customer.remove({_id: req.params.id})
    .then(()=>{
        req.flash('success_msg','Customer removed!');
        res.redirect('/customers');
    });
});


// Process Form ensureAuthenticated,
router.post('/', (req,res)=>{
    let errors =[];
    if(!req.body.name){
        errors.push({text:'Please provide your name'});
    }
    if(!req.body.phone){
        errors.push({text:'Please provide your contact phone'});
    }
    if(!req.body.district){
        errors.push({text:'Please provide your location'});
    }
    if(!req.body.email){
        errors.push({text:'Please leave your email'});
    }
    if(errors.length>0){
        res.render('customers/subscribe',{
            errors: errors,
            name: req.body.name,
            phone: req.body.phone,
            district: req.body.district,
            email: req.body.email
        });
    } else {
        let newCustomer = {
            name: req.body.name,
            phone: req.body.phone,
            district: req.body.district,
            email: req.body.email,
            user: 'req.user.id'
        }
        new Customer(newCustomer)
            .save()
            .then(customer => {
                req.flash('success_msg','You have subscribed!');
                res.redirect('/customers/subscribe');
            })
    }
});

module.exports = router;