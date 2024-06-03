// Script To change the theme of site if someone has previously logged in and changed theme
// Theme color values are stored using localstorage, it retrives the data if available, else default values in CSS file are used
theme = JSON.parse(localStorage.getItem("theme"));
if(theme){
    let root = document.querySelector(":root");
    root.style.setProperty("--main-theme-color", theme.color);
    root.style.setProperty("--main-theme-hover", theme.hoverColor);
    root.style.setProperty("--text-color", theme.textColor);
    root.style.setProperty("--sec-text-color", theme.textColor2);
    root.style.setProperty("--bg-color", theme.bgColor);
    root.style.setProperty("--footer-bg", theme.footerColor);    
}




// Side slider
setInterval(()=>{
    document.querySelector("#next-btn").click()
}, 6000);


document.querySelector("#no-acc").addEventListener('click', ()=>{
    document.querySelector(".login-register-sec").style.marginLeft = "-100%"
})
document.querySelector("#already-acc").addEventListener('click', ()=>{
    document.querySelector(".login-register-sec").style.marginLeft = "0"
})

document.querySelector(".forget-pass").addEventListener('click', ()=>{
    alert("Relax and try to remeber it!")
})

document.querySelector(".login").addEventListener('click', ()=>{
    location.href = "Html/homepage.html"
})
document.querySelector(".loginWithG").addEventListener('click', ()=>{
    location.href = "Html/homepage.html"
})

document.querySelector("#register").addEventListener('click', ()=>{
    location.href = "Html/homepage.html"
})