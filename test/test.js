let listeOptions = [
    {
      name: "Ibrahima Sourabie",
      telephone: "0123456789",
      email: "ibrahima@join803.de",
      initials: "IS",
      bgColor: "#298c2b",
    },
    {
      name: "Pascal Wagner",
      telephone: "0123456789",
      email: "pascal@join803.de",
      initials: "PW",
      bgColor: "#cb636e",
    },
    {
      name: "Thomas Jilge",
      telephone: "0123456789",
      email: "thomas@join803.de",
      initials: "TJ",
      bgColor: "#ae3ad5",
    },
    {
      name: "Henrik Sorg",
      telephone: "0123456789",
      email: "henrik@join803.de",
      initials: "HS",
      bgColor: "#50e04c",
    },
  ];
  let btns = [];
  
  function options() {
    let field = document.getElementById("options");
    let listeOption = listeOptions.map((a) => a["name"]);
    field.innerHTML = "";
    for (let i = 0; i < listeOption.length; i++) {
      const option = listeOption[i];
      field.innerHTML += /*html*/ `
      <div class="option" id="cont${i}" onclick="updateBtn(${i});changeCheckState(${i})">
      <button id="btn-${i}" class="bi">BI</button> 
        <span id="name${i}">${option}</span> 
      <img id="checkBox${i}" src="./checkBox.svg" alt="">
    </div>
      `;
    }
  }
  
  function showOptions(id, className) {
    document.getElementById(id).classList.toggle(className);
  }
  
  function changeCheckState(index) {
    let field = document.getElementById(`checkBox${index}`);
    let currentState = field.getAttribute("src");
    
    if (currentState ===("./checkBox.svg")) {
      field.setAttribute("src", "./Check_button-white.svg");
    } 
    else {
      field.setAttribute("src", "./checkBox.svg");
    };

  }
  
  function updateBtn(index) {
    let btnUserProfile = document.getElementById("btn-grp");
    let initial = document.getElementById(`btn-${index}`).innerHTML;
    let namePerson = document.getElementById(`name${index}`).innerHTML;
  
    let existingIndex = btns.findIndex((btn) => btn.name === namePerson);
    if (existingIndex !== -1) {
      btns.splice(existingIndex, 1);
      showOptions(`cont${index}`, "newColor");
    } else {
      btns.push({ initial: initial, name: namePerson });
      showOptions(`cont${index}`, "newColor");
    }
    renderBtn();
  }

  const renderBtn = function () {
    let btnUserProfile = document.getElementById("btn-grp");
    btnUserProfile.innerHTML = "";
    for (let i = 0; i < btns.length; i++) {
      const btn = btns[i];
      btnUserProfile.innerHTML += `<button id="optBtn${i}"  class="btn-grp">${btn.initial}</button>`;
    }
  };
  
