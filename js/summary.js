'use strict';
let allDate = [];
let allDateGMT;
let allDateSTAMP;
let upComingDate;

/**
 * toggle the menu to allow or disallow the user to logout
 */
const showSubmenu = function () {
  let element = document.getElementById('submenu-user');
  element.classList.toggle('d-none');
};

/**
 * determines the due date of the next task from the task array
 * @returns upcoming due date
 */

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

  let today = new Date(upComingDate);
  let dateArray = today.toDateString().split(' ');
  let day = dateArray[2];
  let monthNumeric = today.getMonth();
  let year = dateArray[3];
  let monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return `${monthArray[monthNumeric]} ${day}, ${year}`;
};

/**
 * render the number of tasks in every sections (todo, done, urgent, etc.)
 */

const renderTask = async function () {
  const [NO_TODO_TASK, NO_DONE_TASK, NO_URGENT_TASK, DUE_DATE_NEXT_TASK, NO_BORD_TASK, NO_PROGRESS_TASK, NO_AWAITING_FEEDBAK_TASK] = await numberTask();
  let todoID = document.getElementById('todoID');
  let doneID = document.getElementById('doneID');
  let urgentID = document.getElementById('urgentID');
  let due_dateID = document.getElementById('due-dateID');
  let board_task_number = document.getElementById('board-task-number');
  let progress_task_number = document.getElementById('progress-task-number');
  let feedback_task_number = document.getElementById('feedback-task-number');
  if (todoID) todoID.innerHTML = `${NO_TODO_TASK}`;
  if (doneID) doneID.innerHTML = `${NO_DONE_TASK}`;
  if (urgentID) urgentID.innerHTML = `${NO_URGENT_TASK}`;
  if (due_dateID) due_dateID.innerHTML = `${DUE_DATE_NEXT_TASK}`;
  if (board_task_number) board_task_number.innerHTML = `${NO_BORD_TASK}`;
  if (progress_task_number) progress_task_number.innerHTML = `${NO_PROGRESS_TASK}`;
  if (feedback_task_number) feedback_task_number.innerHTML = `${NO_AWAITING_FEEDBAK_TASK}`;
};

/**
 * determine the number of task from the tasks array
 * @returns no. tasks todo, done, urgent, upcoming date,in board,in progress and awaiting for feedback
 */

const numberTask = async function () {
  await loadTasks();
  let taskArray = tasks.map(todo => todo['taskboard']);
  let urgentTaskArray = tasks.filter(todo => todo['prio'] === 'urgent');
  let toDo = taskArray.filter(a => a === 'todo');
  let feedback = taskArray.filter(a => a === 'awaitfeedback');
  let progress = taskArray.filter(a => a === 'inprogress');
  let done = taskArray.filter(a => a === 'done');
  const NO_TODO_TASK = toDo.length;
  const NO_DONE_TASK = done.length;
  const NO_URGENT_TASK = urgentTaskArray.length;
  const DUE_DATE_NEXT_TASK = await dueDateNextTask();
  const NO_BORD_TASK = tasks.length;
  const NO_PROGRESS_TASK = progress.length;
  const NO_AWAITING_FEEDBAK_TASK = feedback.length;
  return [NO_TODO_TASK, NO_DONE_TASK, NO_URGENT_TASK, DUE_DATE_NEXT_TASK, NO_BORD_TASK, NO_PROGRESS_TASK, NO_AWAITING_FEEDBAK_TASK];
};

/**
 * load task from server to make the tasks available in the dashboard
 */
async function loadTasks() {
  tasks = JSON.parse(await getItem('tasks'));
}
