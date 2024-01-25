let alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',];
let contacts = [];
let highlightedContact;
let currentContact;
let selectedContact;
let edit = false;
let contactIndex = -1;
let x = window.matchMedia('(max-width: 1300px)')


async function renderContactSection() {
  await loadContacts();
  renderContacts();
}


function renderContacts() {
  insertDirectory();
  insertContacts();
}


function openContact(i) {
  selectedContact = 'contact-' + i;
  currentContact = i;
  if (selectedContact == highlightedContact) {
    hideContact();
    removeHighligtContact(i);
  } else {
    removeHighligtContact(i);
    showContact(i);
    highligtContact(i);
  }
}

function hideContact() {
  document.getElementById('current-contact').innerHTML = '';
}


function showContact(i) {
  let newContact = document.getElementById('new-contact');
  let currentContact = document.getElementById('current-contact')
  currentContact.innerHTML = ''
  classListAdd('current-contact', 'fly-in-contact')
  newContact.innerHTML = showContactTemplate(i);
  classListAdd('new-contact', 'fly-in-contact')
  newContact.ontransitionend = function () {
    updateContactContainer(newContact, currentContact)
    newContact.ontransitionend = null;
  }
}


function classListAdd(id, addClass){
  document.getElementById(id).classList.add(addClass)
}

function classListRemove(id, addClass){
  document.getElementById(id).classList.remove(addClass)
}


function updateContactContainer(newContact, currentContact) {
  currentContact.innerHTML = newContact.innerHTML;
  newContact.innerHTML = ''
  classListRemove('new-contact', 'fly-in-contact');
}


function openMenuContactResponsive(i){
  classListRemove('close-menu-contact-responsive', 'd-none')
  document.getElementById('open-menu-contact-responsive').innerHTML = openMenuContactResponsiveTemplate(i); 
}


function  closeMenuContactResponsive(i){
  if(document.getElementById('close-menu-contact-responsive') != null){
    classListAdd('close-menu-contact-responsive', 'd-none')
    document.getElementById('open-menu-contact-responsive').innerHTML = closeMenuContactResponsiveTemplate(i);
  }
}


function insertDirectory() {
  document.getElementById('contacts-overview').innerHTML = '';
  for (let i = 0; i < alphabet.length; i++) {
    const letter = alphabet[i];
    document.getElementById('contacts-overview').innerHTML +=
      insertDirectoryTemplate(letter);
  }
}


function insertContacts() {
  for (let i = 0; i < contacts.length; i++) {
    let name = contacts[i]['name'];
    let initialLetter = name.charAt(0).toLowerCase();
    let section = document.getElementById('section-' + initialLetter);
    section.innerHTML += insertContactsTemmplate(i, name);
    classListRemove('section-' + initialLetter, 'd-none')
  }
}


function highligtContact(i) {
  highlightedContact = 'contact-' + i;
  setHighligtContact();
}


function setHighligtContact() {
  classListAdd(highlightedContact, 'highlight-contact');
}


function removeHighligtContact() {
  id = highlightedContact;
  if (highlightedContact) {
    classListRemove(highlightedContact, 'highlight-contact');
    highlightedContact = '';
  }
}


function createContact() {
  event.preventDefault();
  let name = document.getElementById('name-input').value;
  let telephone = document.getElementById('telephone-input').value;
  let email = document.getElementById('email-input').value;
  let initials = getInitials(name);
  createOrEditContact(name, telephone, email, initials);
  setEditToFalse();
}


async function createOrEditContact(name, telephone, email, initials) {
  if (contactIndex != -1) {
    await editExistingContact(name, telephone, email, initials);
  } else {
    await createNewContact(name, telephone, email, initials);
  }
  closeAddContact();
  await renderContactSection();
  i = highlightedContact.slice(-1);
  showContact(i);
  setHighligtContact();
  popUpContactCreated();
}


function popUpContactCreated(){
  if (contactIndex = -1) {
    classListAdd('contact-success', 'contact-success-fly-in')
    setTimeout(() => {
    classListRemove('contact-success', 'contact-success-fly-in')
    }, 1000);
  }
}


async function createNewContact(name, telephone, email, initials) {
  let bg = randomColorGenerator();
  contacts.push({
    name: name,
    telephone: telephone,
    email: email,
    initials: initials,
    bgColor: bg
  });
  await saveContacts();
  lastIndex = contacts.length - 1;
  highlightedContact = 'contact-' + lastIndex;
}


