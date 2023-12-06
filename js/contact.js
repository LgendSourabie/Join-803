let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
let contacts = [
    {
        "name": "Ibrahima Sourabie",
        "telephone": "0123456789",
        "email": "ibrahima@join803.de"
    },
    {
        "name": "Pascal Wagner",
        "telephone": "0123456789",
        "email": "pascal@join803.de"
    },
    {
        "name": "Thomas Jilge",
        "telephone": "0123456789",
        "email": "thomas@join803.de"
    },
    {
        "name": "Henrik Sorg",
        "telephone": "0123456789",
        "email": "henrik@join803.de"
    }
];

let highlightedContact;


function renderContactSection() {
    document.getElementById('render-container').innerHTML = renderContactSectionTemplate();
    renderContacts();
}


function renderContactSectionTemplate() {
    return /*html*/`
        <div class="scroll-container">
                <div class="contacts-overview-container">
                    <button class="add-new-contact" onclick="openAddContact()">Add new contact <img src="../icons/addNewContact.svg"></button>
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
    `
}


function renderContacts() {
    insertDirectory();
    insertContacts();
    // showContact();
}

function openContact(i) {
    let selectedContact = 'contact-' + i;

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
    document.getElementById('show-contact').innerHTML = '';
}

function showContact(i) {
    let name = contacts[i]['name'];
    let email = contacts[i]['email'];
    let telephone = contacts[i]['telephone'];
    document.getElementById('show-contact').innerHTML = showContactTemplate(name, email, telephone, i);
}


function showContactTemplate(name, email, telephone, i) {
    return /*html*/`
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
    `
}

function insertDirectory() {
    for (let i = 0; i < alphabet.length; i++) {
        const letter = alphabet[i];
        document.getElementById('contacts-overview').innerHTML += insertDirectoryTemplate(letter);
    }
}

function insertDirectoryTemplate(letter) {
    return /*html*/`
    <div class="contact-section d-none" id="section-${letter.toLowerCase()}">
        <span class="contact-section-letter">${letter}</span>
    </div>
`
}

function insertContacts() {
    for (let i = 0; i < contacts.length; i++) {
        let name = contacts[i]['name']
        let initialLetter = name.charAt(0).toLowerCase();
        let section = document.getElementById('section-' + initialLetter);
        // let letter = alphabet[i].toLowerCase();
        section.innerHTML += insertContactsTemmplate(i, name);
        section.classList.remove('d-none')
        // console.log('section-'+letter)
    }
}

function insertContactsTemmplate(i, name) {
    let email = contacts[i]['email']
    return /*html*/`
    <div class="contact" id="contact-${i}" onclick="openContact(${i})">
        <div class="initial-border">
            <div class="initial-overview">JD</div>
        </div>
        <div style="display: flex;flex-direction: column;">
            <span class="name">${name}</span>
            <span class="email">${email}</span>
        </div>
    </div>
`
}

function highligtContact(i) {
    id = 'contact-' + i
    highlightedContact = id
    document.getElementById(id).classList.add('highlight-contact')
}

function removeHighligtContact() {
    id = highlightedContact;
    if (highlightedContact) {
        document.getElementById(id).classList.remove('highlight-contact');
        highlightedContact = ''
    }

}


function createContact() {
    let name = document.getElementById('name-input').value
    let telephone = document.getElementById('telephone-input').value
    let email = document.getElementById('email-input').value
    console.log(contacts)
    contacts.push({ 'name': name, 'telephone': telephone, 'email': email });
    console.log(contacts);
    closeAddContact();
    // document.getElementById('main-container').innerHTML = ''
    renderContactSection();
}

function openAddContact() {
    document.getElementById('add-contact-bg').classList.remove('d-none')
}

function closeAddContact() {
    document.getElementById('add-contact-bg').classList.add('d-none')
}

function editContact(i) {
    openAddContact();
    let name = document.getElementById('name-input').value
    let telephone = document.getElementById('telephone-input').value
    let email = document.getElementById('email-input').value
    getName = document.getElementById('name-single-view').innerHTML
    getEmail = document.getElementById('email-single-view').innerHTML
    getPhone = document.getElementById('phone-single-view').innerHTML
    name = getName;
    email = getEmail;
    telephone = getPhone;
}

function deleteContact(i) {
    contacts.splice(i, 1)
    removeHighligtContact();
    renderContactSection();
}

renderContactSection()