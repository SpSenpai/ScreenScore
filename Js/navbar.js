let searchText = ''
document.querySelector('#search-btn').addEventListener('click', () => {
    searchText = document.querySelector('#search-text').value
    if (searchText != '') {
        window.location.href = "explorepage.html?search=" + searchText;
    }
})

document.querySelector('#search-text').addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        searchText = document.querySelector('#search-text').value
        if (searchText != '') {
            window.location.href = "explorepage.html?search=" + searchText;
        }
    }
});


let sideNav = document.querySelector('.side-nav-bar')
document.querySelector('.hamburger').addEventListener('click', () => {
    sideNav.style.right = "0"
    document.querySelector('body').style.overflow = "hidden"
})
document.querySelector('.cross-nav').addEventListener('click', () => {
    sideNav.style.right = "-100vh"
    document.querySelector('body').style.overflow = "auto"

})

let searchInput = document.querySelector('#search-text')

if (window.innerWidth <= 720) {
    document.querySelector('#search-btn').addEventListener('click', () => {
        if (searchInput.style.width == "") {
            searchInput.style.width = "80%"
        }
        else{
            searchInput.style.width = ""
        }
    })
}

// Loder
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
  
    loader.classList.add("loader--hidden");
  
    loader.addEventListener("transitionend", () => {
      document.body.removeChild(loader);
    });
  });