## **DAY 4 - 函数与作用域：构建程序的基石**

### **1. 函数的基本使用与封装练习**

*   **什么是函数 (Function)？**
    函数是**可重复执行**的、用于执行特定任务的**代码块**。你可以把它想象成一个“配方”或者一个“机器”。你给它一些“原料”（参数），它就按照内部的“指令”（代码）进行处理，最后可能给你一个“成品”（返回值）。

*   **为什么要使用函数（封装）？**
    *   **代码复用 (Reusability):** 遵循 **DRY (Don't Repeat Yourself)** 原则。将重复的逻辑抽离成函数，可以极大减少代码冗余。
    *   **模块化与可维护性 (Modularity & Maintainability):** 将大型程序拆解为一个个小函数，使代码结构更清晰。当需要修改某个功能时，我们只需要修改对应的函数，而不会影响到其他部分。
    *   **抽象与封装 (Abstraction & Encapsulation):** 我们可以隐藏复杂的实现细节，只暴露一个简单的接口（函数名）。调用者不需要关心函数内部是如何实现的，只需要知道它的功能。
    *   **可读性：** 通过函数名，我们可以清晰地了解这段代码是做什么的，让代码更易于理解。
    
*   **函数的基本语法 (函数声明)**

    ```javascript
    function functionName(parameter1, parameter2) {
      // 函数体 (要执行的代码)
    }
    ```

*   **函数的调用**
    声明一个函数并不会执行它。你必须通过 `函数名()` 的方式来“调用”它。

*   **封装练习：封装一个打招呼的函数**

    ```javascript
    // 1. 声明（封装）一个函数，名为 sayHello
    function sayHello() {
      console.log('大家好，我是一个函数！');
      console.log('我学会了封装代码。');
    }
    
    // 2. 调用函数，想用几次就调用几次
    sayHello();
    sayHello();
    ```

---

### **2. 函数的参数以及默认参数**

函数真正的威力在于它的灵活性。我们可以通过**参数 (Parameters)** 让函数处理不同的数据。

*   **形参 (Parameters):** 在**声明函数**时，写在括号里，作为函数内部的“占位符”变量。
*   **实参 (Arguments):** 在**调用函数**时，传递给函数的具体的值。

```javascript
// 'name' 和 'age' 就是形参
function introduce(name, age) {
  console.log(`大家好，我叫 ${name}，我今年 ${age} 岁了。`);
}

// '张三' 和 25 就是实参，它们会按顺序传递给形参
introduce('张三', 25);
introduce('李四', 30);
```

*   **参数不匹配会怎样？**
    *   实参个数 > 形参个数：多余的实参会被忽略。
    *   实参个数 < 形参个数：没有被赋值的形参，其值默认为 `undefined`。

*   **默认参数 (ES6 新特性)**
    为了避免参数为 `undefined` 导致的问题，我们可以给形参设置一个默认值。

    ```javascript
    function greet(name = '游客') {
      console.log(`你好, ${name}!`);
    }
    
    greet('王五'); // 输出: 你好, 王五!
    greet();       // 输出: 你好, 游客! (因为没有传实参，name 使用了默认值)
    ```

---

### **3. 函数封装数组求和案例**

**需求：** 封装一个函数，可以计算任意一个数字数组的总和。

**思路分析：**
1.  定义一个函数 `getArraySum`。
2.  这个函数需要接收一个“原料”，也就是数组，所以我们定义一个形参 `arr`。
3.  在函数内部，我们需要一个变量 `sum` 来累加总和。
4.  使用 `for` 循环遍历传入的数组 `arr`。
5.  将数组中的每一个元素累加到 `sum` 中。
6.  循环结束后，打印 `sum` 的值。

```javascript
function getArraySum(arr) { // arr 是形参，它会接收传入的数组
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  console.log('该数组的总和是：' + sum);
}

const scores1 = [90, 80, 70];
const scores2 = [10, 20, 30, 40, 50];

getArraySum(scores1); // 调用函数并传入 scores1 作为实参
getArraySum(scores2); // 复用函数，传入 scores2
```
看，我们只写了一遍求和的逻辑，就可以计算任意数组的和，这就是封装的力量！

---

### **4. 函数返回值 `return`**

目前我们的函数只能在内部 `console.log`，但如果我们想让函数把计算结果**交给我们**，以便我们进行后续操作呢？ 这就需要 `return`。

`return` 关键字有两个核心作用：
1.  **返回一个值：** 将函数内部的值传递到函数外部。
2.  **终止函数执行：** 一旦函数执行到 `return`，整个函数会立即结束，`return` 后面的代码不会被执行。

```javascript
function add(num1, num2) {
  // 不再是 console.log，而是 return 结果
  return num1 + num2;
  console.log('这行代码永远不会执行'); // 因为在 return 之后
}

// 调用函数，并用一个变量来“接收”返回值
const result = add(5, 3);

console.log(`5 + 3 的计算结果是: ${result}`);
// 现在我们可以用 result 做更多事情
const finalResult = result * 10;
console.log(`最终结果是: ${finalResult}`);
```

---

### **5. 函数返回值细节**

> #### **面试官提问：** “如果一个函数没有写 `return`，或者 `return` 后面没有跟任何值，那么这个函数的返回值是什么？”
>
> **回答思路：**
> 1.  **清晰地给出答案：** “返回值是 `undefined`。”
> 2.  **解释原因：** “JavaScript 引擎规定，任何函数都必须有一个返回值。如果开发者没有显式地使用 `return` 提供一个值，引擎会自动在函数末尾隐式地 `return undefined;`。”
> 3.  **举例说明：**
>    ```javascript
>    function doSomething() {
>      console.log('执行了一些操作');
>      // 没有 return 语句
>    }
>       
>    function doSomethingElse() {
>      console.log('执行了另一些操作');
>      return; // return 后面没有值
>    }
>       
>    const result1 = doSomething();
>    const result2 = doSomethingElse();
>       
>    console.log(result1); // 输出 undefined
>    console.log(result2); // 输出 undefined
>    ```
> 4.  **总结：** "因此，在开发中，如果一个函数被设计为需要产出一个结果，那么我们必须确保所有可能的执行路径都有明确的 `return` 语句来返回期望的值。"

---

### **6. 函数返回值案例——求最大值和最小值**

我们将昨天的求最值的逻辑封装成可复用的函数。

```javascript
function getArrayMax(arr) {
  if (arr.length === 0) {
    return undefined; // 考虑特殊情况：如果是空数组，返回 undefined
  }
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max; // 返回最终找到的最大值
}

const prices = [102, 99, 150, 88, 188, 120];
const maxPrice = getArrayMax(prices);
console.log(`最高价格是：${maxPrice}`);
```

---

### **7. 函数复习以及断点进入函数**

**断点调试 (Debugging)** 是程序员的必备技能。它可以让我们暂停代码的执行，一步一步地观察变量的变化和代码的执行流程。

**如何使用：**
1.  在浏览器中打开开发者工具 (F12)，切换到 "Sources" (源代码) 面板。
2.  在代码的行号上点击，可以设置一个**断点** (通常是一个蓝色或红色的标记)。
3.  刷新页面，当代码执行到断点处时，会自动暂停。
4.  在函数调用的地方，你可以使用 "Step into" (F11) 按钮，**进入**到函数内部，观察函数内部的执行情况。

这个技能必须自己动手尝试，它能帮你理解复杂的逻辑。

---

### **8. 作用域 (Scope)**

作用域是 JavaScript 中一个至关重要的概念，它规定了**变量和函数的可访问范围**。

*   **全局作用域 (Global Scope):**
    *   在所有函数之外声明的变量，拥有全局作用域。
    *   全局变量可以在代码的任何位置被访问和修改。
    *   **缺点：** 容易造成变量名冲突（命名污染），不推荐滥用。

*   **局部作用域 / 函数作用域 (Local/Function Scope):**
    *   在函数内部声明的变量，拥有局部作用域。
    *   局部变量**只能**在其所在的函数内部被访问。
    *   **优点：** 安全，不同函数中的同名变量不会相互影响。

```javascript
const globalVar = '我是一个全局变量';

function myFunction() {
  const localVar = '我是一个局部变量';
  console.log(globalVar); // 在函数内部可以访问全局变量
  console.log(localVar);
}

myFunction();

console.log(globalVar);
// console.log(localVar); // 报错！Uncaught ReferenceError: localVar is not defined
// 在函数外部无法访问局部变量
```

---

### **9. 变量的访问原则**

> #### **面试官提问：** “当你在一个函数内部访问一个变量时，JavaScript 是如何查找这个变量的？这个过程叫什么？”
>
> **回答思路：**
> 1.  **核心原则：** “变量的访问遵循‘**就近原则**’。”
> 2.  **解释过程（作用域链 Scope Chain）：** “当代码试图访问一个变量时，JavaScript 引擎会：
>     a. **首先**，在**当前作用域**（比如当前函数内部）中查找该变量。
>     b. 如果找到了，就使用它，查找结束。
>     c. 如果在当前作用域中**没有找到**，它就会**向上一层作用域**去查找（比如，如果是在一个函数里，就去全局作用域找）。
>     d. 这个查找过程会沿着作用域链一直向上，直到找到该变量或者到达最顶层的全局作用域。
>     e. 如果在全局作用域中**仍然没有找到**，程序就会抛出 `ReferenceError` (引用错误)。”
> 3.  **举例说明：**
>    ```javascript
>    let color = 'red'; // 全局作用域
>       
>    function showColor() {
>      let color = 'blue'; // 局部作用域
>      console.log(color); // 首先在函数内部找到 'blue'，就近原则，输出 blue
>    }
>       
>    function showGlobalColor() {
>      console.log(color); // 函数内部没有 color，向上去全局找，找到 'red'，输出 red
>    }
>       
>    showColor();
>    showGlobalColor();
>    ```

---

### **10. 匿名函数 —— 函数表达式**

之前我们用的 `function sayHello() {}` 叫做**函数声明**。还有一种定义函数的方式，不给函数命名，而是将它赋值给一个变量，这叫做**函数表达式**，其中的函数就是**匿名函数**。

```javascript
// 函数表达式
const sayGoodbye = function() {
  console.log('再见！');
};

// 调用方式和普通函数一样
sayGoodbye();
```
**与函数声明的区别（面试重点）：** 函数声明存在**函数提升**，可以在声明前调用。而函数表达式不存在提升，必须在声明和赋值后才能调用。

---

### **11. 匿名函数 —— 立即执行函数 (IIFE)**

IIFE (Immediately Invoked Function Expression) 是一种特殊的语法，它可以在**定义后立即执行**，并且只执行一次。

**语法：** `(function() { ... })();`

```javascript
(function() {
  const privateVar = '这是一个私有变量，外界无法访问';
  console.log('这个函数被立即执行了！');
  console.log(privateVar);
})();

// console.log(privateVar); // 报错，无法访问
```**主要作用：** 在 ES6 模块出现之前，IIFE 是**创建独立作用域、避免全局变量污染**的主要手段。你把它看作一个一次性的“隔离舱”，里面的代码执行完就销毁，不会影响到外面。

---

### **12. 综合案例 —— 封装计算时间函数**

**需求：** 封装一个函数 `formatTime`，用户输入总秒数，函数返回 `xx小时xx分xx秒` 的格式。

**思路分析：**
1.  定义函数 `formatTime`，接收一个形参 `totalSeconds`。
2.  计算小时：`小时 = 向下取整(总秒数 / 3600)`。
3.  计算分钟：`分钟 = 向下取整((总秒数 % 3600) / 60)`。先用总秒数对3600取余，得到不足一小时的秒数，再除以60。
4.  计算秒数：`秒数 = 总秒数 % 60`。
5.  将结果拼接成字符串并 `return`。

```javascript
function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}小时${minutes}分${seconds}秒`;
}

