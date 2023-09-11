// Theme section
let themeIcon = document.querySelector(".mode");
let body = document.getElementById("body");
let head = document.querySelector(".head");
let fullTodo = document.querySelector(".to-do")
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
    let toDoContainer = fullTodo.querySelectorAll(".to-do-cont")
    let toDoBox = fullTodo.querySelectorAll(".to-do-box")
    let circles = fullTodo.querySelectorAll(".circle")
    let toDoText = fullTodo.querySelectorAll(".to-do-input");

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

// function to check mode
let checkMode = () => {
    if(currentTheme == "black"){
        setTodos(mode, 0);
    }else if(currentTheme == "white"){
        setTodos(mode, 1);
    }
}


// Form section
let form = document.querySelector("form");
let toDos = document.querySelector("ul");
let clearFilter = document.querySelector(".clear-filter")
let allTodos = document.querySelector("#to-do-remain");
let clearAllTodos = document.querySelector("#to-do-clear");

// Template to create a new todo
let createTemplate = (todo) => {
    let html = `<li class="add-to-do to-do-box to-do-cont">
        <div class = "circle to-do-circle"><img src="./images/icon-check.svg"></div>
        <p class="to-do-text">${todo}</p>
        <img class = "delete" src="./images/icon-cross.svg">
    </li>`
    toDos.innerHTML += html;
}

// Template to show empty filtered todo
let noTodo = (filter) => {
    let html = `<li id="emptyTodo" class="to-do-box to-do-cont no-toDo to-do-checked">
                    <p class="no-to-do">${filter}</p>
                </li>`
    toDos.innerHTML += html;
}

// Function that removes nodes with No Todo
let removeNoTodo = () => {
    Array.from(toDos.children)
        .forEach(todo => {
            if(todo.classList.contains("no-toDo")){
                todo.remove();
            }
        })
}
// Function that handles current amount of todos
function todoCount(filter){
    let items = Array.from(toDos.children)
                    .filter(todo => !todo.classList.contains("to-do-filtered"))
    if(items.length == 0){
        if(filter == "active" || filter == "completed"){
            noTodo(`No Todo is ${filter} at the moment`)
            checkMode();
            allTodos.innerText = items.length;
        }else{
            clearFilter.style.display = "none";
        }
    }else{
        allTodos.innerText = items.length;
    }
}

// handling the form
form.addEventListener("submit", e => {
    e.preventDefault();
    let todo = form.toDoInput.value.trim();
    if (todo.length){
        createTemplate(todo);
        checkMode();
        form.reset();
    }    
    clearFilter.style.display = "grid";
    todoCount();
})

// delete a todo
toDos.addEventListener("click", e => {
    if (e.target.className == "delete"){
        e.target.parentElement.remove();
    }
    todoCount();
})

// Handles marking of todo as completed
toDos.addEventListener("click", e => {
    if (e.target.classList.contains("to-do-circle")){
        e.target.parentElement.classList.toggle("to-do-checked")
    }else if(e.target.parentElement.classList.contains("to-do-circle")){
        e.target.parentElement.parentElement.classList.toggle("to-do-checked")
    }
})

// Handles clearing of completed todos
clearAllTodos.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all completed todos") == true){
        let childArray = Array.from(toDos.children);
        childArray.forEach(child => {
            if(child.classList.contains("to-do-checked")){child.remove()}
        })
        todoCount("completed");
        form.reset();
    }
})


// Filtering Todos

// function that filters todo
let filterTodo = (id) => {
    if (id == "active"){
        Array.from(toDos.children)
            .filter((todo) => todo.classList.contains("to-do-checked"))
            .forEach(todo => todo.classList.add("to-do-filtered"))
        Array.from(toDos.children)
            .filter((todo) => !todo.classList.contains("to-do-checked"))
            .forEach(todo => todo.classList.remove("to-do-filtered"))
    }
    if (id == "completed"){
        Array.from(toDos.children)
            .filter((todo) => !todo.classList.contains("to-do-checked"))
            .forEach(todo => todo.classList.add("to-do-filtered"))
         Array.from(toDos.children)
            .filter((todo) => todo.classList.contains("to-do-checked"))
            .forEach(todo => todo.classList.remove("to-do-filtered"))
    }
    if (id == "all"){
        Array.from(toDos.children)
            .filter((todo) => todo.classList.contains("add-to-do"))
            .forEach(todo => todo.classList.remove("to-do-filtered"))
    }
}

// Event listener to filter todo
let filter = document.querySelector(".to-do-filter");
filter.addEventListener("click", e => {
    filterTodo(e.target.id);
    removeNoTodo()
    todoCount(e.target.id);
})