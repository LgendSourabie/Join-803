let alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
let contacts = [
  {
    name: "Ibrahima Sourabie",
    telephone: "0123456789",
    email: "ibrahima@join803.de",
    initials: "IS",
    bgColor: '#298c2b'
  },
  {
    name: "Pascal Wagner",
    telephone: "0123456789",
    email: "pascal@join803.de",
    initials: "PW",
    bgColor: '#cb636e'
  },
  {
    name: "Thomas Jilge",
    telephone: "0123456789",
    email: "thomas@join803.de",
    initials: "TJ",
    bgColor: '#ae3ad5'
  },
  {
    name: "Henrik Sorg",
    telephone: "0123456789",
    email: "henrik@join803.de",
    initials: "HS",
    bgColor: '#50e04c'
  },
];

let highlightedContact;
let currentContact;
let selectedContact;
let edit = false;
let contactIndex = -1;


async function renderContactSection() {
  contacts =  JSON.parse(await getItem("contacts"));
  renderContacts();
}


function renderContacts() {
  insertDirectory();
  insertContacts();
}


function openContact(i) {
  selectedContact = "contact-" + i;
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
  document.getElementById("new-contact").innerHTML = "";
}


// function showContact(i) {
  
//   let contactCont = document.getElementById("new-contact");
//   contactCont.classList.add('d-none');
//   contactCont.classList.remove('fly-in');
//   contactCont.classList.remove('d-none');
  
//   setTimeout(() => {
    
//     contactCont.innerHTML = showContactTemplate(i);
    
//     contactCont.classList.add('fly-in');
//   }, 100);
  
  
//   currentContact = i;
// }


function showContact(i){

}


function showContactTemplate(i) {
  let name = contacts[i]["name"];
  let email = contacts[i]["email"];
  let telephone = contacts[i]["telephone"];
  let initials = contacts[i]["initials"];
  let bg = contacts[i]["bgColor"];
  return /*html*/ `
        <div>
            <div class="initial-name-container">
                <div id="initial-single-view" style="background: ${bg}">${initials}</div>
                <div class="name-edit-delete">
                    <div id="name-single-view">${name}</div>
                    <div class="edit-and-delete">
                        <div onclick="editContact(${i})"><img src="../icons/editContact.svg">Edit</div>
                        <div onclick="deleteContact(${i})"><img src="../icons/delete.svg">Delete</div>
                    </div>
                </div>
            </div>
            </div>
            <div class="contact-information-headline">Contact Information</div>
            <div class="contact-information">
            <div class="email-single-view-container">
                <span>
                    Email
                </span>
                <span id="email-single-view">
                    ${email}
                </span>
            </div>
            <div class="phone-single-view-container">
                <span>
                    Phone
                </span>
                <span id="phone-single-view">
                    ${telephone}
                </span>
            </div>
        </div>
        <button class="responsiv-contact-button" onclick="renderAddContact()"><img src="../icons/three_points.svg" alt=""></button>
    `;
}


function insertDirectory() {
  for (let i = 0; i < alphabet.length; i++) {
    const letter = alphabet[i];
    document.getElementById("contacts-overview").innerHTML +=
      insertDirectoryTemplate(letter);
  }
}


function insertDirectoryTemplate(letter) {
  return /*html*/ `
    <div class="contact-section d-none" id="section-${letter.toLowerCase()}">
        <span class="contact-section-letter">${letter}</span>
    </div>
`;
}


function insertContacts() {
  for (let i = 0; i < contacts.length; i++) {
    let name = contacts[i]["name"];
    let initialLetter = name.charAt(0).toLowerCase();
    let section = document.getElementById("section-" + initialLetter);
    section.innerHTML += insertContactsTemmplate(i, name);
    section.classList.remove("d-none");
  }
}


