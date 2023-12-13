let todos = [
    {
        'title': 'test note',
        'discription': 'we test it',
        'assigned to': 'Pascal',
        'due date': '13.12.23',
        'prio': '/icons/priomedium.svg',
        'category': 'Technical Task',
        'subtasks': [],
        'progress' : 0,
        'id' : 0,
        'taskboard' : 'todo'
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
        'id' : 1,
        'taskboard' : 'todo'
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
        'id' : 2,
        'taskboard' : 'awaitfeedback'
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
        'id' : 3,
        'taskboard' : 'awaitfeedback'
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
        'id' : 4,
        'taskboard' : 'inprogress'
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
        'id' : 5,
        'taskboard' : 'done'
    }
];

let currentDraggedElement;



function renderToDos() {

    let todo = todos.filter(t => t['taskboard'] == 'todo');

    document.getElementById('todo').innerHTML = '';

    for (let index = 0; index < todo.length; index++) {
        const element = todo[index];
        document.getElementById('todo').innerHTML += todotemplate(element, index);
    }

    let inprogress = todos.filter(t => t['taskboard'] == 'inprogress');

    document.getElementById('inprogress').innerHTML = '';

    for (let index = 0; index < inprogress.length; index++) {
        const element = inprogress[index];
        document.getElementById('inprogress').innerHTML += todotemplate(element ,index);
    }

    let awaitfeedback = todos.filter(t => t['taskboard'] == 'awaitfeedback');

    document.getElementById('awaitfeedback').innerHTML = '';

    for (let index = 0; index < awaitfeedback.length; index++) {
        const element = awaitfeedback[index];
        document.getElementById('awaitfeedback').innerHTML += todotemplate(element, index);
    }

    let done = todos.filter(t => t['taskboard'] == 'done');

    document.getElementById('done').innerHTML = '';

    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        document.getElementById('done').innerHTML += todotemplate(element, index);
    }
}

function todotemplate(array, i) {
    return /*html*/`
 <div class="todocard" draggable="true" ondragstart="startDragging(${array['id']})" onclick="showtodowindow(${i})">
    <button>${array.category}</button>
    <b>${array.title}</b>
    <span>${array.discription}</span>
    <div class="subtasks">
        <div class="progress-container">
            <div class="progress" style="width: ${array.progress / array.subtasks.length * 100}%">
            </div>
        </div>  
        <div>${array.progress}/${array.subtasks.length}Subtasks</div> 
    </div>
    <div class="assignedprio">
        <div>contacts</div>
        <img src="${array.prio}" alt="">
    </div>
</div>
`
}

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    todos[currentDraggedElement]['taskboard'] = category;
    removeHighlight(category);
    renderToDos();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

function showtodowindow(i){
    let todowindow = document.getElementById('showtodowindow');
    todowindow.classList.add('showtodowindow');
    todowindow.innerHTML = /*html*/`
        <div class="overlay">
            <div>
                <button>${todos[i].category}</button>
                <img src="/icons/close.svg" alt="">
            </div>
            <h1>${todos[i].title}</h1>
            <span>${todos[i].discription}</span>
            <div>
                <span>Due date</span>
                <span>${todos[i]['due date']}</span>
            </div>
            <div>
                <span>Priority</span>
                <div>
                    <span>${todos[i].category}</span>
                    <img src="${todos[i].prio}" alt="">
                </div>
            </div>
            <div>
                <div></div>
                <div id="contacts"></div>
            </div>
            <div>
                <span>Subtasks</span>
                <div id="subtasks"></div>
            </div>
        </div>
    `;
    createSubtasks(i);
}

function createSubtasks(i){
    document.getElementById('subtasks').innerHTML += /*html*/`
        <div></div>
    `
}
