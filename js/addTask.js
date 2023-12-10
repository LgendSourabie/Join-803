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
let subtasks = 0;
let usersSelect = [];
let usersAssigned = [];
let categories = [];


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
    let select = document.getElementById('select');
    select.innerHTML = '';

    for (let i = 0; i < user.length; i++) {
        let currentUser = user[i].name;
        select.innerHTML = /*html*/`
            <option id="assigned" value="">${currentUser}</option>
    `;
}
}


// function addNewCategory() {
//     let newCategory = document.getElementById('selectCategory');
//     let selectCategory = newCategory.value;
// }


function createTask() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;
    let assignedTo = document.getElementById('select').value;
    let category = document.getElementById('selectCategory').value;

    saveLocalStorage(title, description, date, assignedTo, category);

    if (!categories.includes(category)) {
        categories.push(category);
    }

    // addNewCategory(category);
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
    clearSubtasks.value = '';

    clearPrioOptions.forEach(option => {
        option.style.backgroundColor = '';
        option.style.color = '';
    });

    clearCategory.value = '';
}



function loadHTML(page) {
    windows.location.href = `
        ../html/${page}.html;
    `;
}


function saveLocalStorage(val1,val2, val3, val4, val5) {
    liste.push({
        titles:`${val1}`,
        descriptions:`${val2}`,
        dates:`${val3}`,
        categories:`${val4}`,
        assignedTos:`${val5}`
    });
    localStorage.setItem('liste', JSON.stringify(liste));
}



function  load(){
    let des = localStorage.getItem('liste');
    if(des){
        liste= JSON.parse(des);
    }
}

