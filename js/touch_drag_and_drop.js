let allowMove = false;
let donePos;
let awaitfeedbackPos;
let inprogressPos;
let todoPos;


/**
 * starts touch drag and drop
 * gets all object for drag and drop and add touch event
 */
function touchDragAndDrop() {
    let todoContainers = []
    let timeStamp = new Date().setTime()
    getAllDraggableObjects(todoContainers);
    todoContainers.forEach(elem => {
        elem = document.getElementById(elem)
        touchEvents(timeStamp, elem)
    });
}


/**
 * gets all draggable objects
 * @param {HTML-Id} todoContainers 
 */
function getAllDraggableObjects(todoContainers) {
    for (let i = 0; i < tasks.length; i++) {
        let object = 'draggableObject' + i;
        todoContainers.push(object)
    }
}


/**
 * starts the touch event
 * @param {number} timeStamp for controlling the hold-longer-for-dragging option
 * @param {string} elem defines the ID from the element that is touched
 */
function touchEvents(timeStamp, elem) {
    elem.addEventListener('touchstart', e => {
        touchMove(timeStamp, elem);
        touchEnd(elem)
    });
}


/**
 * controls the moving touch if the container is held longer than 1s
 * @param {int} timeStamp for controlling the hold-longer-for-dragging option
 * @param {*} elem defines the ID from the element that is touched
 */
function touchMove(timeStamp, elem) {
    timeStamp = new Date().getTime()
    elem.addEventListener('touchmove', eve => {
        if (Math.round((new Date().getTime() - timeStamp) / 1000) >= 1) {
            if (eve.cancelable) {
                allowMove = true;
                eve.preventDefault();
                containerToTouchCoordinates(eve, elem);
            }
        }
    })
}


/**
 * 
 * @param {event} eve describes the touch-move event
 * @param {HTML Element} elem is the moving container
 */
function containerToTouchCoordinates(eve, elem) {
    let nextX = eve.changedTouches[0].pageX;
    let nextY = eve.changedTouches[0].pageY;
    elem.style.position = 'fixed';
    elem.style.left = nextX + 'px';
    elem.style.top = nextY + 'px';
}


/**
 * get the position of the todo-departments
 */
function setPosition() {
    todoPos = document.getElementById('todo').getBoundingClientRect();
    inprogressPos = document.getElementById('inprogress').getBoundingClientRect();
    awaitfeedbackPos = document.getElementById('awaitfeedback').getBoundingClientRect();
    donePos = document.getElementById('done').getBoundingClientRect();
}

/**
 * controls the touch-end event
 * @param {HTML Element} elem is the moving container
 */
function touchEnd(elem) {
    elem.addEventListener('touchend', eve => {
        if (allowMove == true) {
            allowMove = false;
            setPosition();
            insertContainerTouchEnd(eve, elem);
            renderToDos();
        }
    })
}


/**
 * inserts the moving element in the right section
 * @param {*} eve is the touch move event
 * @param {*} elem is the moving container
 */
function insertContainerTouchEnd(eve, elem) {
    let elemId = elem.id.slice(15);
    let nextY = eve.changedTouches[0].pageY;
    let nextX = eve.changedTouches[0].pageX;
    let offsetDrop = 30;
    if (canDroppedDone(nextX, nextY, offsetDrop)) {
        tasks[elemId].taskboard = 'done';
    } else if (canDroppedAwaitfeedback(nextX, nextY, offsetDrop)) {
        tasks[elemId].taskboard = 'awaitfeedback';
    } else if (canDroppedInprogress(nextX, nextY, offsetDrop)) {
        tasks[elemId].taskboard = 'inprogress';
    } else if (canDroppedTodo(nextX, nextY, offsetDrop)) {
        tasks[elemId].taskboard = 'todo';
    }
}


/**
 * @param {integer} nextX 
 * @param {integer} nextY 
 * @param {integer} offsetDrop 
 * @returns if the touch-point is in the done section
 */
function canDroppedDone(nextX, nextY, offsetDrop) {
    return nextY > donePos.top - offsetDrop &&
        nextY < donePos.bottom + offsetDrop &&
        nextX < donePos.right + offsetDrop &&
        nextX > donePos.left - offsetDrop;
}


/**
 * @param {integer} nextX 
 * @param {integer} nextY 
 * @param {integer} offsetDrop 
 * @returns if the touch-point is in the await feedback section
 */
function canDroppedAwaitfeedback(nextX, nextY, offsetDrop) {
    return nextY > awaitfeedbackPos.top - offsetDrop &&
        nextY < awaitfeedbackPos.bottom + offsetDrop &&
        nextX < awaitfeedbackPos.right + offsetDrop &&
        nextX > awaitfeedbackPos.left - offsetDrop;
}


/**
 * @param {integer} nextX 
 * @param {integer} nextY 
 * @param {integer} offsetDrop 
 * @returns if the touch-point is in the in progress section
 */
function canDroppedInprogress(nextX, nextY, offsetDrop) {
    return nextY > inprogressPos.top - offsetDrop &&
        nextY < inprogressPos.bottom + offsetDrop &&
        nextX < inprogressPos.right + offsetDrop &&
        nextX > inprogressPos.left - offsetDrop;
}


/**
 * @param {integer} nextX 
 * @param {integer} nextY 
 * @param {integer} offsetDrop 
 * @returns if the touch-point is in the todo section
 */
function canDroppedTodo(nextX, nextY, offsetDrop) {
    return nextY > todoPos.top - offsetDrop &&
        nextY < todoPos.bottom + offsetDrop &&
        nextX < todoPos.right + offsetDrop &&
        nextX > todoPos.left - offsetDrop;
}