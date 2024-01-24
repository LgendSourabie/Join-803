let currentDraggedElement;
let edittodo = [];

/** 
 * function to load the Board
*/
async function renderToDos() {
  await loadContacts();
  renewID();
  forlooprender('todo');
  forlooprender('inprogress');
  forlooprender('awaitfeedback');
  forlooprender('done');
}

/** 
 * function to renew the id in the tasks JSON 
*/
function renewID() {
  for (let i = 0; i < tasks.length; i++) {
    const element = tasks[i];
    element.id = i;
  }
}

/** 
 * function to render every todo inside the right column table
 * 
 * @param {string} test names the right column table
 * 
*/
function forlooprender(test) {
  let todo = tasks.filter(t => t['taskboard'] == test);

  const container = document.getElementById(test);
  container.innerHTML = '';
  if (todo.length === 0) {
    container.innerHTML = `<img class="notask" src="../icons/notasktodo.svg" alt="Empty">`;
  } else {
    returnforlooprender(todo, container);
  }
}

/** 
 * the for loop to render the ToDos 
 * 
 * @param {string} todo filters the tasks array
 * @param {string} container 
*/
function returnforlooprender(todo, container){
  for (let index = 0; index < todo.length; index++) {
    const element = todo[index];
    const id = element.id
    container.innerHTML += todotemplate(element, id);
    renderAssignedTo('assigned' + id, id);
    rendercategory('category' + id, id);
    renderPrio('prio'+id,id);
    checksubtask(id);
  }
}

/** 
 * function to load the prio icon 
 * @param {number} id id to identify the JSON
 * @param {string} prio to call the right id 
*/
function renderPrio(prio, id){
  if(tasks[id]['prio'] == 'low'){
    document.getElementById(prio).src = "../icons/priolow.svg"
  }else if(tasks[id]['prio'] == 'medium'){
    document.getElementById(prio).src = "../icons/priomedium.svg"
  }else{
    document.getElementById(prio).src = "../icons/priourgent.svg"
  }
  
}

/** 
 * function to filter the todos 
 * @param {string} inputfield brings the id to load
*/
function filterTodosByTitle(inputfield) {
  let input = document.getElementById(inputfield);
  let filter = input.value.toLowerCase();

  let filteredTodos = tasks.filter(function (todo) {
    return todo.title.toLowerCase().includes(filter);
  });

  renderFilteredTodos(filteredTodos);
}

/** 
 * function to render the filtered to dos 
 * @param {string} filteredTodos -the filtered JSON
*/
function renderFilteredTodos(filteredTodos) {
  document.getElementById('todo').innerHTML = '';
  document.getElementById('inprogress').innerHTML = '';
  document.getElementById('awaitfeedback').innerHTML = '';
  document.getElementById('done').innerHTML = '';
  for (let index = 0; index < filteredTodos.length; index++) {
    const element = filteredTodos[index];
    const id = element.id;
    document.getElementById(element.taskboard).innerHTML += todotemplate(element, id);
    renderAssignedTo('assigned' + id, id);
    rendercategory('category' + id, id);
    renderPrio('prio'+id,id);
    checksubtask(id);
  }
}

/** 
 * checks if there is any Subtask
 * @param {number} i -the index to identify the right JSON 
*/
function checksubtask(i){
  if (tasks[i].subtasks.length==0) {
    document.getElementById('subtasksnone'+i).style.display = 'none'; 
  }
}

/** 
 * shows the full todo Window 
 * @param {number} i -the index to identify the right JSON 
*/
function showtodowindow(i) {
  let todowindow = document.getElementById('showtodowindow');
  todowindow.classList.add('showtodowindow');
  todowindow.innerHTML = todowindowtemplate(i);
  createSubtasks(i);
  renderAssignedTopopup('assigned', i);
  rendercategory('category', i);
  renderPrio('prio',i);
}

/** 
 * shows the right Category in the todo Window
 * @param {number} i -the index to identify the right JSON 
 * @param {string} id -the id from the Element  
*/
function rendercategory(id, i) {
  if (tasks[i].category == 'User Story') {
    document.getElementById(id).style.backgroundColor = '#0038FF';
  }
  else {
    document.getElementById(id).style.backgroundColor = '#1fd7c1';
  }
}