const timeString = formatTime(3661); // 3661秒 = 1小时1分1秒
console.log(timeString);
```

---

### **13. & 14. 逻辑中断 & 转换为布尔型 (复习)**

这两个概念在函数中非常常见。

*   **逻辑中断 (`&&`, `||`)**
    `A || B`：如果 A 为 `true` (truthy)，则返回 A 的值，B 不会执行。常用于设置默认值。
    `A && B`：如果 A 为 `false` (falsy)，则返回 A 的值，B 不会执行。常用于条件满足时执行某个函数。

    ```javascript
    function playMusic(song) {
        // 如果 song 没传(undefined)，则 song || '默认歌曲' 的结果是 '默认歌曲'
        const currentSong = song || '默认歌曲.mp3';
        console.log('正在播放：' + currentSong);
    }
    playMusic(); // 正在播放：默认歌曲.mp3
    
    // 假设 isLoggedIn 是一个表示登录状态的变量
    isLoggedIn && showUserProfile(); // 只有当 isLoggedIn 为 true 时，才会调用 showUserProfile 函数
    ```

*   **转换为布尔型**
    在 `if()` 语句的括号中，所有值都会被隐式转换为布尔型。
    **Falsy 值 (会转为 `false`)：** `false`, `0`, `''`, `null`, `undefined`, `NaN`。
    **Truthy 值：** 除了以上 Falsy 值之外的所有值。

---

### **15. 作业**

为了巩固今天的学习，请完成以下练习：

1.  **封装判断偶数函数：**
    *   封装一个函数 `isEven`。
    *   接收一个数字作为参数。
    *   如果这个数字是偶数，则 `return true`，否则 `return false`。
    *   调用并打印 `isEven(10)` 和 `isEven(7)` 的结果。

2.  **封装数组翻转函数：**
    *   封装一个函数 `reverseArray`。
    *   接收一个数组作为参数。
    *   函数需要**返回一个新数组**，新数组的元素是原数组的倒序。
    *   **提示：** 创建一个空数组，从后往前遍历原数组，将元素 `push` 到新数组中。
    *   **禁止**使用数组自带的 `reverse()` 方法。
    *   调用并打印 `reverseArray([1, 2, 3, 4, 5])` 的结果。

---



