function templateSummary(){
    return /*html*/`
 
    <span id="summary-page" class="summary-page">
            <div class="marketing-slogan disp-flex">
              <div class="title">Join 360</div>
              <div class="blue-separator-line"></div>
              <div class="slogan ft-sz-400">Key Metrics at a Glance</div>
              <div class="blue-separator-line-responsive"></div>
            </div>
            <div class="task disp-flex">
              <div class="task-overview disp-flex">
                <div class="greeting-responsive">
                  <div>
                    <span id="greet-user-responsive" class="greeting"></span>
                  </div>
                  <span id="current-user-name-responsive" class="current-user-name"></span>
                </div>
                <div class="first-line-task disp-flex">
                  <div class="todo do-task disp-flex">
                    <img class="task-icons-blue" src="/icons/edit.svg" alt="TO-DO" />
                    <div class="middle">
                      <span id="todo" class="var-task">0</span>
                      <span class="task-text ft-sz-400">To-do</span>
                    </div>
                  </div>
                  <div class="done do-task disp-flex">
                    <img class="task-icons-blue" src="/icons/check.svg" alt="TO-DO" />
                    <div class="middle">
                      <span id="done" class="var-task">0</span>
                      <span class="task-text ft-sz-400">Done</span>
                    </div>
                  </div>
                </div>
                <div class="second-line-task disp-flex">
                  <div class="urgent disp-flex task-due-common">
                    <img class="task-icons" src="/icons/urgent.svg" alt="Urgent" />
                    <div class="middle">
                      <span id="urgent" class="var-task">0</span>
                      <span class="task-text ft-sz-400">Urgent</span>
                    </div>
                  </div>
                  <div class="gray-separator-line"></div>
                  <div class="upcomming-deadline disp-flex task-due-common">
                    <span id="due-date" class="due-date">October 16, 2022</span>
                    <span class="task-text ft-sz-400">Upcomming Deadline</span>
                  </div>
                </div>
                <div class="third-line-task disp-flex">
                  <div class="boar-progress-feedback disp-flex">
                    <span id="board-task-number" class="var-task">0</span
                    ><span class="task-text ft-sz-400">Tasks In</span>
                    <span class="task-text ft-sz-400">Board</span>
                  </div>
                  <div class="boar-progress-feedback disp-flex">
                    <span id="progress-task-number" class="var-task">0</span
                    ><span class="task-text ft-sz-400">Tasks In</span>
                    <span class="task-text ft-sz-400">Progress</span>
                  </div>
                  <div class="boar-progress-feedback disp-flex">
                    <span id="feedback-task-number" class="var-task">0</span
                    ><span class="task-text ft-sz-400">Awaiting</span>
                    <span class="task-text ft-sz-400">Feedback</span>
                  </div>
                </div>
              </div>
              <div class="right-greeting disp-flex">
                <div>
                  <span id="greet-user" class="greeting"></span>
                  <span id="comma" class="greeting"></span><br />
                </div>
                <span id="current-user-name" class="current-user-name"></span>
              </div>
            </div>
          </span>  
        
    `
}