/** 
 * function to render the Assigned to section
 * @param {string} assigned -Id for right implementation
 * @param {number} id -the index to identify the right JSON
*/
function renderAssignedTo(assigned, id) {
  let btnUserProfile = document.getElementById(assigned);
  btnUserProfile.innerHTML = '';
  for (let j = 0; j < tasks[id].assignedTo.length; j++) {
    const btn = tasks[id].assignedTo[j];
    btnUserProfile.innerHTML += `<button id="${id}optBtn${j}" class="btn-grp">${btn.initial}</button>`;
    document.getElementById(`${id}optBtn${j}`).style.backgroundColor = tasks[id].assignedTo[j]['bgColor'];
  }
}

/** 
 * function to render the Assigned to section inside the pop up Window
 * @param {string} assigned -Id for right implementation
 * @param {number} id -the index to identify the right JSON
*/
function renderAssignedTopopup(assigned, id) {
  tasks[id].assignedTo
  let btnUserProfile = document.getElementById(assigned);
  btnUserProfile.innerHTML = '';
  for (let j = 0; j < tasks[id].assignedTo.length; j++) {
    const btn = tasks[id].assignedTo[j];
    btnUserProfile.innerHTML += /*html*/`
    <div>
      <button id="optBtn${j}" class="btn-grp">${btn.initial}</button>
      <span>${btn.name}</span>
    </div>`;
    document.getElementById(`optBtn${j}`).style.backgroundColor = tasks[id].assignedTo[j]['bgColor'];
  }
}

/** 
 * function to render subtasks
 * @param {number} i -the index to identify the right JSON
*/
function createSubtasks(i) {
  const subtasksContainer = document.getElementById('subtasks');
  subtasksContainer.innerHTML = ''; 

  for (let j = 0; j < tasks[i].subtasks.length; j++) {
    const element = tasks[i].subtasks[j];
    subtasksContainer.innerHTML += /*html*/ `
        <div class="align-horizontally">
            <img id="checkbox${j}" src="${tasks[i].checkboxStates[j] ? '../icons/checkButton.svg' : '../icons/uncheckBox.svg'}" alt="" onclick="changecheckbox('checkbox${j}' , ${i}, ${j})">
           <span>${element}</span> 
        </div>
    `;
  }
}

/** 
 * function to change the checkstate
 * @param {string} j -Id for right implementation
 * @param {number} i -the index to identify the right JSON
 * @param {number} subtaskIndex -The index to identify the right subtask
*/
async function changecheckbox(j, i, subtaskIndex) {
  const checkbox = document.getElementById(j);
  ifchangecheckbox(i, subtaskIndex, checkbox);
  renderToDos();
  await setItem('tasks', JSON.stringify(tasks))
}

/** 
 * if question to change the checkstate
 * @param {string} i -the index to identify the right JSON
 * @param {number} subtaskIndex -The index to identify the right subtask
 * @param {string} checkbox -Id to find the right Element
*/
function ifchangecheckbox(i, subtaskIndex, checkbox) {
  if (checkbox.src.includes('uncheckBox.svg')) {
    checkbox.src = '../icons/checkButton.svg';
    tasks[i].checkboxStates[subtaskIndex] = true;
    tasks[i].progress.push(tasks[i].subtasks[subtaskIndex]);
  } else {
    checkbox.src = '../icons/uncheckBox.svg';
    tasks[i].checkboxStates[subtaskIndex] = false;
    const subtaskToRemove = tasks[i].subtasks[subtaskIndex];
    const indexToRemove = tasks[i].progress.indexOf(subtaskToRemove);
    if (indexToRemove !== -1) {
      tasks[i].progress.splice(indexToRemove, 1);
    }
  }
}

/** 
 * function to drag the right element
 * @param {number} id -the index to identify the right JSON
*/
function startDragging(id) {
  currentDraggedElement = id;
}

/** 
 * function to drop the right element
 * @param {string} ev -the event for droping
*/
function allowDrop(ev) {
  ev.preventDefault();
}

/** 
 * function to move the element to a new column
 * @param {string} category -the category
*/
async function moveTo(category) {
  tasks[currentDraggedElement]['taskboard'] = category;
  removeHighlight(category);
  renderToDos();
  await setItem('tasks', JSON.stringify(tasks));
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

