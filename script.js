const input=document.getElementById('todoinput');
const addBtn = document.getElementById('addBtn');
const todolist = document.getElementById('todolist');
const toggleBtn = document.getElementById('toggleBtn');

let todos=JSON.parse(localStorage.getItem("todos")) || [];
let showCompleted=true;

toggleBtn.addEventListener("click", function() {
    showCompleted = !showCompleted;

    if(showCompleted){
        toggleBtn.innerText="隐藏已完成";
    }else{
        toggleBtn.innerText="显示已完成";
    }

    render();
});

addBtn.addEventListener("click",function(){
    const text=input.value;
    if(text===""){
        return;
    }

    todos.push({
        text:text,
        completed:false
    });

    localStorage.setItem("todos",JSON.stringify(todos));
    render();

    console.log(todos);
    input.value="";


})

function render(){

    todolist.innerHTML="";

    todos.forEach(function(todo,index){
        const li =document.createElement("li");
        li.innerText=todo.text;
        if(todo.completed){
            li.classList.add("completed");
        }
        if(todo.completed && !showCompleted){
            return;
        }


        const deleteBtn=document.createElement("button");
        deleteBtn.innerText="Delete";

        deleteBtn.addEventListener("click",function(event){
            event.stopPropagation();
            todos.splice(index,1);

            localStorage.setItem("todos",JSON.stringify(todos));
            render();
        });
        li.addEventListener("click",function(){
            todo.completed = !todo.completed;

            localStorage.setItem("todos",JSON.stringify(todos));
            render();
        });

        li.appendChild(deleteBtn);
        todolist.appendChild(li);
    });
}
render();