let alphabet = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',  'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ]

function renderContacts(){
    insertDirectory();
    insertContacts();
}

function insertDirectory(){
    for (let i = 0; i < alphabet.length; i++) {
        const letter = alphabet[i];
        document.getElementById('contacts-overview').innerHTML += insertDirectoryTemplate(letter);
    }
}

function insertDirectoryTemplate(letter){
return /*html*/`
    <div class="contact-section" id="section-${letter.toLowerCase()}">
        <span class="contact-section-letter">${letter}</span>
    </div>
`
}

function insertContacts(){
    for (let i = 0; i < alphabet.length; i++) {
        let letter = alphabet[i].toLowerCase();
        document.getElementById('section-'+letter).innerHTML += insertContactsTemmplate(i);
        // console.log('section-'+letter)
    }
    
}

function insertContactsTemmplate(i){
return /*html*/`
    <div class="contact" id="contact-${i}" onclick="highligtContact(${i})">
        <div class="initial-border"><div class="initial">JD</div></div>
        <div style="display: flex;flex-direction: column;">
            <span class="name">John Doe</span>
            <span class="email">email@email1234.com</span>
        </div>
    </div>
`
}

function highligtContact(i){
    id = 'contact-' + i
    document.getElementById(id).classList.add('highlight-contact')
}

renderContacts();