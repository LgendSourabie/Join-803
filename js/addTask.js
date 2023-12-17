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


// This function is responsible for loading data from local storage.
function  load(){
    let des = localStorage.getItem('liste');
    if(des){
        liste= JSON.parse(des);
    }
}


// This function serves as an initializer, orchestrating various tasks to set up the application.
function initialize(){
    addContacts();
    addCategory();
    defaultPrio();
}


// This function changes the source (image) attribute of three HTML elements based on their IDs.
function changeColorPrio(id,id2,id3, currentsrc, src,src2,src3) {
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

function chang(id) {
    let element = document.getElementById(id);
    if (StateButton === currentsrc) {
        element.setAttribute('src', src);
    } else {
        element.setAttribute('src', currentsrc); // ein Kreuz
        element.setAttribute('src', currentsrc); // ein Checkmark

    }
}



function prio(id) {
    prios.push(id);
}


function defaultPrio() {
    // changeColorPrio('colorMedium', 'bgMedium');
    prio('Medium');
}


function addContacts() {
    let select = document.getElementById('select');
    select.innerHTML = `<option id="assigned" value="">Selected contacts to assign</option>`

    for (let i = 0; i < user.length; i++) {
        let currentUser = user[i].name;
        select.innerHTML += /*html*/`
             <option id="assigned-${i}" value="${currentUser}"><button class="contactsButton">ID</button> ${currentUser}  <img src="" alt=""></option>
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

    if (!categories.includes(category)) {
        categories.push(category);
    }

    saveLocalStorage(title, description, date, assignedTo, category,prios, subtasks);
}


function clearTask() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('select').value = '';
    document.getElementById('date').value = '';
    document.getElementById('selectCategory').value = '';
    document.getElementById('subtasks').value = '';

    document.querySelectorAll('.allPrio').forEach(option => {
        option.style.backgroundColor = 'white';
        option.style.color = 'black';

    });

    document.getElementById('colorUrgent').style.fontWeight = '400';
    document.getElementById('colorMedium').style.fontWeight = '400';
    document.getElementById('colorLow').style.fontWeight = '400';
}


function loadHTML(page) {
    windows.location.href = `
        ../html/${page}.html;
    `;
}


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



// =contacts.map((contact)=>contact['name'].toUpperCase())
// Names[0].split(' ')
// Names[0].split(' ')[0]
// Names[0].split(' ')[0].slice(1)



