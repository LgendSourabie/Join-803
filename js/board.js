let todos = [
  {
    title: 'test note für den Zweck der Testung.',
    discription: 'we test it',
    'assigned to': 'Pascal',
    'due date': '13.12.23',
    prio: '/icons/priomedium.svg',
    category: 'Technical Task',
    subtasks: ['test2'],
    progress: [],
    id: 0,
    taskboard: 'todo',
    checkboxStates: []
  },
  {
    title: 'test note1',
    discription: 'we test it',
    'assigned to': 'Pascal',
    'due date': '13.12.23',
    prio: '/icons/priolow.svg',
    category: 'Technical Task',
    subtasks: ['test1', 'test2'],
    progress: [],
    id: 1,
    taskboard: 'todo',
    checkboxStates: []
  },
  {
    title: 'test note2',
    discription: 'we test it',
    'assigned to': 'Pascal',
    'due date': '13.12.23',
    prio: '/icons/priolow.svg',
    category: 'Technical Task',
    subtasks: ['test1', 'test2'],
    progress: [],
    id: 2,
    taskboard: 'awaitfeedback',
    checkboxStates: []
  },
  {
    title: 'test note3',
    discription: 'we test it',
    'assigned to': 'Pascal',
    'due date': '13.12.23',
    prio: '/icons/priolow.svg',
    category: 'Technical Task',
    subtasks: ['test1', 'test2'],
    progress: [],
    id: 3,
    taskboard: 'awaitfeedback',
    checkboxStates: []
  },
  {
    title: 'test note4',
    discription: 'we test it',
    'assigned to': 'Pascal',
    'due date': '13.12.23',
    prio: '/icons/priolow.svg',
    category: 'Technical Task',
    subtasks: ['test1', 'test2', 'klappts?'],
    progress: [],
    id: 4,
    taskboard: 'inprogress',
    checkboxStates: []
  },
  {
    title: 'test note5',
    discription: 'we test it',
    'assigned to': 'Pascal',
    'due date': '13.12.23',
    prio: '/icons/priolow.svg',
    category: 'Technical Task',
    subtasks: ['test1', 'test2'],
    progress: [],
    id: 5,
    taskboard: 'done',
    checkboxStates: []
  },
];

let currentDraggedElement;

function renderToDos() {
  forlooprender('todo');

  forlooprender('inprogress');

  forlooprender('awaitfeedback');

  forlooprender('done');
}


function forlooprender(test) {
  let todo = todos.filter(t => t['taskboard'] == test);

  const container = document.getElementById(test);
  container.innerHTML = '';

  if (todo.length === 0) {
    container.innerHTML = `<img class="notask" src="../icons/notasktodo.svg" alt="Empty">`;
  } else {
    for (let index = 0; index < todo.length; index++) {
      const element = todo[index];
      container.innerHTML += todotemplate(element, index);
    }
  }
}


function filterTodosByTitle() {
  let input = document.getElementById('taskInput');
  let filter = input.value.toLowerCase();

  let filteredTodos = todos.filter(function (todo) {
    return todo.title.toLowerCase().includes(filter);
  });

  renderFilteredTodos(filteredTodos);
}

function renderFilteredTodos(filteredTodos) {
  document.getElementById('todo').innerHTML = '';
  document.getElementById('inprogress').innerHTML = '';
  document.getElementById('awaitfeedback').innerHTML = '';
  document.getElementById('done').innerHTML = '';

  for (let index = 0; index < filteredTodos.length; index++) {
    const element = filteredTodos[index];
    document.getElementById(element.taskboard).innerHTML += todotemplate(element);
  }
}

function todotemplate(currentElement) {
  return /*html*/ `
 <div class="todocard" draggable="true" ondragstart="startDragging(${currentElement['id']})" onclick="showtodowindow(${currentElement.id})">
    <button>${currentElement.category}</button>
    <b>${currentElement.title}</b>
    <span>${currentElement.discription}</span>
    <div class="subtasks">
        <div class="progress-container">
            <div class="progress" style="width: ${(currentElement.progress.length / currentElement.subtasks.length) * 100}%">
            </div>
        </div>  
        <div>${currentElement.progress.length}/${currentElement.subtasks.length}Subtasks</div> 
    </div>
    <div class="assignedprio">
        <div>contacts</div>
        <img src="${currentElement.prio}" alt="">
    </div>
</div>
`;
}

function showtodowindow(i) {
  let todowindow = document.getElementById('showtodowindow');
  todowindow.classList.add('showtodowindow');
  todowindow.innerHTML = todowindowtemplate(i);
  createSubtasks(i);
}

