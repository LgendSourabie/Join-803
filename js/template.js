// function templateSummary() {
//   return /*html*/ `

//     <span id="summary-page" class="summary-page">
//             <div class="marketing-slogan disp-flex">
//               <div class="title">Join 360</div>
//               <div class="blue-separator-line"></div>
//               <div class="slogan ft-sz-400">Key Metrics at a Glance</div>
//               <div class="blue-separator-line-responsive"></div>
//             </div>
//             <div class="task disp-flex">
//               <div class="task-overview disp-flex">
//                 <div class="greeting-responsive">
//                   <div>
//                     <span id="greet-user-responsive" class="greeting"></span>
//                   </div>
//                   <span id="current-user-name-responsive" class="current-user-name"></span>
//                 </div>
//                 <div class="first-line-task disp-flex">
//                   <div class="todo do-task disp-flex">
//                     <img class="task-icons-blue" src="/icons/edit.svg" alt="TO-DO" />
//                     <div class="middle">
//                       <span id="todo" class="var-task">0</span>
//                       <span class="task-text ft-sz-400">To-do</span>
//                     </div>
//                   </div>
//                   <div class="done do-task disp-flex">
//                     <img class="task-icons-blue" src="/icons/check.svg" alt="TO-DO" />
//                     <div class="middle">
//                       <span id="done" class="var-task">0</span>
//                       <span class="task-text ft-sz-400">Done</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div class="second-line-task disp-flex">
//                   <div class="urgent disp-flex task-due-common">
//                     <img class="task-icons" src="/icons/urgent.svg" alt="Urgent" />
//                     <div class="middle">
//                       <span id="urgent" class="var-task">0</span>
//                       <span class="task-text ft-sz-400">Urgent</span>
//                     </div>
//                   </div>
//                   <div class="gray-separator-line"></div>
//                   <div class="upcomming-deadline disp-flex task-due-common">
//                     <span id="due-date" class="due-date">October 16, 2022</span>
//                     <span class="task-text ft-sz-400">Upcomming Deadline</span>
//                   </div>
//                 </div>
//                 <div class="third-line-task disp-flex">
//                   <div class="boar-progress-feedback disp-flex">
//                     <span id="board-task-number" class="var-task">0</span
//                     ><span class="task-text ft-sz-400">Tasks In</span>
//                     <span class="task-text ft-sz-400">Board</span>
//                   </div>
//                   <div class="boar-progress-feedback disp-flex">
//                     <span id="progress-task-number" class="var-task">0</span
//                     ><span class="task-text ft-sz-400">Tasks In</span>
//                     <span class="task-text ft-sz-400">Progress</span>
//                   </div>
//                   <div class="boar-progress-feedback disp-flex">
//                     <span id="feedback-task-number" class="var-task">0</span
//                     ><span class="task-text ft-sz-400">Awaiting</span>
//                     <span class="task-text ft-sz-400">Feedback</span>
//                   </div>
//                 </div>
//               </div>
//               <div class="right-greeting disp-flex">
//                 <div>
//                   <span id="greet-user" class="greeting"></span>
//                   <span id="comma" class="greeting"></span><br />
//                 </div>
//                 <span id="current-user-name" class="current-user-name"></span>
//               </div>
//             </div>
//           </span>
//     `;
// }