function templateAddTask(){
    return /*html*/`
        <div class="addTaskContainer">

<!-- <div class="seperatorAddTask"></div> -->

<div class="addTaskContainer">

    <form class="addTaskOverviewContainer" onsubmit="createTask(); return false">

        <div class="addTaskContainerLeftRight">

            <div class="addTaskContainerOne">
                <div class="test1">
                <div class="groupButtonForm">
                    <div class="test2">
                    <div class="h2Container">
                        <h2>Add Task</h2>
                    </div>
                </div>
                <div class="test3">
                    <div class="containerLeft">
                        <div class="titleAddTask addTaskOverview">
                            <span class="containerLeftSpan">Title
                                <span class="star">*</span>
                            </span>
                            <input id="title" type="text" placeholder="Enter a title" required>
                        </div>
                        <div class="descriptionAddTask addTaskOverview">
                            <span class="containerLeftSpan">Description</span>
                            <textarea id="description" class="textAreaAddTask" placeholder="Enter a Description"></textarea>
                        </div>
                        <div class="assignedAddTask addTaskOverview">
                            <span class="containerLeftSpan">Assigned to</span>
                            <select id="select"></select>
                            <!-- <input id="select" type="text">
                            <img onclick="addContacts()" class="dropDownImg" src="../img/img/arrow_drop_down.svg" alt=""> -->
                        </div>
                    </div>

                    <div class="seperatorContainer"></div>

                    
                    <div class="containerRight">
                        <div class="dateAddTask addTaskOverview">
                            <span class="containerLeftSpan">Due date
                                <span class="star">*</span>
                            </span>    
                            <input id="date" type="date">
                        </div>
                        <div class="addTaskOverview">
                            <span class="containerLeftSpan">Prio</span>
                            <div id="prio" class="prioSelection">
                                <!-- <div onclick="changeColorPrio('colorUrgent','bgUrgent')" id="colorUrgent" class="prioUrgent allPrio">
                                    <span onclick="prio('Urgent')" class="prio">Urgent</span>
                                        <div class="img" id="img-urgent"> -->
                                            <!-- <img id="colorUrgentImg" class="prio prioUrgentIMG" src="../img/img/urgent.svg" alt=""> -->
                                        <!-- </div>
                                </div> -->
                                <img id="colorUrgentImg"  onclick="prio('Urgent');changeColorPrio('colorUrgentImg','colorLowImg', 'colorMediumImg','../img/img/urgent.svg', '../img/img/urgent-white.svg','../img/img/low.svg','../img/img/medium.svg')" class="prio prioUrgentIMG testPrio" src="../img/img/urgent.svg" alt="">
                                <!-- <div onclick="changeColorPrio('colorMedium','bgMedium')" id="colorMedium" class="prioMedium allPrio">
                                    <span onclick="prio('Medium')" class="prio">Medium</span>
                                        <div class="img" id="img-medium">
                                            <img id="colorMediumImg1" class="prio prioMediumIMG" src="../img/img/Vector_medium.svg" alt="">
                                            <img id="colorMediumImg2" class="prio prioMediumIMG" src="../img/img/Vector_medium.svg" alt="">
                                        </div>
                                </div> -->
                                <img id="colorMediumImg"   onclick="prio('Medium');changeColorPrio('colorMediumImg','colorUrgentImg','colorLowImg', '../img/img/medium-yellow.svg', '../img/img/medium.svg','../img/img/urgent.svg','../img/img/low.svg')" class="prio prioMediumIMG testPrio" src="../img/img/medium-yellow.svg" alt="">
                                <!-- <div onclick="changeColorPrio('colorLow','bgLow')" id="colorLow" class="prioLow allPrio">
                                    <span onclick="prio('Low')" class="prio">Low</span>
                                        <div class="img" id="img-low">
                                            <img id="colorLowImg" class="prio prioLowIMG" src="../img/img/Vector_low2.svg" alt="">
                                        </div>
                                </div> -->
                                <img id="colorLowImg"  onclick="prio('Low');changeColorPrio('colorLowImg','colorMediumImg','colorUrgentImg', '../img/img/low.svg', '../img/img/low-green.svg','../img/img/medium.svg','../img/img/urgent.svg')" class="prio prioLowIMG testPrio" src="../img/img/low.svg" alt="">
                            </div>
                        </div>
                        <div class="categoryAddTask addTaskOverview">
                            <span class="containerLeftSpan">Category
                                <span class="star">*</span>
                            </span>    
                            <select id="selectCategory">
                                <!-- <input type="text" id="selectCategory">
                                <img class="dropDownImg" src="../img/img/arrow_drop_down.svg" alt=""> -->
                            </select>
                        </div> 
                        <div class="subtasksAddTask addTaskOverview">
                            <span class="spanSubtasks">Subtasks</span>
                            <input id="subtasks" type="text" placeholder="Add new subtask">
                            <img onclick="addNewSubtask()" class="subtasksPlusIMG" src="../img/img/subtasksPlus.svg" alt="">
                        </div> 
                    </div>
                </div>
                </div>
            </div>
                <div class="addTaskContainerTwo">
                        <div class="footerAddTask">
                            <div class="spanFooter">
                                <span class="star">*</span>
                                <span>This field is required</span>
                            </div>
                            <div class="footerAddTaskButtons">
                                <div onclick="clearTask()" id="clearButton" class="clearButton">
                                    <span>Clear X</span>
                                    </div>
                                <button id="createTaskButton" class="createTaskButton">
                                    <span>Create Task</span>
                                    <img class="imgCheck" src="../img/img/check.svg" alt="">
                                </button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </form>
</div>
</div>
    `
}

