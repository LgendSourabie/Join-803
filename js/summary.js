"use strict";

const showSubmenu = function () {
  let element = document.getElementById("submenu-user");
  let hasClass = element.classList.contains("d-none");
  if (hasClass) {
    element.classList.remove("d-none");
  } else {
    element.classList.add("d-none");
  }
  //   document.getElementById("").style.display = "";
};

const todayDate = function () {
  let today = new Date();
};
