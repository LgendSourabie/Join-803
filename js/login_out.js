"use strict";

let users = [
  {
    name: "Ibrahima",
    email: "join803@ibrahima.de",
    password: "1234",
  },
  {
    name: "Pascal",
    email: "join803@pascal.de",
    password: "1235",
  },
  {
    name: "Henrik",
    email: "join803@henrik.de",
    password: "1236",
  },
  {
    name: "Thomas",
    email: "join803@thomas.com",
    password: "1237",
  },
];

///////// SINGN UP    /////////////////////////////////////////////////

const registerUser = function () {
  let userName = document.getElementById("register-user-name");
  let userEmail = document.getElementById("register-user-email");
  let pwd = document.getElementById("pwd");
  let pwdConfirm = document.getElementById("confirm-pwd");
  saveUser(userName.value, userEmail.value, pwd.value, pwdConfirm.value);
};

const saveUser = function (name, email, pwd, confirmPwd) {
  if (pwd === confirmPwd) {
    users.push(new User(name, email, pwd));
    localStorage.setItem("users", JSON.stringify(users));
    document
      .getElementById("blue-btn-signup-success")
      .classList.add("show-success-btn");
    // setTimeout(userAction("login"), 5000);
  } else {
    errorMessage("confirmPwdError", "Ups! Your password don't match");
  }
};

function User(name, email, pwd) {
  this.name = name;
  this.email = email;
  this.password = pwd;
}

const loadUsers = function () {
  let existUsers = localStorage.getItem("users");
  if (existUsers) {
    users = JSON.parse(existUsers);
  }
  return users;
};
const errorMessage = function (id, msg) {
  let fieldInput = document.getElementById("confirm-pwd");
  let confirmPwd = document.getElementById(id);
  confirmPwd.innerHTML = msg;
  fieldInput.style.border = "2px solid red";
};

/////////////// LOG in /////////////////////////////////////////////////

const checkUserData = function () {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const email = user["email"];
    const password = user["password"];
    checkDataForValidation(email, password);
  }
};

const hideThesePages = function (
  helpIcon,
  loginBtn,
  summPage,
  userMenu,
  helpPage
) {
  helpIcon.classList.add("d-none");
  loginBtn.classList.add("d-none");
  summPage.classList.add("d-none");
  userMenu.classList.add("d-none");
  helpPage.classList.add("d-none");
};

function isPasswordValid(givenPassword, currentPassword) {
  if (givenPassword == currentPassword) {
    return true;
  } else {
    return false;
  }
}

function isEmailValid(givenEmail, currentEmail) {
  if (givenEmail.toLowerCase() == currentEmail.toLowerCase()) {
    return true;
  } else {
    return false;
  }
}

// to refactor
const generateError = (errorType, errorMsg) => {
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  let emailField = document.getElementById("email");
  let passwordField = document.getElementById("password");
  if (errorType == "email") {
    emailField.style.border = "2px solid red";
    emailError.innerHTML = errorMsg;
  } else if (errorType == "password") {
    passwordField.style.border = "2px solid red";
    passwordError.innerHTML = errorMsg;
  }
};

const userAction = function (action) {
  window.location.href = `../html/${action}.html`;
};

const checkDataForValidation = function (currentEmail, currentPassword) {
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  if (isEmailValid(email.value, currentEmail)) {
    checkPassword(password, currentPassword);
  } else {
    generateError("email", "Please Enter a valid email");
  }
};

const checkPassword = function (password, currentPassword) {
  if (isPasswordValid(password.value, currentPassword)) {
    userAction("summary");
  } else {
    generateError("password", "Wrong password Ups! Try again");
  }
};
