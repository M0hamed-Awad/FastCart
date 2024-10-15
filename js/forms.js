// Hamburger Menu

const hamburgerMenubutton = document.getElementById('hamburger-menu');
const navbar = document.getElementById('navbar');
const closeButton = document.getElementById('close-mark');

if (hamburgerMenubutton) {
    hamburgerMenubutton.addEventListener('click', function () {
        navbar.classList.add('active');
    })
}

if (closeButton) {
    closeButton.addEventListener('click', function () {
        navbar.classList.remove('active');
    })
}

// Registration

const form = document.getElementById("form");
const firstNameInput = document.getElementById("first-name-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const repeatPasswordInput = document.getElementById("repeat-password-input");
const phoneInput = document.getElementById("phone-input");
console.log(repeatPasswordInput.value);

form.addEventListener("submit", (event) => {

    event.preventDefault();

    if (firstNameInput || repeatPasswordInput) {
        // Sign up page
        validateSignUpForm();
    }
    else {
        // Login page
        validateLoginForm();
    }

})

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const displayError = inputControl.querySelector('#error-message');

    displayError.innerText = message;
    inputControl.classList.add('failure');
    inputControl.classList.remove('success');
}

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const displayError = inputControl.querySelector('#error-message');

    displayError.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('failure');
}

const validatePhone = (phone) => {
    const phoneRegex = /^(?:\+2)?(010|011|012|015)\d{8}$/;
    return phoneRegex.test(phone)
}

const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email)
}


function validateSignUpForm() {
    const usernameValue = firstNameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const phoneValue = phoneInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    const password2Value = repeatPasswordInput.value.trim();

    usernameValue === '' || usernameValue == null ? setError(firstNameInput, "Username is required.") : setSuccess(firstNameInput);


    if( emailValue === '' || emailValue == null){
        setError(emailInput, "Email is required.")
    } else if (validateEmail(emailValue)){
        setSuccess(emailInput)
    }
    else{
        setError(emailInput, "Please enter a valid email.")
    }


    if( phoneValue === '' || phoneValue == null){
        setError(phoneInput, "Phone is required.")
    } else  if (validatePhone(phoneValue)){
        setSuccess(phoneInput)
    } else{
        setError(phoneInput, "Please enter a valid Phone.")
    }

    
    if (passwordValue === '' || passwordValue == null) {
        setError(passwordInput, "Password is required");
    } else if (passwordValue.length < 8) {
        setError(passwordInput, "Password Must be at least 8 characters.");
    } else {
        setSuccess(passwordInput);
    }


    if (password2Value === '' || password2Value === null){
        setError(repeatPasswordInput, "Repeating Password is required");
    }
    else if(password2Value !== passwordValue){
        setError(repeatPasswordInput, "Repeating password value isn't matching the Password value.")
    } else {
        setSuccess(repeatPasswordInput);
    }

}

function validateLoginForm() {
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if( emailValue === '' || emailValue == null){
        setError(emailInput, "Email is required.")
    } else if (validateEmail(emailValue)){
        setSuccess(emailInput)
    } else{
        setError(emailInput, "Please enter a valid email.")
    }

    if (passwordValue === '' || passwordValue == null) {
        setError(passwordInput, "Password is required");
    } else if (passwordValue.length < 8) {
        setError(passwordInput, "Password Must be at least 8 characters.");
    } else {
        setSuccess(passwordInput);
    }

}