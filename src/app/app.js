
let todos = [];
const input = document.querySelector(".input");
const list = document.querySelector(".list");
const ul = document.querySelector(".ul");
const add = document.querySelector(".add");

let addTask = () => {
  if (input.value.trim().length) {
    todos.push({
      text: input.value,
      id: Date.now(),
      isCompleted: false,
    });
  }
};

let toggleIsCompleted = (id) => {
  const task = todos.find((el) => el.id === id);
  task.isCompleted = !task.isCompleted;
  console.log(todos);
};

let createTaskNode = (obj) => {
  let li = document.createElement("li");
  li.className = "elem";
  li.innerHTML = `<input class="checkbox" type="checkbox" name="" id=""></input>
  <p class="task">${obj.text}</p>
  <button class="cross">❌</button> `;
  let checkbox = li.querySelector(".checkbox");
  checkbox.checked = obj.isCompleted;
  checkbox.addEventListener("change", () => toggleIsCompleted(obj.id));
  return li;
};

let renderTasks = () => {
  ul.innerHTML = "";
  todos.forEach((el) => ul.append(createTaskNode(el)));
  input.value =''
};


add.addEventListener("click", function () {
  
  addTask();
  renderTasks();
  console.log(todos);
});



const deleteAll = document.querySelector(".delete-all");

deleteAll.addEventListener('click', function () {
  ul.innerHTML = "";
  todos =[]
})


const deleteCmpl = document.querySelector(".delete-cmpl");

deleteCmpl.addEventListener('click', function () {
  
  ul.innerHTML = "";
  todos.forEach(el => {
   
    if (el.isCompleted === false) {
      ul.append(createTaskNode(el));
    } else {
       let index = todos.indexOf(el);
       
      todos.splice(index, 1);
    }
  })
console.log(todos)

})

