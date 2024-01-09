'use strict';


const showSubmenu = function () {
  let element = document.getElementById('submenu-user');
  element.classList.toggle('d-none');
};

const dueDateNextTask = function () {
  // Parameter wird noch vergeben
  let today = new Date(); // wird später geändert
  let dateArray = today.toDateString().split(' ');
  let day = dateArray[2];
  let monthNumeric = today.getMonth(); //dateArray[1];
  let year = dateArray[3];
  let monthArray = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return `${monthArray[monthNumeric]} ${day}, ${year}`;
};

// let taskArray = tasks.map(todo => todo['taskboard']);
// let toDo = taskArray.filter(a => a === 'todo');
// let feedback = taskArray.filter(a => a === 'awaitfeedback');
// let urgent = taskArray.filter(a => a === 'urgent');
// let board = taskArray.filter(a => a === 'board');
// let progress = taskArray.filter(a => a === 'inprogress');
// let done = taskArray.filter(a => a === 'done');

// const renderTask = function () {
//   const NO_TODO_TASK = toDo.length;
//   const NO_DONE_TASK = done.length;
//   const NO_URGENT_TASK = urgent.length;
//   const DUE_DATE_NEXT_TASK = dueDateNextTask();
//   const NO_BORD_TASK = board.length;
//   const NO_PROGRESS_TASK = progress.length;
//   const NO_AWAITING_FEEDBAK_TASK = feedback.length;
//   document.getElementById('todo').innerHTML = `${NO_TODO_TASK}`;
//   document.getElementById('done').innerHTML = `${NO_DONE_TASK}`;
//   document.getElementById('urgent').innerHTML = `${NO_URGENT_TASK}`;
//   document.getElementById('due-date').innerHTML = `${DUE_DATE_NEXT_TASK}`;
//   document.getElementById('board-task-number').innerHTML = `${NO_BORD_TASK}`;
//   document.getElementById('progress-task-number').innerHTML = `${NO_PROGRESS_TASK}`;
//   document.getElementById('feedback-task-number').innerHTML = `${NO_AWAITING_FEEDBAK_TASK}`;
// };

async function loadTasks() {
  tasks = JSON.parse(await getItem("tasks"));
}

// const renderAlltask=function(){

// }
