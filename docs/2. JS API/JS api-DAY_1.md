## JS API

---

### **1：变量声明的现代化 (Modern Variable Declaration)**

在编写任何逻辑之前，我们需要存储数据。在现代JavaScript (ES6及以后版本)中，我们主要使用 `let` 和 `const` 来声明变量，而旧有的 `var` 则因其固有的缺陷已不被推荐使用。

#### **1.1 `var` 的问题**

`var` 是JavaScript早期的变量声明方式，它存在两个主要问题：

1.  **函数作用域 (Function Scope):** `var` 声明的变量只在它所在的函数内部有效。在 `for` 循环或 `if` 语句块中声明的 `var` 变量会“泄露”到函数全局，这被称为“变量提升”（Hoisting），容易导致意料之外的错误。
2.  **可重复声明:** 在同一个作用域内，`var` 允许你重复声明同一个变量，这会无声地覆盖之前的值，增加调试难度。

#### **1.2 `let`：块级作用域的变量**

`let` 是对 `var` 的改进，解决了上述问题。

*   **核心特性：**
    *   **块级作用域 (Block Scope):** `let` 声明的变量，其作用域仅限于它所在的 `{}` 代码块（例如 `if` 块、`for` 循环块）。这使得代码的边界更加清晰。
    *   **不可重复声明:** 在同一个作用域内，尝试用 `let` 再次声明一个已存在的变量会直接报错。
    *   **无变量提升:** 你必须在声明之后才能使用 `let` 变量，否则会报错（暂时性死区 - TDZ）。

#### **1.3 `const`：不可变的常量引用**

`const` 用于声明一个常量，它的行为与 `let` 类似，但更加严格。

*   **核心特性：**
    *   **块级作用域:** 与 `let` 相同。
    *   **声明时必须初始化:** `const` 声明的变量必须在声明的同时赋值。
    *   **引用不可变:** 一旦赋值，其内存地址（引用）就不能再改变。
        *   对于**基本数据类型** (如 `String`, `Number`, `Boolean`)，这意味着**值不可变**。
        *   对于**引用数据类型** (如 `Object`, `Array`)，这意味着**不能将变量重新指向另一个对象或数组**，但你**可以修改该对象或数组内部的属性或元素**。

**【手把手教学】实践变量声明**

