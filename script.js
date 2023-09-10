// Theme section
let themeIcon = document.querySelector(".mode");
let body = document.getElementById("body");
let head = document.querySelector(".head");
let currentTheme = "white";
let width = window.innerWidth


// Data array for modes
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

// Set the Mode Background colour and image
let setBgs = (mode, id, width) => {
    if(width < 720)
    {
        head.style.backgroundImage = mode[id].bgMobile
    }else{
        head.style.backgroundImage = mode[id].bgDesktop
    }
    body.style.backgroundColor = mode[id].body;
}

// Set the Mode Todo colour
let setTodos = (mode, id) => {
    let toDoContainer = document.querySelectorAll(".to-do-cont")
    let toDoBox = document.querySelectorAll(".to-do-box")
    let circles = document.querySelectorAll(".circle")
    let toDoText = document.querySelectorAll(".to-do-input");

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

// Event Listener to change themes
themeIcon.addEventListener("click", (e) => {
    let id = e.target.id;
    if(id == "0"){
        themeIcon.setAttribute("src", "./images/icon-sun.svg");
        setBgs(mode, id, width);
        setTodos(mode, id);
        themeIcon.id = "1"
        currentTheme = "black";
    }else{
        themeIcon.setAttribute("src", "./images/icon-moon.svg");
        themeIcon.id = "0"
        setBgs(mode, id, width);
        setTodos(mode, id);
        currentTheme = "white"
    }
})


// Form section
let form = document.querySelector("form");
let toDos = document.querySelector("ul");
let clearFilter = document.querySelector(".clear-filter")

// Template to create a new todo
let createTemplate = (todo) => {
    let html = `<li class="add-to-do to-do-box to-do-cont">
        <div class = "circle to-do-circle"><img src="./images/icon-check.svg"></div>
        <p class="to-do-text">${todo}</p>
        <img class = "delete" src="./images/icon-cross.svg">
    </li>`
    toDos.innerHTML += html;
}

// handling the form
form.addEventListener("submit", e => {
    e.preventDefault();
    let todo = form.toDoInput.value.trim();
    if (todo.length){
        createTemplate(todo);
        form.reset();
    }
    clearFilter.style.display = "grid";
    if(currentTheme == "black"){
        setTodos(mode, 0);
    }else if(currentTheme == "white"){
        setTodos(mode, 1);
    }
})

// delete a todo
toDos.addEventListener("click", e => {
    if (e.target.className == "delete"){
        e.target.parentElement.remove();
    }
})

// Handles marking of todo as completed
toDos.addEventListener("click", e => {
    if (e.target.classList.contains("to-do-circle")){
        e.target.parentElement.classList.toggle("to-do-checked")
    }else if(e.target.parentElement.classList.contains("to-do-circle")){
        e.target.parentElement.parentElement.classList.toggle("to-do-checked")
    }
})