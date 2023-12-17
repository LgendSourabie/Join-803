let todos = [
    {
        'title': 'test note',
        'discription': 'we test it',
        'assigned to': 'Pascal',
        'due date': '13.12.23',
        'prio': '/icons/priomedium.svg',
        'category': 'Technical Task',
        'subtasks': ['test2'],
        'progress' : 0,
        'id' : 0,
        'taskboard' : 'todo'
    },
    {
        'title': 'test note1',
        'discription': 'we test it',
        'assigned to': 'Pascal',
        'due date': '13.12.23',
        'prio': '/icons/priolow.svg',
        'category': 'Technical Task',
        'subtasks': ['test1', 'test2'],
        'progress' : 0,
        'id' : 1,
        'taskboard' : 'todo'
    }, 
    {
        'title': 'test note2',
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
        'title': 'test note3',
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
        'title': 'test note4',
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
        'title': 'test note5',
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



function renderToDos(filteredTodos) {

    forlooprender('todo', filteredTodos);

    forlooprender('inprogress', filteredTodos);

    forlooprender('awaitfeedback', filteredTodos);

    forlooprender('done', filteredTodos);

}

function forlooprender(test, filteredTodos){
    let todo = filteredTodos || todos.filter(t => t['taskboard'] == test);

    document.getElementById(test).innerHTML = '';

    let fragment = document.createDocumentFragment();

    for (let index = 0; index < todo.length; index++) {
        const element = todo[index];
        document.getElementById(test).innerHTML += todotemplate(element, index);
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
    todowindow.innerHTML = todowindowtemplate(i);
    createSubtasks(i);
}

function todowindowtemplate(i){
    return /*html*/`
    <div class="overlay">
        <div>
            <button>${todos[i].category}</button>
            <img src="/icons/close.svg" alt="" onclick="closetodowindow()">
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
}

function createSubtasks(i){
    for (let j = 0; j < todos[i].subtasks.length; j++) {
        const element = todos[i].subtasks[j];
        document.getElementById('subtasks').innerHTML += /*html*/`
        <div>
            <img id="checkbox${j}" src="/icons/uncheckBox.svg" alt="" onclick="changecheckbox('checkbox${j}' , ${i})">
           <span>${element}</span> 
        </div>
    `
    }
}

function closetodowindow(){
    document.getElementById('showtodowindow').classList.remove('showtodowindow');
    document.getElementById('showtodowindow').innerHTML = '';

}

function changecheckbox(j , i) {
    const checkbox = document.getElementById(j);
    const checkButtonPath = '/icons/uncheckBox.svg';

    if (checkbox.src.endsWith(checkButtonPath)) {
        checkbox.src = '/icons/checkButton.svg';
        todos[i].progress + 1
    } else {
        checkbox.src = checkButtonPath;
        todos[i].progress - 1
    }
}

function filterTodosByTitle() {
    // Get the input element and its value
    let input = document.getElementById('taskInput');
    let filter = input.value.toLowerCase();

    // Filter the todos based on the input
    let filteredTodos = todos.filter(function(todo) {
        return todo.title.toLowerCase().includes(filter);
    });

    // Update the display for each taskboard
    renderToDos(filteredTodos);
}