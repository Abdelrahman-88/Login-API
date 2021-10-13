"use strict";

let firstNameInput = document.getElementById("firstNameInput");
let lastNameInput = document.getElementById("lastNameInput");
let emailInput = document.getElementById("emailInput");
let passwordInput = document.getElementById("passwordInput");
let emailSignupInput = document.getElementById("emailSignupInput");
let passwordSignupInput = document.getElementById("passwordSignupInput");
let ageInput = document.getElementById("ageInput");
let loginButton = document.getElementById("loginButton");
let signupButton = document.getElementById("signupButton");
let signupLinkBtn = document.getElementById("signupLink");
let logoutButton = document.getElementById("logoutButton");
let requiredAlert = document.getElementById("requiredAlert");
let requiredSignupAlert = document.getElementById("requiredSignupAlert");
let existsAlert = document.getElementById("existsAlert");
let incorrectAlert = document.getElementById("incorrectAlert");
let successAlert = document.getElementById("successAlert");
let firstNameAlert = document.getElementById("firstNameAlert");
let lastNameAlert = document.getElementById("lastNameAlert");
let emailAlert = document.getElementById("emailAlert");
let passwordAlert = document.getElementById("passwordAlert");
let emailSignupAlert = document.getElementById("emailSignupAlert");
let passwordSignupAlert = document.getElementById("passwordSignupAlert");
let ageAlert = document.getElementById("ageAlert");
let url = location.href;
let index = url.lastIndexOf("/");
let fixed = url.substring(0, index);

// signup

$(document).ready(function () {
    $(".spinner").fadeOut(500, function () {
        $("#loading2").fadeOut(500, function () {
            $("body").css("overflow-y", "auto");
            $("#loading2").remove();
        });
    });
});

$(signupButton).click(signup);

async function signup() {

    if (firstNameInput.value == "" || lastNameInput.value == "" || emailSignupInput.value == "" || passwordSignupInput.value == "" || ageInput.value == "") {
        requiredSignupAlert.classList.remove("d-none");
    }
    else if (firstNameValidation() == true && lastNameValidation() == true && emailSignupValidation() == true && passwordSignupValidation() == true && ageValidation() == true) {

        requiredSignupAlert.classList.add("d-none");

        let signupData = {
            first_name: firstNameInput.value,
            last_name: lastNameInput.value,
            email: emailSignupInput.value.toLowerCase(),
            password: passwordSignupInput.value,
            age: ageInput.value
        }

        let response = await fetch(`https://route-egypt-api.herokuapp.com/signup`,
            {
                method: "Post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupData)
            }
        );
        let finalResponse = await response.json();
        if (finalResponse.message != "success") {
            existsAlert.innerHTML = finalResponse.errors.email.message;
            existsAlert.classList.remove("d-none");
            successAlert.classList.add("d-none");
        }
        else {
            successAlert.innerHTML = finalResponse.message;
            successAlert.classList.remove("d-none");
            existsAlert.classList.add("d-none");
            clearForm();
        }
    }

}

$(firstNameInput).keyup(firstNameValidation);
function firstNameValidation() {
    let nameRjex = /^[A-Z a-z]{2,20}$/;
    if (nameRjex.test(firstNameInput.value) == true) {
        firstNameInput.classList.add("is-valid");
        firstNameInput.classList.remove("is-invalid");
        firstNameAlert.classList.add("d-none");
        return true;
    }
    else {
        firstNameAlert.classList.remove("d-none");
        firstNameInput.classList.remove("is-valid");
        firstNameInput.classList.add("is-invalid");
        return false;
    }
}

$(lastNameInput).keyup(lastNameValidation);
function lastNameValidation() {
    let nameRjex = /^[A-Z a-z]{2,20}$/;
    if (nameRjex.test(lastNameInput.value) == true) {
        lastNameInput.classList.add("is-valid");
        lastNameInput.classList.remove("is-invalid");
        lastNameAlert.classList.add("d-none");
        return true;
    }
    else {
        lastNameAlert.classList.remove("d-none");
        lastNameInput.classList.remove("is-valid");
        lastNameInput.classList.add("is-invalid");
        return false;
    }
}

