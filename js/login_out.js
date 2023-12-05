"use strict";

let users = [
  {
    firstName: "Join",
    lastName: "803",
    email: "join803@gmail.com",
    password: "1234",
  },
  {
    firstName: "Is",
    lastName: "803",
    email: "join802@gmail.com",
    password: "1284",
  },
];

const checkUserData = function () {
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (
      email.value.toLowerCase() === user["email"].toLowerCase() &&
      password.value === user["password"]
    ) {
      logUserIn();
    }
  }
};

const logUserIn = function () {};

const openHelp = function () {
  let summPage = document.getElementById("summary-page");
  let helpIcon = document.getElementById("help-icon");
  let helpPage = document.getElementById("help-page");
  helpIcon.classList.add("d-none");
  summPage.classList.add("d-none");
  helpPage.classList.remove("d-none");
  helpPage.style.display = "inline-block";
};

const showPrivacyPolicy = function () {
  let summPage = document.getElementById("summary-page");
  let loginBtn = document.getElementById("loginBtn");
  let helpIcon = document.getElementById("help-icon");
  let privacyPage = document.getElementById("privacy-page");
  let userMenu = document.getElementById("submenu-user");
  let helpPage = document.getElementById("help-page");
  helpIcon.classList.add("d-none");
  loginBtn.classList.add("d-none");
  summPage.classList.add("d-none");
  userMenu.classList.add("d-none");
  helpPage.style.display = "";
  helpPage.classList.add("d-none");
  privacyPage.classList.remove("d-none");
  privacyPage.style.display = "inline-block";
};

// const closeHelp = function () {
//   let returnBtn = document.getElementById("return-btn");
//   let help = document.getElementById("help-icon");

//   help.style.display = "";
// };
