/**
 * get the position of the todo-departments
 */
function setPosition() {
  todoPos = document.getElementById('todo').getBoundingClientRect();
  inprogressPos = document.getElementById('inprogress').getBoundingClientRect();
  awaitfeedbackPos = document.getElementById('awaitfeedback').getBoundingClientRect();
  donePos = document.getElementById('done').getBoundingClientRect();
}

/**
 * controls the touch-end event
 * @param {HTML Element} elem is the moving container
 */
function touchEnd(elem) {
  elem.addEventListener('touchend', eve => {
    if (allowMove == true) {
      allowMove = false;
      setPosition();
      insertContainerTouchEnd(eve, elem);
      renderToDos();
    }
  });
}

function insertContainerTouchEnd(eve, elem) {
  let elemId = elem.id.slice(15);
  let nextY = eve.changedTouches[0].pageY;
  let nextX = eve.changedTouches[0].pageX;
  let offsetDrop = 30;
  if (canDroppedDone(nextX, nextY, offsetDrop)) {
    tasks[elemId].taskboard = 'done';
  } else if (canDroppedAwaitfeedback(nextX, nextY, offsetDrop)) {
    tasks[elemId].taskboard = 'awaitfeedback';
  } else if (canDroppedInprogress(nextX, nextY, offsetDrop)) {
    tasks[elemId].taskboard = 'inprogress';
  } else if (canDroppedTodo(nextX, nextY, offsetDrop)) {
    tasks[elemId].taskboard = 'todo';
  }
}

/**
 * @param {integer} nextX
 * @param {integer} nextY
 * @param {integer} offsetDrop
 * @returns if the touch-point is in the done section
 */
function canDroppedDone(nextX, nextY, offsetDrop) {
  return nextY > donePos.top - offsetDrop && nextY < donePos.bottom + offsetDrop && nextX < donePos.right + offsetDrop && nextX > donePos.left - offsetDrop;
}

/**
 * @param {integer} nextX
 * @param {integer} nextY
 * @param {integer} offsetDrop
 * @returns if the touch-point is in the await feedback section
 */
function canDroppedAwaitfeedback(nextX, nextY, offsetDrop) {
  return (
    nextY > awaitfeedbackPos.top - offsetDrop &&
    nextY < awaitfeedbackPos.bottom + offsetDrop &&
    nextX < awaitfeedbackPos.right + offsetDrop &&
    nextX > awaitfeedbackPos.left - offsetDrop
  );
}

/**
 * @param {integer} nextX
 * @param {integer} nextY
 * @param {integer} offsetDrop
 * @returns if the touch-point is in the in progress section
 */
function canDroppedInprogress(nextX, nextY, offsetDrop) {
  return nextY > inprogressPos.top - offsetDrop && nextY < inprogressPos.bottom + offsetDrop && nextX < inprogressPos.right + offsetDrop && nextX > inprogressPos.left - offsetDrop;
}

/**
 * @param {integer} nextX
 * @param {integer} nextY
 * @param {integer} offsetDrop
 * @returns if the touch-point is in the todo section
 */
function canDroppedTodo(nextX, nextY, offsetDrop) {
  return nextY > todoPos.top - offsetDrop && nextY < todoPos.bottom + offsetDrop && nextX < todoPos.right + offsetDrop && nextX > todoPos.left - offsetDrop;
}

/**
 * function to highlight the element
 * @param {number} id -the index to identify the right JSON
 */
function highlight(id) {
  document.getElementById(id).classList.add('drag-area-highlight');
}

/**
 * function to remove the highlight
 * @param {number} id -the index to identify the right JSON
 */
function removeHighlight(id) {
  document.getElementById(id).classList.remove('drag-area-highlight');
}

/**
 * function to close the todo popup
 */
function closetodowindow() {
  document.getElementById('showtodowindow').classList.remove('showtodowindow');
  document.getElementById('showtodowindow').innerHTML = '';
}

/**
 * function to open the add task window
 */
function openAddtask() {
  let addtask = document.getElementById('add-task-bg');
  addtask.classList.remove('d-none');
  addtask.innerHTML = templateOpenaddtask();
  setTimeout(() => {
    document.getElementById('fly-in-container').classList.add('fly-in-add-edit');
  }, 50);
  btns = [];
  initialize();
  addCategory();
  options();
  renderBtn();
}
