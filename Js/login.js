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
    location.href = "homepage.html"
})

document.querySelector("#register").addEventListener('click', ()=>{
    location.href = "homepage.html"
})