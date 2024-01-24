/** 
 * function edit the task
 * @param {number} i -the index to identify the right JSON
*/
async function edittask(i) {
    let todowindow = document.getElementById('showtodowindow');
    todowindow.classList.add('showtodowindow');
    todowindow.innerHTML = edittasktemplate(i);
    edittaskvalue(i);
    btns = tasks[i].assignedTo;
    askcheckstate(i);
    renderBtn();
    checkprio(i);
    checkcategory(i);
    subtasks = tasks[i].subtasks;
    renderSubtask();
  }
  
  /** 
   * function to insert the values
   * @param {number} i -the index to identify the right JSON
  */
  function edittaskvalue(i) {
    document.getElementById('edittitle').value = tasks[i].title;
    document.getElementById('editdescription').value = tasks[i].discription;
    document.getElementById('date').value = tasks[i].dueDate;
    document.getElementById('selectCategory').value = tasks[i].category;
  }
  
  /** 
   * function to save the edited function
   * @param {number} id -the index to identify the right JSON
  */
  async function saveEditTask(i) {
    let title = document.getElementById('edittitle').value;
    let description = document.getElementById('editdescription').value;
    let date = document.getElementById('date').value;
    let assignedTo = btns; 
    let category = document.getElementById('selectCategory').value;
  
    if (!categories.includes(category)) {
      categories.push(category);
    }
    tasks[i] = saveEditArray(title, description, date, category, assignedTo, prios, subtasks, i);
    await setItem('tasks', JSON.stringify(tasks));
    loadboard();
  }
  
  /** 
   * function to return the edited JSON
   * @param {string} val1 -the title of the task
   * @param {string} val2 -the description of the task
   * @param {string} val3 -the date of the task
   * @param {string} val4 -the category of the task
   * @param {Array} val5 -the assigned to array
   * @param {string} prio -the prio of the task
   * @param {Array} val6 -the subtask array of the task
   * @param {number} i -the index to identify the right JSON
  */
  function saveEditArray(val1, val2, val3, val4, val5, prios, val6, i) {
    return {
      title: `${val1}`,
      discription: `${val2}`,
      dueDate: `${val3}`,
      category: `${val4}`,
      assignedTo: val5,
      prio: `${prios[prios.length - 1]}`,
      subtasks: val6,
      progress: tasks[i].progress,
      id: i,
      taskboard: tasks[i].taskboard,
      checkboxStates: tasks[i].checkboxStates,
    };
  }
  
  /** 
   * function implement the category in the edit window
   * @param {number} i -the index to identify the right JSON
  */
  function checkcategory(i) {
    let select = document.getElementById('selectCategory');
    select.innerHTML = `<option id="selectCategory" value="${tasks[i].category}">${tasks[i].category}</option>`;
    for (let i = 0; i < categories.length; i++) {
      let currentCategory = categories[i];
      select.innerHTML += /*html*/ `
              <option id="selectCategory-${i}" value="${currentCategory}">${currentCategory}</option>
      `;
    }
  }
  
  /** 
   * function to open the contacts
   * @param {number} id -the index to identify the right JSON
  */
  function askcheckstate(id) {
    let field = document.getElementById('options');
    let listeOption = contacts.map(a => a['name']);
    let initial = contacts.map(a => a['initials']);
    let colors = contacts.map(a => a['bgColor']);
    let elements = tasks[id].assignedTo.map(a => a['name']);
    field.innerHTML = '';
    foraskcheckstate(initial, colors, field, elements, listeOption);
  }
  
  /** 
   * for loop to render the contacts
   * @param {Array} initial -Array of initials
   * @param {Array} colors -array with the color
   * @param {string} field -pick the element with the right Id
   * @param {Array} elements -Array with the assigned to names 
   * @param {Array} listeOption -Array with the contact names
  */
  function foraskcheckstate(initial, colors, field, elements, listeOption) {
      for (let i = 0; i < listeOption.length; i++) {
      const option = listeOption[i];
      field.innerHTML += optionsHTMLTemplate(i, option, initial, colors);
      document.getElementById(`btn-${i}`).style.backgroundColor = `${colors[i]}`;
  
        if (elements.includes(option)) {
          showOptions(`cont${i}`, 'newColor');
          document.getElementById(`checkBox${i}`).src = '../img/img/Check_button-white.svg';
        }
      
    }
  }
  
  /** 
   * function to check and change the prio
   * @param {number} i -the index to identify the right JSON
  */
  function checkprio(i) {
    if (tasks[i].prio.includes('urgent')) {
      changeColorPrio('colorUrgentImg', 'colorLowImg', 'colorMediumImg', '../img/img/urgent.svg', '../img/img/urgent-white.svg', '../img/img/low.svg', '../img/img/medium.svg')
    }
    if (tasks[i].prio.includes('medium')) {
      changeColorPrio('colorMediumImg', 'colorUrgentImg', 'colorLowImg', '../img/img/medium-yellow.svg', '../img/img/medium.svg', '../img/img/urgent.svg', '../img/img/low.svg')
    }
    if (tasks[i].prio.includes('low')) {
      changeColorPrio('colorLowImg', 'colorMediumImg', 'colorUrgentImg', '../img/img/low.svg', '../img/img/low-green.svg', '../img/img/medium.svg', '../img/img/urgent.svg')
    }
  }
  
  /** 
   * function to delete the task
   * @param {number} i -the index to identify the right JSON
  */
  async function deletetask(i) {
    if (confirm("Sind Sie sicher?") == true) {
      tasks.splice(i, 1);
      await setItem('tasks', JSON.stringify(tasks));
      loadboard();
    }else{
    showtodowindow(i);}
  }
  
  /** 
   * function to load the tasks array 
  */
  async function loadTasks() {
    tasks = JSON.parse(await getItem('tasks'));
  }
  
  // horizontal scrolling functionality
  
  let isDown = false;
  let startX;
  let scrollLeft;
  
  function sliderEffect(id) {
    const slider = document.getElementById(id);
    slider.addEventListener('mousedown', e => mouseDown(e));
    slider.addEventListener('mouseleave', e => mouseLeave(e));
    slider.addEventListener('mouseup', e => mouseUp(e));
    slider.addEventListener('mousemove', e => mouseMove(e));
  
    function mouseDown(e) {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    }
  
    function mouseLeave(e) {
      isDown = false;
    }
  
    function mouseUp(e) {
      isDown = false;
    }
  
    function mouseMove(e) {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const scrollContainer = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - scrollContainer;
    }
  }
  
  function sliderScroll() {
    sliderEffect('todo');
    sliderEffect('inprogress');
    sliderEffect('awaitfeedback');
    sliderEffect('done');
  }
  