## JS API

1. 事件监听以及案例
2. 事件监听版本以及鼠标事件
3. 焦点事件以及案例
4. 键盘事件以及案例
5. 事件对象event以及常见对象
6. 环境对象this以及回调函数



### 1. 什么是事件 (Event)？

在 Web 开发中，事件是发生在浏览器中的特定行为或发生的事情。这些行为可以由用户触发，也可以由浏览器自动触发。

*   **用户行为**: 比如用户点击一个按钮、将鼠标移动到一个元素上、在输入框中按下键盘、提交一个表单等。
*   **浏览器行为**: 比如网页加载完成、图片加载失败、窗口大小被调整等。

### 2. 什么是事件监听 (Event Listening)？

想象一下，你有一个按钮，你希望当用户点击这个按钮时，网页上能弹出一个提示框。为了实现这个功能，你需要在 JavaScript 中做到两件事：

1.  **选中**这个按钮元素。
2.  **告诉**浏览器：“请一直‘听着’，一旦这个按钮被点击（事件发生），就立刻执行我指定的这段代码（弹出提示框）。”

这个“告诉浏览器去听”的过程，就叫做**事件监听**或**事件绑定**。当事件发生时，我们预先准备好用来响应的函数，这个函数被称为**事件处理程序 (Event Handler)** 或 **事件监听器 (Event Listener)**。

### 3. 如何添加事件监听？

在现代 JavaScript 开发中，我们**强烈推荐**使用 `addEventListener()` 方法来添加事件监听。它是最灵活、最强大且符合标准的方式。

#### `addEventListener()` 语法

```javascript
element.addEventListener(type, listener, useCapture);
```

*   **`element`**: 你想要监听事件的那个 HTML 元素（DOM 对象）。
*   **`type`**: 事件的类型，是一个字符串。例如 `'click'` 代表点击事件，`'mouseover'` 代表鼠标移入事件。**注意：** 事件类型名称不带 "on"，所以是 `'click'` 而不是 `'onclick'`。
*   **`listener`**: 当事件发生时，需要被调用的函数（即事件处理程序）。这个函数会自动接收一个**事件对象 (Event Object)** 作为参数，我们稍后会详细讲解。
*   **`useCapture`** (可选参数): 一个布尔值，用来指定事件是在捕获阶段处理还是在冒泡阶段处理。这是一个比较深入的概念，对于初学者和绝大多数日常开发场景，可以**暂时忽略或将其设置为 `false`**（默认值就是 `false`）。我们会在后续课程中讲解事件流时深入探讨。

---

### 4. 贴合实际开发的案例

让我们通过几个从简单到复杂的案例，来理解事件监听在实际开发中的应用。

#### 案例 1：最经典的按钮点击弹窗

这是每个初学者都必须掌握的最基本案例。

**HTML 代码:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>事件监听案例1</title>
</head>
<body>
    <button id="myButton">点我</button>
    <script src="app.js"></script>
</body>
</html>
```

**JavaScript 代码 (`app.js`):**
```javascript
// 1. 获取按钮元素
const btn = document.querySelector('#myButton');

// 2. 定义事件处理函数
function showAlert() {
  alert('你好，你点击了按钮！');
}

// 3. 为按钮添加点击事件监听
btn.addEventListener('click', showAlert);
```

**代码解析与面试要点:**

*   **关注点分离**: 我们将 HTML (结构)、CSS (样式，此处未写) 和 JavaScript (行为) 分离开来。JavaScript 文件是独立的，这是良好的开发习惯。
*   **DOM 查询**: 使用 `document.querySelector()` 来获取 DOM 元素。这是现代开发中最常用的选择器方法之一（其他还有 `getElementById`, `querySelectorAll` 等）。
*   **命名函数**: 这里我们将事件处理程序定义为一个独立的、有名字的函数 `showAlert`。这样做的好处是：
    1.  **可读性好**: 函数名清晰地表达了它的作用。
    2.  **可复用**: 如果其他地方也需要这个功能，可以直接调用 `showAlert()`。
    3.  **便于移除监听**: 如果未来需要取消这个事件监听，可以使用 `btn.removeEventListener('click', showAlert)`，这对于命名函数是可行的，但对于匿名函数则很困难。**（面试可能会问如何移除事件监听）**

#### 案例 2：交互式表单验证提示

在用户注册或登录页面，我们常常需要实时提醒用户输入是否合法。

**HTML 代码:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>事件监听案例2</title>
    <style> .error { color: red; font-size: 12px; } </style>
</head>
<body>
    <label for="username">用户名:</label>
    <input type="text" id="username" placeholder="长度必须大于5位">
    <p id="message" class="error"></p>
    <script src="app.js"></script>
</body>
</html>
```