function todowindowtemplate(i) {
  return /*html*/ `
    <div class="overlay">
        <div class="overlaybutton">
            <button>${todos[i].category}</button>
            <img src="../icons/close.svg" alt="" onclick="closetodowindow()">
        </div>
        <h1>${todos[i].title}</h1>
        <span class="overlaydiscription">${todos[i].discription}</span>
        <div class="overlaytable">
            <span>Due date:</span>
            <span>${todos[i]['due date']}</span>
        </div>
        <div class="overlaytable">
            <span>Priority</span>
            <div>
                <span>${todos[i].category}</span>
                <img src="${todos[i].prio}" alt="">
            </div>
        </div>
        <div class="overlayassigned">
            <div>Assinged to:</div>
            <div id="contacts"></div>
        </div>
        <div class="overlayassigned">
            <span>Subtasks</span>
            <div id="subtasks"></div>
        </div>
        <div class="overlaychange">
            <div class="overlaydelete">
                <img src="../icons/delete.svg" alt="">
                <span>Delete</span>
            </div>
            <span>|</span>
            <div class="overlayedit" onclick="edittask(${i})">
                <img src="../icons/editcontact.svg" alt="">
                <span>Edit</span>
            </div>
        </div>
    </div>
`;
}
function initializeCheckboxStates() {
  todos.forEach(todo => {
    todo.checkboxStates = new Array(todo.subtasks.length).fill(false);
  });
}

initializeCheckboxStates();

function createSubtasks(i) {
  for (let j = 0; j < todos[i].subtasks.length; j++) {
    const element = todos[i].subtasks[j];
    document.getElementById('subtasks').innerHTML += /*html*/ `
        <div>
            <img id="checkbox${j}" src="${todos[i].checkboxStates[j] ? '../icons/checkButton.svg' : '../icons/uncheckBox.svg'}" alt="" onclick="changecheckbox('checkbox${j}' , ${i}, ${j})">
           <span>${element}</span> 
        </div>
    `;
  }
}
function changecheckbox(j, i, subtaskIndex) {
  const checkbox = document.getElementById(j);

  if (checkbox.src.endsWith('../icons/uncheckBox.svg')) {
    checkbox.src = '../icons/checkButton.svg';
    todos[i].checkboxStates[subtaskIndex] = true;
    todos[i].progress.push(todos[i].subtasks[subtaskIndex]);
  } else {
    checkbox.src = '../icons/uncheckBox.svg';
    todos[i].checkboxStates[subtaskIndex] = false;
    // Remove the subtask from progress array
    const subtaskToRemove = todos[i].subtasks[subtaskIndex];
    const indexToRemove = todos[i].progress.indexOf(subtaskToRemove);
    if (indexToRemove !== -1) {
      todos[i].progress.splice(indexToRemove, 1);
    }
  };

  renderToDos();
}