function templateAddTask() {
  return /*html*/ `
<div id="add-task-page" class="addTaskContainer">
    <form class="addTaskOverviewContainer" onsubmit="createTask(); return false">
        <div class=" addTaskContainerLeftRight">
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
                                <img id="colorUrgentImg" onclick="prio('../icons/priourgent.svg'); changeColorPrio('colorUrgentImg','colorLowImg', 'colorMediumImg','../img/img/urgent.svg', '../img/img/urgent-white.svg','../img/img/low.svg','../img/img/medium.svg')" class="prio prioUrgentIMG testPrio" src="../img/img/urgent.svg" alt="">
                                <img id="colorMediumImg" onclick="prio('../icons/priomedium.svg'); changeColorPrio('colorMediumImg','colorUrgentImg','colorLowImg', '../img/img/medium-yellow.svg', '../img/img/medium.svg','../img/img/urgent.svg','../img/img/low.svg')" class="prio prioMediumIMG testPrio" src="../img/img/medium-yellow.svg" alt="">
                                <img id="colorLowImg" onclick="prio('../icons/priolow.svg'); changeColorPrio('colorLowImg','colorMediumImg','colorUrgentImg', '../img/img/low.svg', '../img/img/low-green.svg','../img/img/medium.svg','../img/img/urgent.svg')" class="prio prioLowIMG testPrio" src="../img/img/low.svg" alt="">
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
<div id="privacy-render" class="task-info-section d-none-summary">
            <span id="privacy-page" class="virtualClass help-page">
              <div class="title-help">Privacy Policy</div>
              <a href="../html/summary.html"
                ><img id="return-btn" class="return-btn" src="../icons/arrow-left-line.svg" alt="Exit"
              /></a>
              <div class="qa-join">Subtitle</div>
              <div class="help-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, ex cumque alias accusantium reiciendis
                deserunt ut iusto doloremque corrupti rem, consequatur pariatur repellat illum, quibusdam quam
                exercitationem numquam. Dolore, consequuntur?
              </div>
              <div class="qa-join">Subtitle</div>
              <div class="help-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur soluta amet iusto facilis quam, totam
                blanditiis. Totam tenetur rem aut quasi provident tempore non modi officiis molestias, laboriosam repellat
                excepturi.
              </div>
            </span>
          </div>
          <div id="legale-notice-render" class="task-info-section d-none-summary">
            <span id="legal-notice-page" class="virtualClass help-page">
              <div class="title-help">Legal Notice</div>
              <a href="../html/summary.html"
                ><img id="return-btn" class="return-btn" src="../icons/arrow-left-line.svg" alt="Exit"
              /></a>
              <span class="qa-join">Imprint</span>
              <div class="help-text">
                <ul class="list-email">
                  <li class="list-notice">
                    <a class="mail-links" href="#">Ibrahima-Pascal-Henrik-Thomas</a>
                  </li>
                  <li class="list-notice">
                    <a class="mail-links" href="mailto:join803@ibrahima.de">join803@da.de</a>
                  </li>
                  <li class="list-notice">
                    <a class="mail-links" href="#">Musterstraße 10, Munich</a>
                  </li>
                </ul>
              </div>
              <div>
                <span class="help-topic-title">Exploring the Board</span>
                <div class="help-text">
                  <ul class="list-email">
                    <li class="list-notice">
                      Email:
                      <a class="mail-links" href="mailto:join803@ibrahima.de">join803@ibrahima.de</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <span class="help-topic-title">Acceptance of terms</span>
                <div class="help-text">
                  Acceptance of terms By accessing and using
                  <span class="blue-join">Join</span> (Product), you acknowledge and agree to the following terms and
                  conditions, and any policies, guidelines, or amendments thereto that may be presented to you from time
                  to time. We, the listed students, may update or change the terms and conditions from time to time
                  without notice.
                </div>
              </div>
              <div>
                <span class="help-topic-title">Scope and ownership of the product</span>
                <div class="help-text">
                  <span class="blue-join">Join</span> has been developed as part of a student group project in a web
                  development bootcamp at the <span class="blue-join">Developer Akademie GmbH</span>. It has an
                  educational purpose and is not intended for extensive personal & business usage. As such, we cannot
                  guarantee consistent availability, reliability, accuracy, or any other aspect of quality regarding this
                  Product. The design of <span class="blue-join">Join</span> is owned by the
                  <span class="blue-join">Developer Akademie GmbH</span>. Unauthorized use, reproduction, modification,
                  distribution, or replication of the design is strictly prohibited.
                </div>
              </div>
              <div>
                <span class="help-topic-title">Proprietary rights</span>
                <div class="help-text">
                  Aside from the design owned by
                  <span class="blue-join">Developer Akademie GmbH</span>, we, the listed students, retain all proprietary
                  rights in <span class="blue-join">Join</span>, including any associated copyrighted material,
                  trademarks, and other proprietary information.
                </div>
              </div>
              <div>
                <span class="help-topic-title">Use of the product</span>
                <div class="help-text">
                  <span class="blue-join">Join</span> is intended to be used for lawful purposes only, in accordance with
                  all applicable laws and regulations. Any use of <span class="blue-join">Join</span> for illegal
                  activities, or to harass, harm, threaten, or intimidate another person, is strictly prohibited. You are
                  solely responsible for your interactions with other users of <span class="blue-join">Join</span>.
                </div>
              </div>
  
              <div>
                <span class="help-topic-title">Disclaimer of warranties and limitation of liability</span>
                <div class="help-text">
                  <span class="blue-join">Join</span> is provided "as is" without warranty of any kind, whether express or
                  implied, including but not limited to the implied warranties of merchantability, fitness for a
                  particular purpose, and non-infringement. In no event will we, the listed students, or the
                  <span class="blue-join">Developer Akademie</span>, be liable for any direct, indirect, incidental,
                  special, consequential or exemplary damages, including but not limited to, damages for loss of profits,
                  goodwill, use, data, or other intangible losses, even if we have been advised of the possibility of such
                  damages, arising out of or in connection with the use or performance of
                  <span class="blue-join">Join</span>.
                </div>
              </div>
              <div>
                <span class="help-topic-title">Indemnity</span>
                <div class="help-text">
                  You agree to indemnify, defend and hold harmless us, the listed students, the
                  <span class="blue-join">Developer Akademie</span>, and our affiliates, partners, officers, directors,
                  agents, and employees, from and against any claim, demand, loss, damage, cost, or liability (including
                  reasonable legal fees) arising out of or relating to your use of
                  <span class="blue-join">Join</span> and/or your breach of this Legal Notice.
                </div>
              </div>
              
              <div class="help-text">
                For any questions or notices, please contact us at
                <a class="mail-links" href="mailto:join803@da.de">join803@da.de</a>.
              </div>
              <div class="date-legal-notice">Date: December 05, 2023</div>
            </span>
          </div>
          <div id="help-render" class="task-info-section d-none-summary">
            <span id="help-page" class="help-page">
              <div class="title-help">Help</div>
              <a href="../html/summary.html"
                ><img id="return-btn" class="return-btn" src="../icons/arrow-left-line.svg" alt="Exit"
              /></a>
              <div class="help-text">
                Welcome to the help page for <span class="blue-join">Join</span>, your guide to using our kanban project
                management tool. Here, we'll provide an overview of what <span class="blue-join">Join</span> is, how it
                can benefit you, and how to use it.
              </div>
              <span class="qa-join">What is Join?</span>
              <div class="help-text">
                <span class="blue-join">Join</span> is a kanban-based project management tool designed and built by a
                group of dedicated students as part of their web development bootcamp at the Developer Akademie.
              </div>
              <div class="help-text">
                Kanban, a Japanese term meaning "billboard", is a highly effective method to visualize work, limit
                work-in-progress, and maximize efficiency (or flow).
                <span class="blue-join">Join</span> leverages the principles of kanban to help users manage their tasks
                and projects in an intuitive, visual interface.
              </div>
              <div class="help-text">
                It is important to note that
                <span class="blue-join">Join</span> is designed as an educational exercise and is not intended for
                extensive business usage. While we strive to ensure the best possible user experience, we cannot guarantee
                consistent availability, reliability, accuracy, or other aspects of quality regarding
                <span class="blue-join">Join</span>.
              </div>
              <span class="qa-join">How to use it?</span>
              <div class="help-text">
                Here is a step-by-step guide on how to use
                <span class="blue-join">Join</span>:
              </div>
              <div class="num-grp">
                <div class="qa-join numerotation">1.</div>
                <div>
                  <span class="help-topic-title">Exploring the Board</span>
                  <div class="help-text">
                    When you log in to <span class="blue-join">Join</span>, you'll find a default board. This board
                    represents your project and contains four default lists: "To Do", "In Progress", “Await feedback” and
                    "Done".
                  </div>
                </div>
              </div>
  
              <div class="num-grp">
                <div class="qa-join numerotation">2.</div>
                <div>
                  <span class="help-topic-title">Creating Cards</span>
                  <div class="help-text">
                    In <span class="blue-join">Join</span>, you can add contacts to collaborate on your projects. Go to
                    the "Contacts" section, click on "New contact", and fill in the required information. Once added,
                    these contacts can be assigned tasks and they can interact with the tasks on the board.
                  </div>
                </div>
              </div>
  
              <div class="num-grp">
                <div class="qa-join numerotation">3.</div>
                <div>
                  <span class="help-topic-title">Adding Cards</span>
                  <div class="help-text">
                    Now that you've added your contacts, you can start adding cards. Cards represent individual tasks.
                    Click the "+" button under the appropriate list to create a new card. Fill in the task details in the
                    card, like task name, description, due date, assignees, etc.
                  </div>
                </div>
              </div>
  
              <div class="num-grp">
                <div class="qa-join numerotation">4.</div>
                <div>
                  <span class="help-topic-title">Moving Cards</span>
                  <div class="help-text">
                    As the task moves from one stage to another, you can reflect that on the board by dragging and
                    dropping the card from one list to another.
                  </div>
                </div>
              </div>
  
              <div class="num-grp">
                <div class="qa-join numerotation">5.</div>
                <div>
                  <span class="help-topic-title">Deleting Cards</span>
                  <div class="help-text">
                    Once a task is completed, you can either move it to the "Done" list or delete it. Deleting a card will
                    permanently remove it from the board. Please exercise caution when deleting cards, as this action is
                    irreversible. <br />
                    Remember that using
                    <span class="blue-join">Join</span> effectively requires consistent updates from you and your team to
                    ensure the board reflects the current state of your project. <br />
                    Have more questions about <span class="blue-join">Join</span>? Feel free to contact us at
                    [join803.gmail.com]. We're here to help you!
                  </div>
                </div>
              </div>
              <div class="qa-join">Enjoy using Join!</div>
            </span>
          </div>
<!-- </div> -->
    `;
}

