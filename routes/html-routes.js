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

	// View class grades for a single assignment
	app.get("/assignments/:id", isAuthenticated, function (req, res) {

		db.Student.findAll({
			raw: true,
			include: [db.Grade],
			where: {
				UserId: req.user.id
			}
		}).then(function (studentData) {
			console.log(studentData)

			// If there are no students, then shows the page, else it will pull up the page with the student data
			if (studentData.length === 0) {
				res.render("soloAssignment");
			} else {
				let assignmentData = [];
				let studentIdArr = [];
				let studentId = 0;

				for (let i = 0; i < studentData.length; i++) {
					// console.log(req.params.id)
					// console.log(studentData[i]["Grades.AssignmentId"])
					// console.log(studentData[i]["Grades.AssignmentId"] == req.params.id)

					if ((studentData[i]["Grades.AssignmentId"] == req.params.id || studentData[i]["Grades.AssignmentId"] === null) &&
						studentIdArr.includes(studentData[i].id) === false) {
						assignmentData.push(studentData[i]);
						studentIdArr.push(studentData[i].id);
					}
				}
				console.log(assignmentData)
				console.log(studentIdArr);

				res.render("soloAssignment", { grades: assignmentData });
			}
		})
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
