import { LogarithmicScale } from "chart.js";
import { log } from "util";

const positionList = document.querySelectorAll(".position-list");
const levelWraps = document.querySelectorAll(".level-wrap");

window.onload = showData();
function showData() {
  let data;
  if (localStorage.getItem("userInfo")) {
    let object = localStorage.getItem("nineBoxObject");
    data = JSON.parse(JSON.parse(object));
  } else {
    let object = localStorage.getItem("nineBoxObject");
    data = JSON.parse(object);
  }
  let dataHtml = "";
  for (let key in data) {
    dataHtml += ` <ul class="tab-content-list list-level-wrapper" id ="ul-${data[key].position}">`;

    for (let level in data[key].levels) {
      let levelId = data[key].levels[level].levelId;

      dataHtml += `<li class="levels tab-view-li p-disabled" id="${levelId}"><p class="p-tab-tittle ">level ${
        parseInt(level) + 1
      }</p></li>`;
    }
    dataHtml += `</ul>`;

    for (let level in data[key].levels) {
      dataHtml += `<div class="panels-skills" id="panel-${data[key].position}-${level}">`;
      let choices = data[key].levels[level].levelChoice;
      choices.forEach((choice) => {
        dataHtml += ` <div class="input-wrap">
         <div class="checkbox-wrap">`;
        if (choice.value) {
          dataHtml += `<input type="checkbox" ${data[key].position}-${level} class="input-checkbox myCheckbox-${data[key].position}-${level}" checked>`;
          dataHtml += `</div>
          <p class="p-checkbox active">${choice.title}</p>
          </div>
          `;
        } else {
          dataHtml += `<input type="checkbox" class="input-checkbox myCheckbox-${data[key].position}-${level} ">`;
          dataHtml += `</div>
         <p class="p-checkbox">${choice.title}</p>
         </div>
         `;
        }
      });

      dataHtml += `<button class="button btn-panel " id ="btn-next-${data[key].position}-${level}">Unlock next level</button> </div>`;
    }

    let store = document.getElementById(`position-${key}`);
    store.innerHTML = dataHtml;

    dataHtml = "";
  }
}

//CATCH ALL LEVELS AND HIGHLIGHT FIRST LEVEL FOR EACH POSITION

let levelList = document.querySelectorAll(".list-level-wrapper");
let levels = document.querySelectorAll(".levels");
let panel = document.querySelectorAll(".panels-skills");
let currentLevelsArray = [];

for (let i = 0; i < panel.length; i += 9) {
  panel[i].classList.add("active");
}

//ARRAY OFF ACTIVE LEVELS
function getLevelIndex() {
  let activeLevels = [];

  levels.forEach((el, index) => {
    if (el.classList.contains("highlight")) {
      activeLevels.push(index);
    }
  });

  return activeLevels;
}

//FOR EACH ACTIVE LEVEL SHOW PANEL
function setUpActivePanelClass() {
  let indexArray = getLevelIndex();

  panel.forEach((e) => {
    e.classList.remove("active");
  });
  for (let i = 0; i < indexArray.length; i++) {
    panel[indexArray[i]].classList.add("active");
  }
}

positionList.forEach((position, index) => {
  position.addEventListener("click", (e) => {
    currentLevelsArray = getCurrentPositionLevels(position.id);
    getCurrentPositionCheckbox(`${position.id}-${index}`);

    //FOR EACH LEVEL ADD EVENT
    nine(currentLevelsArray);

    levelWraps.forEach((levelWrap) => {
      levelWrap.classList.remove("active");
    });
    let wrapPosition = document.getElementById("position-" + index);

    wrapPosition.classList.add("active");
    for (let e of positionList) {
      e.classList.remove("highlight");
    }
    e.currentTarget.classList.add("highlight");
  });
});

function nine(currentLevelsArray) {
  currentLevelsArray.forEach((level, index) => {
    level.addEventListener("click", (e) => {
      for (let i = 0; i < currentLevelsArray.length; i++) {
        currentLevelsArray[i].classList.remove("highlight");
      }
      level.classList.add("highlight");

      setUpActivePanelClass();
    });
  });
}

currentLevelsArray = getCurrentPositionLevels("frontend");

nine(currentLevelsArray);

let unlockLockBtn = document.querySelectorAll(".btn-panel");
unlockLockBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    currentLevelsArray.forEach((el, index) => {
      if (el.classList.contains("highlight")) {
        if (currentLevelsArray[index + 1].classList.contains("p-disabled")) {
          btn.innerHTML = "Lock next level";
          currentLevelsArray[index + 1].classList.remove("p-disabled");
        } else {
          btn.innerHTML = "Unlock next level";
          for (let i = index + 1; i < currentLevelsArray.length; i++) {
            currentLevelsArray[i].classList.add("p-disabled");
          }
        }
        return;
      }
    });
  });
});

levelList.forEach((el) => {
  el.firstChild.classList.remove("p-disabled");
  el.firstChild.classList.add("highlight");
});

//POSITION LEVEL
function getCurrentPositionLevels(position) {
  let array = [];
  let wrapPosition = document.getElementById("ul-" + position);
  array = Array.from(wrapPosition.children);
  return array;
}

function getCurrentPositionCheckbox(name) {
  let checkbox = document.getElementById("panel-" + name);
}

let checkbox = document.querySelectorAll(".input-checkbox");

checkbox.forEach((box) => {
  box.addEventListener("change", (e) => {
    let boxClass = e.target.classList[1];

    let arrayCheckbox = document.querySelectorAll(`.${boxClass}`);

    if (e.target.checked) {
      box.parentElement.nextElementSibling.classList.add("active");
      box.classList.add("checked");
    } else {
      box.parentElement.nextElementSibling.classList.remove("active");
      box.classList.remove("checked");
    }
    let count = 0;
    arrayCheckbox.forEach((el) => {
      if (el.classList.contains("checked")) {
        count += 1;
      }
    });
    const catchingLevel = Array.from(
      box.parentElement.parentElement.parentElement.parentElement
        .firstElementChild.children
    );

    let catchingBtn =
      box.parentElement.parentElement.parentElement.lastElementChild;

    if (count === arrayCheckbox.length) {
      catchingBtn.innerHTML = "Lock next level";
      catchingBtn.classList.add("p-disabled");

      for (let i = 0; i < catchingLevel.length - 1; i++) {
        if (catchingLevel[i].classList.contains("highlight")) {
          catchingLevel[i + 1].classList.remove("p-disabled");
          return;
        }
      }
    } else {
      catchingBtn.classList.remove("p-disabled");
    }
  });
});
