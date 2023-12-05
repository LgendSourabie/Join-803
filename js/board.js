let todo = [
    {
        'title': 'test note',
        'discription': 'we test it',
        'assigned to': 'Pascal',
        'due date': '13.12.23',
        'prio': '/icons/priomedium.svg',
        'category': 'Technical Task',
        'subtasks': ['test1', 'test2']
    },
    {
        'title': 'test note',
        'discription': 'we test it',
        'assigned to': 'Pascal',
        'due date': '13.12.23',
        'prio': '/icons/priolow.svg',
        'category': 'Technical Task',
        'subtasks': ['test1', 'test2']
    }, 
    {
        'title': 'test note',
        'discription': 'we test it',
        'assigned to': 'Pascal',
        'due date': '13.12.23',
        'prio': '/icons/priolow.svg',
        'category': 'Technical Task',
        'subtasks': ['test1', 'test2']
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
        'subtasks': ['test1', 'test2']
    },
    {
        'title': 'test note',
        'discription': 'we test it',
        'assigned to': 'Pascal',
        'due date': '13.12.23',
        'prio': '/icons/priolow.svg',
        'category': 'Technical Task',
        'subtasks': ['test1', 'test2']
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
        'subtasks': ['test1', 'test2']
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
        'subtasks': ['test1', 'test2']
    },
    {
        'title': 'test note',
        'discription': 'we test it',
        'assigned to': 'Pascal',
        'due date': '13.12.23',
        'prio': '/icons/priolow.svg',
        'category': 'Technical Task',
        'subtasks': ['test1', 'test2']
    }
]


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

        content.innerHTML += todotemplate(array);
    }
}

function renderinProgress() {
    let content = document.getElementById('inprogress');

    for (let i = 0; i < inprogress.length; i++) {
        const array = inprogress[i];

        content.innerHTML += todotemplate(array);
    }
}

function renderawaitFeedback() {
    let content = document.getElementById('awaitfeedback');

    for (let i = 0; i < awaitfeedback.length; i++) {
        const array = awaitfeedback[i];

        content.innerHTML += todotemplate(array);
    }
}

function renderdone() {
    let content = document.getElementById('done');

    for (let i = 0; i < done.length; i++) {
        const array = done[i];

        content.innerHTML += todotemplate(array);
    }
}

function todotemplate(array) {
    return /*html*/`
 <div class="todocard">
     <button>${array.category}</button>
     <b>${array.title}</b>
     <span>${array.discription}</span>
     <div>
        <div class="progress-bar-container">
            <div class="progress-bar" id="progressBar">0%</div>
        </div>
         ${array.subtasks.length}Subtasks
     </div>
     <div>
         <div>contacts</div>
         <img src="${array.prio}" alt="">
     </div>
 </div>
`
}

function updateProgressBar(percentage) {
    const progressBar = document.getElementById('progressBar');
    let currentWidth = parseInt(progressBar.style.width) || 0;
    currentWidth += percentage;

    if (currentWidth > 100) {
        currentWidth = 100;
    }

    progressBar.style.width = currentWidth + '%';
    progressBar.innerHTML = currentWidth + '%';
}