**JavaScript 代码 (`app.js`):**

```javascript
// 1. 获取元素
const usernameInput = document.querySelector('#username');
const message = document.querySelector('#message');

// 2. 添加输入事件监听
usernameInput.addEventListener('input', function() {
  // 'input' 事件在输入框内容每次改变时都会触发

  // 3. 在事件处理函数中编写逻辑
  if (usernameInput.value.length <= 5) {
    message.textContent = '用户名长度必须大于5位！';
  } else {
    message.textContent = ''; // 如果合法，清空提示信息
  }
});
```

**代码解析与面试要点:**

*   **事件类型选择**: 这里我们用了 `'input'` 事件。它比 `'change'` 事件（在输入框失去焦点时才触发）的响应更实时，用户体验更好。另一个相关的事件是 `'keydown'` 或 `'keyup'`，但 `'input'` 事件能更好地处理粘贴、拖拽等非键盘输入的情况。
*   **匿名函数**: 这里我们直接在 `addEventListener` 的第二个参数位置写了一个函数，这种函数被称为**匿名函数**。在事件处理逻辑不复杂且不需要复用的情况下，使用匿名函数非常普遍，代码更紧凑。
*   **获取输入值**: 在事件处理函数内部，通过 `usernameInput.value` 可以获取到输入框当前的值。
*   **DOM 操作**: 通过 `message.textContent` 来修改提示信息的文本内容。这是修改元素文本内容的标准做法。



#### 案例 3：动态列表项的删除（事件委托）

假设你有一个列表，列表项是动态添加的，你希望点击任何一个列表项的删除按钮都能删除它。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>事件监听案例3</title>
</head>
<body>
    <h2>待办事项</h2>
    <ul id="todo-list">
        <li>学习 HTML <button class="delete">删除</button></li>
        <li>学习 CSS <button class="delete">删除</button></li>
        <li>学习 JavaScript <button class="delete">删除</button></li>
    </ul>
    <script src="app.js"></script>
</body>
</html>
```

**JavaScript 代码 (`app.js`):**
```javascript
// 获取父元素 ul
const todoList = document.querySelector('#todo-list');

todoList.addEventListener('click', function(event) {
  // 'event' 就是我们前面提到的事件对象
  // event.target 指向的是用户实际点击的那个元素
  
  // 检查用户点击的是否是删除按钮
  if (event.target.className === 'delete') {
    // 如果是，找到该按钮所在的 li 元素并删除它
    const listItem = event.target.parentElement;
    todoList.removeChild(listItem);
  }
});
```

**代码解析与面试要点:**

*   **性能问题**: 如果你给每一个删除按钮都单独添加一个事件监听器，当列表项非常多（比如成百上千个）时，会创建大量的监听器，占用大量内存，导致性能下降。
*   **事件委托 (Event Delegation)**: 这是一个**非常重要**的性能优化技巧，也是**面试高频考点**。它的核心思想是：**不给每个子元素单独设置监听器，而是把监听器设置在其父元素上。** 利用事件冒泡（事件会从子元素向父元素传播）的原理，在父元素的监听器中通过 `event.target` 判断事件的实际来源，然后执行相应操作。
*   **优点**:
    1.  **性能提升**: 只需创建一个监听器，减少了内存占用。
    2.  **动态适应**: 即使是后来通过 JavaScript 动态添加到列表中的新 `<li>` 和按钮，也无需重新绑定事件，因为事件监听器在父元素 `<ul>` 上，新元素天然就在其“管辖范围”内。
*   **`event.target`**: 这是事件对象的一个关键属性，它总是指向触发事件的那个最具体的元素（在这个例子中，就是用户点击的那个 `<button>` 或 `<li>`）。

### 总结与回顾

1.  **核心概念**: 事件是用户的行为或浏览器的行为。事件监听就是让 JavaScript 等待并响应这些行为。
2.  **标准方法**: 始终使用 `element.addEventListener('eventType', handlerFunction)` 来绑定事件。
3.  **分离原则**: 保持 HTML、CSS 和 JavaScript 的分离，代码更清晰，易于维护。
4.  **函数选择**: 根据可复用性和逻辑复杂度，选择使用命名函数或匿名函数作为事件处理程序。
5.  **实际应用**:
    *   简单的交互使用直接绑定，如按钮点击。
    *   实时反馈使用 `'input'` 事件，如表单验证。
    *   对于动态或大量的子元素，一定要使用**事件委托**来优化性能。

现在你可以尝试自己动手实现这个案例，并思考一下：如果让你为一个图片库实现点击图片放大的功能，你会怎么做？如果这些图片是动态加载的呢？（提示：事件委托是绝佳方案）。



