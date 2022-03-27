import spreadSheet from "./sheetDb";
import skillGrades from "../modules/modal-skill-grade/modal-skill-grade";
import { positionSkills } from "./techObject";
import { nineBoxObject } from "./nineBoxObject";
import { chartsUrl, addUserUrl, logInUrl } from "./variables";

async function postingData() {
  if (sessionStorage.getItem("token")) {
    localStorage.setItem("techObject", JSON.stringify(positionSkills));
    localStorage.removeItem("userInfo");
    localStorage.setItem("nineBoxObject", JSON.stringify(nineBoxObject));

    const data = await spreadSheet;
    const userData = [];
    for (let i = 0; i < data[1].length; i++) {
      userData.push(JSON.parse(data[1][i].userInfo));
    }
    const searchInput = document.querySelector("[data-search]");
    const searchMobile = document.querySelector("[data-user-search]");
    const btnNewEmployee = document.getElementById("btn-new-employee");
    const btnViewCharts = document.getElementById("btn-view-charts");

    loadData = (userData) => {
      let user = document.getElementById("user");
      let dataHtml = "";
      for (let person of userData) {
        dataHtml += `<div class="user-wrraper">
      <div id=${person.employeeId} class="user-name">
      <div class="name">${person.name}</div>
      <div id="open-more-${person.employeeId}" class="active open-more">&rsaquo;</div>
      <div id="close-more-${person.employeeId}" class="close-more">&rsaquo;</div>
      </div>`;
        dataHtml += ` <div id="user-data-${person.employeeId}" class="user-data">
      <div class="button-edit-delete-section">
      <button class="btn mobile-edit-button">&#9998;</button>
      <button id="btn-delete-${person.employeeId}" class="btn delete-button">&#9866;</button></div>`;
        let keysArray = [
          "employeeId",
          "position",
          "seniority",
          "nineBox",
          "date",
        ];
        for (let key of Object.keys(person)) {
          for (let i = 0; i < keysArray.length; i++) {
            if (key === keysArray[i]) {
              dataHtml += `<div class="user-data-item">
            <div class="key">${key}:</div>
            <div class="value">${person[key]}</div></div>`;
            }
          }
        }
        dataHtml += `<div class="button-position-section">
      <button class="btn border frontend skill-grade-btn">FE</button>
      <button class="btn border backend skill-grade-btn">BE</button>
      <button class="btn border qa skill-grade-btn">QA</button>
      <button class="btn border devops skill-grade-btn">DO</button>
      <button class="btn border design skill-grade-btn">DE</button>
      <button class="btn border mobile skill-grade-btn">MB</button>
      </div></div></div>`;
      }
      user.innerHTML = dataHtml;

      const users = document.querySelectorAll(".user-name");
      users.forEach((user) => {
        user.addEventListener("click", (e) => {
          let item = document.getElementById("user-data-" + e.target.id);
          item.classList.toggle("show-user");
          document
            .getElementById("open-more-" + e.target.id)
            .classList.toggle("active");
          document
            .getElementById("close-more-" + e.target.id)
            .classList.toggle("active");
        });
      });

      const btnDeleteUsers = document.querySelectorAll(".delete-button");
      btnDeleteUsers.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          let userId =
            btn.parentElement.parentElement.parentElement.firstElementChild.id;

          userData.forEach((user, index) => {
            if (user.employeeId === userId) {
              let deleteUser = data[1][index];
              deleteUser.delete();
            }
          });

          let userIndex = userData.findIndex((x) => x.employeeId === userId);
          userData.splice(userIndex, 1);

          loadData(userData);
          loadTableData(userData);
        });
      });

      const btnModal = document.querySelectorAll(".skill-grade-btn");
      btnModal.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          let catchingClass = btn.classList[2];
          let userId =
            btn.parentElement.parentElement.parentElement.firstElementChild.id;
          userData.forEach((user, index) => {
            if (user.employeeId === userId) {
              let user = JSON.parse(data[1][index].techSkillset)[catchingClass];
              showModal(user);
            }
          });
        });
      });

      const editBtnMobile = document.querySelectorAll(".mobile-edit-button");
      editBtnMobile.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          console.log("klik");
          let userId =
            btn.parentElement.parentElement.parentElement.firstElementChild.id;
          console.log(userId);
          userData.forEach((user, index) => {
            if (user.employeeId === userId) {
              let editUser = data[1][index];
              window.location.replace(addUserUrl);
              localStorage.setItem("userInfo", editUser.userInfo);
              localStorage.removeItem("techObject");
              localStorage.setItem(
                "techObject",
                JSON.stringify(editUser.techSkillset)
              );
              localStorage.removeItem("nineBoxObject");
              localStorage.setItem(
                "nineBoxObject",
                JSON.stringify(editUser.nineBox)
              );

              editUser.delete();
            }
          });
        });
      });
    };

    function showModal(objectF) {
      let modalId = document.getElementById("modalId");
      modalId.classList.toggle("active");
      var skill = [];
      for (let key in objectF) {
        let skillModal = {};
        skillModal.skill = key;
        skillModal.grade = objectF[key];
        skill.push(skillModal);
      }
      let table = skillGrades(skill);
      modalId.innerHTML = "";
      modalId.appendChild(table);
    }

    function outsideClick() {
      let modalId = document.getElementById("modalId");
      modalId.addEventListener("click", (e) => {
        if (e.target.id !== "modalId") {
          return;
        }
        e.target.classList.remove("active");
      });
    }
    outsideClick();

    loadTableData = (userData) => {
      let tableBody = document.getElementById("tableData");
      let dataHtml = "";
      for (let person of userData) {
        dataHtml += `<tr>
        <td>${person.employeeId}</td>
        <td><p data-before="${person.comment}" class="hover-name">${person.name}</p></td>
        <td>${person.position}</td>
        <td>${person.seniority}</td>
        <td>${person.nineBox}</td>
        <td>${person.date}</td>
        <td class="button-row">
          <button class="btn border frontend desk-skill-grade-btn">FE</button>
          <button class="btn border backend desk-skill-grade-btn">BE</button>
          <button class="btn border qa desk-skill-grade-btn">QA</button>
          <button class="btn border devops desk-skill-grade-btn">DO</button>
          <button class="btn border design desk-skill-grade-btn">DE</button>
          <button class="btn border mobile desk-skill-grade-btn">MB</button>
          <button class="btn edit-button">&#9998;</button>
          <button class="btn desktop-delete-button">&#9747;</button>
        </td>
      </tr>`;
      }
      tableBody.innerHTML = dataHtml;

      const deskBtnDelete = document.querySelectorAll(".desktop-delete-button");
      deskBtnDelete.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          let userId =
            e.target.parentElement.parentElement.firstElementChild.textContent;

          userData.forEach((user, index) => {
            if (user.employeeId === userId) {
              let deleteUser = data[1][index];
              deleteUser.delete();
            }
          });

          let userIndex = userData.findIndex((x) => x.employeeId == userId);
          userData.splice(userIndex, 1);

          loadTableData(userData);
          loadData(userData);
        });
      });

      const btnModal = document.querySelectorAll(".desk-skill-grade-btn");
      btnModal.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          let catchingClass = btn.classList[2];
          let userId =
            e.target.parentElement.parentElement.firstElementChild.textContent;
          userData.forEach((user, index) => {
            if (user.employeeId === userId) {
              let user = JSON.parse(data[1][index].techSkillset)[catchingClass];
              showModal(user);
            }
          });
        });
      });

      const editBtn = document.querySelectorAll(".edit-button");
      editBtn.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          let userId =
            e.target.parentElement.parentElement.firstElementChild.textContent;
          userData.forEach((user, index) => {
            if (user.employeeId === userId) {
              let editUser = data[1][index];
              window.location.replace(addUserUrl);
              localStorage.setItem("userInfo", editUser.userInfo);
              localStorage.removeItem("techObject");
              localStorage.setItem(
                "techObject",
                JSON.stringify(editUser.techSkillset)
              );
              localStorage.removeItem("nineBoxObject");
              localStorage.setItem(
                "nineBoxObject",
                JSON.stringify(editUser.nineBox)
              );

              editUser.delete();
            }
          });
        });
      });
    };

    sortTableByColumn = (table, column, asc) => {
      const dirModifier = asc ? 1 : -1;
      const tBody = table.tBodies[0];
      const rows = Array.from(tBody.querySelectorAll("tr"));

      const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(
          `td:nth-child(${column + 1})`
        ).textContent;
        const bColText = b.querySelector(
          `td:nth-child(${column + 1})`
        ).textContent;

        if (column === 0 || column === 4) {
          let tempA = parseInt(aColText);
          let tempB = parseInt(bColText);
          return tempA > tempB ? 1 * dirModifier : -1 * dirModifier;
        }

        return aColText > bColText ? 1 * dirModifier : -1 * dirModifier;
      });
      //Remove all existing TRs from the table
      while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
      }
      //Re-add the newly sorted rows
      tBody.append(...sortedRows);

      //Remember how the column is currently sorted
      table
        .querySelectorAll("th")
        .forEach((th) => th.classList.remove("th-sort-asc", "th-sort-desc"));
      table
        .querySelector(`th:nth-child(${column + 1})`)
        .classList.toggle("th-sort-asc", asc);
      table
        .querySelector(`th:nth-child(${column + 1})`)
        .classList.toggle("th-sort-desc", !asc);
    };

    document.querySelectorAll(".table-sortable th").forEach((headerCell) => {
      headerCell.addEventListener("click", () => {
        document.querySelectorAll(".table-sortable th").forEach((hC) => {
          hC.classList.remove("header-cell");
        });
        const tableElement =
          headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(
          headerCell.parentElement.children,
          headerCell
        );
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");
        headerCell.classList.add("header-cell");

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
      });
    });

    searchInput.addEventListener("input", (e) => {
      const value = e.target.value;
      let showData = searchTable(value, userData);
      loadTableData(showData);
      loadData(showData);
    });

    searchMobile.addEventListener("input", (e) => {
      const val = e.target.value;
      let showData = searchMobileData(val, userData);
      loadData(showData);
      loadTableData(showData);
    });

    searchTable = (value, data) => {
      var filterdData = [];

      for (let person of data) {
        value = value.toLowerCase();
        let name = person.name.toLowerCase();
        let position = person.position.toLowerCase();
        let seniority = person.seniority.toLowerCase();
        let employeeId = person.employeeId.toString();
        let nineBox = person.nineBox.toString();

        if (
          employeeId.includes(value) ||
          name.includes(value) ||
          position.includes(value) ||
          seniority.includes(value) ||
          nineBox.includes(value) ||
          person.date.includes(value)
        ) {
          filterdData.push(person);
        }
      }
      return filterdData;
    };

    searchMobileData = (val, data) => {
      let searchArray = [];
      for (let person of data) {
        val = val.toLowerCase();
        let name = person.name.toLowerCase();
        if (name.includes(val)) {
          searchArray.push(person);
        }
      }
      return searchArray;
    };

    btnNewEmployee.addEventListener("click", (e) => {
      console.log(e.target);
      window.location.href = addUserUrl;
    });

    btnViewCharts.addEventListener("click", (e) => {
      window.location.href = chartsUrl;
    });

    loadData(userData);
    loadTableData(userData);
  } else {
    window.location.replace(logInUrl);
  }
}
postingData();
