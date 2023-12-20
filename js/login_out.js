'use strict';
let users = [];
let currentUser = [];
let ischecked = false;

function initLocalStorage() {
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
}
///////// SINGN UP    /////////////////////////////////////////////////

function registerUser() {
  let userName = document.getElementById('register-user-name');
  let userEmail = document.getElementById('register-user-email');
  let pwd = document.getElementById('pwd');
  let pwdConfirm = document.getElementById('confirm-pwd');
  saveUser(userName.value, userEmail.value, pwd.value, pwdConfirm.value);
}

async function saveUser(name, email, pwd, confirmPwd) {
  if (!existEmail(email)[1]) {
    // document.getElementById('register-user-email').style.border = '';
    // document.getElementById('emailExist').innerHTML = '';
    resetInputFieldStyle();
    if (pwd === confirmPwd) {
      // document.getElementById('confirm-pwd').style.border = '';
      // document.getElementById('confirmPwdError').innerHTML = '';
      // users.push(new User(name, email, pwd));
      // document.getElementById('blue-btn-signup-success').classList.add('show-success-btn');
      // await setItem('users', JSON.stringify(users));
      await registerUser(name, email, pwd);
      setTimeout(userAction('login'), 7000);
    } else {
      errorMessage('confirm-pwd', 'confirmPwdError', "Ups! Your password doesn't match");
    }
  } else {
    errorMessage('register-user-email', 'emailExist', 'Ups! Email already exists');
  }
}

async function registerUser(name, email, pwd) {
  document.getElementById('confirm-pwd').style.border = '';
  document.getElementById('confirmPwdError').innerHTML = '';
  users.push(new User(name, email, pwd));
  document.getElementById('blue-btn-signup-success').classList.add('show-success-btn');
  await setItem('users', JSON.stringify(users));
}

const resetInputFieldStyle = function () {
  document.getElementById('register-user-email').style.border = '';
  document.getElementById('emailExist').innerHTML = '';
};

function User(name, email, pwd) {
  this.name = name;
  this.email = email;
  this.password = pwd;
}

const loadUsers = function () {
  let existUsers = localStorage.getItem('users');
  if (existUsers) {
    users = JSON.parse(existUsers);
  }
};

const errorMessage = function (id1, id2, msg) {
  let fieldInput = document.getElementById(id1);
  let confirmPwd = document.getElementById(id2);
  confirmPwd.innerHTML = msg;
  fieldInput.style.border = '2px solid red';
};

const existEmail = function (email) {
  let listEmail = users.map(a => a.email);
  let exitThisEmail = listEmail.includes(email.toLowerCase());
  return [listEmail, exitThisEmail];
};

const enableSignUP = function () {
  // let ischecked = document.getElementById("check-box-signup").checked;
  if (ischecked) {
    document.getElementById('sign-up-btn').disabled = false;
  } else {
    document.getElementById('sign-up-btn').disabled = true;
  }
};

const checkButton = function (id) {
  let element = document.getElementById(id);
  let currentState = element.getAttribute('src');
  if (currentState === '../icons/checkBox.svg') {
    element.setAttribute('src', '../icons/check-checked.svg');
    ischecked = true;
  } else {
    element.setAttribute('src', '../icons/checkBox.svg');
    ischecked = false;
  }
};

async function init() {
  try {
    await loadAllUsers();
    greetUserWithName();
  } catch (e) {
    console.warn('No users available');
  }
}

async function loadAllUsers() {
  users = JSON.parse(await getItem('users'));
}

async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: 'POST',
    body: JSON.stringify(payload),
  }).then(response => response.json());
}

async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then(response => response.json())
    .then(response => response.data.value);
}

/////////////// LOG in /////////////////////////////////////////////////

const checkUserData = function () {
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  let isValid = false;
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const currentEmail = user['email'];
    const currentPassword = user['password'];
    if (isEmailValid(email.value, currentEmail) && isPasswordValid(password.value, currentPassword)) {
      isValid = true;
      currentUser.push(email.value);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      i = users.length;
    }
  }
  if (!isValid) {
    generateError('email', 'Please Enter a valid email');
    generateError('password', 'Wrong password Ups! Try again');
  } else {
    userAction('summary');
  }
};

const greetUserWithName = function () {
  let userCurrent = localStorage.getItem('currentUser');
  currentUser = JSON.parse(userCurrent);
  let lastElem = currentUser[currentUser.length - 1];
  let loggedUser = users.filter(a => a.email === lastElem).map(a => a.name);
  let nameUser = loggedUser[0];
  greetUser('greet-user');
  greetUser('greet-user-responsive');
  document.getElementById('current-user-name').innerHTML = `${nameUser}`;
  document.getElementById('current-user-name-responsive').innerHTML = `${nameUser}`;
  document.getElementById('loginBtn').innerHTML = `${fullName(nameUser)[1]}${fullName(nameUser)[0]}`;
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
  let nameArray = name.split(' ');
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
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  let emailField = document.getElementById('email');
  let passwordField = document.getElementById('password');
  if (errorType == 'email') {
    emailField.style.border = '2px solid red';
    emailError.innerHTML = errorMsg;
  } else if (errorType == 'password') {
    passwordField.style.border = '2px solid red';
    passwordError.innerHTML = errorMsg;
  }
};

const userAction = function (action) {
  window.location.href = `../html/${action}.html`;
};

const checkPassword = function (password, currentPassword) {
  if (isPasswordValid(password.value, currentPassword)) {
    userAction('summary');
  } else {
    generateError('password', 'Wrong password Ups! Try again');
  }
};