1.  在你的电脑上创建一个文件夹，例如 `js-practice`。
2.  在文件夹中创建两个文件：`index.html` 和 `script.js`。
3.  在 `index.html` 中输入以下基础结构，并引入 `script.js`。

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>JS Learning</title>
    </head>
    <body>
        <h1>JavaScript 变量声明</h1>
        <!-- 我们将在这里通过JS操作DOM -->

        <!-- 确保 script 标签在 body 结束前，这样可以保证JS执行时HTML元素已经加载完毕 -->
        <script src="./script.js"></script>
    </body>
    </html>
    ```

4.  打开 `script.js` 文件，我们将在这里编写和测试代码。你可以在浏览中打开 `index.html`，然后按 `F12` 打开开发者工具，选择 "Console" (控制台) 查看 `console.log` 的输出。

    ```javascript
    // script.js
    
    // --- 1. 体验 let ---
    console.log("--- let 示例 ---");
    let price = 100;
    console.log("价格:", price); // 输出: 价格: 100
    
    // price = 120; // let 允许重新赋值
    // let price = 150; // 错误！Uncaught SyntaxError: Identifier 'price' has already been declared.
    
    if (true) {
        let blockScopedVar = "我只在 if 块内有效";
        console.log(blockScopedVar); // 输出: 我只在 if 块内有效
    }
    // console.log(blockScopedVar); // 错误！Uncaught ReferenceError: blockScopedVar is not defined.


    // --- 2. 体验 const ---
    console.log("\n--- const 示例 ---");
    const taxRate = 0.07;
    console.log("税率:", taxRate);
    
    // taxRate = 0.08; // 错误！Uncaught TypeError: Assignment to constant variable.
    
    // 对于对象
    const user = {
        name: "张三",
        age: 25
    };
    
    // user = {}; // 错误！不能将 user 指向一个新对象
    
    // 但是可以修改对象内部的属性
    user.age = 26;
    console.log("用户信息:", user); // 输出: 用户信息: { name: '张三', age: 26 }
    
    // **结论：** 优先使用 `const`。当你明确知道一个变量需要被重新赋值时，才使用 `let`。避免使用 `var`。
    ```

---

### **2：文档对象模型 (DOM)**

浏览器在加载一个HTML文档时，会将其解析成一个树形结构，这个结构就是**文档对象模型 (Document Object Model,简称DOM)**。JavaScript正是通过操作这个模型来实现对网页内容的动态控制。

*   **DOM (文档对象模型):** 是W3C组织推荐的处理可扩展标记语言（如HTML）的标准编程接口。它是一个与平台和语言无关的API，允许程序和脚本动态地访问和更新文档的内容、结构和样式。
*   **DOM树 (DOM Tree):** 是HTML文档在内存中的树状表现形式。文档的每一个标签（`<html>`, `<body>`, `<h1>`, `<p>`等）、属性（`class`, `id`等）乃至文本内容，都被转换成树上的一个**节点 (Node)**。`<html>`是根节点，`<body>`和`<head>`是它的子节点，以此类推，形成一个层级分明的树。
*   **DOM对象 (DOM Object / Element):** DOM树中的每个节点都是一个对象。例如，一个`<p>`标签在DOM中就是一个“段落对象”，这个对象拥有各种**属性**（如 `id`, `className`, `textContent`）和**方法**（如 `addEventListener()`, `remove()`），我们可以通过JavaScript来访问和调用它们。**我们操作网页的本质，就是操作这些DOM对象。**

---

### **3：获取与操作DOM元素**

这是DOM操作的核心。首先要“抓住”你想操作的那个元素，然后才能对它为所欲为。

#### **3.1 获取DOM元素**

有多种方法可以获取DOM元素，现代开发中最常用的是 `querySelector` 和 `querySelectorAll`。

*   **`document.querySelector(CSS选择器)`**
    *   **作用:** 根据指定的CSS选择器，返回匹配到的**第一个**元素对象。
    *   **参数:** 一个包含一个或多个CSS选择器的字符串。例如 `"#myId"`, `".myClass"`, `"h1"`, `"div .item"`。
    *   **返回值:** 如果找到，返回该元素对象；如果没找到，返回 `null`。

*   **`document.querySelectorAll(CSS选择器)`**
    *   **作用:** 根据指定的CSS选择器，返回匹配到的**所有**元素对象。
    *   **返回值:** 返回一个 `NodeList` 对象，它是一个类数组的集合，包含了所有匹配的元素。即使只找到一个或没找到，它也返回 `NodeList`（没找到时为空的`NodeList`）。你可以像遍历数组一样使用 `forEach` 或 `for...of` 循环来处理它。

*   **`getElementBy...` 系列 (传统方法)**
    *   `document.getElementById(id)`: 通过元素ID获取，速度最快，返回单个元素对象或 `null`。
    *   `document.getElementsByClassName(className)`: 通过类名获取，返回一个**实时的** `HTMLCollection`。
    *   `document.getElementsByTagName(tagName)`: 通过标签名获取，返回一个**实时的** `HTMLCollection`。
    *   **注意:** `HTMLCollection` 是“实时”的，意味着如果文档中的元素发生变化，它会立即反映出来。它不像 `NodeList` 那样有 `forEach` 方法，需要用 `for` 循环或转换成真数组来遍历。

**【手把手教学】获取元素**

1.  修改你的 `index.html` 文件，添加一些可供选择的元素。

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>JS Learning</title>
    </head>
    <body>
        <h1 id="main-title">JavaScript DOM 操作</h1>
        <p class="intro">这是介绍段落。</p>
        <div class="container">
            <p>第一个段落。</p>
            <p class="special">第二个段落，带有特殊类名。</p>
        </div>
        <img src="placeholder.jpg" alt="占位图">
        <a href="https://example.com">这是一个链接</a>

        <script src="./script.js"></script>
    </body>
    </html>
    ```

