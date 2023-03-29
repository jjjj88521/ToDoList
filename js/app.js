// 輸入代辦事項 將其加入 array
// 獲取輸入
const newTodo = document.querySelector(".new-todo");
// 獲取加入按鈕
const addBtn = document.querySelector(".plus-btn");
// local storage 加進 dataArr
// 如果 local storage 沒東西就為空陣列
const dataArr = localStorage.getItem("todo-data")
  ? JSON.parse(localStorage.getItem("todo-data"))
  : [];

// 獲取 todo-list 區塊
const todoListDiv = document.querySelector(".todo-list");

addBtn.addEventListener("click", () => {
  if (newTodo.value === "") {
    alert("不得為空!!!");
  } else {
    // 創建物件 用來獲取輸入
    const todoObj = {
      id: dataArr.length ? dataArr[dataArr.length - 1].id + 1 : 1,
      title: newTodo.value,
      completed: false,
    };
    // 將物件 push 進 dataArr
    dataArr.push(todoObj);
    console.log(dataArr);
    newTodo.value = "";

    // 渲染頁面
    renderList();
  }
});

function renderList() {
  // 清空 為了重新渲染
  todoListDiv.innerHTML = "";
  for (let i = 0; i < dataArr.length; i++) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.innerHTML = `
          <input class="toggle" type="checkbox" />
          <span>${dataArr[i].title}</span>
          <button class="trash">
            <i class="fas fa-trash"></i>
          </button>
        `;
    todoListDiv.appendChild(todoDiv);
  }
}
