var path = require("path");
var express = require("express");
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes for handlebars
module.exports = function (app) {

	// Sign in page
	app.get("/", function (req, res) {
		res.render("signin")
	});
	app.get("/signin", function (req, res) {
		res.render("signin");
	});
	//Create Account
	app.get("/create-account", function (req, res) {
		res.render("createAccount");
	});



	//Get all assignments
	app.get("/gallery", isAuthenticated, function (req, res) {

		db.Assignment.findAll({ raw: true })
			.then(function (assignmentData) {

				// console.log(assignmentData);

				// Create JSON with data from terminal and pass through in res.render

				res.render("gallery", { Assignments: assignmentData });
			});
	});


	// Create Account
	app.get("/createAccount", function (req, res) {

		res.render("createAccount");
	});
	
	// End passport session on logout
	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

	//Catch all
	app.get("*", function (req, res) {
		res.render("gallery");
	});
};
