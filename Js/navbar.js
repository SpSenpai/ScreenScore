let searchText = "";
document.querySelector("#search-btn").addEventListener("click", () => {
  searchText = document.querySelector("#search-text").value;
  if (searchText != "") {
    window.location.href = "explorepage.html?search=" + searchText;
  }
});

document.querySelector("#search-text").addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchText = document.querySelector("#search-text").value;
    if (searchText != "") {
      window.location.href = "explorepage.html?search=" + searchText;
    }
  }
});

let sideNav = document.querySelector(".side-nav-bar");
document.querySelector(".hamburger").addEventListener("click", () => {
  sideNav.style.right = "0";
  document.querySelector("body").style.overflow = "hidden";
});
document.querySelector(".cross-nav").addEventListener("click", () => {
  sideNav.style.right = "-100vh";
  document.querySelector("body").style.overflow = "auto";
});

let searchInput = document.querySelector("#search-text");

if (window.innerWidth <= 720) {
  document.querySelector("#search-btn").addEventListener("click", () => {
    if (searchInput.style.width == "") {
      searchInput.style.width = "80%";
    } else {
      searchInput.style.width = "";
    }
  });
}

// Loder
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  loader.classList.add("loader--hidden");

  loader.addEventListener("transitionend", () => {
    document.body.removeChild(loader);
  });
});

//Theme
activateTheme();
function activateTheme() {
  theme = JSON.parse(localStorage.getItem("theme"));
  let root = document.querySelector(":root");
  root.style.setProperty("--main-theme-color", theme.color);
  root.style.setProperty("--main-theme-hover", theme.hoverColor);
  root.style.setProperty("--text-color", theme.textColor);
  root.style.setProperty("--sec-text-color", theme.textColor2);
  root.style.setProperty("--bg-color", theme.bgColor);
  root.style.setProperty("--footer-bg", theme.footerColor);
}


// Go back to top BTN
let goBackToTopBtn = document.querySelector('.go-back-to-top');

goBackToTopBtn.addEventListener('click', ()=>{
  window.scrollTo(0,0)
})

let lastScrollTop = window.scrollY  || document.documentElement.scrollTop;

window.addEventListener('scroll', ()=>{
  const scrollTopPosition = window.scrollY  || document.documentElement.scrollTop;
  if (scrollTopPosition > lastScrollTop) {
    goBackToTopBtn.style.opacity = '0'
  } else {
    goBackToTopBtn.style.opacity = '1'

  }
  lastScrollTop = scrollTopPosition <= 0 ? 0 : scrollTopPosition;
});
