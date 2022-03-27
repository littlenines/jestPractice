import spreadSheet from "./sheetDb";
import { userListUrl } from "./variables";

export async function loginData() {
  if (sessionStorage.getItem("token")) {
    window.location.replace(userListUrl);
  } else {
    const loginData = await spreadSheet;
    const inputs = document.querySelectorAll("[data-change]");
    const loginUsername = document.querySelector("[data-username]");
    const loginPassword = document.querySelector("[data-password]");
    const loginButton = document.querySelector("[data-login]");
    const errorMessage = document.querySelector("[data-error-message]");

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        const isUserWhitespace = /^\s/.test(loginUsername.value);
        const isPassWhitespace = /^\s/.test(loginPassword.value);

        const valid = Array.from(inputs).filter((input) => input.value !== "");

        if (
          valid.length === 0 ||
          valid.length === 1 ||
          isUserWhitespace ||
          isPassWhitespace
        ) {
          loginButton.disabled = true;
          loginButton.classList.add("disabled");
        } else {
          loginButton.disabled = false;
          loginButton.classList.remove("disabled");
          errorMessage.classList.remove("error-display");
        }
      });
    });

    const makeRandomToken = () => {
      return Math.random().toString(36).substr(2);
    };

    const getLongToken = () => {
      return makeRandomToken() + makeRandomToken() + makeRandomToken();
    };

    const sessionToken = getLongToken();
    let isValid = true;

    loginButton.addEventListener("click", (e) => {
      e.preventDefault();
      for (let i = 0; i < loginData[2].length; i++) {
        if (
          loginData[2][i].username === loginUsername.value &&
          loginData[2][i].password === loginPassword.value
        ) {
          window.location.replace(userListUrl);
          sessionStorage.setItem("token", sessionToken);
          return true;
        } else {
          isValid = false;
        }
      }

      if (!isValid) {
        errorMessage.classList.add("error-display");
      }
    });
  }
}

// loginData();
