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
  },
  {
    name: "Pascal Wagner",
    telephone: "0123456789",
    email: "pascal@join803.de",
  },
  {
    name: "Thomas Jilge",
    telephone: "0123456789",
    email: "thomas@join803.de",
  },
  {
    name: "Henrik Sorg",
    telephone: "0123456789",
    email: "henrik@join803.de",
  },
];

let highlightedContact;

let edit = false;
let contactIndex = -1;

function renderContactSection() {
  document.getElementById("render-container").innerHTML =
    renderContactSectionTemplate();
  renderContacts();
}

function renderContactSectionTemplate() {
  return /*html*/ `
        <div class="scroll-container">
                <div class="contacts-overview-container">
                    <button class="add-new-contact" onclick="renderAddContact()">Add new contact<img src="../icons/addNewContact.svg"></button>
                    <div id="contacts-overview">
                    </div>
                </div>
            </div>
            <div class="contact-single-view">
                <div class="contacts-headline">
                    <h2>Contacts</h2><span>Better with a team</span>
                </div>
                <div class="contact-single-view-info" id="show-contact">
                    
                </div>

                <!-- <div class="show-contact">

                </div> -->
            </div>
    `;
}

function renderContacts() {
  insertDirectory();
  insertContacts();
  // showContact();
}

function openContact(i) {
  let selectedContact = "contact-" + i;

  if (selectedContact == highlightedContact) {
    hideContact();
    removeHighligtContact(i);
  }else{
    removeHighligtContact(i);
    showContact(i);
    highligtContact(i);
  }
}

function hideContact() {
  document.getElementById("show-contact").innerHTML = "";
}

function showContact(i) {
  
  let name = contacts[i]["name"];
  let email = contacts[i]["email"];
  let telephone = contacts[i]["telephone"];
  document.getElementById("show-contact").innerHTML = showContactTemplate(
    name,
    email,
    telephone,
    i
  );
}

function showContactTemplate(name, email, telephone, i) {
  return /*html*/ `
        <div>
            <div class="initial-name-container">
                <div class="initial-single-view">JD</div>
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
    // let letter = alphabet[i].toLowerCase();
    section.innerHTML += insertContactsTemmplate(i, name);
    section.classList.remove("d-none");
    // console.log('section-'+letter)
  }
}

function insertContactsTemmplate(i, name) {
  let email = contacts[i]["email"];
  return /*html*/ `
    <div class="contact" id="contact-${i}" onclick="openContact(${i})">
        <div class="initial-border">
            <div class="initial-overview">JD</div>
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

function setHighligtContact(){
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
  createOrEditContact(name, telephone, email);
  setEditToFalse();
}

function createOrEditContact(name, telephone, email){

  if (contactIndex != -1){
    editExistingContact(name, telephone, email);
  }else{
    createNewContact(name, telephone, email)
  }
  debugger
  closeAddContact();
  renderContactSection();
  i = highlightedContact.slice(-1);
  setHighligtContact();
  showContact(i);
}

function createNewContact(name, telephone, email){
  contacts.push({ name: name, telephone: telephone, email: email });
  lastIndex = contacts.length - 1;
  highlightedContact = 'contact-' + lastIndex;
}

function editExistingContact(name, telephone, email){
  contacts.splice(contactIndex, 1, { name: name, telephone: telephone, email: email });
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

function addAndEditTemplate() {
  return /*html*/ `
        <div id="add-contact">
            <div class="add-contact-slogan">
                <img src="../icons/logo.svg" alt="logo">
                <h2 id="headline-add-edit"></h2>
                <p id="subheadline-add-edit"></p>
            </div>
            <div class="add-contact-data">
                <img src="../icons/profileImageContacts.svg" alt="telephone-icon">
                <form onsubmit="createContact()">
                    <div class="d-flex"><input type="text" minlength="2"  placeholder="Name" class="add-contact-input" id="name-input" required><img src="../icons/name.svg" alt="telephone-icon"></div>
                    <div class="d-flex"><input type="email" placeholder="Email" class="add-contact-input" id="email-input" required><img src="../icons/email.svg" alt="telephone-icon"></div>
                    <div class="d-flex">
                        <input 
                            type="number" 
                            minlength="4" 
                            placeholder="Phone" 
                            class="add-contact-input" 
                            id="telephone-input" 
                            required>
                        <img src="../icons/telephone.svg" alt="telephone-icon">
                    </div>
                    <div class="d-flex">
                        <button type="button" class="cancel-contact-button" onclick="closeAddContact()">Cancel</button>
                        <button type="submit" class="create-contact-button" id="button-add-edit"></button> 
                    </div>
                </form>
            </div>
        </div>
    `;
}



function insertContentAddEdit(addOrEdit) {
  headline = document.getElementById("headline-add-edit");
  subheadline = document.getElementById("subheadline-add-edit");
  button = document.getElementById("button-add-edit");
  if (addOrEdit == "add") {
    ContentAddContact(headline, subheadline, button);
  } else {
    ContentEditContact(headline, subheadline, button);
  }
}

function ContentAddContact(headline, subheadline, button) {
  headline.innerHTML = "Add Contact";
  subheadline.innerHTML = "Tasks are better with a team!";
  button.innerHTML = "Create Contact";
}

function ContentEditContact(headline, subheadline, button) {
  headline.innerHTML = "Edit Contact";
  subheadline.innerHTML = "";
  button.innerHTML = "Edit Contact";
}

function closeAddContact() {
  document.getElementById("add-contact-bg").classList.add("d-none");
  event.preventDefault();
  setEditToFalse();
}

function editContact(i) {
  // setEditToTrue();
  saveContactIndex(i);
  openAddContact();
  insertContentAddEdit("edit");
  getInputValueContact();
  // openContact();
}

function saveContactIndex(i){
  contactIndex = i;
}

// function setEditToTrue(){
//   edit = true;
// }

function setEditToFalse(){
  contactIndex = -1;
}

function getInputValueContact() {
  getName = document.getElementById("name-single-view").innerHTML;
  getEmail = document.getElementById("email-single-view").innerHTML;
  getPhone = document.getElementById("phone-single-view").innerHTML;
  document.getElementById("name-input").value = getName.trim();
  document.getElementById("telephone-input").value = getPhone.trim();
  document.getElementById("email-input").value = getEmail.trim();
}

function deleteContact(i) {
  contacts.splice(i, 1);
  removeHighligtContact();
  renderContactSection();
}

renderContactSection();