$(emailSignupInput).keyup(emailSignupValidation);
function emailSignupValidation() {
    let emailSignupRjex = /^\S+@\w+\.{1}\w{2,5}$/;
    if (emailSignupRjex.test(emailSignupInput.value) == true) {
        emailSignupInput.classList.add("is-valid");
        emailSignupInput.classList.remove("is-invalid");
        emailSignupAlert.classList.add("d-none");
        return true;
    }
    else {
        emailSignupAlert.classList.remove("d-none");
        emailSignupInput.classList.remove("is-valid");
        emailSignupInput.classList.add("is-invalid");
        return false;
    }
}

$(passwordSignupInput).keyup(passwordSignupValidation);
function passwordSignupValidation() {
    let passwordSignupRjex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (passwordSignupRjex.test(passwordSignupInput.value) == true) {
        passwordSignupInput.classList.add("is-valid");
        passwordSignupInput.classList.remove("is-invalid");
        passwordSignupAlert.classList.add("d-none");
        return true;
    }
    else {
        passwordSignupAlert.classList.remove("d-none");
        passwordSignupInput.classList.remove("is-valid");
        passwordSignupInput.classList.add("is-invalid");
        return false;
    }
}

$(ageInput).keyup(ageValidation);
function ageValidation() {
    let ageRjex = /^([2-9][0-9]|18|19)$/;
    if (ageRjex.test(ageInput.value) == true) {
        ageInput.classList.add("is-valid");
        ageInput.classList.remove("is-invalid");
        ageAlert.classList.add("d-none");
        return true;
    }
    else {
        ageAlert.classList.remove("d-none");
        ageInput.classList.remove("is-valid");
        ageInput.classList.add("is-invalid");
        return false;
    }
}

// home

$(document).ready(function () {
    $(".spinner").fadeOut(500, function () {
        $("#loading3").fadeOut(500, function () {
            $("body").css("overflow-y", "auto");
            $("#loading3").remove();
        });
    });
});

if(window.location.toString().includes("home")){
    if (JSON.parse(sessionStorage.getItem("login")) != "success") {
        location.href = "index.html";
    }
}

$(logoutButton).click(function () { 
    sessionStorage.removeItem("login");
    
});

// login

$(document).ready(function () {
    $(".spinner").fadeOut(500, function () {
        $("#loading").fadeOut(500, function () {
            $("body").css("overflow-y", "auto");
            $("#loading").remove();
        });
    });
});


$(loginButton).click(login);
async function login() {
    validation();
    if (validation() != false) {
        let loginData = {
            email: emailInput.value.toLowerCase(),
            password: passwordInput.value
        }
        let response = await fetch(`https://route-egypt-api.herokuapp.com/signin`,
            {
                method: "Post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData)
            }
        );
        let finalResponse = await response.json();

        if (finalResponse.message != "success") {
            incorrectAlert.innerHTML = finalResponse.message;
            requiredAlert.classList.add("d-none");
            incorrectAlert.classList.remove("d-none");
        }
        else {
            sessionStorage.setItem("login", JSON.stringify(finalResponse.message));
            requiredAlert.classList.add("d-none");
            incorrectAlert.classList.add("d-none");
            emailInput.value = "";
            passwordInput.value = "";
            location.href = "home.html";
        }

    }
}

function validation() {
    if (emailInput.value == "" || passwordInput.value == "") {
        requiredAlert.classList.remove("d-none");
        incorrectAlert.classList.add("d-none");
        return false;
    }

}


function clearForm() {
    firstNameInput.value = "";
    firstNameInput.classList.remove("is-valid");
    lastNameInput.value = "";
    lastNameInput.classList.remove("is-valid");
    emailSignupInput.value = "";
    emailSignupInput.classList.remove("is-valid");
    passwordSignupInput.value = "";
    passwordSignupInput.classList.remove("is-valid");
    ageInput.value = "";
    ageInput.classList.remove("is-valid");
}

