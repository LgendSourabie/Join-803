'use strict';

const showSubmenu = function () {
  let element = document.getElementById('submenu-user');
  element.classList.toggle('d-none');
};

let allDate = [];
let allDateGMT;
let allDateSTAMP;
let upComingDate;

const dueDateNextTask = async function () {
  await loadTasks();
  let datesArray = tasks.map(todo => todo['dueDate']);
  for (let i = 0; i < datesArray.length; i++) {
    const date = datesArray[i];
    if (!date) return;
    const newDateArray = date.split('.');
    newDateArray[0] = newDateArray.splice(1, 1, newDateArray[0])[0];
    const modifiedDateFormat = newDateArray.join('.');
    allDate.push({ dateGMT: modifiedDateFormat, dateStamp: Date.parse(modifiedDateFormat) });
    allDateGMT = allDate.map(date => date['dateGMT']);
    allDateSTAMP = allDate.map(date => date['dateStamp']);
    const indexDueDate = allDateSTAMP.indexOf(Math.min(...allDateSTAMP));
    upComingDate = allDateGMT[indexDueDate];
  }

  // Parameter wird noch vergeben

  let today = new Date(upComingDate);
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

const renderTask = async function () {
  await loadTasks();
  let taskArray = tasks.map(todo => todo['prio']);
  let toDo = taskArray.filter(a => a === 'todo');
  let feedback = taskArray.filter(a => a === 'awaitfeedback');
  let urgent = taskArray.filter(a => a === 'urgent');
  let board = taskArray.filter(a => a === 'board');
  let progress = taskArray.filter(a => a === 'inprogress');
  let done = taskArray.filter(a => a === 'done');
  const NO_TODO_TASK = toDo.length;
  const NO_DONE_TASK = done.length;
  const NO_URGENT_TASK = urgent.length;
  const DUE_DATE_NEXT_TASK = await dueDateNextTask();
  const NO_BORD_TASK = board.length;
  const NO_PROGRESS_TASK = progress.length;
  const NO_AWAITING_FEEDBAK_TASK = feedback.length;
  document.getElementById('todoID').innerHTML = `${NO_TODO_TASK}`;
  document.getElementById('doneID').innerHTML = `${NO_DONE_TASK}`;
  document.getElementById('urgentID').innerHTML = `${NO_URGENT_TASK}`;
  document.getElementById('due-dateID').innerHTML = `${DUE_DATE_NEXT_TASK}`;
  document.getElementById('board-task-number').innerHTML = `${NO_BORD_TASK}`;
  document.getElementById('progress-task-number').innerHTML = `${NO_PROGRESS_TASK}`;
  document.getElementById('feedback-task-number').innerHTML = `${NO_AWAITING_FEEDBAK_TASK}`;
};

async function loadTasks() {
  tasks = JSON.parse(await getItem('tasks'));
}
