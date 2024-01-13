let btns = [];
let liste = [];
let tasks = [
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
// let users = [];
// let users = [];
let prios = [];
let subtasks = [];
let usersSelect = [];
let usersAssigned = [];
let categories = ['Technical Task', 'User Story'];

async function loadContacts() {
  contacts = JSON.parse(await getItem("contacts"));
}

// This function is responsible for loading data from local storage.
function load() {
  let des = localStorage.getItem('liste');
  if (des) {
    liste = JSON.parse(des);
  }
}

// This function serves as an initializer, orchestrating various tasks to set up the application.
async function initialize() {
  await loadContacts();
  options();
  load() ;
  // addContacts();
  addCategory();
  defaultPrio();
}

// This function changes the source (image) attribute of three HTML elements based on their IDs.
function changeColorPrio(id, id2, id3, currentsrc, src, src2, src3) {
  let element = document.getElementById(id);
  let element2 = document.getElementById(id2);
  let element3 = document.getElementById(id3);
  let StateButton = element.getAttribute('src');
  if (StateButton === currentsrc) {
    element.setAttribute('src', src);
    element2.setAttribute('src', src2);
    element3.setAttribute('src', src3);
  } else {
    element.setAttribute('src', currentsrc);
    element2.setAttribute('src', src2);
    element3.setAttribute('src', src3);
  }
}

// Function to add priority to the array
function prio(id) {
  prios.push(id);
}

// Function to set the default priority
function defaultPrio() {
  prio('Medium');
}

// Function to populate a dropdown list with task categories
function addCategory() {
  let select = document.getElementById('selectCategory');
  select.innerHTML = `<option id="selectCategory" value="">Select task Category</option>`;

  for (let i = 0; i < categories.length; i++) {
    let currentCategory = categories[i];
    select.innerHTML += /*html*/ `
            <option id="selectCategory-${i}" value="${currentCategory}">${currentCategory}</option>
    `;
  }
}

// Function to get the ID of the subtasks
function addNewSubtask() {
  document.getElementById('subtasks');
}

// Function to change the display of the element with the ID 'subtasksCancelIMG' to 'block' and then calls the subtaskIMGS function.
function changeSubtaskImg() {
  let plusSubtask = document.getElementById('subtasksCancelIMG');
  plusSubtask.style.display = 'block';
  subtaskIMGS();
}

// Function to change the images
function subtaskIMGS() {
    let element = document.getElementById('subtasksPlusIMG');
    let plusSubtask = document.getElementById('subtasksCancelIMG');
    let currentIMG = element.getAttribute('src');
    checkNewSubtask()
    if (currentIMG === '../img/img/subtasksPlus.svg') {
        element.setAttribute('src', '../img/img/subtasks_check.svg');
    } else {
        element.setAttribute('src', '../img/img/subtasksPlus.svg');
        plusSubtask.style.display = 'none';
    }
   
}

function NewSubtaskIMGS() {
    let element = document.getElementById('subtasksPlusIMG');
    let plusSubtask = document.getElementById('subtasksCancelIMG');
    let currentIMG = element.getAttribute('src');
    checkNewSubtask();
    if (currentIMG === '../img/img/subtasksPlus.svg') {
        element.setAttribute('src', '../img/img/subtasks_check.svg');
    } else {
        element.setAttribute('src', '../img/img/subtasksPlus.svg');
        plusSubtask.style.display = 'none';
    }  
}

function changeButton(index){
  let element = document.getElementById(`test_test${index}`);
  let listEl = document.getElementById(`list${index}`);
  let inputEdit = document.getElementById(`input-edit-${index}`);
  let inputsSubtask = document.getElementById(`link-${index}`);
  inputEdit.value = inputsSubtask.innerHTML;
  element.classList.remove('d-none');
  listEl.classList.add('d-none');
}


// Function to check the ID and the subtask Img
function checkNewSubtask() {
  let element = document.getElementById('subtasksPlusIMG');
  let currentIMG = element.getAttribute('src');
  if (currentIMG !=='../img/img/subtasks_check.svg') return
  let subtaskField = document.getElementById('subtasksList');
  let singleSubtask = document.getElementById('subtasks');
 if(singleSubtask.value.length ===0) return;
  subtasks.push(singleSubtask.value);
  renderSubtask();
  singleSubtask.value='';
}

function checkNewSubtaskEdit(i) {
  let element = document.getElementById('newSubtaskImgsHover');
  let currentIMG = element.getAttribute('src');
  if (currentIMG !=='../img/img/subtasks_check.svg') return
  let subtaskField = document.getElementById('subtasksList');
  let singleSubtask = document.getElementById(`input-edit-${i}`);
 if(singleSubtask.value.length ===0) return;
  subtasks.push(singleSubtask.value);
  renderSubtask();
  singleSubtask.value='';
}

// Function to render the subtasks by updating the content of the element with the ID 'subtasksList'.
const renderSubtask = function () {
  let subtaskField = document.getElementById('subtasksList');
  subtaskField.innerHTML = '';
  for (let i = 0; i < subtasks.length; i++) {
    const subtask = subtasks[i];
    subtaskField.innerHTML += renderSubtaskHTMLTemplate(i, subtask);
  }
}


function renderSubtaskHTMLTemplate(i, subtask) {
  return /*html*/`
      <div class="newSubtaskContainerTwo" id="list${i}">
        <li id="link-${i}">${subtask}</li>
          <div class="hoverSubtask">
            <img class="subtaskNewContainerImgs" id="edit-${i}" onclick="editSubtask(${i})" src="../img/img/penSubtasks.svg" alt="">
            <img class="subtaskNewContainerImgs"  onclick="deleteSubtask(${i})" src="../img/img/deleteSubtasks.svg" alt="">
          </div>
      </div>
      <div id="test_test${i}" class="test_test editContainerSubtask d-none">
        <input type="text" onclick="changeBorderColor(this)" id="input-edit-${i}" class="inputEdit" type="text" placeholder="Add new subtask">
        <button type="button" class="buttonSubtask">
        <img onclick="changeSubtaskImg(); deleteSubtask()"  class="subtasksPlusIMGNew" src="../img/img/deleteSubtasks.svg" alt="">
      </button>
        <button type="button" class="buttonSubtask">
          <div class="newSubtaskImgs">
        <img id="newSubtaskImgsHover" class="newSubtaskImgsHover" onclick="checkNewSubtaskEdit(${i})"   src="../img/img/subtasks_check.svg" alt=""> 
        </div>
      </button>
      </div>
  `;
}

// function addNewSubtaskEdit(i) {
//   let editContainer = document.getElementById(`test_test${i}`);
//   editContainer.style.display = "none";
// }


// Function to edit subtasks
function editSubtask(i) {
  subtasks.splice(i,1);
  changeButton(i);
}

function deleteSubtaskInput() {
 document.getElementById('subtasks').value = '';
 renderSubtask();
}

// Function to delete subtasks
function deleteSubtask(i) {
  subtasks.splice(i,1);
  renderSubtask();
}


// Function to create and save a new task with user input
 async function createTask() {
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  let date = document.getElementById('date').value;
  let assignedTo = btns;  //.map(btn=>btn.name)
  let category = document.getElementById('selectCategory').value;
  if (!categories.includes(category)) {
    categories.push(category);
  }

  tasks.push (saveArray(title, description, date, category, assignedTo, prios, subtasks));
  await setItem('tasks', JSON.stringify(tasks));
}

// Function to clear/reset values in the task creation form
function clearTask() {
  btns.splice(0, btns.length);
  renderBtn();
  options();
  render(templateAddTask());
  initialize();
}

// Function to load an HTML page
function loadHTML(page) {
  windows.location.href = `
        ../html/${page}.html;
    `;
}

// Function to save task details to local storage
function saveArray(val1, val2, val3, val4, val5, prios, val6) {

  let identification = tasks.length;

    return {
    title: `${val1}`,
    discription: `${val2}`,
    dueDate: `${val3}`,
    category: `${val4}`,
    assignedTo: val5,
    prio: `${prios[prios.length - 1]}`,
    subtasks: `${val6}`,
    progress: [],
    id: identification,
    taskboard: 'todo',
    checkboxStates: [],
  };
}

// Function to show the users
function options() {
  let field = document.getElementById('options');
  let listeOption = contacts.map(a => a['name']);
  let initial = contacts.map(a => a['initials']);
  let colors = contacts.map(a => a['bgColor']);
  field.innerHTML = '';
  for (let i = 0; i < listeOption.length; i++) {
    const option = listeOption[i];
    field.innerHTML += optionsHTMLTemplate(i, option, initial, colors);
    document.getElementById(`btn-${i}`).style.backgroundColor = `${colors[i]}`;
  }
}

function optionsHTMLTemplate(i, option, initial, color) {
  return /*html*/`
    <div class="option" id="cont${i}" onclick="updateBtn(${i});changeCheckState(${i})">
      <div class="container-btn-name-box">
      <button id="btn-${i}" class="bi">${initial[i]}</button> 
      <div class="spanContainer">
        <span class="spanOption" id="name${i}">${option}</span> 
      </div>
        <div class="test4">
          <div class="test5">
            <img id="checkBox${i}" src="../img/img/checkBox.svg" alt="">
          </div>
        </div>
      </div>
    </div>
  `;
}

// Function to switches the CSS class of the element with the specified ID to show or hide options
function showOptions(id, className) {
  document.getElementById(id).classList.toggle(className);
}

// Function to change the checkbox
function changeCheckState(index) {
  let field = document.getElementById(`checkBox${index}`);
  let currentState = field.getAttribute('src');

  if (currentState === '../img/img/checkBox.svg') {
    field.setAttribute('src', '../img/img/Check_button-white.svg');
  } if (currentState === '../img/img/Check_button-white.svg') {
    field.setAttribute('src', '../img/img/checkBox.svg');
  } 
}

// Function to update the button
function updateBtn(index) {
  let btnUserProfile = document.getElementById('btn-grp');
  let initial = document.getElementById(`btn-${index}`).innerHTML;
  let namePerson = document.getElementById(`name${index}`).innerHTML;
  let bgColor = document.getElementById(`btn-${index}`).style.backgroundColor;

  let existingIndex = btns.findIndex(btn => btn.name === namePerson);
  if (existingIndex !== -1) {
    btns.splice(existingIndex, 1);
  } else {
    btns.push({ initial: initial, name: namePerson, bgColor: bgColor});
  }
  showOptions(`cont${index}`, 'newColor');
  renderBtn();
}

// Function to update the buttons under the options
const renderBtn = function () {
  let btnUserProfile = document.getElementById('btn-grp');
  btnUserProfile.innerHTML = '';
  for (let i = 0; i < btns.length; i++) {
    const btn = btns[i];
    btnUserProfile.innerHTML += `<button id="optBtn${i}" class="btn-grp">${btn.initial}</button>`;
    document.getElementById(`optBtn${i}`).style.backgroundColor = btns[i]['bgColor'];
  }
}

// Function to change the border color
function changeBorderColor(element) {
  if (element.style.borderColor === 'rgb(41, 171, 226)') {
    element.style.borderColor = '';
  } else {
    element.style.borderColor = '#29ABE2';
  }
}

// Function that calls the functions changeBorderColor and showOptions
function handleDropdownClick(element) {
  changeBorderColor(element);
  showOptions('options', 'd-none');
}
