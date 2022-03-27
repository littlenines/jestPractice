import { userListUrl } from "./variables";
export default function (sheet, objectCreation) {
  const submit = document.querySelector("[data-submit]");
  const date = new Date();

  const todayDate = date.toLocaleDateString("en-GB");

  const positions = [
    "frontend",
    "backend",
    "qa",
    "devops",
    "design",
    "mobile",
    "others",
  ];
  let newObject = {};

  function creatingProperty(positionName) {
    newObject[positionName] = {};
    let skillClass = document.querySelectorAll(`.${positionName}`);
    skillClass.forEach((element) => {
      let fieldTitle =
        element.parentElement.previousElementSibling.firstChild.textContent;
      newObject[positionName][fieldTitle] = parseInt(element.value);
    });
  }

  function creatingObject() {
    for (let position in positions) {
      creatingProperty(positions[position]);
    }
    return newObject;
  }

  let skillsObjectArray = [
    "frontend",
    "backend",
    "qa",
    "devops",
    "design",
    "mobile",
  ];
  let shortCutLevelId = ["fe", "be", "qa", "dev", "des", "mob"];

  let newArrayOfObject = [];
  function createObjectSkills() {
    for (let i = 0; i < skillsObjectArray.length; i++) {
      let objectSkills = {};
      objectSkills.position = skillsObjectArray[i];
      objectSkills.levels = [];
      for (let j = 0; j < 9; j++) {
        let levelObject = {};
        levelObject.levelId = `${shortCutLevelId[i]}-level-${j}`;
        levelObject.levelChoice = [];

        let arrayCheckbox = document.querySelectorAll(
          `.myCheckbox-${skillsObjectArray[i]}-${j}`
        );

        arrayCheckbox.forEach((box) => {
          let levelSkillObj = {};
          levelSkillObj.title =
            box.parentElement.nextElementSibling.textContent;
          if (box.classList.contains("checked")) {
            levelSkillObj.value = true;
          } else {
            levelSkillObj.value = false;
          }

          levelObject.levelChoice.push(levelSkillObj);
        });

        objectSkills.levels.push(levelObject);
      }

      newArrayOfObject.push(objectSkills);
    }

    return newArrayOfObject;
  }
  function setUser() {
    var username = document.querySelector("[data-name]").value;
    var employeeId = document.querySelector("[data-id]").value;
    var seniority = document
      .querySelector("[data-seniorty-input]")
      .value.trim();
    var position = document.querySelector("[data-position-input]").value.trim();
    var nineBox = document.querySelector("[data-nine-box-input]").value.trim();
    var comment = document.querySelector("[data-comment]").value.trim();
    sheet.addRow({
      userInfo: JSON.stringify({
        name: username,
        employeeId: employeeId,
        seniority: seniority,
        position: position,
        nineBox: nineBox,
        comment: comment,
        date: todayDate,
      }),
      techSkillset: JSON.stringify(creatingObject()),
      nineBox: JSON.stringify(createObjectSkills()),
    });
  }
  submit.addEventListener("click", (e) => {
    setUser();
    setTimeout(() => {
      window.location.replace(userListUrl);
    }, 500);
  });
}
