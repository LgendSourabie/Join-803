let contacts = [
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

let tasks = [];
let users = [];
let subtasks = 0;
let usersSelect = [];
let usersAssigned = [];

function changeColorPrio(element) {
    if (element.classList.contains('prioUrgent')) {
        element.style.backgroundColor = 'rgb(255,61,0)';
    } else if (element.classList.contains('prioMedium')) {
        element.style.backgroundColor = 'rgb(255,168,0)';
    } else if (element.classList.contains('prioLow')) {
        element.style.backgroundColor = 'rgb(122,226,41)';
    }
    element.style.color = 'white';
}


function addContacts() {
    // let getContacts = document.getElementById('assigned');
    // let newElement = document.createElement('new');
    let select = document.getElementById('select');
    select.innerHTML = '';

    select.innerHTML = `
        <option id="assigned" value="">Selected contacts to assign</option>
    `;

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        select.innerHTML += `
        <div class="assignedAddTask addTaskOverview">
        <span>Assigned to</span>
            <select id="select">
                <option value="">Pascal Wagner</option>
                <option value="">Henrik Sorg</option> 
                <option value="">Ibrahima Sourabie</option>
                <option value="">Thomas Jilge</option>
            </select>
         </div>
        `;
}
}


function createTask() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;
    let category = document.getElementById('category').value;
    let assignedTo = document.getElementById('select').value;

    tasks.push({
        title: title,
        description: description, 
        date: date,
        category: category,
        assignedTo: assignedTo
    })
}


