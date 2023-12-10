"use strict";

const showSubmenu = function () {
  let element = document.getElementById("submenu-user");
  element.classList.toggle("d-none");
};

const dueDateNextTask = function () {
  // Parameter wird noch vergeben
  let today = new Date(); // wird später geändert
  let dateArray = today.split(" ");
  let day = dateArray[2];
  let monthNumeric = today.getMonth(); //dateArray[1];
  let year = dateArray[3];
  let monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${monthArray[monthNumeric]} ${day}, ${year}`;
};

const renderTask = function (
  todo,
  done,
  urgent,
  dueDate,
  board,
  progress,
  feedback
) {
  const NO_TODO_TASK = todo.length;
  const NO_DONE_TASK = done.length;
  const NO_URGENT_TASK = urgent.length;
  const DUE_DATE_NEXT_TASK = dueDateNextTask();
  const NO_BORD_TASK = board.length;
  const NO_PROGRESS_TASK = progress.length;
  const NO_AWAITING_FEEDBAK_TASK = feedback.length;
  document.getElementById("todo").innerHTML = `${NO_TODO_TASK}`;
  document.getElementById("done").innerHTML = `${NO_DONE_TASK}`;
  document.getElementById("urgent").innerHTML = `${NO_URGENT_TASK}`;
  document.getElementById("due-date").innerHTML = `${DUE_DATE_NEXT_TASK}`;
  document.getElementById("board-task-number").innerHTML = `${NO_BORD_TASK}`;
  document.getElementById(
    "progress-task-number"
  ).innerHTML = `${NO_PROGRESS_TASK}`;
  document.getElementById(
    "feedback-task-number"
  ).innerHTML = `${NO_AWAITING_FEEDBAK_TASK}`;
};
