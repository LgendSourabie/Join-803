function todotemplate(currentElement, i) {
    return /*html*/ `
   <div id="draggableObject${i}" class="todocard" draggable="true" ondragstart="startDragging(${currentElement.id})" onclick="showtodowindow(${currentElement.id})">
      <button id="category${i}" class="todocardbutton">${currentElement.category}</button>
      <b>${currentElement.title}</b>
      <span>${currentElement.discription}</span>
      <div id="subtasksnone${i}" class="subtasks">
          <div class="progress-container">
              <div class="progress" style="width: ${(currentElement.progress.length / currentElement.subtasks.length) * 100}%">
              </div>
          </div>  
          <div>${currentElement.progress.length}/${currentElement.subtasks.length}Subtasks</div> 
      </div>
      <div class="assignedprio">
          <div id="assigned${i}" class="btn"></div>
          <img id="prio${i}" src="" alt="prio">
      </div>
  </div>
  `;
}

function todowindowtemplate(i) {
    return /*html*/ `
      <div class="overlay">
          <div class="overlaybutton">
              <button id="category">${tasks[i].category}</button>
              <img src="../icons/close.svg" alt="" onclick="closetodowindow()">
          </div>
          <h1>${tasks[i].title}</h1>
          <span class="overlaydiscription">${tasks[i].discription}</span>
          <div class="overlaytable">
              <span class="gray-clr">Due date:</span>
              <span>${tasks[i].dueDate}</span>
          </div>
          <div class="overlaytable">
              <span class="gray-clr">Priority</span>
              <div class='align-item-center'>
                  <span>${tasks[i].category}</span>
                  <img id="prio" src="" alt="prio">
              </div>
          </div>
          <div class="overlayassigned">
              <div class="gray-clr">Assinged to:</div>
              <div id="assigned" class="btn assigned"></div>
          </div>
          <div class="overlayassigned">
              <span class="gray-clr">Subtasks</span>
              <div id="subtasks"></div>
          </div>
          <div class="overlaychange">
              <div onclick="deletetask(${i})" class="overlaydelete">
                  <img src="../icons/delete.svg" alt="">
                  <span>Delete</span>
              </div>
              <span>|</span>
              <div class="overlayedit" onclick="edittask(${i})">
                  <img src="../icons/editcontact.svg" alt="">
                  <span>Edit</span>
              </div>
          </div>
      </div>
  `;
}

