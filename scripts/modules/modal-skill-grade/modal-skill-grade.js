export default function skillGrades(skillGradeArray) {
  function createTable() {
    var section = document.createElement("section");
    var table = document.createElement("table");
    var tableRow = document.createElement("tr");
    var tableThOne = document.createElement("th");
    var tableThTwo = document.createElement("th");
    var iconOne = document.createElement("i");
    var iconTwo = document.createElement("i");
    var tBody = document.createElement("tbody");
    tableThOne.innerHTML = "Skill";
    tableThTwo.innerHTML = "Grade";

    section.className = "modal-wrapper";
    table.id = "skills-grade-table";
    tableThOne.className = "sortColumn";
    tableThTwo.className = "sortColumn";
    iconOne.className = "fas fa-exchange-alt arrowDefault";
    iconTwo.className = "fas fa-exchange-alt arrowDefault";
    tBody.id = "tBody";

    tableThOne.addEventListener("click", (e) => {
      console.log("modalSkillGrade");
      sortTable(e);
    });

    tableThTwo.addEventListener("click", (e) => {
      sortTable(e);
    });

    section.appendChild(table);
    table.appendChild(tableRow);
    table.appendChild(tBody);
    tableRow.appendChild(tableThOne);
    tableRow.appendChild(tableThTwo);
    tableThOne.appendChild(iconOne);
    tableThTwo.appendChild(iconTwo);

    return section;
  }

  var tableSection = createTable();
  var tBody = tableSection.firstChild.lastChild;

  populateTechnologiesSkills(skillGradeArray, tBody);

  function populateTechnologiesSkills(skillGradeArray, tBody) {
    skillGradeArray.forEach((element) => {
      addRowToTable(element.skill, element.grade, tBody);
    });
  }

  let compareBySkill = function (techGradeA, techGradeB) {
    if (techGradeA.skill.toLowerCase() < techGradeB.skill.toLowerCase()) {
      return -1;
    }
    if (techGradeA.skill.toLowerCase() > techGradeB.skill.toLowerCase()) {
      return 1;
    }
    return 0;
  };

  let compareByGrade = function (grade1, grade2) {
    if (grade1.grade < grade2.grade) {
      return -1;
    }
    if (grade1.grade > grade2.grade) {
      return 1;
    }
    return 0;
  };

  function sortTable(arg) {
    let iconInHtml = arg.target.lastChild;

    iconInHtml.className = getclassName(iconInHtml.className);

    var sortDirection = iconInHtml.className.includes("up") ? "up" : "down";

    if (arg.target.innerHTML.includes("Skill")) {
      let sortedArray = sortBySkill(skillGradeArray, sortDirection);
      refreshTable(sortedArray); // refresh data with new data.
    } else {
      let sortedArray = sortByGrade(skillGradeArray, sortDirection);
      refreshTable(sortedArray);
    }
  }

  function refreshTable(skillGradeArray) {
    var tBody = document.getElementById("tBody");
    var rows = tBody.children;

    for (i = 0; i < rows.length; i++) {
      var tdSkill = rows[i].children[0];
      var tdGrade = rows[i].children[1];
      tdSkill.innerHTML = skillGradeArray[i].skill;
      tdGrade.innerHTML = skillGradeArray[i].grade;
    }
  }

  //ONCLICK - Sort direction - grade
  function sortByGrade(skillGradeArray, sortDirection) {
    if (sortDirection.includes("up")) {
      return skillGradeArray.sort(compareByGrade).reverse();
    }
    return skillGradeArray.sort(compareByGrade);
  }

  function sortBySkill(skillGradeArray, sortDirection) {
    if (sortDirection.includes("up")) {
      return skillGradeArray.sort(compareBySkill).reverse();
    }
    return skillGradeArray.sort(compareBySkill);
  }

  function getclassName(iconClassName) {
    if ("fas fa-exchange-alt arrowDefault" == iconClassName) {
      return "far fa-sort-amount-up";
    } else if ("far fa-sort-amount-up" == iconClassName) {
      return "far fa-sort-amount-down";
    } else if ("far fa-sort-amount-down" == iconClassName) {
      return "far fa-sort-amount-up";
    }
  }

  function addSortClickListeners() {
    let elems = document.getElementsByClassName("sortColumn");

    for (i = 0; i < elems.length; i++) {
      elems[i].addEventListener("click", (arg) => sortTable(arg));
    }
  }

  function addRowToTable(skill, grade, tBody) {
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var tdGrade = document.createElement("td");

    tBody.appendChild(tr);
    tr.appendChild(td);
    tr.appendChild(tdGrade);

    td.textContent = skill;
    tdGrade.textContent = grade;
  }
  return tableSection;
}
