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
renderList(dataArr);
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
    // console.log(dataArr);
    // 放進localStorage
    localStorage.setItem("todo-data", JSON.stringify(dataArr));
    // 清空input
    newTodo.value = "";
    // 動畫
    scaleUp();

    // 渲染頁面
    renderList(dataArr);
    countTodo();

    //動畫
    // todoListDiv.lastChild.style.animation = "scaleUp 0.5s ease forwards";
    scaleUp();
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
      // console.log(dataArr);
      // 放進localStorage
      localStorage.setItem("todo-data", JSON.stringify(dataArr));
      // 清空input
      newTodo.value = "";

      // console.log(todoListDiv.lastChild);
      // 渲染頁面
      renderList(dataArr);
      countTodo();

      //動畫
      // todoListDiv.lastChild.style.animation = "scaleUp 0.5s ease forwards";
      scaleUp();
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
  // 放進localStorage
  localStorage.setItem("todo-data", JSON.stringify(dataArr));
  countTodo();
});

// 按下垃圾 刪掉相對應的事項
todoListDiv.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    // console.log(e.target.parentNode);
    e.target.parentElement.style.animation = "scaleDown 0.5s ease forwards";
    // 動畫結束再刪資料跟渲染
    e.target.parentElement.addEventListener("animationend", () => {
      // 刪除相對應的事項
      dataArr.splice(e.target.dataset.id, 1);
      // 放進localStorage
      localStorage.setItem("todo-data", JSON.stringify(dataArr));
      // 渲染
      renderList(dataArr);
      countTodo();
    });
  }
});

// 按下顯示全部 已完成 待完成按鈕 渲染對應的資料
const listBtn = document.querySelector(".filter");
console.log(listBtn.children);
listBtn.childNodes.forEach((ele) => {
  ele.addEventListener("click", function (e) {
    // 按鈕切換
    listBtn.querySelector(".selected").classList.remove("selected");
    this.classList.add("selected");
    // 顯示選擇的清單
    if (this.className.includes("all")) {
      renderList(dataArr);
      countTodo();
    } else if (this.className.includes("active")) {
      let newArr = [];
      dataArr.forEach((e) => {
        if (e.completed === false) {
          newArr.push(e);
        }
      });
      renderList(newArr);
      countTodo();
    } else {
      let newArr = [];
      dataArr.forEach((e) => {
        if (e.completed === true) {
          newArr.push(e);
        }
      });
      renderList(newArr);
      countTodo();
    }
  });
});

// 清除按鈕
const cleanBtns = document.querySelector(".clean-btns");
cleanBtns.addEventListener("click", (e) => {
  // console.log(e.target.className);
  if (e.target.className.includes("clean-all")) {
    todoListDiv.childNodes.forEach((ele) => {
      ele.style.animation = "scaleDown 0.5s ease forwards";
    });
    setTimeout(() => {
      // todoList.childN
      dataArr.splice(0);
      // 放進localStorage
      localStorage.removeItem("todo-data");
      // 渲染
      renderList(dataArr);
      countTodo();
    }, 500);
  } else {
    // console.log(todoList.childNodes);
    // console.log(dataArr);
    dataArr.forEach((ele, index) => {
      if (ele.completed) {
        // console.log(todoList.childNodes[index]);
        const done = todoListDiv.childNodes[index];
        done.style.animation = "scaleDown 0.5s ease forwards";
      }
    });
    // 動畫結束再移除資料
    setTimeout(() => {
      dataArr.forEach((ele, index) => {
        if (ele.completed) {
          // 移除對應資料
          dataArr.splice(index, 1);
          // 對應的資料移除動畫
          // 放進localStorage
          localStorage.setItem("todo-data", JSON.stringify(dataArr));
        }
      });
      // 渲染
      renderList(dataArr);
      countTodo();
      // console.log(index);
    }, 500);
  }
});

function renderList(dataArr) {
  // 清空 為了重新渲染
  todoListDiv.innerHTML =
    dataArr.length === 0 ? `<p class="no-todo">沒東西</p>` : "";
  for (let i = 0; i < dataArr.length; i++) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    todoDiv.innerHTML = dataArr[i].completed
      ? `
          <input class="toggle" type="checkbox" data-id=${i} checked />
          <span class="todo-title done">${dataArr[i].title}</span>
          <button class="trash" data-id=${i}>
            <i class="fas fa-trash"></i>
          </button>
        `
      : `
        <input class="toggle" type="checkbox" data-id=${i} />
        <span class="todo-title">${dataArr[i].title}</span>
        <button class="trash" data-id=${i}>
          <i class="fas fa-trash"></i>
        </button>
      `;
    todoListDiv.appendChild(todoDiv);
    // todoDiv.style.animation = "scaleUp 0.5s ease forwards";
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
  todoP.innerHTML =
    c === 0 ? `<span>做完了ㄟ</span>` : `<span>還有${c}件事沒做完</span>`;
}

// 新增 todo 動畫
function scaleUp() {
  todoListDiv.lastChild.style.animation = "scaleUp 0.5s ease forwards";
  // 滾到最下面
  window.scrollTo(0, document.body.scrollHeight);
  // 動畫結束就清掉 style
  todoListDiv.lastChild.addEventListener("animationend", () => {
    todoListDiv.lastChild.style.animation = "";
  });
}

// const dc = document.querySelector("html");
// const style = document.createElement("style");
// style.innerHTML = `
// html::-webkit-scrollbar {
//     display: block;
//     background-color: transparent;
//     width: 10px;
//   }
// `;
// // console.log(scrollbarStyle.display);
// window.addEventListener("scroll", () => {
//   dc.appendChild(style);
// });
