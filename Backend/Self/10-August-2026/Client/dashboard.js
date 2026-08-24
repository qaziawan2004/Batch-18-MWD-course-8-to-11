const getAuthToken = () => {
const token = localStorage.getItem("token")
return  `Barear ${token}`
}
const authCheck = async () => {
    try {
        let userId = localStorage.getItem("users")
        
        if (!userId) {
            return window.location.replace(`./login.html`)
        }
        
        const getCurrentUser = await fetch(`http://localhost:4000/get-single-user/${userId}`)
            .then(res => res.json())

        console.log("getCurrentUser", getCurrentUser);


        if (!getCurrentUser.status) {
            localStorage.removeItem("users");
        return window.location.replace("./login.html");
        }
        
        localStorage.setItem("userInfo", JSON.stringify(getCurrentUser.data));
     
     
        const  dashboardHeading = document.getElementById("dashboardHeading");
            dashboardHeading.innerHTML = `👋🏻 Hello ${getCurrentUser.data.fullName}`;

    } catch (error) {
        alert(error.messsage)
         console.log(error);
    }
}
const todosContainer = document.getElementById("todosContainer")

const getAllTodos = async () => {
    const todoData = await fetch(`http://localhost:4000/todo`, {
        headers: {
            "Autherization": "getAuthToken"
        }
    }).then(res => res.json())
    if (!todoData.status) {
        return alert(`todoData.message`)
    }
    const todos = todoData.data

    todosContainer.innerHTML = ""
    todos.forEach((userObj) => {
        const priorityClass = "priority" + userObj.priority.toLowerCase()

        todosContainer.innerHTML += `<div class = "todo-card">
            <div class = "todo-content">
            <h3>${userObj.title} </h3>
            <p>${userObj.desc}</p>
            <div class = "meta">
            <span class = "${priorityClass}">${userObj.priority} </span>
            <span>${userObj.date} </span>
            </div>
            </div>
            <div class = "actions">
                <button type ="button" class = "edit" id = "${userObj._id}" onclick = "editTodo(this)">Edit</button>
                <button type ="button" class = "delete" onclick = "deleteTodo(this)"> Delete</button>
            </div>
        </div>`
    })
}

const logoutHandler = () => {
    localStorage.clear()
    window.location.replace("./login.html")
}
const addTodo = async () => {
    try {
        let title = document.getElementById("todoTitle").value;
        let desc = document.getElementById("todoDescription").value;
        let date = document.getElementById("todoDate").value;
        let priority = document.getElementById("todoPriority").value;

        if (!title || !desc || !date || !priority) {
            alert(`Required fields are empty!`)
            return
        }
        const todoObj = {
            title,
            desc,
            date,
            priority
        }
        const res = await fetch("http://localhost:4000/todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todoObj)
        }).then(res => res.json())
        if (!res.status) {
            alert(res.message)
        }
        getAllTodos()
    } catch (error) {
        alert(error.message)
    }
}

// window.deleteTodo = deleteTodo
// window.editTodo = editTodo
window.addTodo = addTodo
window.logoutHandler = logoutHandler
window.authCheck = authCheck