function templateBoard() {
  return /*html*/ `
        <div id="board-page" class="mainSection">
        <div class="section1">
            <div class="hiddenheadline">
              <div class="headlineAndAddTask">
                <h1>Board</h1>
                <button onclick="openAddtask()"><img src="../icons/add.svg" alt=""></button>
              </div>
              <div class="searchtaskhidden">
                <input id="taskInputhidden" type="" placeholder="Find Task" oninput="filterTodosByTitle('taskInputhidden')">
                <button><img src="../icons/search.svg" alt=""></button> 
              </div>
            </div>
            <div class="headline">
                <h1>Board</h1>
                <div class="addandsearch">
                    <div class="searchtask">
                        <input id="taskInput" type="" placeholder="Find Task" oninput="filterTodosByTitle('taskInput')">
                        <img src="../icons/search.svg" alt="">
                    </div>
                    <button onclick="openAddtask()">Add Task <img src="../icons/add.svg" alt=""></button>
                </div>
            </div>
        </div>
        <div class="todosection">
            <div class="todosplit">
                <div class="tablecolumntitle">
                    <span class="bold-task-title">To do</span>
                    <img onclick="openAddtask()" src="../icons/plusButton.svg" alt="">
                </div>
                <div id="todo" class="todoscontainer" ondragover="allowDrop(event); highlight('todo')"
                    ondrop="moveTo('todo')" ondragleave="removeHighlight('todo')">
                </div>
            </div>
            <div class="todosplit">
                <div class="tablecolumntitle">
                    <span class="bold-task-title">In Progress</span>
                    <img onclick="openAddtask()" src="../icons/plusButton.svg" alt="">
                </div>
                <div id="inprogress" class="todoscontainer" ondragover="allowDrop(event); highlight('inprogress')"
                    ondrop="moveTo('inprogress')" ondragleave="removeHighlight('inprogress')"></div>
            </div>
            <div class="todosplit">
                <div class="tablecolumntitle">
                    <span class="bold-task-title">Await Feedback</span>
                    <img onclick="openAddtask()" src="../icons/plusButton.svg" alt="">
                </div>
                <div id="awaitfeedback" class="todoscontainer" ondragover="allowDrop(event); highlight('awaitfeedback')"
                    ondrop="moveTo('awaitfeedback')" ondragleave="removeHighlight('awaitfeedback')"></div>
            </div>
            <div class="todosplit">
                <div class="tablecolumntitle">
                    <span class="bold-task-title">Done</span>
                </div>
                <div id="done" class="todoscontainer" ondragover="allowDrop(event); highlight('done')"
                    ondrop="moveTo('done')" ondragleave="removeHighlight('done')"></div>
            </div>
        </div>
        
    </div>
    <div id="showtodowindow"></div>
    <div id="add-task-bg" class="d-none"></div>
    `;
}

