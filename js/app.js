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
// 一開始先渲染一次
renderList();
countTodo();
// 加號按下去就輸入
addBtn.addEventListener("click", () => {
  if (newTodo.value === "") {
    alert("不得為空!!!");
  } else {
    // 創建物件 用來獲取輸入
    const todoObj = {
      id: dataArr.length ? dataArr[dataArr.length - 1].id + 1 : 0,
      title: newTodo.value,
      completed: false,
    };
    // 將物件 push 進 dataArr
    dataArr.push(todoObj);
    console.log(dataArr);
    // 清空input
    newTodo.value = "";

    // 渲染頁面
    renderList();
    countTodo();
  }
});
// enter按下去也輸入
newTodo.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (newTodo.value === "") {
      alert("不得為空!!!");
    } else {
      // 創建物件 用來獲取輸入
      const todoObj = {
        id: dataArr.length ? dataArr[dataArr.length - 1].id + 1 : 0,
        title: newTodo.value,
        completed: false,
      };
      // 將物件 push 進 dataArr
      dataArr.push(todoObj);
      console.log(dataArr);
      // 清空input
      newTodo.value = "";

      // 渲染頁面
      renderList();
      countTodo();
    }
  }
});

// 代辦事項打勾 文字內容就槓掉
todoListDiv.addEventListener("change", function (e) {
  const span = document.querySelectorAll(".todo-title");
  // 對應的資料槓掉或恢復
  // console.log(e);
  span[e.target.dataset.id].classList.toggle("done");
  dataArr[e.target.dataset.id].completed =
    !dataArr[e.target.dataset.id].completed;
  countTodo();
});

// 按下垃圾 刪掉相對應的事項
todoListDiv.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    // console.log(e.target);
    // 刪除相對應的事項
    dataArr.splice(e.target.dataset.id, 1);
    // 渲染
    renderList();
    countTodo();
  }
});

// 按下顯示全部 已完成 待完成按鈕 渲染對應的資料
const listBtn = document.querySelector(".filter");
console.log(listBtn.children);
listBtn.childNodes.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    console.log(e.target);
    e.target.classList.toggle("selected");
  });
});

function renderList() {
  // 清空 為了重新渲染
  todoListDiv.innerHTML =
    dataArr.length === 0 ? `<p class="no-todo">沒事情了耶！！！！</p>` : "";
  for (let i = 0; i < dataArr.length; i++) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.innerHTML = `
          <input class="toggle" type="checkbox" data-id=${i} />
          <span class="todo-title">${dataArr[i].title}</span>
          <button class="trash" data-id=${i}>
            <i class="fas fa-trash"></i>
          </button>
        `;
    todoListDiv.appendChild(todoDiv);
  }
}

// 計算還有多少個事項未完成
function countTodo() {
  // 獲取 done-count 區塊
  const todoP = document.querySelector(".todo-count");
  let c = 0;
  dataArr.forEach((e) => {
    c = e.completed ? c : c + 1;
  });
  todoP.innerHTML = `<span>還有${c}件事沒做完</span>`;
}
