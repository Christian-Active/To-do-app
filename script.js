let mode = document.querySelector(".mode");
let body = document.getElementById("body");
let head = document.querySelector(".head");
let toDoContainer = document.querySelectorAll(".to-do-cont")
let toDoBox = document.querySelectorAll(".to-do-box")
let circles = document.querySelectorAll(".circle")
let toDoText = document.querySelectorAll(".to-do-input")



// handle theme changes
function setMode(mode, id, width){
    if(width < 720)
    {
        head.style.backgroundImage = mode[id].bgMobile
    }else{
        head.style.backgroundImage = mode[id].bgDesktop
    }
    body.style.backgroundColor = mode[id].body
    toDoContainer.forEach((cont) => {
        cont.style.backgroundColor = mode[id].toDoContainer
    })
    toDoBox.forEach((box) => {
        box.style.borderColor = mode[id].border
    })
    circles.forEach((circle) => {
        circle.style.borderColor = mode[id].border
    })
    toDoText.forEach((text) => {
        text.style.color = mode[id].toDoText
    })
}

// object that set values of mode
function getMode(id){
    let mode = [
        {
            bgMobile: "url(./images/bg-mobile-dark.jpg)",
            bgDesktop: "url(./images/bg-desktop-dark.jpg)",
            body: "hsl(235, 21%, 11%)",
            toDoContainer: "hsl(235, 24%, 19%)",
            border: "hsl(237, 14%, 26%)",
            toDoText: "hsl(234, 39%, 85%",
        },
        {
            bgMobile: "url(./images/bg-mobile-light.jpg)",
            bgDesktop: "url(./images/bg-desktop-light.jpg)",
            body: "hsl(236, 33%, 92%)",
            toDoContainer: "hsl(0, 0%, 98%)",
            border: "hsl(233, 11%, 84%)",
            toDoText: "hsl(235, 19%, 35%)",
        }
    ]
    let width = window.innerWidth

    setMode(mode, id, width)
}



// Event listener to change themes
mode.addEventListener("click", (e) => {
    let id = e.target.id;
    if(id == "0")
    {
        mode.removeAttribute("src");
        mode.setAttribute("src", "./images/icon-sun.svg");
        getMode(id)
        mode.id = "1"
    }else{
        mode.removeAttribute("src");
        mode.setAttribute("src", "./images/icon-moon.svg");
        mode.id = "0"
        getMode(id)
    }
})