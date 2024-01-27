let btns = [];
let liste = [];
let tasks = [];
let prios = [];
let subtasks = [];
let usersSelect = [];
let usersAssigned = [];
let categories = ['Technical Task', 'User Story'];

/**
 * Function to load contacts by parsing a JSON string retrieved from storage
 */
async function loadContacts() {
  contacts = JSON.parse(await getItem('contacts'));
}

/**
 * This function is responsible for loading data from local storage.
 */
function load() {
  let des = localStorage.getItem('liste');
  if (des) {
    liste = JSON.parse(des);
  }
}

/**
 * This function serves as an initializer, orchestrating various tasks to set up the application.
 */
async function initialize() {
  subtasks = [];
  await loadContacts();
  options();
  load();
  addCategory();
  defaultPrio();

  document.getElementById('title').addEventListener('input', checkRequiredField);
  document.getElementById('date').addEventListener('input', checkRequiredField);
  document.getElementById('selectCategory').addEventListener('input', checkRequiredField);
}

/**
 * This function changes the source (image) attribute of three HTML elements based on their IDs
 *
 * @param {string} id - The ID of the first HTML element
 * @param {string} id2 - The ID of the second HTML element
 * @param {string} id3 - The ID of the third HTML element
 * @param {string} currentsrc - The current source attribute value to check
 * @param {string} src - The new source attribute value for the first element
 * @param {string} src2 - The new source attribute value for the second element
 * @param {string} src3 - The new source attribute value for the third element
 */
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

/**
 * Function to add priority to the array
 *
 * @param {*} id - ID to be added to the priorities array
 */
function prio(id) {
  prios.push(id);
}

/**
 * Function to set the default priority
 */
function defaultPrio() {
  prio('medium');
}

/**
 * Function to populate a dropdown list with task categories
 */
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

/**
 * Function to get the ID of the subtasks
 */
function addNewSubtask() {
  document.getElementById('subtasks');
}

/**
 * Function to change the display of the element with the ID 'subtasksCancelIMG' to 'block' and then calls the subtaskIMGS function
 */
function changeSubtaskImg() {
  let plusSubtask = document.getElementById('subtasksCancelIMG');
  plusSubtask.style.display = 'block';
  subtaskIMGS();
}

/**
 * Function to change the images
 */
