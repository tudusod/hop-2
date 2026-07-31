const todo = document.getElementById("todo")

const input = document.createElement("input")
const btn = document.createElement("button")
const counting = document.createElement("span")
const todoList = document.createElement("div")
btn.innerHTML = "add todo"
let todoCount = 0
counting.innerHTML = todoCount

btn.addEventListener('click', () => {
    if (input.value.trim() === "") {
        return; 
    }
    const newtodo = document.createElement("div")

    const todoText = document.createElement("span")
    todoText.innerHTML = input.value 

    const itemDelBtn = document.createElement("button")
    itemDelBtn.innerHTML = "Delete"

    if(input.value === input.value){

    }
    
    itemDelBtn.addEventListener('click', () => {
        todoList.removeChild(newtodo)
        todoCount = todoCount - 1
        counting.innerHTML = todoCount
    })
    
    newtodo.appendChild(todoText)
    newtodo.appendChild(itemDelBtn)
    
    todoList.appendChild(newtodo)
    
    todoCount = todoCount + 1
    counting.innerHTML = todoCount
    input.value = ""
});


input.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        btn.click();           
    }
})

todo.appendChild(input)
todo.appendChild(btn)
todo.appendChild(counting)
todo.appendChild(todoList)