// Function for HTML for the render Subtask
function renderSubtaskHTMLTemplate(i, subtask) {
    return /*html*/`
        <div class="newSubtaskContainerTwo" id="list${i}">
          <li id="link-${i}">${subtask}</li>
            <div class="hoverSubtask">
              <img class="subtaskNewContainerImgs" id="edit-${i}" onclick="editSubtask(${i})" src="../img/img/penSubtasks.svg" alt="">
              <img class="subtaskNewContainerImgs"  onclick="deleteSubtask(${i})" src="../img/img/deleteSubtasks.svg" alt="">
            </div>
        </div>
        <div id="test_test${i}" class="test_test editContainerSubtask d-none">
          <input type="text" onclick="changeBorderColor(this)" id="input-edit-${i}" class="inputEdit" type="text" placeholder="Add new subtask">
          <button type="button" class="buttonSubtask">
          <img onclick="changeSubtaskImg(); deleteSubtask()"  class="subtasksPlusIMGNew" src="../img/img/deleteSubtasks.svg" alt="">
        </button>
          <button type="button" class="buttonSubtask">
            <div class="newSubtaskImgs">
          <img id="newSubtaskImgsHover" class="newSubtaskImgsHover" onclick="checkNewSubtaskEdit(${i})"   src="../img/img/subtasks_check.svg" alt=""> 
          </div>
        </button>
        </div>
    `;
  }

  // Function for HTML for the options
function optionsHTMLTemplate(i, option, initial, color) {
    return /*html*/`
      <div class="option" id="cont${i}" onclick="updateBtn(${i});changeCheckState(${i})">
        <div class="container-btn-name-box">
        <button id="btn-${i}" class="bi">${initial[i]}</button> 
        <div class="spanContainer">
          <span class="spanOption" id="name${i}">${option}</span> 
        </div>
          <div class="test4">
            <div class="test5">
              <img id="checkBox${i}" src="../img/img/checkBox.svg" alt="">
            </div>
          </div>
        </div>
      </div>
    `;
  }