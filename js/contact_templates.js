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
          <div id="open-menu-contact-responsive"><button class="responsiv-contact-button" onclick="openMenuContactResponsive(${i})"><img src="../icons/three_points.svg" alt=""></button></div>
          <div id="close-menu-contact-responsive" class="d-none" onclick="closeMenuContactResponsive(${i})"></div>
      `;
  }


function openMenuContactResponsiveTemplate(i){
    return /*html*/`
  <div id="open-menu-contact-responsive-edit-delete">
    <div onclick="editContact(${i})"><img src="../icons/editContact.svg">Edit</div>
    <div onclick="deleteContact(${i}, true)"><img src="../icons/delete.svg">Delete</div>
  </div>
`
}


function closeMenuContactResponsiveTemplate(i){
    return /*html*/`
        <div id="open-menu-contact-responsive">
            <button class="responsiv-contact-button" onclick="openMenuContactResponsive(${i})">
                <img src="../icons/three_points.svg" alt="">
            </button>
        </div>
    `
}  


function insertDirectoryTemplate(letter) {
    return /*html*/ `
      <div class="contact-section d-none" id="section-${letter.toLowerCase()}">
          <span class="contact-section-letter">${letter}</span>
      </div>
  `;
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
  

function initialsTemplate(bg) {
    return /*html*/`
    <div id="initial-edit-contact" style="background: ${bg}">HS</div>
  `
  }
  

function addAndEditTemplate() {
    return /*html*/ `
    <div id="fly-in-container" class="">
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
                <form class="add-contact-data-inputs"  onsubmit="createContact()" action="#">
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
                  <div class="buttons-create-contact d-flex">
                    <button type="button" class="cancel-contact-button" onclick="closeAddContact()">Cancel</button>
                    <button type="submit" class="create-contact-button" id="button-add-edit"></button> 
                  </div>
                </form>
          </div>
        </div>
    </div>
      `;
  }


  function showContactResponsivTemplate(jsonIndex){
    return /*html*/`
      <div class="contact-single-view" id="contact-single-view">
        <div class="d-flex justify-content-between align-items-start w-100">
          <div class="contacts-headline">
            <h2>Contacts</h2>
            <span>Better with a team</span>
            <div class="border-responsive-single"></div>
          </div>
          <img 
            src="../icons/arrow-left-line.svg" 
            class="arrow-back-contacts d-none" 
            alt="back" 
            onclick="closeContactResponsiv(${jsonIndex});">
        </div>
        <div class="contact-single-view-info" id="new-contact"> 
      </div>
      <div id="add-contact-bg" class="d-none"></div>
    `;
    
  }