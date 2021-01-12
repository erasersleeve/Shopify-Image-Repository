// NOTES
// Look into bootstrap error at bottom of code -- not sure exactly how it works

$(document).ready(function () {
	let registerForm = $("form.register");
	let firstNameInput = $("input#first-name-input");
	let lastNameInput = $("input#last-name-input");
	let emailInput = $("input#email-input");
	let passwordInput = $("input#password-input");

	
	// Validates that email and password fields are not blank when 'create account' button is clicked
	registerForm.on("submit", function (event) {
		event.preventDefault();

		let userData = {
			first_name: firstNameInput.val().trim(),
			last_name: lastNameInput.val().trim(),
			email: emailInput.val().trim(),
			password: passwordInput.val().trim()
		};

		console.log(userData);
		let emailContain = $("#emailErrorContainer");
        let passContain = $("#passErrorContainer");
		if (!userData.email) {
			let emailErr= $("<small>");
			emailErr.attr("id", "passwordHelp");
			emailErr.addClass("text-danger");
			emailErr.text("Please use valid email format (example@email.com");
			emailContain.append(emailErr);
			return;
		}

		if (!userData.password) {
			let passErr= $("<small>");
			passErr.attr("id", "passwordHelp");
			passErr.addClass("text-danger");
			passErr.text("Please enter a password");
			passContain.append(passErr);
			return;
		}
		// Run function registerUser if email and password are valid
		registerUser(userData.first_name, userData.last_name, userData.email, userData.password);
		firstNameInput.val("");
		lastNameInput.val("");
		emailInput.val("");
		passwordInput.val("");

		// // Does a post to the register route and redirects to homepage (index) if successful
		function registerUser(first_name, last_name, email, password) {
			$.post("/api/createAccount", {
				first_name: first_name,
				last_name: last_name,
				email: email,
				password: password
			})
				.then(function (data) {
					window.location.replace("/gallery");
				})
		}

		function handleLoginErr(err) {
			$("#alert .msg").text(err.responseJSON);
			$("#alert").fadeIn(500);
		}
	});
});