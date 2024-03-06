/* ----------------- DOM Variables ----------------------- */

	// firstname
	let firstnameElement = document.querySelector('.user-first-name');
	let fnameErrorMessage = document.querySelector('.firstname-input-error');
	let firstnameError = document.querySelector('.firstname-error-message');

	// Lastname
	let lastnameElement = document.querySelector('.user-last-name');
	let lnameErrorMessage = document.querySelector('.lastname-input-error');
	let lastnameError = document.querySelector('.lastname-error-message');

	// email
	let emailElement = document.querySelector('.user-email');
	let emailErrorMessage = document.querySelector('.email-input-error');
	let emailError = document.querySelector('.email-error-message');

	// phone number
	let phoneElement = document.querySelector('.user-phone');
	let phoneErrorMessage = document.querySelector('.phone-input-error');
	let phoneError = document.querySelector('.phone-error-message');

	// Password
	let passwordElement = document.querySelector('.user-password');
	let passErrorMessage = document.querySelector('.password-input-error');
	let passwordError = document.querySelector('.password-error-message');

	// Confirm password
	let confirmpasswordElement = document.querySelector('.user-confirm-password');
	let confErrorMessage = document.querySelector('.confirm-input-error');
	let confirmpasswordError = document.querySelector('.confirm-error-message');

	// show password buttons
	let showHidePassword = document.querySelectorAll('.show-password');

	// register button
	let buttonElement = document.querySelector('.register-button');

	//Valid
	let validClasses = document.getElementsByClassName("valid");
	let invalidClasses = document.getElementsByClassName("error");

	/* ---------- Regular expressions for input validation ---------------- */

	// 1. Text content
	function textVerify(text){
		const regEx = /^[a-zA-Z]{3,}$/;  // Name should begin and end with a letter and should be more than three letters

		return regEx.test(text); //return true
	}

	// 2. Phone Number
	function phoneVerify(phone){
		const regEx = /^[0-9]{10}$/; // phone number should not be more than 10 numbers

		return regEx.test(phone); // return true
	}

	// 3. Password 
	function passwordVerify(password){
		const regEx = /^[a-zA-Z0-9_]{8}$/;

		return regEx.test(password);
	}

	// 4. email address

	function emailVerify(emailInput){
		const regEx = /^[a-z0-9_]+@[a-z]{3,}\.[a-z\.]{3,}$/

		return regEx.test(emailInput);
	}

	// validating empty inputs


	/*---When input elements are empty, this function will be called---*/
	function emptyInput(inputElement, emptyError, invalidError){
		if(!inputElement.value){
			emptyError.classList.remove("hide");
			inputElement.classList.add("error");
			invalidError.classList.add("hide");
		}else{
			emptyError.classList.add("hide")
		}
	}


	/*---Update errors for invalid input---*/

	function updateError(inputElement, errorReference){
		errorReference.classList.remove("hide");
		inputElement.classList.remove("valid");
		inputElement.classList.add("error");

	}

	/*---Update errors for a valid input---*/
	function updateValidInput(inputElement){
		inputElement.classList.remove("error");
		inputElement.classList.add("valid");
	}

	/*---first name validation---*/
	firstnameElement.addEventListener('input', () =>{
		if(textVerify(firstnameElement.value)){
			fnameErrorMessage.classList.add("hide");
			updateValidInput(firstnameElement);
		}else{
			updateError(firstnameElement, fnameErrorMessage);
			emptyInput(firstnameElement,  firstnameError, fnameErrorMessage);
		}
	});

	// Last name
	lastnameElement.addEventListener('input', () => {
		if(textVerify(lastnameElement.value)){
			lnameErrorMessage.classList.add("hide");
			updateValidInput(lastnameElement);
		} else{
			updateError(lastnameElement, lnameErrorMessage);
			emptyInput(lastnameElement, lastnameError, lnameErrorMessage);
		}
	});

	// Email address
	emailElement.addEventListener('input', () => {
		if(emailVerify(emailElement.value)){
			emailErrorMessage.classList.add("hide");
			updateValidInput(emailElement);
		} else{
			updateError(emailElement, emailErrorMessage);
			emptyInput(emailElement, emailError, emailErrorMessage);
		}
	});

	// phone number
	phoneElement.addEventListener('input', () => {
		if(phoneVerify(phoneElement.value)){
			phoneErrorMessage.classList.add("hide");
			updateValidInput(phoneElement);
		} else{
			updateError(phoneElement, phoneErrorMessage);
			emptyInput(phoneElement, phoneError, phoneErrorMessage);
		}
	});

	// password
	passwordElement.addEventListener('input', () => {
		if(passwordVerify(passwordElement.value)){
			passErrorMessage.classList.add("hide");
			updateValidInput(passwordElement);
		} else{
			updateError(passwordElement, passErrorMessage);
			emptyInput(passwordElement, passwordError, passErrorMessage);
		}
	});

	// confirm password
	confirmpasswordElement.addEventListener('input', () => {
		if(confirmpasswordElement.value === passwordElement.value){
			confErrorMessage.classList.add("hide");
			updateValidInput(confirmpasswordElement);
		} else{
			updateError(confirmpasswordElement, confErrorMessage);
			emptyInput(confirmpasswordElement, confirmpasswordError, confErrorMessage);
		}
	});

	// show-hide password
    let eyeIcon = document.querySelector('fa-regular fa-eye-slash');
	showHidePassword.forEach((show)=>{
		show.addEventListener('click', () => {
			let getParent = show.parentElement.querySelector('input');
			if(getParent.type === 'password'){
				getParent.type = 'text';
                show.innerHTML = '<i class="fa-regular fa-eye"></i>';
			} else{
				getParent.type = 'password';
                show.innerHTML ='<i class="fa-regular fa-eye-slash"></i>'
			}
		})

	});

	//Submit button
	buttonElement.addEventListener("click", () => {
		  if (validClasses.length == 6 && invalidClasses.length == 0) {
		    addUser();

		  } else {
		    alert("Please input valid credentials!");
		  }

	});
	
	function addUser(){
		alert(`You have registered as ${firstnameElement.value} ${lastnameElement.value}. Thank you!`);

	    	let users = JSON.parse( localStorage.getItem('users'));

	    	if(!users){
	    		users = [];
	    	}


		    users.unshift(
			      {
			        first_name: firstnameElement.value,
			        last_name: lastnameElement.value,
			        email: emailElement.value,
			        phone: phoneElement.value,
			        password: passwordElement.value
			      }
		      );

		    localStorage.setItem('users', JSON.stringify(users));	//save the user data to localstorage

		    resetInput();
	}

	function resetInput(){
		firstnameElement.value = '';
	    lastnameElement.value = '';
	    emailElement.value = '';
	    phoneElement.value = '';
	    passwordElement.value = '';
	    confirmpasswordElement.value = '';
	}