2.  清空并更新 `script.js` 文件，练习获取这些元素。

    ```javascript
    // script.js
    
    // --- 1. 使用 querySelector (推荐) ---
    console.log("--- querySelector ---");
    // 通过 ID 获取
    const mainTitle = document.querySelector('#main-title');
    console.log(mainTitle);
    
    // 通过 class 获取 (只返回第一个匹配的)
    const firstParagraph = document.querySelector('.intro');
    console.log(firstParagraph);
    
    // 通过 标签名 + class 复合选择器获取
    const specialParagraph = document.querySelector('p.special');
    console.log(specialParagraph);


    // --- 2. 使用 querySelectorAll (推荐) ---
    console.log("\n--- querySelectorAll ---");
    // 获取所有 class 为 "container" 元素内部的 p 标签
    const allParagraphsInContainer = document.querySelectorAll('.container p');
    console.log(allParagraphsInContainer); // 这是一个 NodeList
    
    // 遍历 NodeList
    allParagraphsInContainer.forEach((p, index) => {
        console.log(`容器中的第 ${index + 1} 个段落:`, p);
    });


    // --- 3. 使用传统方法 ---
    console.log("\n--- 传统方法 ---");
    const titleById = document.getElementById('main-title');
    console.log(titleById);
    
    // 注意：getElementBy... 返回的是 HTMLCollection，不是 NodeList
    const paragraphsByTag = document.getElementsByTagName('p');
    console.log(paragraphsByTag);
    
    // 遍历 HTMLCollection (不能用 forEach)
    for (let i = 0; i < paragraphsByTag.length; i++) {
        console.log(`第 ${i} 个 p 标签:`, paragraphsByTag[i]);
    }
    ```

#### **3.2 DOM修改元素内容**

获取到元素对象后，最常见的操作就是修改其内部的内容。

*   **`element.textContent`**
    *   **作用:** 获取或设置一个元素及其所有后代节点的**纯文本**内容。
    *   **优点:** 自动对HTML标签进行转义，能有效防止**跨站脚本攻击 (XSS)**。性能比 `innerHTML` 稍好。当你只想处理纯文本时，这是**首选**。

*   **`element.innerHTML`**
    *   **作用:** 获取或设置一个元素的HTML内容。
    *   **风险:** 如果将用户输入的内容直接赋给 `innerHTML`，恶意用户可以注入 `<script>` 标签来执行恶意代码。**除非你完全信任内容的来源，或者已经对内容进行了严格的清理，否则请谨慎使用。**

**【手把手教学】修改内容**

在 `script.js` 的末尾追加以下代码：

```javascript
// 接上文...

console.log("\n--- 修改元素内容 ---");

// 获取标题元素
const titleElement = document.querySelector('#main-title');

// 1. 使用 textContent (安全)
console.log("原始标题文本:", titleElement.textContent);
titleElement.textContent = "欢迎来到JavaScript世界！ (通过textContent修改)";

// 2. 使用 innerHTML (可以解析HTML标签)
const introParagraph = document.querySelector('.intro');
console.log("原始段落HTML:", introParagraph.innerHTML);
introParagraph.innerHTML = "这是一个<strong>加粗</strong>的介绍段落。(通过innerHTML修改)";

// 演示 innerHTML 的风险，切勿在实际项目对用户输入这么做
// introParagraph.innerHTML = "<script>alert('你被攻击了！')</script>";
```

刷新 `index.html` 页面，你会看到标题和段落的内容都发生了改变。

#### **3.3 DOM修改元素常见属性**

HTML元素的属性（如 `<img>` 的 `src`，`<a>` 的 `href`）都可以通过DOM对象直接访问和修改。

*   **语法:** `element.属性名 = '新值';`

常用的属性包括：`src`, `href`, `title`, `alt`, `id`, `className`。

**【手把手教学】修改属性**

在 `script.js` 的末尾追加以下代码：

```javascript
// 接上文...

console.log("\n--- 修改元素属性 ---");

// 获取图片和链接元素
const image = document.querySelector('img');
const link = document.querySelector('a');

// 修改图片的 src 和 alt 属性
console.log("原始图片src:", image.src);
image.src = "https://via.placeholder.com/150"; // 使用一个在线占位图服务
image.alt = "一个150x150的占位图";

// 修改链接的 href 属性
console.log("原始链接href:", link.href);
link.href = "https://developer.mozilla.org/zh-CN/";
link.textContent = "跳转到 MDN"; // 同时修改链接的文本
```

