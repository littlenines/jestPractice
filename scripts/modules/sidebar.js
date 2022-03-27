const openMenuMobile = document.querySelector("[data-button]");
const hamburgerButton = document.querySelector(".hamburger");
const closeMenuMobile = document.querySelector("[data-close]");
const navbar = document.getElementsByClassName("navbar");
const loginIcon = document.querySelector("[data-login]");
const linkIcon = document.querySelectorAll("link-icon");
const header = document.querySelector("[data-header]");
let sticky = header.offsetTop;

hamburgerButton.addEventListener("click", () => {
  navbar[0].classList.toggle("opened");
  hamburgerButton.classList.toggle("mobile-active");
});

window.onscroll = function () {
  stickyHeaderMobile();
};

function stickyHeaderMobile() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
