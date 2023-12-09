let todo = [
    {
        'title': 'test note',
        'discription': 'we test it',
        'assigned to': 'Pascal',
        'due date': '13.12.23',
        'prio': '/icons/priomedium.svg',
        'category': 'Technical Task',
        'subtasks': [],
        'progress' : 0,
        'id' : 0
    },
    {
        'title': 'test note',
        'discription': 'we test it',
        'assigned to': 'Pascal',
        'due date': '13.12.23',
        'prio': '/icons/priolow.svg',
        'category': 'Technical Task',
        'subtasks': ['test1', 'test2'],
        'progress' : 1,
        'id' : 1
    }, 
    {
        'title': 'test note',
        'discription': 'we test it',
        'assigned to': 'Pascal',
        'due date': '13.12.23',
        'prio': '/icons/priolow.svg',
        'category': 'Technical Task',
        'subtasks': ['test1', 'test2'],
        'progress' : 0,
        'id' : 2
    }
]
let inprogress = [
    {
        'title': 'test note',
        'discription': 'we test it',
        'assigned to': 'Pascal',
        'due date': '13.12.23',
        'prio': '/icons/priolow.svg',
        'category': 'Technical Task',
        'subtasks': ['test1', 'test2'],
        'progress' : 1,
        'id' : 3
    },
    {
        'title': 'test note',
        'discription': 'we test it',
        'assigned to': 'Pascal',
        'due date': '13.12.23',
        'prio': '/icons/priolow.svg',
        'category': 'Technical Task',
        'subtasks': ['test1', 'test2'],
        'progress' : 1,
        'id' : 4
    }
]
let awaitfeedback = [
    {
        'title': 'test note',
        'discription': 'we test it',
        'assigned to': 'Pascal',
        'due date': '13.12.23',
        'prio': '/icons/priolow.svg',
        'category': 'Technical Task',
        'subtasks': ['test1', 'test2'],
        'progress' : 1,
        'id' : 5
    }
]
let done = [
    {
        'title': 'test note',
        'discription': 'we test it',
        'assigned to': 'Pascal',
        'due date': '13.12.23',
        'prio': '/icons/priolow.svg',
        'category': 'Technical Task',
        'subtasks': ['test1', 'test2'],
        'progress' : 1,
        'id' : 6
    },
    {
        'title': 'test note',
        'discription': 'we test it',
        'assigned to': 'Pascal',
        'due date': '13.12.23',
        'prio': '/icons/priolow.svg',
        'category': 'Technical Task',
        'subtasks': ['test1', 'test2'],
        'progress' : 1,
        'id' : 7
    }
]

let currentarray;
let currenti;
let currentelement;

function init() {
    renderToDos();
    renderawaitFeedback();
    renderinProgress();
    renderdone();
}


function renderToDos() {
    let content = document.getElementById('todo');

    for (let i = 0; i < todo.length; i++) {
        const array = todo[i];

        content.innerHTML += todotemplate(array, i, todo);
    }
}

function renderinProgress() {
    let content = document.getElementById('inprogress');

    for (let i = 0; i < inprogress.length; i++) {
        const array = inprogress[i];

        content.innerHTML += todotemplate(array, i, inprogress);
    }
}

function renderawaitFeedback() {
    let content = document.getElementById('awaitfeedback');

    for (let i = 0; i < awaitfeedback.length; i++) {
        const array = awaitfeedback[i];

        content.innerHTML += todotemplate(array, i, awaitfeedback);
    }
}

function renderdone() {
    let content = document.getElementById('done');

    for (let i = 0; i < done.length; i++) {
        const array = done[i];

        content.innerHTML += todotemplate(array, i, done);
    }
}

function todotemplate(jsonElement, i, array) {
    return /*html*/`
 <div class="todocard" draggable="true" ondragstart="startDragging(${array, i})">
    <button>${jsonElement.category}</button>
    <b>${jsonElement.title}</b>
    <span>${jsonElement.discription}</span>
    <div class="subtasks">
        <div class="progress-container">
            <div class="progress" style="width: ${jsonElement.progress / jsonElement.subtasks.length * 100}%">
            </div>
        </div>  
        <div>${jsonElement.progress}/${jsonElement.subtasks.length}Subtasks</div> 
    </div>
    <div class="assignedprio">
        <div>contacts</div>
        <img src="${jsonElement.prio}" alt="">
    </div>
</div>
`
}

function startDragging(array, i) {
    currentarray = array;
    currenti = i;
    currentelement = currentarray[currenti];
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(array) {
    array.push(currentelement);
    currentarray.splice(currenti, 1); 
    
    init();
    
}