刷新页面，你会看到图片和链接都已更新。

#### **3.4 通过`style`属性修改样式**

每个DOM元素都有一个 `style` 属性，它对应于该元素的**内联样式 (inline style)**。你可以通过它来直接修改元素的CSS样式。

*   **语法:** `element.style.样式属性 = '新值';`
*   **命名规则:** CSS属性名在JavaScript中需要转换为**小驼峰命名法 (camelCase)**。
    *   `background-color` -> `backgroundColor`
    *   `font-size` -> `fontSize`
    *   `border-left` -> `borderLeft`

**【手-手教学】修改样式**

在 `script.js` 的末尾追加以下代码：

```javascript
// 接上文...

console.log("\n--- 修改元素样式 ---");

// 获取标题和特殊段落
const h1 = document.querySelector('#main-title');
const pSpecial = document.querySelector('.special');

// 修改标题的样式
h1.style.color = 'blue';
h1.style.backgroundColor = '#f0f0f0'; // CSS中的 background-color
h1.style.padding = '10px';
h1.style.textAlign = 'center';

// 修改特殊段落的样式
pSpecial.style.fontWeight = 'bold'; // CSS中的 font-weight
pSpecial.style.fontSize = '20px'; // CSS中的 font-size
pSpecial.style.border = '2px solid red';
```

刷新页面，你会看到元素的样式发生了显著的变化。

#### **本部分小结与作业**

*   **小结：** 我们掌握了声明变量的现代化方式（`let` 和 `const`），并深入理解了DOM的核心概念。最重要的是，我们学会了如何使用 `querySelector` 和 `querySelectorAll` 精准获取页面元素，并利用 `.textContent` / `.innerHTML` 修改内容，直接访问属性来修改如 `src`、`href`，以及通过 `element.style` 对象来动态改变元素的CSS样式。

*   **作业（实战演练！）：**

    **任务：** 创建一个简单的“产品展示卡”，并用JS动态填充数据和样式。

    1.  **创建HTML结构 (`index.html`):**
        *   创建一个 `div` 作为卡片容器，并给它一个 `id="product-card"`。
        *   在容器内，放置一个 `img` 标签（`id="product-image"`）、一个 `h2` 标签（`id="product-name"`）、一个 `p` 标签（`id="product-desc"`）和一个 `span` 标签（`id="product-price"`）。
        *   初始时，这些标签可以没有内容，或者只有占位文本。

        ```html
        <!-- 放在 body 标签内 -->
        <div id="product-card" style="border: 1px solid #ccc; width: 250px; padding: 15px; text-align: center;">
            <img id="product-image" src="" alt="产品图片" style="width: 100%;">
            <h2 id="product-name">产品名称</h2>
            <p id="product-desc">产品描述...</p>
            <span id="product-price" style="font-size: 24px; color: red;">￥0.00</span>
        </div>
        ```

    2.  **编写JavaScript (`script.js`):**
        *   定义一个`const`对象，用来存储产品数据，例如：
            ```javascript
            const productData = {
                name: '高性能无线鼠标',
                description: '人体工学设计，2.4GHz无线连接，长效续航。',
                price: 199.00,
                imageUrl: 'https://via.placeholder.com/250x200?text=Mouse'
            };
            ```
        *   **获取元素：** 使用 `document.querySelector` 或 `getElementById` 获取上面创建的所有HTML元素（图片、名称、描述、价格）。
        *   **填充内容：**
            *   使用 `.textContent` 将 `productData` 中的 `name`, `description` 和 `price` 分别设置到对应的 `h2`, `p`, `span` 元素中。（提示：价格前可以拼接一个 "￥" 符号）。
            *   使用 `.src` 和 `.alt` 属性，将 `productData` 中的 `imageUrl` 和 `name` 设置到 `img` 元素上。
        *   **修改样式：**
            *   获取 `product-card` 的 `div` 元素。
            *   使用 `.style` 属性，将其 `boxShadow` 设置为 `'0 4px 8px rgba(0,0,0,0.1)'`，使其看起来有立体感。
            *   获取价格 `span` 元素，如果 `productData.price` 小于 200，则使用 `.style.color` 将其颜色设置为 `'green'`。



