
let todos = [];
const input = document.querySelector(".input");
const list = document.querySelector(".list");
const ul = document.querySelector(".ul");
const add = document.querySelector(".add");
const hidden = document.querySelector('.hidden')


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
  // const btnCross = li.querySelector(".cross");
  // btnCross.addEventListener("click", function(){});
  checkbox.checked = obj.isCompleted;
  checkbox.addEventListener("change", () => toggleIsCompleted(obj.id));
  return li;
};

let renderTasks = () => {
  ul.innerHTML = "";
  todos.forEach((el) => ul.append(createTaskNode(el)));
  input.value =''
};


add.addEventListener("click", function (event) {
     event.preventDefault();  // отменить дефолтное поведение
  hidden.style.display="block"
  addTask();
  renderTasks();
  console.log(todos);
});


const deleteAll = document.querySelector(".delete-all");

deleteAll.addEventListener('click', function () {
  ul.innerHTML = "";
  todos = []
  hidden.style.display = "none";
})


const deleteCmpl = document.querySelector(".delete-cmpl");

deleteCmpl.addEventListener('click', function () {
  
  ul.innerHTML = "";
  let newarr = todos.filter(el => el.isCompleted === false)
  newarr.forEach((el) => ul.append(createTaskNode(el)));
  todos = newarr;
})



 
  