function insertContactsTemmplate(i, name) {
  let email = contacts[i]["email"];
  let initials = getInitials(name);
  let bg = contacts[i]["bgColor"];
  return /*html*/ `
    <div class="contact" id="contact-${i}" onclick="openContact(${i}), showContactResponsiv(${i})">
        <div class="initial-border">
            <div class="initial-overview" style="background:${bg}">${initials}</div>
        </div>
        <div style="display: flex;flex-direction: column;">
            <span class="name">${name}</span>
            <span class="email">${email}</span>
        </div>
    </div>
`;
}


function highligtContact(i) {
  highlightedContact = "contact-" + i;
  setHighligtContact();
}


function setHighligtContact() {
  document.getElementById(highlightedContact).classList.add("highlight-contact");
}


function removeHighligtContact() {
  id = highlightedContact;
  if (highlightedContact) {
    document.getElementById(id).classList.remove("highlight-contact");
    highlightedContact = "";
  }
}


function createContact() {
  let name = document.getElementById("name-input").value;
  let telephone = document.getElementById("telephone-input").value;
  let email = document.getElementById("email-input").value;
  let initials = getInitials(name);
  
  createOrEditContact(name, telephone, email, initials);
  setEditToFalse();
}


async function createOrEditContact(name, telephone, email, initials) {
  // ev.preventDefault()
  if (contactIndex != -1) {
    editExistingContact(name, telephone, email, initials);
    
    // xxxxxx
  } else {
    await createNewContact(name, telephone, email, initials);
  }
  closeAddContact();
  renderContactSection();
  setHighligtContact();
  i = highlightedContact.slice(-1);
  showContact(i);
}


async function createNewContact(name, telephone, email, initials) {
  let bg = randomColorGenerator();
  contacts.push({ name: name,
     telephone: telephone,
     email: email,
     initials: initials,
     bgColor: bg
    });
    await setItem("contacts", JSON.stringify(contacts));
  lastIndex = contacts.length - 1;
  highlightedContact = "contact-" + lastIndex;
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
  // await setItem('contacts', contacts)
}


function renderAddContact() {
  openAddContact();
  insertContentAddEdit("add");
}

function openAddContact() {
  let addContact = document.getElementById("add-contact-bg");
  addContact.classList.remove("d-none");
  addContact.innerHTML = addAndEditTemplate();
}


function initialsTemplate(bg){
  return /*html*/`
  <div id="initial-edit-contact" style="background: ${bg}">HS</div>
`
}


function addAndEditTemplate() {
  return /*html*/ `
    <div id="add-contact">
        <div class="add-contact-slogan">
            <img src="../icons/logo.svg" alt="logo">
            <h2 id="headline-add-edit"></h2>
            <p id="subheadline-add-edit"></p>
            <div class="border-add-edit"></div>
        </div>
        <div class="add-contact-data">
          <div class="profile-icon-container" id="profile-icon-container">
            <img src="../icons/profileImageContacts.svg" alt="profile icon">
          </div>
              <div class="add-contact-data-inputs">
                <div class="d-flex add-contact-input-container">
                  <input type="text" minlength="2"  placeholder="Name" class="add-contact-input" id="name-input" required>
                  <img src="../icons/name.svg" alt="telephone-icon">
                </div>
                <div class="d-flex add-contact-input-container">
                  <input type="email" placeholder="Email" class="add-contact-input" id="email-input" required>
                  <img src="../icons/email.svg" alt="telephone-icon">
                </div>
                <div class="d-flex add-contact-input-container">
                    <input type="number" minlength="4" placeholder="Phone" class="add-contact-input" id="telephone-input" required>
                    <img src="../icons/telephone.svg" alt="telephone-icon">
                </div>
                <div class="d-flex">
                  <button type="button" class="cancel-contact-button" onclick="closeAddContact()">Cancel</button>
                  <button type="submit" class="create-contact-button" id="button-add-edit" onclick="createContact()"></button> 
                </div>
              </div>
              
        </div>
    </div>
    `;
}