function templateOpenaddtask() {
    return /*html*/ `
      <div id="fly-in-container">
          <div class="addTaskContainerFlyin">
  
          <form class="addTaskContainerBoard addTaskOverviewContainer" onsubmit="createTask(); return false">
          <div class="addTaskContainerLeftRight">
              <div class="addTaskContainerOneflyin">
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
                              <input onclick="changeBorderColor(this)" id="title" class="inputAddTask" type="text" placeholder="Enter a title" required>
                          </div>
                          <div class="descriptionAddTask addTaskOverview">
                              <span class="containerLeftSpan">Description</span>
                              <textarea onclick="changeBorderColor(this)" id="description" class="textAreaAddTask" placeholder="Enter a Description"></textarea>
                          </div>
                          <div class="assignedAddTask addTaskOverview">
                              <span class="containerLeftSpan">Assigned to</span>
                              <div id="dropdown" class="dropdown" onclick="handleDropdownClick(this)">Select contacts to assign</div>
                                <div class="test6" onclick="handleDropdownClick(this)">
                                  <img class="dropDownImg" src="../img/img/arrow_drop_down.svg" alt="">
                                </div>
                              <div id="options" class="options d-none"></div>
                                <div id="btn-grp" class="btn"></div>
                          </div>
                      </div>
                      <div class="seperatorContainer"></div>
                      <div class="containerRight">
                          <div class="dateAddTask addTaskOverview">
                              <span class="containerLeftSpan">Due date
                                  <span class="star">*</span>
                              </span>    
                              <input onclick="changeBorderColor(this)" id="date" class="inputAddTask" type="date">
                          </div>
                          <div class="addTaskOverview">
                              <span class="containerLeftSpan">Prio</span>
                              <div id="prio" class="prioSelection">
                                  <img id="colorUrgentImg" onclick="prio('urgent'); changeColorPrio('colorUrgentImg','colorLowImg', 'colorMediumImg','../img/img/urgent.svg', '../img/img/urgent-white.svg','../img/img/low.svg','../img/img/medium.svg')" class="prio prioUrgentIMG testPrio" src="../img/img/urgent.svg" alt="">
                                  <img id="colorMediumImg" onclick="prio('medium'); changeColorPrio('colorMediumImg','colorUrgentImg','colorLowImg', '../img/img/medium-yellow.svg', '../img/img/medium.svg','../img/img/urgent.svg','../img/img/low.svg')" class="prio prioMediumIMG testPrio" src="../img/img/medium-yellow.svg" alt="">
                                  <img id="colorLowImg" onclick="prio('low'); changeColorPrio('colorLowImg','colorMediumImg','colorUrgentImg', '../img/img/low.svg', '../img/img/low-green.svg','../img/img/medium.svg','../img/img/urgent.svg')" class="prio prioLowIMG testPrio" src="../img/img/low.svg" alt="">
                              </div>
                          </div>
                          <div class="categoryAddTask addTaskOverview">
                              <span class="containerLeftSpan">Category
                                  <span class="star">*</span>
                              </span>    
                              <select onclick="changeBorderColor(this)" id="selectCategory">
                              </select>
                          </div> 
                          <div class="subtasksAddTask addTaskOverview">
                              <span class="spanSubtasks">Subtasks</span>
                              <div class="test_test">
                                <input type="text" onclick="changeBorderColor(this)" id="subtasks" class="inputAddTaskSubtask" type="text" placeholder="Add new subtask">
                                <button type="button" class="buttonSubtask" id="buttonSubtask" >
                                <img onclick="addNewSubtask(); changeSubtaskImg()" id="subtasksPlusIMG" class="subtasksPlusIMG" src="../img/img/subtasksPlus.svg" alt="">
                              </button>
                                <button type="button" class="buttonSubtask" id="buttonSubtask" >
                                <img onclick="deleteSubtaskInput()" id="subtasksCancelIMG" class="subtasksCancelIMG" src="../img/img/subtasks_cancel.svg" alt=""> 
                              </button>
                              </div>                      
                              <ul id="subtasksList"></ul>
                          </div> 
                      </div>
                  </div>
                  </div>
              </div>
                  <div class="addTaskContainerTwo">
                          <div class="footerAddTaskBoard">
                              <div class="spanFooter">
                                  <span class="star">*</span>
                                  <span>This field is required</span>
                              </div>
                              <div class="footerAddTaskButtons">
                                  <div onclick="closeAddContact()" id="clearButton" class="clearButton">
                                    <span>Cancel X</span>
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
      `;
}

