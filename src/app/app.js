
let todos = [];
const input = document.querySelector(".input");
const list = document.querySelector(".list");
const ul = document.querySelector(".ul");
const add = document.querySelector(".add");
const hidden = document.querySelector('.hidden')
const deleteCmpl = document.querySelector(".delete-cmpl");
const deleteAll = document.querySelector(".delete-all");

function filllocalStorage() {
  let json = JSON.stringify(todos);
  window.localStorage.setItem("todo", json);
}


//заполняем массив todos
let addTask = () => {
  if (input.value.trim().length) {
    todos.push({
      text: input.value,
      id: Date.now(),
      isCompleted: false,
    });
  }
 filllocalStorage();
};



let toggleIsCompleted = (id) => {
 
  const task = todos.find((el) => el.id === id);
  task.isCompleted = !task.isCompleted;
  filllocalStorage();
};





// создания элемента списка
function createTaskNode (obj) {
  let li = document.createElement("li");
  li.className = "elem";
  li.innerHTML = `<input class="checkbox" type="checkbox" name="" id=""></input>
  <p class="task">${obj.text}</p>
  <button class="cross">❌</button> `;
  let checkbox = li.querySelector(".checkbox");  //реакция нажатия на чекбокс
  checkbox.checked = obj.isCompleted;
  checkbox.addEventListener("change", () => {
    toggleIsCompleted(obj.id)
  });

  let cross = li.querySelector(".cross");  //реакция нажатия на крестик
  cross.addEventListener('click', function () {
    li.remove();
    let a = todos.indexOf(obj);
    todos.splice(a,1)
    filllocalStorage();
    if (todos.length === 0) {
      hidden.style.display = "none";
    }
  })
  return li;
};


// заполнение списка элементами
function renderTasks() {
  ul.innerHTML = "";
  todos.forEach((el) => ul.append(createTaskNode(el)));
  input.value =''
};


// загрузка элементов из localStorage при запуске страницы

let start = () => {
     if (localStorage.length !== 0) {
   hidden.style.display = "block";
   todos = JSON.parse(localStorage.getItem('todo'));
   renderTasks();
 }
  };
  start()

  // реакция на нажатие кнопки "добавить"
  add.addEventListener("click", function (event) {
    event.preventDefault(); // отменить дефолтное поведение
    hidden.style.display = "block";
    addTask();
    renderTasks();
  });




// реакция на нажатие кнопки "удалить все"
deleteAll.addEventListener('click', function () {
  ul.innerHTML = "";
  todos = []
  hidden.style.display = "none";
  localStorage.clear()
})



// реакция на нажатие кнопки "удалить завершенные"
deleteCmpl.addEventListener('click', function () {
  ul.innerHTML = "";
  let newarr = todos.filter(el => el.isCompleted === false)
  newarr.forEach((el) => {
    ul.append(createTaskNode(el));
  });
  todos = newarr;

  filllocalStorage();

  if (todos.length ===0) {
    hidden.style.display = "none";
  }
})



 
  