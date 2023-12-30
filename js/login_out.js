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
    resetInputFieldStyle();
    if (pwd === confirmPwd) {
      triggerSuccessMsg(name, email, pwd).then(() => setTimeout(userAction('login'), 1000));
    } else {
      errorMessage('confirm-pwd', 'confirmPwdError', "Ups! Your password doesn't match");
    }
  } else {
    errorMessage('register-user-email', 'emailExist', 'Ups! Email already exists');
  }
}

const triggerSuccessMsg = async (name, email, pwd) => {
  document.getElementById('blue-btn-signup-success').style.zIndex = '0';
  await validateUserData(name, email, pwd);
};

async function validateUserData(name, email, pwd) {
  document.getElementById('confirm-pwd').style.border = '';
  document.getElementById('confirmPwdError').innerHTML = '';
  users.push(new User(name, email, pwd));
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

const errorMessage = function (id1, id2, msg) {
  let fieldInput = document.getElementById(id1);
  let confirmPwd = document.getElementById(id2);
  confirmPwd.innerHTML = msg;
  fieldInput.style.border = '1px solid red';
};

const existEmail = function (email) {
  let listEmail = users.map(a => a.email);
  let exitThisEmail = listEmail.includes(email.toLowerCase());
  return [listEmail, exitThisEmail];
};

const enableSignUP = function () {
  if (ischecked) {
    document.getElementById('sign-up-btn').disabled = false;
  } else {
    document.getElementById('sign-up-btn').disabled = true;
  }
};

const checkButton = function (id, srcCurrent, srcNew) {
  let element = document.getElementById(id);
  let currentState = element.getAttribute('src');
  if (currentState === srcCurrent) {
    element.setAttribute('src', srcNew);
    ischecked = true;
  } else {
    element.setAttribute('src', srcCurrent);
    ischecked = false;
  }
};

const removeClass = function (id, musterClass) {
  let element = document.getElementById(id);
  if (element.classList.contains(musterClass)) {
    element.classList.remove(musterClass);
  }
};
const addClass = function (id, musterClass) {
  let element = document.getElementById(id);
  if (element.classList.contains(musterClass)) {
    element.classList.add(musterClass);
  }
};

function showRenderSection(id) {
  document.getElementById('summary-page').style.display = 'none';
  // document.getElementById('add-task-page').style.display = 'none';
  // document.getElementById('board-page').style.display = 'none';
  // document.getElementById('contact-page').style.display = 'none';
  document.getElementById('privacy-render').style.display = 'none';
  document.getElementById('legale-notice-render').style.display = 'none';
  document.getElementById('help-render').style.display = 'none';
  document.getElementById(id).style.display = 'flex';
}

function removeAllTextColor() {
  removeClass('summary-text', 'clr-white');
  removeClass('addTask-text', 'clr-white');
  removeClass('bord-text', 'clr-white');
  removeClass('contact-text', 'clr-white');
  removeClass('privacy-bg', 'clr-white');
  removeClass('legal-notice-bg', 'clr-white');
}

function removeAllBackgroundColor() {
  removeClass('first-bg', 'bg-summary');
  removeClass('second-bg', 'bg-summary');
  removeClass('third-bg', 'bg-summary');
  removeClass('fourth-bg', 'bg-summary');
  removeClass('privacy-bg', 'bg-summary');
  removeClass('legal-notice-bg', 'bg-summary');
}

function resetAllIcons() {
  document.getElementById('summary-img').setAttribute('src', '../icons/summary.svg');
  document.getElementById('addTask-img').setAttribute('src', '../icons/addTask.svg');
  document.getElementById('bord-img').setAttribute('src', '../icons/board.svg');
  document.getElementById('contact-img').setAttribute('src', '../icons/contact.svg');
}

function setBdgTextcolor(id, idText) {
  let el = document.getElementById(id);
  let elText = document.getElementById(idText);
  removeAllBackgroundColor();
  removeAllTextColor();
  resetAllIcons();
  el.classList.add('bg-summary');
  elText.classList.add('clr-white');
}

const toggleButtonColor = function (id, idText, idImg, src) {
  let elImg = document.getElementById(idImg);
  removeAllBackgroundColor();
  removeAllTextColor();
  setBdgTextcolor(id, idText);
  elImg.setAttribute('src', src);
};

async function init() {
  try {
    await loadAllUsers();
    greetUserWithName();
  } catch (e) {
    return;
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

const showPassword = function (id) {
  // let btnEl = document.getElementById(id1);
  let inputField = document.getElementById(id);
  let inputType = inputField.getAttribute('type');
  if (inputType === 'password') {
    inputField.setAttribute('type', 'text');
  } else {
    inputField.setAttribute('type', 'password');
  }
};

const toggleVisibleIcon = function (id) {
  let element = document.getElementById(id);
  let currentState = element.getAttribute('src');
  if (currentState === '../icons/visibility_off.svg' || currentState === '../icons/visibility.svg') {
    if (currentState === '../icons/visibility_off.svg') {
      element.setAttribute('src', '../icons/visibility.svg');
    } else {
      element.setAttribute('src', '../icons/visibility_off.svg');
    }
  }
};

const handlePwdIcon = function (idInput, idImg) {
  let inputField = document.getElementById(idInput);
  let el = document.getElementById(idImg);
  if (inputField.value !== '') {
    el.setAttribute('src', '../icons/visibility_off.svg');
  } else {
    el.setAttribute('src', '../icons/lock.svg');
  }
};

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
  document.getElementById('current-user-name').innerHTML = currentUser.length !== 0 ? `${nameUser}` : '';
  document.getElementById('current-user-name-responsive').innerHTML = currentUser.length !== 0 ? `${nameUser}` : '';
  document.getElementById('loginBtn').innerHTML = currentUser.length !== 0 ? `${fullName(nameUser)}` : 'G';
};

const greetUser = function (id) {
  let greetField = document.getElementById(id);
  let now = new Date();
  let hoursNow = now.getHours();
  if (5 <= hoursNow && hoursNow <= 11) {
    greetField.innerHTML = currentUser.length !== 0 ? `Good morning,` : `Good morning!`;
  } else if (12 <= hoursNow && hoursNow <= 17) {
    greetField.innerHTML = currentUser.length !== 0 ? `Good afternoon,` : `Good afternoon!`;
  } else {
    greetField.innerHTML = currentUser.length !== 0 ? `Good evening,` : `Good evening!`;
  }
};

const fullName = function (name) {
  if (name.includes(' ')) {
    let nameArray = name.split(' ');
    let fisrtName = nameArray[0];
    let lastName = nameArray[1];
    return `${lastName[0].toUpperCase()}${fisrtName[0].toUpperCase()}`;
  } else {
    return `${name[0].toUpperCase()}`;
  }
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
    emailField.style.border = '1px solid red';
    emailError.innerHTML = errorMsg;
  } else if (errorType == 'password') {
    passwordField.style.border = '1px solid red';
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
