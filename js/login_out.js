'use strict';
let users = [];
let currentUser = [];
let ischecked = false;

/**
 * Initialize local storage with current user from login page
 * this will be then used in summary page to display the first letters of the name
 */
function initLocalStorage() {
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

/**
 * register user when its password and email are verified
 */

function registerUser() {
  let userName = document.getElementById('register-user-name');
  let userEmail = document.getElementById('register-user-email');
  let pwd = document.getElementById('pwd');
  let pwdConfirm = document.getElementById('confirm-pwd');
  saveUser(userName.value, userEmail.value, pwd.value, pwdConfirm.value);
}

/**
 *  check data and register user
 * @param {string} name - user's name
 * @param {email} email - user's email
 * @param {*} pwd - password of the user
 * @param {*} confirmPwd - confirm password
 */
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

/**
 *display success message when user registered
 * @param {string} name - name of the user
 * @param {email-format} email - email of the user
 * @param {*} pwd - password of the user
 */
const triggerSuccessMsg = async (name, email, pwd) => {
  document.getElementById('blue-btn-signup-success').style.zIndex = '0';
  await validateUserData(name, email, pwd);
};

/**
 * validate or invalidate user data for log in
 * @param {string} name - name of the user
 * @param {email-format} email  - email of the user
 * @param {*} pwd - password of the user
 */
async function validateUserData(name, email, pwd) {
  document.getElementById('confirm-pwd').style.border = '';
  document.getElementById('confirmPwdError').innerHTML = '';
  users.push(new User(name, email, pwd));
  await setItem('users', JSON.stringify(users));
}

/**
 * reset email Input fields
 */
const resetInputFieldStyle = function () {
  document.getElementById('register-user-email').style.border = '';
  document.getElementById('emailExist').innerHTML = '';
};

/**
 * create a user object
 * @param {string} name - name of the user
 * @param {email-format} email  - email of the user
 * @param {*} pwd - password of the user
 */
function User(name, email, pwd) {
  this.name = name;
  this.email = email;
  this.password = pwd;
}

/**
 *trows error message
 * @param {Element-ID} id1 - Id of the password input field
 * @param {Element-ID} id2 - Id of the confirm password input field
 * @param {string} msg - Error message to be displayed
 */
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

/**
 *
 * @param {Element-ID} id
 * @param {string} srcCurrent - source or path of the current image
 * @param {string} srcNew - source or path of the new image
 */
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

/**
 *
 * @param {Element-ID} id - Id of the element from which a class need to be removed
 * @param {string} musterClass - new class name to be added
 */
const removeClass = function (id, musterClass) {
  let element = document.getElementById(id);
  if (element.classList.contains(musterClass)) {
    element.classList.remove(musterClass);
  }
};
/**
 * checks if a class contains a class name
 * @param {Element-ID} id - Id of the element whose class need to be check
 * @param {string} musterClass - new class name
 */
const addClass = function (id, musterClass) {
  let element = document.getElementById(id);
  if (element.classList.contains(musterClass)) {
    element.classList.add(musterClass);
  }
};

/**
 * display the current page according to the click of user
 * @param {Element-ID} id - Id of the section to be shown
 */
function showRenderSection(id) {
  document.getElementById('summary-page').style.display = 'none';
  document.getElementById('privacy-render').style.display = 'none';
  document.getElementById('legale-notice-render').style.display = 'none';
  document.getElementById('help-render').style.display = 'none';
  document.getElementById(id).style.display = 'flex';
}

/**
 * reset all color effects in oder to set only for the clicked element
 */
function removeAllTextColor() {
  removeClass('summary-text', 'clr-white');
  removeClass('addTask-text', 'clr-white');
  removeClass('bord-text', 'clr-white');
  removeClass('contact-text', 'clr-white');
  removeClass('privacy-bg', 'clr-white');
  removeClass('legal-notice-bg', 'clr-white');
}

/**
 * reset all background color effects in oder to set only for the clicked element
 */
function removeAllBackgroundColor() {
  removeClass('first-bg', 'bg-summary');
  removeClass('second-bg', 'bg-summary');
  removeClass('third-bg', 'bg-summary');
  removeClass('fourth-bg', 'bg-summary');
  removeClass('privacy-bg', 'bg-summary');
  removeClass('legal-notice-bg', 'bg-summary');
}

/**
 * reset all icons' color effects in oder to set only for the clicked element
 */
function resetAllIcons() {
  document.getElementById('summary-img').setAttribute('src', '../icons/summary.svg');
  document.getElementById('addTask-img').setAttribute('src', '../icons/addTask.svg');
  document.getElementById('bord-img').setAttribute('src', '../icons/board.svg');
  document.getElementById('contact-img').setAttribute('src', '../icons/contact.svg');
}

/**
 * reset all the css parameters (colors, background colors and icons' colors)
 */
function resetAll() {
  removeAllBackgroundColor();
  removeAllTextColor();
  resetAllIcons();
}

/**
 * set the background color of elements
 * @param {Element-ID} id - Id of the element whose color need to be set
 * @param {Element-ID} idText - Id of the element whose text color need to be set
 */
function setBdgTextcolor(id, idText) {
  let el = document.getElementById(id);
  let elText = document.getElementById(idText);
  resetAll();
  el.classList.add('bg-summary');
  elText.classList.add('clr-white');
}

/**
 *
 * @param {Element-ID} id - Id of the element whose image need to be toggled
 * @param {Element-ID} idText - Id of the element whose text color need to be set
 * @param {Element-ID} idImg - ID of the image element with src has to be set
 * @param {string} src - source or path of the image
 */
const toggleButtonColor = function (id, idText, idImg, src) {
  let elImg = document.getElementById(idImg);
  removeAllBackgroundColor();
  removeAllTextColor();
  setBdgTextcolor(id, idText);
  elImg.setAttribute('src', src);
};

/**
 *  load the current user data and display the name
 * @returns nothing
 */
async function init() {
  try {
    await loadAllUsers();
    greetUserWithName();
    await loadTasks();
  } catch (e) {
    return;
  }
}

/**
 * load all users from server
 */
async function loadAllUsers() {
  users = JSON.parse(await getItem('users'));
}

/**
 * upload data to the server
 * @param {string} key - variable name in the server
 * @param {string} value - information or data that need to be save in the server
 * @returns return a json file
 */
async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: 'POST',
    body: JSON.stringify(payload),
  }).then(response => response.json());
}

