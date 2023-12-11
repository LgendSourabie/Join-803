let user = [
    {
        name: "Pascal Wagner"
    },
    {
        name: "Henrik Sorg"
    },
    {
        name: "Ibrahima Sourabie"
    },
    {
        name: "Thomas Jilge"
    },
];


let liste = [];
let tasks = [];
let users = [];
let prios = [];
let subtasks = 0;
let usersSelect = [];
let usersAssigned = [];
let categories = ['Technical Task','User Story'];


function  load(){
    let des = localStorage.getItem('liste');
    if(des){
        liste= JSON.parse(des);
    }
}


function initialize(){
    addContacts();
    addCategory();
    defaultPrio();
}


// function changeColorPrio(element) {
//     if (element.classList.contains('prioUrgent')) {
//         element.style.backgroundColor = 'rgb(255,61,0)';
//     } else if (element.classList.contains('prioMedium')) {
//         element.style.backgroundColor = 'rgb(255,168,0)';
//     } else if (element.classList.contains('prioLow')) {
//         element.style.backgroundColor = 'rgb(122,226,41)';
//     }
//     element.style.color = 'white';
// }


function changeColorPrio(id, color) {
    let currentColor = document.getElementById(id);
    currentColor.classList.toggle(color);
}

function prio(id) {
    prios.push(id);
}


function defaultPrio() {
    changeColorPrio('colorMedium', 'bgMedium');
    prio('Medium');
}


function addContacts() {
    let select = document.getElementById('select');
    select.innerHTML = `<option id="assigned" value="">Selected contacts to assign</option>`

    for (let i = 0; i < user.length; i++) {
        let currentUser = user[i].name;
        select.innerHTML += /*html*/`
            <option id="assigned-${i}" value="${currentUser}">${currentUser}</option>
    `;
}
}


function addCategory() {
    let select = document.getElementById('selectCategory');
    select.innerHTML = `<option id="category" value="">Select task Category</option>`

    for (let i = 0; i < categories.length; i++) {
        let currentCategory = categories[i];
        select.innerHTML += /*html*/`
            <option id="category-${i}" value="${currentCategory}">${currentCategory}</option>
    `;
}
}


function addNewSubtask() {
    let subtask = document.getElementById('subtasks');
    subtask.innerHTML = '';
}


function createTask() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;
    let assignedTo = document.getElementById('select').value;
    let category = document.getElementById('selectCategory').value;
    let subtasks = document.getElementById('subtasks').value;


    saveLocalStorage(title, description, date, assignedTo, category,prios, subtasks);

    if (!categories.includes(category)) {
        categories.push(category);
    }

}


function clearTask() {
    let clearTitle = document.getElementById('title');
    let clearDescription = document.getElementById('description');
    let clearAssignedTo = document.getElementById('select');
    let clearDate = document.getElementById('date');
    let clearPrioOptions = document.querySelectorAll('.allPrio'); 
    let clearCategory = document.getElementById('selectCategory');
    let clearSubtasks = document.getElementById('subtasks');

    clearTitle.value = '';
    clearDescription.value = '';
    clearAssignedTo.value = '';
    clearDate.value = '';
    clearCategory.value = '';
    clearSubtasks.value = '';

    clearPrioOptions.forEach(option => {
        option.style.backgroundColor = '';
        option.style.color = '';
    });

}


function loadHTML(page) {
    windows.location.href = `
        ../html/${page}.html;
    `;
}

// let val6 =  prios[prios.length-1]

function saveLocalStorage(val1,val2, val3, val4, val5,prios, val6) {
    liste.push({
        titles: `${val1}`,
        descriptions: `${val2}`,
        dates: `${val3}`,
        categories: `${val4}`,
        assignedTos: `${val5}`,
        prio: `${prios[prios.length-1]}`,
        subtasks: `${val6}`
    });
    localStorage.setItem('liste', JSON.stringify(liste));
}







