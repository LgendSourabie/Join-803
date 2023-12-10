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
        'category' : 'todo'
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
        'category' : 'todo'
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
        'category' : 'awaitfeedback'
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
        'category' : 'awaitfeedback'
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
        'category' : 'inprogress'
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
        'category' : 'done'
    }
];

let currentDraggedElement;



function renderToDos() {

    let todo = todos.filter(t => t['category'] == 'todo');

    document.getElementById('todo').innerHTML = '';

    for (let index = 0; index < todo.length; index++) {
        const element = todo[index];
        document.getElementById('todo').innerHTML += todotemplate(element);
    }

    let inprogress = todos.filter(t => t['category'] == 'inprogress');

    document.getElementById('inprogress').innerHTML = '';

    for (let index = 0; index < inprogress.length; index++) {
        const element = inprogress[index];
        document.getElementById('inprogress').innerHTML += todotemplate(element);
    }

    let awaitfeedback = todos.filter(t => t['category'] == 'awaitfeedback');

    document.getElementById('awaitfeedback').innerHTML = '';

    for (let index = 0; index < awaitfeedback.length; index++) {
        const element = awaitfeedback[index];
        document.getElementById('awaitfeedback').innerHTML += todotemplate(element);
    }

    let done = todos.filter(t => t['category'] == 'done');

    document.getElementById('done').innerHTML = '';

    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        document.getElementById('done').innerHTML += todotemplate(element);
    }
}

function todotemplate(array) {
    return /*html*/`
 <div class="todocard" draggable="true" ondragstart="startDragging(${array['id']})">
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
    todos[currentDraggedElement]['category'] = category;
    removeHighlight(category);
    renderToDos();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}
