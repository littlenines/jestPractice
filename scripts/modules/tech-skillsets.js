let positionTabs = Array.from(
  document.querySelectorAll(`.position-input-wrapper`)
);
let object;
if (localStorage.getItem("userInfo")) {
  let data = localStorage.getItem("techObject");
  object = JSON.parse(JSON.parse(data));
} else {
  let data = localStorage.getItem("techObject");
  object = JSON.parse(data);
}

function printData(object) {
  let i = 0;

  for (let position in object) {
    data = "";

    for (let skill in object[position]) {
      data += `<div class="input-container">
          <p class="field-title">${skill}</p>
          <div class="input-field">
              <input type="number" min="0" value="${object[position][skill]}" class="skill-input ${position}">
              <div class="input-arrow">
                  <span><i class="fas fa-chevron-down"></i></span>
              </div>
          </div>
          <div class="dropdown-wrapper">
              <ul class="dropdown-list">
                  <li class="dropdown-list-item">0</li>
                  <li class="dropdown-list-item">1</li>
                  <li class="dropdown-list-item">2</li>
                  <li class="dropdown-list-item">3</li>
                  <li class="dropdown-list-item">4</li>
                  <li class="dropdown-list-item">5</li>
              </ul>
          </div>
      </div>`;
    }

    positionTabs[i].innerHTML = data;
    i++;
  }
}

printData(object);

let tabViewLi = Array.from(document.querySelectorAll(`.catch-list-item`));
let inputWrappers = Array.from(
  document.querySelectorAll(`.position-input-wrapper`)
);
let dropdownWrappers = Array.from(
  document.querySelectorAll(`.dropdown-wrapper`)
);
let inputField = Array.from(document.querySelectorAll(`.input-field`));
let dropdownGradeItems = Array.from(
  document.querySelectorAll(`.dropdown-list-item`)
);

tabViewLi[0].classList.add(`highlight`);
inputWrappers[0].classList.remove(`wrapper-invisible`);

tabViewLi.forEach((element, index) => {
  element.addEventListener(`click`, (e) => {
    for (let i = 0; i < tabViewLi.length; i++) {
      tabViewLi[i].classList.remove(`highlight`);
    }
    e.target.classList.add(`highlight`);
    for (let i = 0; i < inputWrappers.length; i++) {
      if (inputWrappers[i].classList.contains(`wrapper-invisible`)) {
      } else {
        inputWrappers[i].classList.add(`wrapper-invisible`);
      }
    }
    inputWrappers[index].classList.remove(`wrapper-invisible`);
  });
});

inputField.forEach((element) => {
  element.addEventListener(`click`, (e) => {
    if (
      e.target.nextElementSibling.classList.contains(`dropdown-grades-opened`)
    ) {
      for (let i = 0; i < dropdownWrappers.length; i++) {
        dropdownWrappers[i].classList.remove(`dropdown-grades-opened`);
      }
    } else {
      for (let i = 0; i < dropdownWrappers.length; i++) {
        dropdownWrappers[i].classList.remove(`dropdown-grades-opened`);
      }
      e.target.nextElementSibling.classList.toggle(`dropdown-grades-opened`);
    }
  });
});

document.body.addEventListener(`click`, (e) => {
  if (!e.target.classList.contains(`input-field`)) {
    for (let i = 0; i < dropdownWrappers.length; i++) {
      dropdownWrappers[i].classList.remove(`dropdown-grades-opened`);
    }
  }
});

dropdownGradeItems.forEach((element) => {
  if (element.textContent == 0) {
    element.classList.add(`grade-clicked`);
  }
  element.addEventListener(`click`, () => {
    updatingInputText(element);
    updatingGradeClass(element);
  });
});

function updatingInputText(clickedElement) {
  let inputSiblingOfClicked =
    clickedElement.parentElement.parentElement.previousElementSibling
      .firstElementChild;
  inputSiblingOfClicked.value = clickedElement.textContent;
  clickedElement.parentElement.parentElement.classList.toggle(
    "dropdown-grades-opened"
  );
}

function updatingGradeClass(clickedElement) {
  let allLiElements = Array.from(clickedElement.parentNode.children);
  for (let i = 0; i < allLiElements.length; i++) {
    allLiElements[i].classList.remove("grade-clicked");
  }
  clickedElement.classList.add(`grade-clicked`);
}
