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
