let todo = [
    {
        'title': 'test note',
        'discription': 'we test it',
        'assigned to': 'Pascal',
        'due date': '13.12.23',
        'prio' : 'medium',
        'category' : '',
        'subtasks' : 'no subtasks'
    }
]
let inprogress = []
let awaitfeedback = []
let done = [] 


function renderToDos(){
    let content = document.getElementById('todo');

    for (let i = 0; i < todo.length; i++) {
        const array = todo[i];

        content.innerHTML += /*html*/`
        <div>
            <button></button>
            <b></b>
            <span></span>
            <div>
                <!-- progessbar -->
                Subtasks
            </div>
            <div>
                <div>contacts</div>
                <img src="" alt="">
            </div>
        </div>
    `
    }


}

function renderinProgress(){
        let content = document.getElementById('inprogress');

    for (let i = 0; i < inprogress.length; i++) {
        const array = inprogress[i];
        
        content.innerHTML += /*html*/`
        <div>
            <button></button>
            <b></b>
            <span></span>
            <div>
                <!-- progessbar -->
                Subtasks
            </div>
            <div>
                <div>contacts</div>
                <img src="" alt="">
            </div>
        </div>
    `
    }
}

function renderawaitFeedback(){
    let content = document.getElementById('awaitfeedback');

    for (let i = 0; i < awaitfeedback.length; i++) {
        const array = awaitfeedback[i];
        
        content.innerHTML += /*html*/`
        <div>
            <button></button>
            <b></b>
            <span></span>
            <div>
                <!-- progessbar -->
                Subtasks
            </div>
            <div>
                <div>contacts</div>
                <img src="" alt="">
            </div>
        </div>
    `
    }
}

function renderdone(){
    let content = document.getElementById('done');

    for (let i = 0; i < done.length; i++) {
        const array = done[i];
        
        content.innerHTML += /*html*/`
        <div>
            <button></button>
            <b></b>
            <span></span>
            <div>
                <!-- progessbar -->
                Subtasks
            </div>
            <div>
                <div>contacts</div>
                <img src="" alt="">
            </div>
        </div>
    `
    }
}