function insertContentAddEdit(addOrEdit) {
  headline = document.getElementById("headline-add-edit");
  subheadline = document.getElementById("subheadline-add-edit");
  button = document.getElementById("button-add-edit");
  if (addOrEdit == "add") {
    contentAddContact(headline, subheadline, button);
  } else {
    contentEditContact(headline, subheadline, button);
  }
}

function contentAddContact(headline, subheadline, button) {
  headline.innerHTML = "Add Contact";
  subheadline.innerHTML = "Tasks are better with a team!";
  button.innerHTML = "Create Contact";

}

function contentEditContact(headline, subheadline, button) {
  headline.innerHTML = "Edit Contact";
  subheadline.innerHTML = "";
  button.innerHTML = "Edit Contact";
  let bg = contacts[currentContact]["bgColor"];
  document.getElementById('profile-icon-container').innerHTML = initialsTemplate(bg);
}

function closeAddContact() {
  document.getElementById("add-contact-bg").classList.add("d-none");
  setEditToFalse();
}

function editContact(i) {
  saveContactIndex(i);
  openAddContact();
  insertContentAddEdit("edit");
  getInputValueContact();
}

function saveContactIndex(i) {
  contactIndex = i;
}


function setEditToFalse() {
  contactIndex = -1;
}

function getInputValueContact() {
  let getName = document.getElementById("name-single-view").innerHTML;
  let getEmail = document.getElementById("email-single-view").innerHTML;
  let getPhone = document.getElementById("phone-single-view").innerHTML;
  let initials = document.getElementById("initial-single-view").innerHTML;
  document.getElementById("name-input").value = getName.trim();
  document.getElementById("telephone-input").value = getPhone.trim();
  document.getElementById("email-input").value = getEmail.trim();
  document.getElementById('initial-edit-contact').innerHTML = initials;
}

async function deleteContact(i) {
  contacts.splice(i, 1);
  await setItem("contacts", JSON.stringify(contacts));
  removeHighligtContact();
  renderContactSection();
}

// renderContactSection();


// Create a MediaQueryList object
let x = window.matchMedia('(max-width: 1000px)')

function showContactResponsiv(jsonIndex) {
  // let name = contacts[jsonIndex]["name"];
  // let email = contacts[jsonIndex]["email"];
  // let telephone = contacts[jsonIndex]["telephone"];
  if (x.matches) { // If media query matches
    document.getElementById('contact-single-view').classList.add('d-none');
    document.getElementById('render-container').innerHTML = /*html*/`
      <div class="contact-single-view" id="contact-single-view">
        <div class="d-flex justify-content-between align-items-start w-100">
          <div class="contacts-headline">
            <h2>Contacts</h2>
            <span>Better with a team</span>
            <div class="border-responsive-single"></div>
          </div>
          <img src="../icons/arrow-left-line.svg" class="arrow-back-contacts d-none" alt="back" onclick="closeContactResponsiv(${jsonIndex});">
        </div>
        <div class="contact-single-view-info" id="new-contact"> 
      </div>
    `;
    document.getElementById('contact-single-view').style = 'display: unset'
    document.getElementById('contact-single-view').innerHTML += showContactTemplate(jsonIndex);
  }
}

function closeContactResponsiv(i){
  if (x.matches){
    renderContactSection();
  }
}


// Safe and get contacts in remote Storage
async function loadAllContacts() {
  contacts = JSON.parse(await getItem("contacts"));
}

// setItem("contacts", JSON.stringify(contacts));

async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((response) => response.json());
}

async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return await fetch(url)
    .then((response) => response.json())
    .then((response) => response.data.value);
}

// contacts =  JSON.parse(await getItem("contacts"));
// setItem("contacts", JSON.stringify(contacts));


//standard funktionen
function getInitials(nameAsString) {
  let initials = (fullname=>fullname.map((n, i)=>(i==0||i==fullname.length-1)&&n[0]).filter(n=>n).join("")) 
  (nameAsString.split(" ")).toUpperCase();
  
  return initials
}

function randomColorGenerator(){
  let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  return randomColor
}