/**
 * fetches data from the server
 * @param {string} key - variable name of the data to be fetched
 * @returns value of the data
 */
async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then(response => response.json())
    .then(response => response.data.value);
}

/**
 * allow the view of the password when a view button is clicked
 * @param {Element-ID} id - Id of the input field whose type need to be change
 */
const showPassword = function (id) {
  let inputField = document.getElementById(id);
  let inputType = inputField.getAttribute('type');
  if (inputType === 'password') {
    inputField.setAttribute('type', 'text');
  } else {
    inputField.setAttribute('type', 'password');
  }
};

/**
 * toggle the visibility of the icon
 * @param {Element-ID} id - Id of the element icon that visibility need to be toggled
 */
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

/**
 *
 * @param {Element-ID} idInput -Id of the input field to which the password corresponds
 * @param {Element-ID} idImg - Id of the image element which image needs to be changed
 */
const handlePwdIcon = function (idInput, idImg) {
  let inputField = document.getElementById(idInput);
  let el = document.getElementById(idImg);
  if (inputField.value !== '') {
    el.setAttribute('src', '../icons/visibility_off.svg');
  } else {
    el.setAttribute('src', '../icons/lock.svg');
  }
};

/**
 * check user data (email, password) if valid
 * if the data are not valid an error message is thrown
 */
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

/**
 * greets the user with is name specified in the greeting
 */
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

/**
 * displays a greeting message to the user
 * @param {Element-ID} id - Id of the container where the greeting message need to be displayed
 */
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

/**
 *determines first letters of names
 * @param {string} name - name of the user
 * @returns first letters of name
 */

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

/**
 * check if password is valid
 * @param {*} givenPassword - password of the user
 * @param {*} currentPassword - single password of the server corresponding to the emails
 * @returns boolean wether match or not
 */
function isPasswordValid(givenPassword, currentPassword) {
  if (givenPassword == currentPassword) {
    return true;
  } else {
    return false;
  }
}

/**
 * check if email is valid
 * @param {string} givenEmail - email of the user
 * @param {string} currentEmail - single email of the server to check
 * @returns boolean wether match or not
 */

function isEmailValid(givenEmail, currentEmail) {
  if (givenEmail.toLowerCase() == currentEmail.toLowerCase()) {
    return true;
  } else {
    return false;
  }
}

/**
 *
 * @param {string} errorType - type (email or password) of generated error
 * @param {string} errorMsg  - message to throw when the error happen
 */
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

/**
 *
 * @param {string} action - name (without extension) of the page to display
 */
const userAction = function (action) {
  window.location.href = `../html/${action}.html`;
};

/**
 * check password of the user
 * @param(*) password - given password
 * @param(*) currentPassword - single password from the database (server) to check with
 */
const checkPassword = function (password, currentPassword) {
  if (isPasswordValid(password.value, currentPassword)) {
    userAction('summary');
  } else {
    generateError('password', 'Wrong password Ups! Try again');
  }
};