function edittasktemplate(i) {
    return /*html*/ `
              <div class="addTaskOverviewContainer editTaskContainer">
                <div class="closeEditContainer">
                  <img class="closeEdit" src="../icons/close.svg" alt="" onclick="closetodowindow()">
                </div>
              
          <div class="addTaskContainerLeftRight">
  
              <div class="addTaskContainerOneflyin">
                  <div class="test1 editTaskTest1">
                  <div class="test3">
                      <div class="containerLeft">
                          <div class="titleAddTask addTaskOverview">
                              <span class="containerLeftSpan">Title
                                  <span class="star">*</span>
                              </span>
                              <input onclick="changeBorderColor(this)" id="edittitle" class="inputAddTask" type="text" placeholder="Enter a title" required>
                          </div>
                          <div class="descriptionAddTask addTaskOverview">
                              <span class="containerLeftSpan">Description</span>
                              <textarea onclick="changeBorderColor(this)" id="editdescription" class="textAreaAddTask" placeholder="Enter a Description"></textarea>
                          </div>
                          <div class="assignedAddTask addTaskOverview">
                              <span class="containerLeftSpan">Assigned to</span>
                              <div id="dropdown" class="dropdown" onclick="handleDropdownClick(this)">Select contacts to assign</div>
                                <div class="test6" onclick="handleDropdownClick(this)">
                                  <img class="dropDownImg" src="../img/img/arrow_drop_down.svg" alt="">
                                </div>
                              <div id="options" class="options d-none"></div>
                                <div id="btn-grp" class="btn btnEditTask"></div>
                          </div>
                      </div>
                      <div class="seperatorContainer"></div>
                      <div class="containerRight">
                          <div class="dateAddTask addTaskOverview">
                              <span class="containerLeftSpan">Due date
                                  <span class="star">*</span>
                              </span>    
                              <input onclick="changeBorderColor(this)" id="date" class="inputAddTask" type="date">
                          </div>
                          <div class="addTaskOverview">
                              <span class="containerLeftSpan">Prio</span>
                              <div id="prio" class="prioSelection">
                                  <img id="colorUrgentImg" onclick="prio('urgent'); changeColorPrio('colorUrgentImg','colorLowImg', 'colorMediumImg','../img/img/urgent.svg', '../img/img/urgent-white.svg','../img/img/low.svg','../img/img/medium.svg')" class="prio prioUrgentIMG testPrio" src="../img/img/urgent.svg" alt="">
                                  <img id="colorMediumImg" onclick="prio('medium'); changeColorPrio('colorMediumImg','colorUrgentImg','colorLowImg', '../img/img/medium-yellow.svg', '../img/img/medium.svg','../img/img/urgent.svg','../img/img/low.svg')" class="prio prioMediumIMG testPrio" src="../img/img/medium-yellow.svg" alt="">
                                  <img id="colorLowImg" onclick="prio('low'); changeColorPrio('colorLowImg','colorMediumImg','colorUrgentImg', '../img/img/low.svg', '../img/img/low-green.svg','../img/img/medium.svg','../img/img/urgent.svg')" class="prio prioLowIMG testPrio" src="../img/img/low.svg" alt="">
                              </div>
                          </div>
                          <div class="categoryAddTask addTaskOverview">
                              <span class="containerLeftSpan">Category
                                  <span class="star">*</span>
                              </span>    
                              <select onclick="changeBorderColor(this)" id="selectCategory">
                              </select>
                          </div> 
                          <div class="subtasksAddTask addTaskOverview">
                              <span class="spanSubtasks">Subtasks</span>
                              <div class="test_test">
                                <input type="text" onclick="changeBorderColor(this)" id="subtasks" class="inputAddTaskSubtask" type="text" placeholder="Add new subtask">
                                <button type="button" class="buttonSubtask" id="buttonSubtask" >
                                <img onclick="addNewSubtask(); changeSubtaskImg()" id="subtasksPlusIMG" class="subtasksPlusIMG" src="../img/img/subtasksPlus.svg" alt="">
                              </button>
                                <button type="button" class="buttonSubtask" id="buttonSubtask" >
                                <img onclick="deleteSubtaskInput()" id="subtasksCancelIMG" class="subtasksCancelIMG" src="../img/img/subtasks_cancel.svg" alt=""> 
                              </button>
                              </div>                      
                              <ul id="subtasksList"></ul>
                          </div> 
                      </div>
                  </div>
                  </div>
              </div>
                  <div class="addTaskContainerTwo">
                          <div class="footerAddTask footerEditTask">
                              <div class="spanFooter">
                                  <span class="star">*</span>
                                  <span>This field is required</span>
                              </div>
                              <div class="footerAddTaskButtons">
                                  <button onclick="saveEditTask(${i})" id="createTaskButton" class="createTaskButton createTaskButtonEditTask">
                                      <span>OK</span>
                                      <img class="imgCheck" src="../img/img/check.svg" alt="">
                                  </button>
                              </div>
                          </div>
                  </div>
              </div>
          </div>
  </div>
    `;
}