function subtaskIMGS() {
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

/**
 * Function to change two images and controls the display of an element based on a condition
 */
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

/**
 * Function to switches the visibility of elements for editing based on the provided index
 *
 * @param {number} index - The index used to identify the elements to be modified
 */
function changeButton(index) {
  let element = document.getElementById(`test_test${index}`);
  let listEl = document.getElementById(`list${index}`);
  let inputEdit = document.getElementById(`input-edit-${index}`);
  let inputsSubtask = document.getElementById(`link-${index}`);
  inputEdit.value = inputsSubtask.innerHTML;
  element.classList.remove('d-none');
  listEl.classList.add('d-none');
}

/**
 * Function to check the ID and the subtask Img
 *
 * @returns
 */
function checkNewSubtask() {
  let element = document.getElementById('subtasksPlusIMG');
  let currentIMG = element.getAttribute('src');
  if (currentIMG !== '../img/img/subtasks_check.svg') return;
  let subtaskField = document.getElementById('subtasksList');
  let singleSubtask = document.getElementById('subtasks');
  if (singleSubtask.value.length === 0) return;
  subtasks.push(singleSubtask.value);
  renderSubtask();
  singleSubtask.value = '';
}

/**
 * Function for subtask input, adds to 'subtasks', renders updates, and clears input
 *
 * @param {*} i - The index used to identify the subtask input element
 * @returns
 */
function checkNewSubtaskEdit(i) {
  let element = document.getElementById('newSubtaskImgsHover');
  let currentIMG = element.getAttribute('src');
  if (currentIMG !== '../img/img/subtasks_check.svg') return;
  let subtaskField = document.getElementById('subtasksList');
  let singleSubtask = document.getElementById(`input-edit-${i}`);
  if (singleSubtask.value.length === 0) return;
  subtasks.push(singleSubtask.value);
  renderSubtask();
  singleSubtask.value = '';
}

/**
 * Function to render the subtasks by updating the content of the element with the ID 'subtasksList'.
 */
const renderSubtask = function () {
  let subtaskField = document.getElementById('subtasksList');
  subtaskField.innerHTML = '';
  for (let i = 0; i < subtasks.length; i++) {
    const subtask = subtasks[i];
    subtaskField.innerHTML += renderSubtaskHTMLTemplate(i, subtask);
  }
};

/**
 * Function to edit subtasks
 *
 * @param {number} i - The index of the subtask to be edited
 */
function editSubtask(i) {
  subtasks.splice(i, 1);
  changeButton(i);
}

/**
 * Function to delete the Subtask Input
 */
function deleteSubtaskInput() {
  document.getElementById('subtasks').value = '';
  renderSubtask();
}

/**
 * Function to delete subtasks
 *
 * @param {number} i - The index of the subtask to be deleted
 */
function deleteSubtask(i) {
  subtasks.splice(i, 1);
  renderSubtask();
}

/**
 * Function to create and save a new task with user input
 */
async function createTask() {
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  let date = document.getElementById('date').value;
  let assignedTo = btns;
  let category = document.getElementById('selectCategory').value;
  let state = subtasks.map(returnfalse);

  if (!categories.includes(category)) {
    categories.push(category);
  }

  tasks.push(saveArray(title, description, date, category, assignedTo, prios, subtasks));
  await setItem('tasks', JSON.stringify(tasks));
  loadboard();
  btns = [];
}

/**
 * Function to return false
 *
 * @returns
 */
function returnfalse() {
  return false;
}

/**
 * Function to clear/reset values in the task creation form
 */
function clearTask() {
  btns.splice(0, btns.length);
  renderBtn();
  render(templateAddTask());
  initialize();
}

/**
 * Function to load an HTML page
 *
 * @param {string} page - The name of the HTML page to load
 */
function loadHTML(page) {
  window.location.href = `
        ../html/${page}.html;
    `;
}

/**
 * Function to save task details to local storage
 *
 * @param {string} val1 - The title of the task
 * @param {string} val2 - The description of the task
 * @param {string} val3 - The due date of the task
 * @param {string} val4 - The category of the task
 * @param {*} val5 - The assigned person or team for the task
 * @param {Array} prios - An array containing task priorities
 * @param {*} val6 - The subtasks for the task
 * @returns
 */
function saveArray(val1, val2, val3, val4, val5, prios, val6) {
  let identification = tasks.length;
  return {
    title: `${val1}`,
    discription: `${val2}`,
    dueDate: `${val3}`,
    category: `${val4}`,
    assignedTo: val5,
    prio: `${prios[prios.length - 1]}`,
    subtasks: val6,
    progress: [],
    id: identification,
    taskboard: 'todo',
    checkboxStates: [],
  };
}

/**
 * Function to show the users
 */
function options() {
  let field = document.getElementById('options');
  let listeOption = contacts.map(a => a['name']);
  let initial = contacts.map(a => a['initials']);
  let colors = contacts.map(a => a['bgColor']);
  if (field) field.innerHTML = '';
  for (let i = 0; i < listeOption.length; i++) {
    const option = listeOption[i];
    field.innerHTML += optionsHTMLTemplate(i, option, initial, colors);
    document.getElementById(`btn-${i}`).style.backgroundColor = `${colors[i]}`;
  }
}

/**
 * Function to switches the CSS class of the element with the specified ID to show or hide options
 *
 * @param {string} id - The ID of the HTML element to toggle
 * @param {string} className - The name of the CSS class to toggle
 */
function showOptions(id, className) {
  document.getElementById(id).classList.toggle(className);
}

/**
 * Function to change the checkbox
 *
 * @param {number} index - The index of the checkbox to be changed
 */
function changeCheckState(index) {
  let field = document.getElementById(`checkBox${index}`);
  let currentState = field.getAttribute('src');
  if (currentState === '../img/img/checkBox.svg') {
    field.setAttribute('src', '../img/img/Check_button-white.svg');
  }
  if (currentState === '../img/img/Check_button-white.svg') {
    field.setAttribute('src', '../img/img/checkBox.svg');
  }
}

/**
 * Function to update the button
 *
 * @param {number} index - The index of the button to be updated
 */
function updateBtn(index) {
  let btnUserProfile = document.getElementById('btn-grp');
  let initial = document.getElementById(`btn-${index}`).innerHTML;
  let namePerson = document.getElementById(`name${index}`).innerHTML;
  let bgColor = document.getElementById(`btn-${index}`).style.backgroundColor;
  let existingIndex = btns.findIndex(btn => btn.name === namePerson);
  if (existingIndex !== -1) {
    btns.splice(existingIndex, 1);
  } else {
    btns.push({ initial: initial, name: namePerson, bgColor: bgColor });
  }
  showOptions(`cont${index}`, 'newColor');
  renderBtn();
}

/**
 * Function to update the buttons under the options
 */
const renderBtn = function () {
  let btnUserProfile = document.getElementById('btn-grp');
  btnUserProfile.innerHTML = '';
  for (let i = 0; i < btns.length; i++) {
    const btn = btns[i];
    btnUserProfile.innerHTML += `<button id="optBtn${i}" class="btn-grp">${btn.initial}</button>`;
    document.getElementById(`optBtn${i}`).style.backgroundColor = btns[i]['bgColor'];
  }
};
