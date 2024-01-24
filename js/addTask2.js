/**
 * Function to change the border color
 * 
 * @param {element} element - The HTML element whose border color will be changed
 */
// 
function changeBorderColor(element) {
    if (element.style.borderColor === 'rgb(41, 171, 226)') {
      element.style.borderColor = '';
    } else {
      element.style.borderColor = '#29ABE2';
    }
  }
  
  /**
   * Function that calls the functions changeBorderColor and showOptions
   * 
   * @param {element} element - The HTML element to be used in the functions
   */
  function handleDropdownClick(element) {
    changeBorderColor(element);
    showOptions('options', 'd-none');
  }
  
  /**
   * Function to change border color for required Fields
   * 
   * @param {element} element - The HTML element whose border color will be changed
   */
  function changeBorderColorRequiredField(element) {
    element.style.borderColor = 'red';
  }
  
  /**
   * Function to check the required Field
   */
  function checkRequiredField() {
    let title = document.getElementById('title');
    let date = document.getElementById('date');
    let category = document.getElementById('selectCategory');
    let isTitleValid = title.value.trim() !== '';
    let isDateValid = date.value.trim() !== '';
    let isCategoryValid = category.value.trim() !== '';
    
    if (!isTitleValid) {
      changeBorderColorRequiredField(title);
    }
    if (!isDateValid) {
      changeBorderColorRequiredField(date);
    }
    if (!isCategoryValid) {
      changeBorderColorRequiredField(category);
    }
    let createTaskButton = document.getElementById('createTaskButton');
    createTaskButton.disabled = !(isTitleValid && isDateValid && isCategoryValid);
  }