import { log } from "util";
import spreadSheet from "./sheetDb";
import { logInUrl } from "./variables";

if (sessionStorage.getItem("token")) {
  const textArea = document.querySelector("[data-comment]");
  let dropdownGrades = Array.from(
    document.querySelectorAll(`.dropdown-wrapper`)
  );
  let dataUserInfo = document.querySelectorAll("[data-user-info]");
  let inputWrapField = document.querySelectorAll(".input-wrap-field");

  textArea.setAttribute("style", "height:" + textArea.scrollHeight + "px;");

  function OnInput() {
    this.style.height = this.scrollHeight + "px";
  }

  textArea.addEventListener("input", OnInput);

  if (localStorage.getItem("userInfo")) {
    let userObject = JSON.parse(localStorage.getItem("userInfo"));

    document.querySelector("[data-name]").value = userObject.name;
    document.querySelector("[data-id]").value = userObject.employeeId;
    document.querySelector("[data-seniorty-input]").value =
      userObject.seniority;
    document.querySelector("[data-position-input]").value = userObject.position;
    document.querySelector("[data-nine-box-input]").value = userObject.nineBox;
    document.querySelector("[data-comment]").value = userObject.comment;
  }

  dataUserInfo.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.classList.remove(
        `dropdown-grades-active`
      );
    });
  });

  inputWrapField.forEach((element) => {
    element.addEventListener(`click`, (e) => {
      if (
        e.target.nextElementSibling.classList.contains(`dropdown-grades-active`)
      ) {
        for (let i = 0; i < inputWrapField.length; i++) {
          dropdownGrades[i].classList.remove(`dropdown-grades-active`);
        }
      } else {
        for (let i = 0; i < inputWrapField.length; i++) {
          dropdownGrades[i].classList.remove(`dropdown-grades-active`);
        }
        e.target.nextElementSibling.classList.toggle(`dropdown-grades-active`);
      }
    });
  });

  document.body.addEventListener(`click`, (e) => {
    if (!e.target.classList.contains(`input-wrap-field`)) {
      for (let i = 0; i < dropdownGrades.length; i++) {
        dropdownGrades[i].classList.remove(`dropdown-grades-active`);
      }
    }
  });
} else {
  window.location.replace(logInUrl);
}