async function editExistingContact(name, telephone, email, initials) {
  let bg = contacts[currentContact]['bgColor']
  contacts.splice(contactIndex, 1, {
    name: name,
    telephone: telephone,
    email: email,
    initials: initials,
    bgColor: bg
  });
  await saveContacts();
}


async function saveContacts(){
  await setItem('contacts', JSON.stringify(contacts));
}


function renderAddContact() {
  openAddContact();
  insertContentAddEdit('add');
}


function openAddContact() {
  let addContact = document.getElementById('add-contact-bg');
  classListRemove('add-contact-bg', 'd-none');
  addContact.innerHTML = addAndEditTemplate();
  setTimeout(() => {
    classListAdd('fly-in-container', 'fly-in-add-edit');
  }, 50);
}


function insertContentAddEdit(addOrEdit) {
  headline = document.getElementById('headline-add-edit');
  subheadline = document.getElementById('subheadline-add-edit');
  button = document.getElementById('button-add-edit');
  if (addOrEdit == 'add') {
    contentAddContact(headline, subheadline, button);
  } else {
    contentEditContact(headline, subheadline, button);
  }
}

function contentAddContact(headline, subheadline, button) {
  headline.innerHTML = 'Add Contact';
  subheadline.innerHTML = 'Tasks are better with a team!';
  button.innerHTML = 'Create Contact';

}

function contentEditContact(headline, subheadline, button) {
  headline.innerHTML = 'Edit Contact';
  subheadline.innerHTML = '';
  button.innerHTML = 'Edit Contact';
  let bg = contacts[currentContact]['bgColor'];
  document.getElementById('profile-icon-container').innerHTML = initialsTemplate(bg);
}

function closeAddContact() {
  flyIn = document.getElementById('fly-in-container');
  classListRemove('fly-in-container', 'fly-in-add-edit')
  flyIn.ontransitionend = function () {
    classListAdd('add-contact-bg', 'd-none')
    flyIn.ontransitionend = null;
  }
  setEditToFalse();
}

function editContact(i) {
  closeMenuContactResponsive();
  saveContactIndex(i);
  openAddContact();
  insertContentAddEdit('edit');
  getInputValueContact();
}

function saveContactIndex(i) {
  contactIndex = i;
}


function setEditToFalse() {
  contactIndex = -1;
}


function getInputValueContact() {
  let getName = document.getElementById('name-single-view').innerHTML;
  let getEmail = document.getElementById('email-single-view').innerHTML;
  let getPhone = document.getElementById('phone-single-view').innerHTML;
  let initials = document.getElementById('initial-single-view').innerHTML;
  document.getElementById('name-input').value = getName.trim();
  document.getElementById('telephone-input').value = getPhone.trim();
  document.getElementById('email-input').value = getEmail.trim();
  document.getElementById('initial-edit-contact').innerHTML = initials;
}


async function deleteContact(i, cResponsive) {
  contacts.splice(i, 1);
  await setItem('contacts', JSON.stringify(contacts));
  if(cResponsive != true){
    removeHighligtContact();
  }else{
    render(templateContacts())
  }
  renderContactSection();
}


function showContactResponsiv(jsonIndex) {
  if (x.matches) { // If media query matches
    classListAdd('contact-single-view', 'd-none')
    document.getElementById('render-container').innerHTML = showContactResponsivTemplate(jsonIndex); 
    document.getElementById('contact-single-view').style = 'display: unset'
    document.getElementById('contact-single-view').innerHTML += showContactTemplate(jsonIndex);
}
}


function closeContactResponsiv(i) {
  if (x.matches) {
    // document.getElementById('render-container').innerHTML = templateContacts();
    render(templateContacts())
    renderContactSection();
  }
}


// Safe and get contacts in remote Storage
async function loadContacts() {
  contacts = JSON.parse(await getItem('contacts'));
}



async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: 'POST',
    body: JSON.stringify(payload),
  }).then((response) => response.json());
}


async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return await fetch(url)
    .then((response) => response.json())
    .then((response) => response.data.value);
}


//standard funktionen
function getInitials(nameAsString) {
  let initials = (fullname => fullname.map((n, i) => (i == 0 || i == fullname.length - 1) && n[0]).filter(n => n).join(''))
    (nameAsString.split(' ')).toUpperCase();
  return initials
}

function randomColorGenerator() {
  let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  return randomColor
}