function templateBoard(){
    return /*html*/`
        <div class="mainSection">
        <div class="section1">
            <div class="headline">
                <h1>Board</h1>
                <div class="addandsearch">
                    <div class="searchtask">
                        <input id="taskInput" type="" placeholder="Find Task" oninput="filterTodosByTitle()">
                        <img src="/icons/search.svg" alt="">
                    </div>
                    <button>Add Task <img src="/icons/add.svg" alt=""></button>
                </div>
            </div>
            <div class="tablecolumn">
                <div class="tablecolumntitle">
                    <span>To do</span>
                    <img src="/icons/plusButton.svg" alt="">
                </div>
                <div class="tablecolumntitle">
                    <span>In Progress</span>
                    <img src="/icons/plusButton.svg" alt="">
                </div>
                <div class="tablecolumntitle">
                    <span>Await Feedback</span>
                    <img src="/icons/plusButton.svg" alt="">
                </div>
                <div class="tablecolumntitle">
                    <span>Done</span>
                </div>
            </div>
        </div>
        <div class="todosection">
            <div class="todosplit">

                <div id="todo" class="todoscontainer" ondragover="allowDrop(event); highlight('todo')"
                    ondrop="moveTo('todo')" ondragleave="removeHighlight('todo')"></div>
            </div>
            <div class="todosplit">

                <div id="inprogress" class="todoscontainer" ondragover="allowDrop(event); highlight('inprogress')"
                    ondrop="moveTo('inprogress')" ondragleave="removeHighlight('inprogress')"></div>
            </div>
            <div class="todosplit">

                <div id="awaitfeedback" class="todoscontainer" ondragover="allowDrop(event); highlight('awaitfeedback')"
                    ondrop="moveTo('awaitfeedback')" ondragleave="removeHighlight('awaitfeedback')"></div>
            </div>
            <div class="todosplit">

                <div id="done" class="todoscontainer" ondragover="allowDrop(event); highlight('done')"
                    ondrop="moveTo('done')" ondragleave="removeHighlight('done')"></div>
            </div>
        </div>
        
    </div>
    <div id="showtodowindow"></div>
    `
}

function templateContacts(){
    return /*html*/`
    <div class="d-flex">
        <div class="contacts-scroll-container">
        <div class="contacts-overview-container">
            <button class="add-new-contact" onclick="renderAddContact()">Add new contact<img src="../icons/addNewContact.svg"></button>
            <div id="contacts-overview"></div>
            </div>
            <button class="responsiv-contact-button" onclick="renderAddContact()"><img src="../icons/addNewContact.svg" alt=""></button>
        </div>
        <div class="contact-single-view" id="contact-single-view">
            <div class="contacts-headline">
                <h2>Contacts</h2><span>Better with a team</span>
            </div>
            <div class="contact-single-view-info" id="new-contact"></div>
            <div class="contact-single-view-info" id="current-contact"></div>
        </div>
        <div id="add-contact-bg" class="d-none"></div>
    </div>
    `;
}