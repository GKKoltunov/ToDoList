
let todos = [];
const input = document.querySelector(".input");
const list = document.querySelector(".list");
const ul = document.querySelector(".ul");
const add = document.querySelector(".add");
const hidden = document.querySelector('.hidden')



//заполняем массив todos
let addTask = () => {
  if (input.value.trim().length) {
    
    todos.push({
      text: input.value,
      id: Date.now(),
      isCompleted: false,
    });
    window.localStorage.setItem(input.value , 0);
  }
};

// 
let toggleIsCompleted = (id) => {
  const task = todos.find((el) => el.id === id);
  task.isCompleted = !task.isCompleted;
  
};

// let check = (text) => {
//   const arr = todos.find(el => el.text === text);
//   localStorage.getItem(arr.text, 1);
//   console.log(arr)
// }


// создания элемента списка
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
  checkbox.addEventListener("change", () => {
    toggleIsCompleted(obj.id)
    // check(obj.text)
  });
  return li;
};


// заполнение списка элементами
let renderTasks = () => {
  ul.innerHTML = "";
  todos.forEach((el) => ul.append(createTaskNode(el)));
  input.value =''
};



// загрузка элементов из localStorage при запуске страницы
let start = () => {
  if (localStorage.length !== 0) {
    let keys = Object.keys(localStorage);
    for (let key of keys) {
      todos.unshift({
        text: key,
        id: Date.now(),
        isCompleted: false,
      })
    };
    hidden.style.display = "block";
    renderTasks();
  }
};
start()




// реакция на нажатие кнопки "добавить"
add.addEventListener("click", function (event) {
     event.preventDefault();  // отменить дефолтное поведение
  hidden.style.display="block"
  addTask();
  renderTasks();
  
  console.log(todos);
});


const deleteAll = document.querySelector(".delete-all");

// реакция на нажатие кнопки "удалить все"
deleteAll.addEventListener('click', function () {
  ul.innerHTML = "";
  todos = []
  hidden.style.display = "none";
  localStorage.clear()
})


const deleteCmpl = document.querySelector(".delete-cmpl");


// реакция на нажатие кнопки "удалить завершенные"
deleteCmpl.addEventListener('click', function () {
  
  ul.innerHTML = "";
  let newarr = todos.filter(el => el.isCompleted === false)
  newarr.forEach((el) => ul.append(createTaskNode(el)));
  todos = newarr;
})



 
  