---



### **4：通过类名 (ClassName) 修改样式**

直接通过 `element.style` 修改样式虽然直观，但有两大弊病：
1.  **样式与逻辑耦合：** 大量的样式代码混杂在JavaScript逻辑中，难以维护。
2.  **效率低下：** 如果要修改多个样式，需要写多行 `element.style.xxx` 代码。

更优雅、更推荐的做法是：**在CSS中预先定义好样式类，然后用JavaScript动态地为元素添加或移除这些类。**

#### **4.1 `element.className`**

这是一个简单直接的属性，它获取或设置一个元素的 `class` 属性的**整个字符串值**。

*   **获取:** `const currentClasses = element.className;`
*   **设置:** `element.className = 'new-class another-class';`

**缺点：** 这种方式是**覆盖式**的。如果你想在原有类的基础上追加一个新类，你需要先获取旧的类字符串，然后拼接新类，再整个赋值回去，非常繁琐且容易出错。

```javascript
// 假设元素已有 class="intro"
const p = document.querySelector('.intro');
// 错误的做法，会覆盖掉 "intro"
// p.className = 'highlight'; 
// 正确但繁琐的做法
p.className = p.className + ' highlight'; // "intro highlight"
```
由于这种操作的不便，我们现在更推荐使用 `classList`。

### **5：通过 `classList` 修改样式 (推荐)**

`element.classList` 是一个更现代、更强大的API，它返回一个DOM元素的实时 `DOMTokenList` 集合。它提供了一系列便捷的方法来操作类，而无需手动处理字符串。

*   **核心方法：**
    *   `element.classList.add('className')`: 添加一个或多个类。
    *   `element.classList.remove('className')`: 移除一个或多个类。
    *   `element.classList.toggle('className')`: 如果类存在，则移除它；如果不存在，则添加它。非常适合做切换效果（如开关灯、菜单展开/折叠）。
    *   `element.classList.contains('className')`: 检查元素是否包含指定的类，返回 `true` 或 `false`。

**【手把手教学】使用 `classList`**

