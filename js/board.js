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
    returnforlooprender(todo, container);
  }
}

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



function showtodowindow(i) {
  let todowindow = document.getElementById('showtodowindow');
  todowindow.classList.add('showtodowindow');
  todowindow.innerHTML = todowindowtemplate(i);
  createSubtasks(i);
  renderAssignedTopopup('assigned', i);
  rendercategory('category', i);
  renderPrio('prio',i);
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

  ifchangecheckbox(j, i, subtaskIndex, checkbox);

  renderToDos();
  await setItem('tasks', JSON.stringify(tasks))
}

function ifchangecheckbox(j, i, subtaskIndex, checkbox) {
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
  btns = [];
  initialize();
  addCategory();
  options();
  renderBtn();
}

async function edittask(i) {
  let todowindow = document.getElementById('showtodowindow');
  todowindow.classList.add('showtodowindow');
  todowindow.innerHTML = edittasktemplate(i);
  edittaskvalue(i);
  btns = tasks[i].assignedTo;
  askcheckstate(i);
  renderBtn();
  checkprio(i);
  checkcategory(i);
  subtasks = tasks[i].subtasks;
  renderSubtask();
}

function edittaskvalue(i) {
  document.getElementById('edittitle').value = tasks[i].title;
  document.getElementById('editdescription').value = tasks[i].discription;
  document.getElementById('date').value = tasks[i].dueDate;
  document.getElementById('selectCategory').value = tasks[i].category;
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
  foraskcheckstate(initial, colors, field, elements, listeOption);
}

function foraskcheckstate(initial, colors, field, elements, listeOption) {
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
  if (tasks[i].prio.includes('urgent')) {
    changeColorPrio('colorUrgentImg', 'colorLowImg', 'colorMediumImg', '../img/img/urgent.svg', '../img/img/urgent-white.svg', '../img/img/low.svg', '../img/img/medium.svg')
  }
  if (tasks[i].prio.includes('medium')) {
    changeColorPrio('colorMediumImg', 'colorUrgentImg', 'colorLowImg', '../img/img/medium-yellow.svg', '../img/img/medium.svg', '../img/img/urgent.svg', '../img/img/low.svg')
  }
  if (tasks[i].prio.includes('low')) {
    changeColorPrio('colorLowImg', 'colorMediumImg', 'colorUrgentImg', '../img/img/low.svg', '../img/img/low-green.svg', '../img/img/medium.svg', '../img/img/urgent.svg')
  }
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
