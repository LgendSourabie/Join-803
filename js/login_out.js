"use strict";

let users = [
  {
    name: "Ibrahima Join",
    email: "join803@ibrahima.de",
    password: "1234",
  },
  {
    name: "Pascal Join",
    email: "join803@pascal.de",
    password: "1235",
  },
  {
    name: "Henrik Join",
    email: "join803@henrik.de",
    password: "1236",
  },
  {
    name: "Thomas Join",
    email: "join803@thomas.de",
    password: "1237",
  },
];
let currentUser = [];
///////// SINGN UP    /////////////////////////////////////////////////

function registerUser() {
  let userName = document.getElementById("register-user-name");
  let userEmail = document.getElementById("register-user-email");
  let pwd = document.getElementById("pwd");
  let pwdConfirm = document.getElementById("confirm-pwd");
  saveUser(userName.value, userEmail.value, pwd.value, pwdConfirm.value);
}

function saveUser(name, email, pwd, confirmPwd) {
  if (!existEmail(email)[1]) {
    document.getElementById("register-user-email").style.border = "";
    document.getElementById("emailExist").innerHTML = "";
    if (pwd === confirmPwd) {
      document.getElementById("confirm-pwd").style.border = "";
      document.getElementById("confirmPwdError").innerHTML = "";
      users.push(new User(name, email, pwd));
      localStorage.setItem("users", JSON.stringify(users));
      document
        .getElementById("blue-btn-signup-success")
        .classList.add("show-success-btn");
      // setTimeout(userAction("login"), 5000);
    } else {
      errorMessage(
        "confirm-pwd",
        "confirmPwdError",
        "Ups! Your password doesn't match"
      );
    }
  } else {
    errorMessage(
      "register-user-email",
      "emailExist",
      "Ups! Email already exists"
    );
  }
}

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
};
const errorMessage = function (id1, id2, msg) {
  let fieldInput = document.getElementById(id1);
  let confirmPwd = document.getElementById(id2);
  confirmPwd.innerHTML = msg;
  fieldInput.style.border = "2px solid red";
};

const existEmail = function (email) {
  let listEmail = users.map((a) => a.email);
  let exitThisEmail = listEmail.includes(email.toLowerCase());
  return [listEmail, exitThisEmail];
};

const enableSignUP = function () {
  let ischecked = document.getElementById("check-box-signup").checked;
  if (ischecked) {
    document.getElementById("sign-up-btn").disabled = false;
  } else {
    document.getElementById("sign-up-btn").disabled = true;
  }
};
/////////////// LOG in /////////////////////////////////////////////////

const checkUserData = function () {
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let isValid = false;
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const currentEmail = user["email"];
    const currentPassword = user["password"];
    if (
      isEmailValid(email.value, currentEmail) &&
      isPasswordValid(password.value, currentPassword)
    ) {
      isValid = true;
      currentUser.push(email.value);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      i = users.length;
    }
  }
  if (!isValid) {
    generateError("email", "Please Enter a valid email");
    generateError("password", "Wrong password Ups! Try again");
  } else {
    userAction("summary");
  }
};

const greetUserWithName = function () {
  let userNameField = document.getElementById("current-user-name");
  let profileField = document.getElementById("loginBtn");
  let userCurrent = localStorage.getItem("currentUser");
  currentUser = JSON.parse(userCurrent);
  let listEmail = users.map((a) => a.email);
  let listName = users.map((a) => a.name);
  let index = listEmail.indexOf(currentUser[currentUser.length - 1]);
  let nameUser = listName[index];
  greetUser("greet-user");
  userNameField.innerHTML = `${nameUser}`;
  profileField.innerHTML = `${fullName(nameUser)[1]}${fullName(nameUser)[0]}`;
};

const greetUser = function (id) {
  let greetField = document.getElementById(id);
  let now = new Date();
  let hoursNow = now.getHours();
  if (5 <= hoursNow && hoursNow <= 11) {
    greetField.innerHTML = `Good morning`;
  } else if (12 <= hoursNow && hoursNow <= 17) {
    greetField.innerHTML = `Good afternoon`;
  } else {
    greetField.innerHTML = `Good evening`;
  }
};

const fullName = function (name) {
  let nameArray = name.split(" ");
  let fisrtName = nameArray[0];
  let lastName = nameArray[1];
  return [fisrtName[0].toUpperCase(), lastName[0].toUpperCase()];
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

const checkPassword = function (password, currentPassword) {
  if (isPasswordValid(password.value, currentPassword)) {
    userAction("summary");
  } else {
    generateError("password", "Wrong password Ups! Try again");
  }
};