function startDragging(id) {
  currentDraggedElement = id;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(category) {
  todos[currentDraggedElement]['taskboard'] = category;
  removeHighlight(category);
  renderToDos();
}

function highlight(id) {
  document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove('drag-area-highlight');
}

function closetodowindow() {
  document.getElementById('showtodowindow').classList.remove('showtodowindow');
  document.getElementById('showtodowindow').innerHTML = '';
}

function openAddtask() {
  let addtask = document.getElementById('add-task-bg');
  addtask.classList.remove('d-none');
  addtask.innerHTML = templateOpenaddtask();
  setTimeout(() => {
    document.getElementById('fly-in-container').classList.add('fly-in-add-edit');
  }, 50);
}

function templateOpenaddtask() {
  return /*html*/ `
    <div id="fly-in-container">
        <div class="addTaskContainerFlyin">

        <form class="addTaskOverviewContainer" onsubmit="createTask(); return false">
        <div class="addTaskContainerLeftRight">
            <div class="addTaskContainerOneflyin">
                <div class="test1">
                <div class="groupButtonForm">
                    <div class="test2">
                    <div class="h2Container">
                        <h2>Add Task</h2>
                    </div>
                </div>
                <div class="test3">
                    <div class="containerLeft">
                        <div class="titleAddTask addTaskOverview">
                            <span class="containerLeftSpan">Title
                                <span class="star">*</span>
                            </span>
                            <input onclick="changeBorderColor(this)" id="title" class="inputAddTask" type="text" placeholder="Enter a title" required>
                        </div>
                        <div class="descriptionAddTask addTaskOverview">
                            <span class="containerLeftSpan">Description</span>
                            <textarea onclick="changeBorderColor(this)" id="description" class="textAreaAddTask" placeholder="Enter a Description"></textarea>
                        </div>
                        <div class="assignedAddTask addTaskOverview">
                            <span class="containerLeftSpan">Assigned to</span>
                            <div id="dropdown" class="dropdown" onclick="handleDropdownClick(this)">Select contacts to assign</div>
                              <div class="test6" onclick="handleDropdownClick(this)">
                                <img class="dropDownImg" src="../img/img/arrow_drop_down.svg" alt="">
                              </div>
                            <div id="options" class="options d-none"></div>
                              <div id="btn-grp" class="btn"></div>
                        </div>
                    </div>
                    <div class="seperatorContainer"></div>
                    <div class="containerRight">
                        <div class="dateAddTask addTaskOverview">
                            <span class="containerLeftSpan">Due date
                                <span class="star">*</span>
                            </span>    
                            <input onclick="changeBorderColor(this)" id="date" class="inputAddTask" type="date">
                        </div>
                        <div class="addTaskOverview">
                            <span class="containerLeftSpan">Prio</span>
                            <div id="prio" class="prioSelection">
                                <img id="colorUrgentImg" onclick="prio('Urgent'); changeColorPrio('colorUrgentImg','colorLowImg', 'colorMediumImg','../img/img/urgent.svg', '../img/img/urgent-white.svg','../img/img/low.svg','../img/img/medium.svg')" class="prio prioUrgentIMG testPrio" src="../img/img/urgent.svg" alt="">
                                <img id="colorMediumImg" onclick="prio('Medium'); changeColorPrio('colorMediumImg','colorUrgentImg','colorLowImg', '../img/img/medium-yellow.svg', '../img/img/medium.svg','../img/img/urgent.svg','../img/img/low.svg')" class="prio prioMediumIMG testPrio" src="../img/img/medium-yellow.svg" alt="">
                                <img id="colorLowImg" onclick="prio('Low'); changeColorPrio('colorLowImg','colorMediumImg','colorUrgentImg', '../img/img/low.svg', '../img/img/low-green.svg','../img/img/medium.svg','../img/img/urgent.svg')" class="prio prioLowIMG testPrio" src="../img/img/low.svg" alt="">
                            </div>
                        </div>
                        <div class="categoryAddTask addTaskOverview">
                            <span class="containerLeftSpan">Category
                                <span class="star">*</span>
                            </span>    
                            <select onclick="changeBorderColor(this)" id="selectCategory">
                            </select>
                        </div> 
                        <div class="subtasksAddTask addTaskOverview">
                            <span class="spanSubtasks">Subtasks</span>
                            <div class="test_test">
                              <input type="text" onclick="changeBorderColor(this)" id="subtasks" class="inputAddTaskSubtask" type="text" placeholder="Add new subtask">
                              <button type="button" class="buttonSubtask" id="buttonSubtask" >
                              <img onclick="addNewSubtask(); changeSubtaskImg()" id="subtasksPlusIMG" class="subtasksPlusIMG" src="../img/img/subtasksPlus.svg" alt="">
                            </button>
                              <button type="button" class="buttonSubtask" id="buttonSubtask" >
                              <img onclick="deleteSubtaskInput()" id="subtasksCancelIMG" class="subtasksCancelIMG" src="../img/img/subtasks_cancel.svg" alt=""> 
                            </button>
                            </div>                      
                            <ul id="subtasksList"></ul>
                        </div> 
                    </div>
                </div>
                </div>
            </div>
                <div class="addTaskContainerTwo">
                        <div class="footerAddTask">
                            <div class="spanFooter">
                                <span class="star">*</span>
                                <span>This field is required</span>
                            </div>
                            <div class="footerAddTaskButtons">
                                <div onclick="closeAddContact()" id="clearButton" class="clearButton">
                                  <span>Cancel X</span>
                                </div>
                                <button id="createTaskButton" class="createTaskButton">
                                    <span>Create Task</span>
                                    <img class="imgCheck" src="../img/img/check.svg" alt="">
                                </button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </form>
</div>
</div>
    `;
}

function edittask(i) {
  let todowindow = document.getElementById('showtodowindow');
  todowindow.classList.add('showtodowindow');
  todowindow.innerHTML = edittasktemplate(i);
}

function edittasktemplate(i){
  return /*html*/`
            <form class="addTaskOverviewContainer" onsubmit="createTask(); return false">
        <div class="addTaskContainerLeftRight">
            <div class="addTaskContainerOneflyin">
                <div class="test1">
                <div class="groupButtonForm">
                    <div class="test2">
                    <div class="h2Container">
                        <h2>Add Task</h2>
                    </div>
                </div>
                <div class="test3">
                    <div class="containerLeft">
                        <div class="titleAddTask addTaskOverview">
                            <span class="containerLeftSpan">Title
                                <span class="star">*</span>
                            </span>
                            <input onclick="changeBorderColor(this)" id="title" class="inputAddTask" type="text" placeholder="Enter a title" required>
                        </div>
                        <div class="descriptionAddTask addTaskOverview">
                            <span class="containerLeftSpan">Description</span>
                            <textarea onclick="changeBorderColor(this)" id="description" class="textAreaAddTask" placeholder="Enter a Description"></textarea>
                        </div>
                        <div class="assignedAddTask addTaskOverview">
                            <span class="containerLeftSpan">Assigned to</span>
                            <div id="dropdown" class="dropdown" onclick="handleDropdownClick(this)">Select contacts to assign</div>
                              <div class="test6" onclick="handleDropdownClick(this)">
                                <img class="dropDownImg" src="../img/img/arrow_drop_down.svg" alt="">
                              </div>
                            <div id="options" class="options d-none"></div>
                              <div id="btn-grp" class="btn"></div>
                        </div>
                    </div>
                    <div class="seperatorContainer"></div>
                    <div class="containerRight">
                        <div class="dateAddTask addTaskOverview">
                            <span class="containerLeftSpan">Due date
                                <span class="star">*</span>
                            </span>    
                            <input onclick="changeBorderColor(this)" id="date" class="inputAddTask" type="date">
                        </div>
                        <div class="addTaskOverview">
                            <span class="containerLeftSpan">Prio</span>
                            <div id="prio" class="prioSelection">
                                <img id="colorUrgentImg" onclick="prio('Urgent'); changeColorPrio('colorUrgentImg','colorLowImg', 'colorMediumImg','../img/img/urgent.svg', '../img/img/urgent-white.svg','../img/img/low.svg','../img/img/medium.svg')" class="prio prioUrgentIMG testPrio" src="../img/img/urgent.svg" alt="">
                                <img id="colorMediumImg" onclick="prio('Medium'); changeColorPrio('colorMediumImg','colorUrgentImg','colorLowImg', '../img/img/medium-yellow.svg', '../img/img/medium.svg','../img/img/urgent.svg','../img/img/low.svg')" class="prio prioMediumIMG testPrio" src="../img/img/medium-yellow.svg" alt="">
                                <img id="colorLowImg" onclick="prio('Low'); changeColorPrio('colorLowImg','colorMediumImg','colorUrgentImg', '../img/img/low.svg', '../img/img/low-green.svg','../img/img/medium.svg','../img/img/urgent.svg')" class="prio prioLowIMG testPrio" src="../img/img/low.svg" alt="">
                            </div>
                        </div>
                        <div class="categoryAddTask addTaskOverview">
                            <span class="containerLeftSpan">Category
                                <span class="star">*</span>
                            </span>    
                            <select onclick="changeBorderColor(this)" id="selectCategory">
                            </select>
                        </div> 
                        <div class="subtasksAddTask addTaskOverview">
                            <span class="spanSubtasks">Subtasks</span>
                            <div class="test_test">
                              <input type="text" onclick="changeBorderColor(this)" id="subtasks" class="inputAddTaskSubtask" type="text" placeholder="Add new subtask">
                              <button type="button" class="buttonSubtask" id="buttonSubtask" >
                              <img onclick="addNewSubtask(); changeSubtaskImg()" id="subtasksPlusIMG" class="subtasksPlusIMG" src="../img/img/subtasksPlus.svg" alt="">
                            </button>
                              <button type="button" class="buttonSubtask" id="buttonSubtask" >
                              <img onclick="deleteSubtaskInput()" id="subtasksCancelIMG" class="subtasksCancelIMG" src="../img/img/subtasks_cancel.svg" alt=""> 
                            </button>
                            </div>                      
                            <ul id="subtasksList"></ul>
                        </div> 
                    </div>
                </div>
                </div>
            </div>
                <div class="addTaskContainerTwo">
                        <div class="footerAddTask">
                            <div class="spanFooter">
                                <span class="star">*</span>
                                <span>This field is required</span>
                            </div>
                            <div class="footerAddTaskButtons">
                                <div onclick="closeAddContact()" id="clearButton" class="clearButton">
                                  <span>Cancel X</span>
                                </div>
                                <button id="createTaskButton" class="createTaskButton">
                                    <span>Create Task</span>
                                    <img class="imgCheck" src="../img/img/check.svg" alt="">
                                </button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </form>
  `
}