1.  **准备环境：** 我们需要一个新的HTML和CSS。
    *   创建一个 `style.css` 文件。
    *   修改 `index.html`，引入 `style.css` 并添加新的元素。

    **`style.css` 文件:**
    ```css
    /* 默认样式 */
    .message {
        padding: 15px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-bottom: 10px;
    }
    
    /* 成功状态的样式 */
    .success {
        background-color: #d4edda;
        color: #155724;
        border-color: #c3e6cb;
    }
    
    /* 错误状态的样式 */
    .error {
        background-color: #f8d7da;
        color: #721c24;
        border-color: #f5c6cb;
    }
    
    /* 高亮状态的样式 */
    .highlight {
        box-shadow: 0 0 10px rgba(0, 0, 255, 0.5);
    }
    ```

    **`index.html` 文件 (可以替换掉之前的内容):**
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>JS ClassList and Forms</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <div id="status-box" class="message">这是一个待处理的消息。</div>
        <button id="btn-success">设为成功</button>
        <button id="btn-error">设为错误</button>
        <button id="btn-toggle-highlight">切换高亮</button>
        <button id="btn-reset">重置</button>
        
        <hr>
        
        <!-- 下一节会用到的表单 -->
    
        <script src="./script.js"></script>
    </body>
    </html>
    ```

2.  **编写 JavaScript (`script.js`):** 清空 `script.js`，然后写入以下代码。

    ```javascript
    // script.js
    
    // 1. 获取元素
    const statusBox = document.querySelector('#status-box');
    const btnSuccess = document.querySelector('#btn-success');
    const btnError = document.querySelector('#btn-error');
    const btnToggle = document.querySelector('#btn-toggle-highlight');
    const btnReset = document.querySelector('#btn-reset');
    
    // 2. 绑定点击事件并操作 classList
    btnSuccess.addEventListener('click', () => {
        // 先移除可能存在的 error 类，再添加 success 类
        statusBox.classList.remove('error');
        statusBox.classList.add('success');
        statusBox.textContent = '操作成功！';
    });
    
    btnError.addEventListener('click', () => {
        statusBox.classList.remove('success');
        statusBox.classList.add('error');
        statusBox.textContent = '发生错误！';
    });
    
    btnToggle.addEventListener('click', () => {
        // toggle 方法非常方便
        statusBox.classList.toggle('highlight');
        
        // 使用 contains 检查状态
        if (statusBox.classList.contains('highlight')) {
            console.log('高亮已开启');
        } else {
            console.log('高亮已关闭');
        }
    });
    
    btnReset.addEventListener('click', () => {
        // 一次性移除多个类
        statusBox.classList.remove('success', 'error', 'highlight');
        // 也可以用 className 属性直接重置
        // statusBox.className = 'message';
        statusBox.textContent = '这是一个待处理的消息。';
    });
    ```
    打开 `index.html` 并点击按钮，你会看到 `status-box` 的样式随着类的增删而流畅地变化。这完美地实现了**样式与逻辑分离**。

### **6：获取与设置表单的值**

与用户交互最常见的方式就是通过表单。JavaScript可以轻松地获取和设置各种表单控件（input, textarea, select等）的值。

*   **核心属性：** `element.value`
    *   对于 `input`, `textarea`, `select` 等元素，`.value` 属性可以获取或设置其当前的值。
    *   对于 `type="checkbox"` 或 `type="radio"` 的 `input`，我们通常更关心其选中状态，使用 `.checked` 属性（返回 `true` 或 `false`）。

**【手把手教学】操作表单**

1.  **准备HTML:** 在 `index.html` 的 `<hr>` 标签下方添加一个表单。

    ```html
    <!-- index.html (接上文) -->
    <form id="user-form">
        <div>
            <label for="username">用户名:</label>
            <input type="text" id="username" value="defaultUser">
        </div>
        <div>
            <label for="bio">个人简介:</label>
            <textarea id="bio">这是默认简介。</textarea>
        </div>
        <div>
            <label for="city">所在城市:</label>
            <select id="city">
                <option value="beijing">北京</option>
                <option value="shanghai" selected>上海</option>
                <option value="shenzhen">深圳</option>
            </select>
        </div>
        <div>
            <input type="checkbox" id="agree-terms">
            <label for="agree-terms">我同意服务条款</label>
        </div>
        <button type="submit">提交</button>
    </form>
    <div id="form-output"></div>
    ```

2.  **编写JavaScript:** 在 `script.js` 的末尾追加以下代码。

    ```javascript
    // script.js (接上文)
    
    // 1. 获取表单和输出区域的元素
    const userForm = document.querySelector('#user-form');
    const usernameInput = document.querySelector('#username');
    const bioTextarea = document.querySelector('#bio');
    const citySelect = document.querySelector('#city');
    const agreeCheckbox = document.querySelector('#agree-terms');
    const formOutput = document.querySelector('#form-output');
    
    // 2. 监听表单的 submit 事件
    userForm.addEventListener('submit', function(event) {
        // 阻止表单的默认提交行为（即页面刷新）
        event.preventDefault();
    
        // 3. 获取各个表单控件的值
        const username = usernameInput.value;
        const bio = bioTextarea.value;
        const city = citySelect.value;
        const isAgreed = agreeCheckbox.checked; // .checked for checkboxes
    
        // 4. 对数据进行处理和展示
        let outputHTML = `
            <h3>提交的数据:</h3>
            <p><strong>用户名:</strong> ${username}</p>
            <p><strong>简介:</strong> ${bio}</p>
            <p><strong>城市:</strong> ${city}</p>
            <p><strong>是否同意:</strong> ${isAgreed ? '是' : '否'}</p>
        `;
        
        formOutput.innerHTML = outputHTML;
    
        // 演示如何用JS设置值
        if (username === 'admin') {
            bioTextarea.value = '管理员已登录，简介已自动更新。';
        }
    });
    ```
    现在，刷新页面，修改表单内容后点击“提交”按钮，你将看到获取到的数据被显示在页面下方。

### **7：H5自定义属性-`data-*`**

有时，我们需要在HTML元素上存储一些与样式无关、但与JavaScript逻辑相关的数据（例如，一个用户的ID，一个产品的编号）。直接添加自定义属性（如 `mydata="123"`）是不规范的。HTML5为此提供了一个标准化的解决方案：`data-*` 属性。

*   **定义:** 在HTML中，以 `data-` 开头的属性都是合法的自定义数据属性。例如：`<div data-user-id="101" data-role="admin"></div>`
*   **访问:** 在JavaScript中，可以通过元素的 `dataset` 属性来访问这些值。`dataset` 是一个对象，它会自动将 `data-*` 属性名转换为小驼峰格式。
    *   `data-user-id`  -> `element.dataset.userId`
    *   `data-role`     -> `element.dataset.role`

**【手把手教学】使用 `data-*` 属性**

1.  **准备HTML:** 创建一个产品列表。

    ```html
    <!-- index.html (可以新建或替换) -->
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Data Attributes</title>
        <style> .product { cursor: pointer; padding: 5px; border-bottom: 1px solid #eee; } .product:hover { background: #f0f0f0; } </style>
    </head>
    <body>
        <h2>产品列表 (点击查看详情)</h2>
        <div id="product-list">
            <div class="product" data-product-id="p-001" data-price="299" data-in-stock="true">手机</div>
            <div class="product" data-product-id="p-002" data-price="4999" data-in-stock="false">笔记本电脑</div>
            <div class="product" data-product-id="p-003" data-price="89" data-in-stock="true">鼠标</div>
        </div>
        <div id="product-details"></div>
        <script src="script.js"></script>
    </body>
    </html>
    ```

2.  **编写JavaScript:**
    ```javascript
    // script.js
    const productList = document.querySelector('#product-list');
    const detailsDiv = document.querySelector('#product-details');
    
    productList.addEventListener('click', function(event) {
        // event.target 是用户实际点击的那个元素
        const clickedElement = event.target;
    
        // 确认点击的是一个产品项
        if (clickedElement.classList.contains('product')) {
            // 通过 dataset 获取数据
            const productId = clickedElement.dataset.productId;
            const price = clickedElement.dataset.price;
            // dataset里的值都是字符串，需要时要转换类型
            const inStock = clickedElement.dataset.inStock === 'true'; 
    
            // 显示详情
            detailsDiv.innerHTML = `
                <h3>产品详情</h3>
                <p>ID: ${productId}</p>
                <p>价格: ${price} 元</p>
                <p>库存状态: ${inStock ? '有货' : '缺货'}</p>
            `;
            
            // 演示如何用JS设置data-*属性
            clickedElement.dataset.lastClicked = new Date().getTime();
            console.log(clickedElement.dataset); // 查看所有dataset属性
        }
    });
    ```
    点击不同的产品项，可以看到详情区域会根据每个元素上存储的`data-*`属性动态更新。

### **8：定时器 - 间歇函数 `setInterval`**

定时器是让JavaScript代码能够**延迟执行**或**周期性执行**的机制，是实现动画、轮播图、倒计时等动态效果的基础。

*   **`setInterval(callback, delay)`**
    *   **作用:** 每隔指定的毫秒数（`delay`），就执行一次回调函数（`callback`）。它会一直重复执行，直到被清除。
    *   **参数:**
        *   `callback`: 要执行的函数。
        *   `delay`: 间隔时间，单位是毫秒 (1000ms = 1s)。
    *   **返回值:** 返回一个唯一的ID号，这个ID可以被用来取消该定时器。

*   **`clearInterval(timerId)`**
    *   **作用:** 接收一个由 `setInterval` 返回的ID，停止对应的定时器。

**【手把手教学】制作一个简单的数字时钟**

1.  **准备HTML:**
    ```html
    <!-- index.html -->
    <!DOCTYPE html>
    <html lang="en">
    <head><title>setInterval Clock</title></head>
    <style> #clock { font-size: 48px; font-family: 'Courier New', Courier, monospace; background: #333; color: #0f0; padding: 20px; border-radius: 10px; display: inline-block; } </style>
    <body>
        <div id="clock">00:00:00</div>
        <button id="stop-clock">停止时钟</button>
        <script src="script.js"></script>
    </body>
    </html>
    ```

2.  **编写JavaScript:**
    ```javascript
    // script.js
    const clockDiv = document.querySelector('#clock');
    const stopButton = document.querySelector('#stop-clock');
    
    function updateClock() {
        const now = new Date(); // 获取当前时间对象
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        clockDiv.textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    // 立即执行一次，避免页面加载后有1秒的空白
    updateClock(); 
    
    // 设置定时器，每1000毫秒（1秒）调用一次 updateClock 函数
    const clockTimer = setInterval(updateClock, 1000);
    
    // 点击按钮时清除定时器
    stopButton.addEventListener('click', () => {
        clearInterval(clockTimer);
        console.log('时钟已停止！Timer ID:', clockTimer, '已被清除。');
        clockDiv.textContent = '已停止';
    });
    ```
    刷新页面，一个实时跳动的数字时钟就完成了！点击按钮可以停止它。

#### **本部分小结与作业**

*   **小结：** 我们学习了更高级的DOM操作技巧。通过`classList`可以优雅地管理元素样式；通过`.value`和`.checked`可以轻松掌控表单数据；`data-*`属性为我们在HTML中附加数据提供了标准化的途径；而`setInterval`则为我们打开了通往动态网页效果的大门。

*   **作业（综合大挑战！）：**

    **项目：** 创建一个简单的“待办事项列表 (To-Do List)”。

    1.  **HTML 结构 (`index.html`):**
        *   一个 `input` 文本框 (`id="todo-input"`)，用于输入新的待办事项。
        *   一个“添加”按钮 (`id="add-btn"`）。
        *   一个 `ul` 列表 (`id="todo-list"`)，用于展示所有待办事项。

    2.  **CSS 样式 (`style.css`):**
        *   创建一个名为 `.done` 的类，当待办事项完成后，可以给 `li` 元素添加这个类。这个类应该包含样式，比如 `text-decoration: line-through;` 和 `color: #888;`。

    3.  **JavaScript 逻辑 (`script.js`):**
        *   **添加功能：**
            *   监听“添加”按钮的点击事件。
            *   当点击时，获取 `input` 框的 `.value`。如果值不为空：
            *   创建一个新的 `li` 元素 (`document.createElement('li')`)。
            *   创建一个“完成”按钮 (`document.createElement('button')`) 和一个“删除”按钮。
            *   将 `input` 的值和这两个按钮放入 `li` 元素中 (可以使用 `innerHTML` 或 `append`)。
            *   为每个 `li` 设置一个唯一的 `data-id` 属性 (可以使用时间戳 `new Date().getTime()` 或一个自增的数字)。
            *   将这个新的 `li` 添加到 `ul` 列表中 (`list.appendChild(newLi)`)。
            *   清空 `input` 框。
        *   **完成/删除功能 (事件委托):**
            *   **不要**给每个按钮单独添加事件监听器。而是给父元素 `ul` 添加一个点击事件监听器。
            *   在 `ul` 的事件回调中，通过 `event.target` 判断用户点击的是“完成”按钮还是“删除”按钮（可以通过 `classList` 或 `tagName` 判断）。
            *   如果点击的是“删除”按钮，找到它所在的 `li` 元素 (`event.target.parentElement`) 并将其从DOM中移除 (`li.remove()`)。
            *   如果点击的是“完成”按钮，找到它所在的 `li` 元素，并使用 `classList.toggle('done')` 来切换完成状态的样式。
        *   **(选做) 定时器增强：** 当添加一个新任务时，使用 `setTimeout(callback, delay)` (与 `setInterval` 类似，但只执行一次)，让新添加的 `li` 在2秒后自动消失。你需要用 `clearTimeout()` 来取消这个行为，比如当用户手动删除它时。

这个作业综合运用了本章几乎所有的知识点：动态创建元素、操作 `classList`、处理表单值、事件处理（特别是事件委托），以及定时器。完成它，你将对JavaScript的DOM编程有非常扎实的理解。



