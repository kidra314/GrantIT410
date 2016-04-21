/**
 * Created by Grant on 4/9/2016.
 */
var express  = require('express');
var mongoose = require('mongoose');
var configDB = require('../config/database.js');
var userSchema = require('./models/user.js');
var abComics = require('./models/comics.js');
var configDB = require('../config/database.js');

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.locals.url = req.originalUrl;
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/admin', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/admin', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    ////in order to see this page you need to be logged in
    //app.get('/admin', isLoggedIn, function(req, res) {
    //    userSchema.find({}, function(err, usrs){
    //        console.log("something happened");
    //        console.log(usrs);
    //        renderResults(res, usrs, isLoggedIn, req, "User List from MongoDB :");
    //    })
    //
    //});
    ////the results for the admin page
    //function renderResults(res, usrs, isLoggedIn, req, msg){
    //    res.render('admin.ejs', {
    //        user : req.user,
    //        message:msg,
    //        myUserList: usrs}
    //    );
    //}
//in order to see this page you need to be logged in
    app.get('/admin', isLoggedIn, function(req, res) {
        abComics.find({}, function(err, abComics){
            console.log("something happened");
            console.log(abComics);
            renderResults(res, abComics, isLoggedIn, req, "Comic List from MongoDB :");
        })

    });
    //the results for the admin page
    function renderResults(res, abComics, isLoggedIn, req, msg){
        res.render('admin.ejs', {
            user : req.user,
            message:msg,
            myComicList: abComics}
        );
    }


    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    //this is to add the info for another comic
    app.get('/addcomic', function(req,res) {
        res.render('addcomic.ejs');
    });

    app.post('/new', function(req, res){
        new abComics({
            comicNum : req.body.comicNum,
            comment  : req.body.comment,
            published   : req.body.published
        }).save(function(err, prd){
            if(err) res.json(err);
            //else    res.send("Comic Successfully Added !");
            else    res.render('admin.ejs');
        });
    });

    app.post('/editComment', function(req, res){
        console.log(req.body.comicNum);
        abComics.update(
            { comicNum: req.body.comicNum },
            {
                 comment: req.body.comment  , published :  req.body.published
            }
        )
    })
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the login
    res.redirect('/login');
}