function templateContacts() {
  return /*html*/ `
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
                    <div id="contact-success" class="contact-success">Contact succesfully created</div>
                </div>
                <div class="contact-single-view-info" id="current-contact"> </div>
                <div class="contact-single-view-info" id="new-contact"> </div>
            </div>
        </div>
    </div>
    <div id="add-contact-bg" class="d-none"></div>
    `;
}

function templateHelp() {
  resetAll();
  return /*html*/ `
      <div id="help-render" class="task-info-section ">
            <span id="help-page" class="help-page">
              <div class="title-help">Help</div>
              <a href="../html/summary.html"
                ><img id="return-btn" class="return-btn" src="../icons/arrow-left-line.svg" alt="Exit"
              /></a>
              <div class="help-text">
                Welcome to the help page for <span class="blue-join">Join</span>, your guide to using our kanban project
                management tool. Here, we'll provide an overview of what <span class="blue-join">Join</span> is, how it
                can benefit you, and how to use it.
              </div>
              <span class="qa-join">What is Join?</span>
              <div class="help-text">
                <span class="blue-join">Join</span> is a kanban-based project management tool designed and built by a
                group of dedicated students as part of their web development bootcamp at the Developer Akademie.
              </div>
              <div class="help-text">
                Kanban, a Japanese term meaning "billboard", is a highly effective method to visualize work, limit
                work-in-progress, and maximize efficiency (or flow).
                <span class="blue-join">Join</span> leverages the principles of kanban to help users manage their tasks
                and projects in an intuitive, visual interface.
              </div>
              <div class="help-text">
                It is important to note that
                <span class="blue-join">Join</span> is designed as an educational exercise and is not intended for
                extensive business usage. While we strive to ensure the best possible user experience, we cannot guarantee
                consistent availability, reliability, accuracy, or other aspects of quality regarding
                <span class="blue-join">Join</span>.
              </div>
              <span class="qa-join">How to use it?</span>
              <div class="help-text">
                Here is a step-by-step guide on how to use
                <span class="blue-join">Join</span>:
              </div>
              <div class="num-grp">
                <div class="qa-join numerotation">1.</div>
                <div>
                  <span class="help-topic-title">Exploring the Board</span>
                  <div class="help-text">
                    When you log in to <span class="blue-join">Join</span>, you'll find a default board. This board
                    represents your project and contains four default lists: "To Do", "In Progress", “Await feedback” and
                    "Done".
                  </div>
                </div>
              </div>
  
              <div class="num-grp">
                <div class="qa-join numerotation">2.</div>
                <div>
                  <span class="help-topic-title">Creating Cards</span>
                  <div class="help-text">
                    In <span class="blue-join">Join</span>, you can add contacts to collaborate on your projects. Go to
                    the "Contacts" section, click on "New contact", and fill in the required information. Once added,
                    these contacts can be assigned tasks and they can interact with the tasks on the board.
                  </div>
                </div>
              </div>
  
              <div class="num-grp">
                <div class="qa-join numerotation">3.</div>
                <div>
                  <span class="help-topic-title">Adding Cards</span>
                  <div class="help-text">
                    Now that you've added your contacts, you can start adding cards. Cards represent individual tasks.
                    Click the "+" button under the appropriate list to create a new card. Fill in the task details in the
                    card, like task name, description, due date, assignees, etc.
                  </div>
                </div>
              </div>
  
              <div class="num-grp">
                <div class="qa-join numerotation">4.</div>
                <div>
                  <span class="help-topic-title">Moving Cards</span>
                  <div class="help-text">
                    As the task moves from one stage to another, you can reflect that on the board by dragging and
                    dropping the card from one list to another.
                  </div>
                </div>
              </div>
  
              <div class="num-grp">
                <div class="qa-join numerotation">5.</div>
                <div>
                  <span class="help-topic-title">Deleting Cards</span>
                  <div class="help-text">
                    Once a task is completed, you can either move it to the "Done" list or delete it. Deleting a card will
                    permanently remove it from the board. Please exercise caution when deleting cards, as this action is
                    irreversible. <br />
                    Remember that using
                    <span class="blue-join">Join</span> effectively requires consistent updates from you and your team to
                    ensure the board reflects the current state of your project. <br />
                    Have more questions about <span class="blue-join">Join</span>? Feel free to contact us at
                    [join803.gmail.com]. We're here to help you!
                  </div>
                </div>
              </div>
              <div class="qa-join">Enjoy using Join!</div>
            </span>
          </div>

    `;
}
function templatePrivacy() {
  return /*html*/ `
            <div id="privacy-render" class="task-info-section">
            <span id="privacy-page" class="virtualClass help-page">
              <div class="title-help">Privacy Policy</div>
              <a href="../html/summary.html"
                ><img id="return-btn" class="return-btn" src="../icons/arrow-left-line.svg" alt="Exit"
              /></a>
              <div class="qa-join">Subtitle</div>
              <div class="help-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, ex cumque alias accusantium reiciendis
                deserunt ut iusto doloremque corrupti rem, consequatur pariatur repellat illum, quibusdam quam
                exercitationem numquam. Dolore, consequuntur?
              </div>
              <div class="qa-join">Subtitle</div>
              <div class="help-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur soluta amet iusto facilis quam, totam
                blanditiis. Totam tenetur rem aut quasi provident tempore non modi officiis molestias, laboriosam repellat
                excepturi.
              </div>
            </span>
          </div>

    `;
}
function templateLegalNotice() {
  return /*html*/ `
     <div id="legale-notice-render" class="task-info-section">
            <span id="legal-notice-page" class="virtualClass help-page">
              <div class="title-help">Legal Notice</div>
              <a href="../html/summary.html"
                ><img id="return-btn" class="return-btn" src="../icons/arrow-left-line.svg" alt="Exit"
              /></a>
              <span class="qa-join">Imprint</span>
              <div class="help-text">
                <ul class="list-email">
                  <li class="list-notice">
                    <a class="mail-links" href="#">Ibrahima-Pascal-Henrik-Thomas</a>
                  </li>
                  <li class="list-notice">
                    <a class="mail-links" href="mailto:join803@ibrahima.de">join803@da.de</a>
                  </li>
                  <li class="list-notice">
                    <a class="mail-links" href="#">Musterstraße 10, Munich</a>
                  </li>
                </ul>
              </div>
              <div>
                <span class="help-topic-title">Exploring the Board</span>
                <div class="help-text">
                  <ul class="list-email">
                    <li class="list-notice">
                      Email:
                      <a class="mail-links" href="mailto:join803@ibrahima.de">join803@ibrahima.de</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <span class="help-topic-title">Acceptance of terms</span>
                <div class="help-text">
                  Acceptance of terms By accessing and using
                  <span class="blue-join">Join</span> (Product), you acknowledge and agree to the following terms and
                  conditions, and any policies, guidelines, or amendments thereto that may be presented to you from time
                  to time. We, the listed students, may update or change the terms and conditions from time to time
                  without notice.
                </div>
              </div>
              <div>
                <span class="help-topic-title">Scope and ownership of the product</span>
                <div class="help-text">
                  <span class="blue-join">Join</span> has been developed as part of a student group project in a web
                  development bootcamp at the <span class="blue-join">Developer Akademie GmbH</span>. It has an
                  educational purpose and is not intended for extensive personal & business usage. As such, we cannot
                  guarantee consistent availability, reliability, accuracy, or any other aspect of quality regarding this
                  Product. The design of <span class="blue-join">Join</span> is owned by the
                  <span class="blue-join">Developer Akademie GmbH</span>. Unauthorized use, reproduction, modification,
                  distribution, or replication of the design is strictly prohibited.
                </div>
              </div>
              <div>
                <span class="help-topic-title">Proprietary rights</span>
                <div class="help-text">
                  Aside from the design owned by
                  <span class="blue-join">Developer Akademie GmbH</span>, we, the listed students, retain all proprietary
                  rights in <span class="blue-join">Join</span>, including any associated copyrighted material,
                  trademarks, and other proprietary information.
                </div>
              </div>
              <div>
                <span class="help-topic-title">Use of the product</span>
                <div class="help-text">
                  <span class="blue-join">Join</span> is intended to be used for lawful purposes only, in accordance with
                  all applicable laws and regulations. Any use of <span class="blue-join">Join</span> for illegal
                  activities, or to harass, harm, threaten, or intimidate another person, is strictly prohibited. You are
                  solely responsible for your interactions with other users of <span class="blue-join">Join</span>.
                </div>
              </div>
  
              <div>
                <span class="help-topic-title">Disclaimer of warranties and limitation of liability</span>
                <div class="help-text">
                  <span class="blue-join">Join</span> is provided "as is" without warranty of any kind, whether express or
                  implied, including but not limited to the implied warranties of merchantability, fitness for a
                  particular purpose, and non-infringement. In no event will we, the listed students, or the
                  <span class="blue-join">Developer Akademie</span>, be liable for any direct, indirect, incidental,
                  special, consequential or exemplary damages, including but not limited to, damages for loss of profits,
                  goodwill, use, data, or other intangible losses, even if we have been advised of the possibility of such
                  damages, arising out of or in connection with the use or performance of
                  <span class="blue-join">Join</span>.
                </div>
              </div>
              <div>
                <span class="help-topic-title">Indemnity</span>
                <div class="help-text">
                  You agree to indemnify, defend and hold harmless us, the listed students, the
                  <span class="blue-join">Developer Akademie</span>, and our affiliates, partners, officers, directors,
                  agents, and employees, from and against any claim, demand, loss, damage, cost, or liability (including
                  reasonable legal fees) arising out of or relating to your use of
                  <span class="blue-join">Join</span> and/or your breach of this Legal Notice.
                </div>
              </div>
              <div class="help-text">
                For any questions or notices, please contact us at
                <a class="mail-links" href="mailto:join803@da.de">join803@da.de</a>.
              </div>
              <div class="date-legal-notice">Date: December 05, 2023</div>
            </span>
          </div>

    `;
}

function loadboard(){
  render(templateBoard());
  sliderScroll();
  toggleButtonColor('third-bg','bord-text','bord-img','../icons/board-white.svg');
  renderToDos();
}