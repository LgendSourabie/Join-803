let currentDraggedElement;
let edittodo = [];

async function renderToDos() {
  await loadContacts();

  renewID();

  forlooprender('todo');

  forlooprender('inprogress');

  forlooprender('awaitfeedback');

  forlooprender('done');


}

function renewID() {
  for (let i = 0; i < tasks.length; i++) {
    const element = tasks[i];
    element.id = i;
  }
}

function forlooprender(test) {
  let todo = tasks.filter(t => t['taskboard'] == test);

  const container = document.getElementById(test);
  container.innerHTML = '';
  if (todo.length === 0) {
    container.innerHTML = `<img class="notask" src="../icons/notasktodo.svg" alt="Empty">`;
  } else {
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
}

function renderPrio(prio, id){
  if(tasks[id]['prio'] == 'low'){
    document.getElementById(prio).src = "../icons/priolow.svg"
  }else if(tasks[id]['prio'] == 'medium'){
    document.getElementById(prio).src = "../icons/priomedium.svg"
  }else{
    document.getElementById(prio).src = "../icons/priourgent.svg"
  }
  
}

function filterTodosByTitle(inputfield) {
  let input = document.getElementById(inputfield);
  let filter = input.value.toLowerCase();

  let filteredTodos = tasks.filter(function (todo) {
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
    const id = element.id;
    document.getElementById(element.taskboard).innerHTML += todotemplate(element, id);
    renderAssignedTo('assigned' + id, id);
    rendercategory('category' + id, id);
    renderPrio('prio'+id,id);
    checksubtask(id);
  }
}

function checksubtask(i){
  if (tasks[i].subtasks.length==0) {
    document.getElementById('subtasksnone'+i).style.display = 'none'; 
  }
}

function todotemplate(currentElement, i) {
  return /*html*/ `
 <div class="todocard" draggable="true" ondragstart="startDragging(${currentElement.id})" onclick="showtodowindow(${currentElement.id})">
    <button id="category${i}" class="todocardbutton">${currentElement.category}</button>
    <b>${currentElement.title}</b>
    <span>${currentElement.discription}</span>
    <div id="subtasksnone${i}" class="subtasks">
        <div class="progress-container">
            <div class="progress" style="width: ${(currentElement.progress.length / currentElement.subtasks.length) * 100}%">
            </div>
        </div>  
        <div>${currentElement.progress.length}/${currentElement.subtasks.length}Subtasks</div> 
    </div>
    <div class="assignedprio">
        <div id="assigned${i}" class="btn"></div>
        <img id="prio${i}" src="" alt="prio">
    </div>
</div>
`;
}

function showtodowindow(i) {
  let todowindow = document.getElementById('showtodowindow');
  todowindow.classList.add('showtodowindow');
  todowindow.innerHTML = todowindowtemplate(i);
  createSubtasks(i);
  renderAssignedTopopup('assigned', i);
  rendercategory('category', i);
  renderPrio('prio',i);
}

function todowindowtemplate(i) {
  return /*html*/ `
    <div class="overlay">
        <div class="overlaybutton">
            <button id="category">${tasks[i].category}</button>
            <img src="../icons/close.svg" alt="" onclick="closetodowindow()">
        </div>
        <h1>${tasks[i].title}</h1>
        <span class="overlaydiscription">${tasks[i].discription}</span>
        <div class="overlaytable">
            <span class="gray-clr">Due date:</span>
            <span>${tasks[i].dueDate}</span>
        </div>
        <div class="overlaytable">
            <span class="gray-clr">Priority</span>
            <div class='align-item-center'>
                <span>${tasks[i].category}</span>
                <img id="prio" src="" alt="prio">
            </div>
        </div>
        <div class="overlayassigned">
            <div class="gray-clr">Assinged to:</div>
            <div id="assigned" class="btn"></div>
        </div>
        <div class="overlayassigned">
            <span class="gray-clr">Subtasks</span>
            <div id="subtasks"></div>
        </div>
        <div class="overlaychange">
            <div onclick="deletetask(${i})" class="overlaydelete">
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

function rendercategory(id, i) {
  if (tasks[i].category == 'User Story') {
    document.getElementById(id).style.backgroundColor = '#0038FF';
  }
  else {
    document.getElementById(id).style.backgroundColor = '#1fd7c1';
  }
}

function renderAssignedTo(assigned, id) {
  let btnUserProfile = document.getElementById(assigned);
  btnUserProfile.innerHTML = '';
  for (let j = 0; j < tasks[id].assignedTo.length; j++) {
    const btn = tasks[id].assignedTo[j];
    btnUserProfile.innerHTML += `<button id="${id}optBtn${j}" class="btn-grp">${btn.initial}</button>`;
    document.getElementById(`${id}optBtn${j}`).style.backgroundColor = tasks[id].assignedTo[j]['bgColor'];
  }
}

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

async function changecheckbox(j, i, subtaskIndex) {

  const checkbox = document.getElementById(j);

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
  renderToDos();
  await setItem('tasks', JSON.stringify(tasks))
}

function startDragging(id) {
  currentDraggedElement = id;
}

function allowDrop(ev) {
  ev.preventDefault();
}

async function moveTo(category) {
  tasks[currentDraggedElement]['taskboard'] = category;
  removeHighlight(category);
  renderToDos();
  await setItem('tasks', JSON.stringify(tasks));
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
  initialize();
  addCategory();
  options();
  renderBtn();
}

function templateOpenaddtask() {
  return /*html*/ `
    <div id="fly-in-container">
        <div class="addTaskContainerFlyin">

        <form class="addTaskContainerBoard addTaskOverviewContainer" onsubmit="createTask(); return false">
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
                                <img id="colorUrgentImg" onclick="prio('urgent'); changeColorPrio('colorUrgentImg','colorLowImg', 'colorMediumImg','../img/img/urgent.svg', '../img/img/urgent-white.svg','../img/img/low.svg','../img/img/medium.svg')" class="prio prioUrgentIMG testPrio" src="../img/img/urgent.svg" alt="">
                                <img id="colorMediumImg" onclick="prio('medium'); changeColorPrio('colorMediumImg','colorUrgentImg','colorLowImg', '../img/img/medium-yellow.svg', '../img/img/medium.svg','../img/img/urgent.svg','../img/img/low.svg')" class="prio prioMediumIMG testPrio" src="../img/img/medium-yellow.svg" alt="">
                                <img id="colorLowImg" onclick="prio('low'); changeColorPrio('colorLowImg','colorMediumImg','colorUrgentImg', '../img/img/low.svg', '../img/img/low-green.svg','../img/img/medium.svg','../img/img/urgent.svg')" class="prio prioLowIMG testPrio" src="../img/img/low.svg" alt="">
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
                        <div class="footerAddTaskBoard">
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

async function edittask(i) {
  let todowindow = document.getElementById('showtodowindow');
  todowindow.classList.add('showtodowindow');

  todowindow.innerHTML = edittasktemplate(i);

  document.getElementById('edittitle').value = tasks[i].title;
  document.getElementById('editdescription').value = tasks[i].discription;
  document.getElementById('date').value = tasks[i].dueDate;
  document.getElementById('selectCategory').value = tasks[i].category;

  btns = tasks[i].assignedTo;
  askcheckstate(i);
  renderBtn();
  
  checkprio(i);

  checkcategory(i);

  subtasks = tasks[i].subtasks;
  renderSubtask();
}

async function saveEditTask(i) {
  let title = document.getElementById('edittitle').value;
  let description = document.getElementById('editdescription').value;
  let date = document.getElementById('date').value;
  let assignedTo = btns; 
  let category = document.getElementById('selectCategory').value;
  let state = subtasks.map(returnfalse);

  if (!categories.includes(category)) {
    categories.push(category);
  }
  tasks[i] = saveEditArray(title, description, date, category, assignedTo, prios, subtasks, i);
  await setItem('tasks', JSON.stringify(tasks));
  loadboard();
}

function saveEditArray(val1, val2, val3, val4, val5, prios, val6, i) {
  return {
    title: `${val1}`,
    discription: `${val2}`,
    dueDate: `${val3}`,
    category: `${val4}`,
    assignedTo: val5,
    prio: `${prios[prios.length - 1]}`,
    subtasks: val6,
    progress: tasks[i].progress,
    id: i,
    taskboard: tasks[i].taskboard,
    checkboxStates: tasks[i].checkboxStates,
  };
}

function checkcategory(i) {
  let select = document.getElementById('selectCategory');
  select.innerHTML = `<option id="selectCategory" value="${tasks[i].category}">${tasks[i].category}</option>`;
  for (let i = 0; i < categories.length; i++) {
    let currentCategory = categories[i];
    select.innerHTML += /*html*/ `
            <option id="selectCategory-${i}" value="${currentCategory}">${currentCategory}</option>
    `;
  }
}

function askcheckstate(id) {
  let field = document.getElementById('options');
  let listeOption = contacts.map(a => a['name']);
  let initial = contacts.map(a => a['initials']);
  let colors = contacts.map(a => a['bgColor']);
  let elements = tasks[id].assignedTo.map(a => a['name']);
  field.innerHTML = '';
  for (let i = 0; i < listeOption.length; i++) {
    const option = listeOption[i];
    field.innerHTML += optionsHTMLTemplate(i, option, initial, colors);
    document.getElementById(`btn-${i}`).style.backgroundColor = `${colors[i]}`;

      if (elements.includes(option)) {
        showOptions(`cont${i}`, 'newColor');
        document.getElementById(`checkBox${i}`).src = '../img/img/Check_button-white.svg';
      }
    
  }
}


function checkprio(i) {
  if (tasks[i].prio.includes('../icons/priourgent.svg')) {
    changeColorPrio('colorUrgentImg', 'colorLowImg', 'colorMediumImg', '../img/img/urgent.svg', '../img/img/urgent-white.svg', '../img/img/low.svg', '../img/img/medium.svg')
  }
  if (tasks[i].prio.includes('../icons/priomedium.svg')) {
    changeColorPrio('colorMediumImg', 'colorUrgentImg', 'colorLowImg', '../img/img/medium-yellow.svg', '../img/img/medium.svg', '../img/img/urgent.svg', '../img/img/low.svg')
  }
  if (tasks[i].prio.includes('../icons/priolow.svg')) {
    changeColorPrio('colorLowImg', 'colorMediumImg', 'colorUrgentImg', '../img/img/low.svg', '../img/img/low-green.svg', '../img/img/medium.svg', '../img/img/urgent.svg')
  }
}



function edittasktemplate(i) {
  return /*html*/ `
            <div class="addTaskOverviewContainer editTaskContainer">
              <div class="closeEditContainer">
                <img class="closeEdit" src="../icons/close.svg" alt="" onclick="closetodowindow()">
              </div>
            
        <div class="addTaskContainerLeftRight">

            <div class="addTaskContainerOneflyin">
                <div class="test1 editTaskTest1">
                <div class="test3">
                    <div class="containerLeft">
                        <div class="titleAddTask addTaskOverview">
                            <span class="containerLeftSpan">Title
                                <span class="star">*</span>
                            </span>
                            <input onclick="changeBorderColor(this)" id="edittitle" class="inputAddTask" type="text" placeholder="Enter a title" required>
                        </div>
                        <div class="descriptionAddTask addTaskOverview">
                            <span class="containerLeftSpan">Description</span>
                            <textarea onclick="changeBorderColor(this)" id="editdescription" class="textAreaAddTask" placeholder="Enter a Description"></textarea>
                        </div>
                        <div class="assignedAddTask addTaskOverview">
                            <span class="containerLeftSpan">Assigned to</span>
                            <div id="dropdown" class="dropdown" onclick="handleDropdownClick(this)">Select contacts to assign</div>
                              <div class="test6" onclick="handleDropdownClick(this)">
                                <img class="dropDownImg" src="../img/img/arrow_drop_down.svg" alt="">
                              </div>
                            <div id="options" class="options d-none"></div>
                              <div id="btn-grp" class="btn btnEditTask"></div>
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
                                <img id="colorUrgentImg" onclick="prio('urgent'); changeColorPrio('colorUrgentImg','colorLowImg', 'colorMediumImg','../img/img/urgent.svg', '../img/img/urgent-white.svg','../img/img/low.svg','../img/img/medium.svg')" class="prio prioUrgentIMG testPrio" src="../img/img/urgent.svg" alt="">
                                <img id="colorMediumImg" onclick="prio('medium'); changeColorPrio('colorMediumImg','colorUrgentImg','colorLowImg', '../img/img/medium-yellow.svg', '../img/img/medium.svg','../img/img/urgent.svg','../img/img/low.svg')" class="prio prioMediumIMG testPrio" src="../img/img/medium-yellow.svg" alt="">
                                <img id="colorLowImg" onclick="prio('low'); changeColorPrio('colorLowImg','colorMediumImg','colorUrgentImg', '../img/img/low.svg', '../img/img/low-green.svg','../img/img/medium.svg','../img/img/urgent.svg')" class="prio prioLowIMG testPrio" src="../img/img/low.svg" alt="">
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
                        <div class="footerAddTask footerEditTask">
                            <div class="spanFooter">
                                <span class="star">*</span>
                                <span>This field is required</span>
                            </div>
                            <div class="footerAddTaskButtons">
                                <button onclick="saveEditTask(${i})" id="createTaskButton" class="createTaskButton createTaskButtonEditTask">
                                    <span>OK</span>
                                    <img class="imgCheck" src="../img/img/check.svg" alt="">
                                </button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
</div>
  `;
}

async function deletetask(i) {
  if (confirm("Sind Sie sicher?") == true) {
    tasks.splice(i, 1);
    await setItem('tasks', JSON.stringify(tasks));
    loadboard();
  }else{
  showtodowindow(i);}
}

async function loadTasks() {
  tasks = JSON.parse(await getItem('tasks'));
}

// horizontal scrolling functionality

let isDown = false;
let startX;
let scrollLeft;

function sliderEffect(id) {
  const slider = document.getElementById(id);
  slider.addEventListener('mousedown', e => mouseDown(e));
  slider.addEventListener('mouseleave', e => mouseLeave(e));
  slider.addEventListener('mouseup', e => mouseUp(e));
  slider.addEventListener('mousemove', e => mouseMove(e));

  function mouseDown(e) {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  }

  function mouseLeave(e) {
    isDown = false;
  }

  function mouseUp(e) {
    isDown = false;
  }

  function mouseMove(e) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const scrollContainer = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - scrollContainer;
  }
}

function sliderScroll() {
  sliderEffect('todo');
  sliderEffect('inprogress');
  sliderEffect('awaitfeedback');
  sliderEffect('done');
}
