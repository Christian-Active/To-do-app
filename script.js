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





// handling inputs
let createTodo = document.getElementById("to-do-input");
let toDos = document.querySelector(".to-dos");
let clearFilter = document.querySelector(".clear-filter")

// reset input field when window loads
window.addEventListener("load", () => {
    createTodo.value = ""
})

// add todo when the user clicks the enter button
createTodo.addEventListener("focus", () => {
    createTodo.addEventListener("keypress", (event) => {
        if(event.key === "Enter"){
            ifEmpty()
            toDoCompleted()
        }
    })
})

// function that checks if input field is empty
function ifEmpty(){
    if(createTodo.value == ""){
        return;
    }
    else{
        ifFilled();
    }
}

// function that chcecks if input field is filled
function ifFilled(){
    let box = document.createElement("p")
    box.innerHTML = 
    `<div class="add-to-do to-do-box to-do-cont">
        <div class = "circle to-do-circle"></div>
        <p class="to-do-text">${createTodo.value}</p>
        <img class = "delete" src="./images/icon-cross.svg">
    </div>`
    toDos.appendChild(box)
    clearFilter.style.display = "grid"
    createTodo.value = ""
}


// Function that underlines the todo when the user checks it
function getCompleteStatus(circle, text, id){
    let completeStatus = [
        {
            background: "linear-gradient(to bottom, hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
            border: "none",
            innerHTML: `<img class="mode" id="0" src="./images/icon-check.svg" alt="">`,
            textDecoration: "line-through",
            textColor: "hsl(233, 11%, 84%)"
        },
        {
            background: "none",
            border: "1px solid hsl(233, 11%, 84%)",
            innerHTML: "",
            textDecoration: "none",
            textColor: "hsl(236, 9%, 61%)"
        }
    ]
    circle.style.background = completeStatus[id].background
    circle.style.border = completeStatus[id].border
    circle.innerHTML = completeStatus[id].innerHTML
    text.style.textDecoration = completeStatus[id].textDecoration
    text.style.color = completeStatus[id].textColor
}


function toDoCompleted(){
    let toDoCircles = document.querySelectorAll(".to-do-circle")
    let toDoText = document.querySelectorAll(".to-do-text")
    for(let i = 0; i < toDoCircles.length; i++)
    {
        toDoCircles[i].addEventListener("click", () => {
            if(toDoCircles[i].classList.contains("to-do-circle")){
                let id = 0;
                getCompleteStatus(toDoCircles[i], toDoText[i], id)
                toDoCircles[i].classList.remove("to-do-circle")
            }else{
                let id = 1;
                getCompleteStatus(toDoCircles[i], toDoText[i], id)
                toDoCircles[i].classList.add("to-do-circle")
            }
        })
    }
    console.log(toDoCircles.length)
    
}