## **DAY 2 - 构建程序的逻辑骨架**

**目标：** 掌握各类运算符的精妙之处，熟练运用 `if`、`switch`、`for` 等流程控制语句，并能够使用数组来管理和操作一组数据。

### **1. 运算符 (Operators) - 程序的精细操作**

昨天我们学习了算术运算符，今天我们来学习另外三类同样重要的运算符。

#### **赋值运算符 (Assignment Operators)**

赋值运算符用于给变量赋值。除了基础的 `=`，还有一系列复合赋值运算符，它们是代码的“语法糖”，能让你的代码更简洁。

| 运算符 | 示例     | 等同于      | 描述     |
| :----- | :------- | :---------- | :------- |
| `=`    | `x = y`  | `x = y`     | 直接赋值 |
| `+=`   | `x += y` | `x = x + y` | 加法赋值 |
| `-=`   | `x -= y` | `x = x - y` | 减法赋值 |
| `*=`   | `x *= y` | `x = x * y` | 乘法赋值 |
| `/=`   | `x /= y` | `x = x / y` | 除法赋值 |
| `%=`   | `x %= y` | `x = x % y` | 取模赋值 |

```javascript
let price = 10;
price += 5; // 等同于 price = price + 5; 现在 price 的值是 15
```

**为什么使用复合赋值运算符？**
它更简洁、可读性更高，并且在某些复杂的计算场景下可能（尽管在现代JS引擎中影响微乎其微）有微小的性能优势。

---

#### **比较运算符 (Comparison Operators)**

比较运算符用于比较两个值，并返回一个布尔值 (`true` 或 `false`)。这是流程控制的“判断依据”。

| 运算符 | 描述                                  |
| :----- | :------------------------------------ |
| `==`   | **等于** (值相等，会进行类型转换)     |
| `!=`   | **不等于** (值不相等，会进行类型转换) |
| `===`  | **全等** (值和类型都相等)             |
| `!==`  | **不全等** (值或类型不相等)           |
| `>`    | 大于                                  |
| `<`    | 小于                                  |
| `>=`   | 大于或等于                            |
| `<=`   | 小于或等于                            |

> #### **面试官提问：** “请解释一下 `==` 和 `===` 的区别，开发中你应该使用哪个？为什么？”
>
> **回答思路：**
> 1.  **定义区别：**
>     *   `==` (等于) 是**抽象相等**比较。在比较之前，它会尝试将两个操作数转换为**相同的数据类型**（类型转换），然后再比较它们的值。
>     *   `===` (全等) 是**严格相等**比较。它**不会**进行类型转换。如果两个操作数的值和数据类型都相同，结果才为 `true`。
> 2.  **举例说明：**
>     ```javascript
>     console.log(5 == '5');   // true，因为 '5' 被转换成了数字 5
>     console.log(5 === '5');  // false，因为一个是 number 类型，一个是 string 类型
>     
>     console.log(true == 1);  // true，因为 true 被转换成了数字 1
>     console.log(true === 1); // false，因为一个是 boolean 类型，一个是 number 类型
>     
>     console.log(null == undefined); // true，这是规范中的一个特例
>     console.log(null === undefined); // false，因为它们是不同的原始类型
>     ```
> 3.  **给出最佳实践：**
>     “在开发中，**应该始终优先使用 `===`**。因为 `==` 的隐式类型转换规则复杂且难以记忆，很容易导致意想不到的bug。使用 `===` 可以让代码的行为更加可预测、逻辑更严谨，从而提高代码的健壮性和可维护性。”

---

#### **逻辑运算符 (Logical Operators)**

逻辑运算符通常用于组合多个布尔值。

| 运算符 | 描述         | 规则                                                       |
| :----- | :----------- | :--------------------------------------------------------- |
| `&&`   | **与 (AND)** | 两个操作数都为 `true` 时，结果才为 `true`。                |
| `||`   | **或 (OR)**  | 只要有一个操作数为 `true`，结果就为 `true`。               |
| `!`    | **非 (NOT)** | 取反操作。`!true` 结果为 `false`，`!false` 结果为 `true`。 |

> #### **面试官提问：** “你知道什么是逻辑运算符的‘短路效应’（Short-circuiting）吗？它有什么应用场景？”
>
> **回答思路：**
> 1.  **解释概念：** 短路效应是逻辑运算符的一个重要特性。表达式会从左到右进行求值，一旦整个表达式的结果可以确定，求值就会立即停止，不会再执行右侧的操作数。
> 2.  **分情况举例：**
>     *   **对于 `&&` (与)：** 如果第一个操作数为 `false`（或任何"falsy"值，如`0`, `""`, `null`, `undefined`），那么整个表达式的结果必定是 `false`，所以第二个操作数**不会被执行**。
>       ```javascript
>       let score = 0;
>       // 因为 isReady 是 false，所以 setScore(100) 这个函数根本不会被调用
>       let isReady = false;
>       isReady && setScore(100);
>       ```
>     *   **对于 `||` (或)：** 如果第一个操作数为 `true`（或任何"truthy"值），那么整个表达式的结果必定是 `true`，所以第二个操作数**不会被执行**。
>       ```javascript
>       // 场景：为一个变量提供默认值
>       let username = currentUser || 'Guest'; // 如果 currentUser 有值(truthy)，就用它；否则，使用 'Guest'
>       ```
> 3.  **总结应用：**
>     *   `&&` 的短路效应常用于**前置条件判断**，只有满足条件才执行后续操作，可以替代简单的 `if` 语句。
>     *   `||` 的短路效应常用于**设置函数参数的默认值或变量的备用值**。

#### **运算符优先级 (Operator Precedence)**

和数学中的先乘除后加减一样，JS中的运算符也有优先级。例如 `*` 和 `/` 的优先级高于 `+` 和 `-`。

```javascript
let result = 3 + 5 * 2; // 结果是 13，而不是 16
```
**最佳实践：** 不要去刻意记复杂的优先级表！当你不确定优先级时，**使用圆括号 `()` 来强制指定运算顺序**。这不仅能保证结果正确，还能让代码的可读性大大提高。

```javascript
let result = (3 + 5) * 2; // 结果是 16，意图清晰
```
---

### **2. 流程控制 (Control Flow) - 让程序学会思考**

流程控制语句决定了代码的执行顺序。

#### **条件语句 (Conditional Statements)**

*   **`if...else`**
    这是最基础的条件分支结构。

    ```javascript
    let age = 20;
    
    if (age >= 18) {
      console.log("已成年");
    } else {
      console.log("未成年");
    }
    ```

*   **`if...else if...else`**
    用于处理多个条件分支。

    ```javascript
    let score = 85;
    
    if (score >= 90) {
      console.log("优秀");
    } else if (score >= 75) {
      console.log("良好");
    } else if (score >= 60) {
      console.log("及格");
    } else {
      console.log("不及格");
    }
    ```

*   **三元运算符 (Ternary Operator)**
    它是 `if...else` 的简洁形式，非常适合用于简单的赋值操作。
    **语法：** `condition ? expressionIfTrue : expressionIfFalse`

    ```javascript
    let age = 20;
    let message = age >= 18 ? "已成年" : "未成年";
    console.log(message); // 输出 "已成年"
    ```

*   **`switch` 语句**
    当你需要基于**同一个变量**的**不同取值**来执行不同操作时，`switch` 比一长串 `if...else if` 更清晰。

    ```javascript
    let day = new Date().getDay(); // 返回 0-6 的数字，0 代表周日
    
    switch (day) {
      case 6:
        console.log("今天是周六");
        break; // break 至关重要，它会阻止代码继续执行下一个 case
      case 0:
        console.log("今天是周日");
        break;
      default: // 如果以上 case 都不匹配，则执行 default
        console.log("今天还要努力工作！");
        break;
    }
    ```
> #### **面试官提问：** “`switch` 语句中的 `break` 有什么作用？如果我漏写了会发生什么？”
>
> **回答思路：**
> 1.  **`break` 的作用：** `break` 关键字用于立即跳出整个 `switch` 代码块。当一个 `case` 分支的代码执行完毕后，`break` 会确保程序不会继续执行后续的 `case`。
> 2.  **漏写的后果：** 如果漏写了 `break`，程序会发生“**穿透 (fall-through)**”现象。也就是说，代码会从匹配的 `case` 开始执行，然后无视后续的 `case` 条件，继续向下执行，直到遇到一个 `break` 或者 `switch` 语句结束。
> 3.  **举例说明：**
>    ```javascript
>    let fruit = 'apple';
>    switch (fruit) {
>      case 'apple':
>        console.log('是苹果。'); // 这句会执行
>        // 没有 break!
>      case 'banana':
>        console.log('也可能是香蕉。'); // 这句也会被执行！
>        break;
>      default:
>        console.log('都不是。');
>    }
>    // 控制台会输出:
>    // 是苹果。
>    // 也可能是香蕉。
>    ```
> 4.  **补充（加分项）：** 虽然“穿透”通常是 bug 的来源，但在极少数特定场景下，可以巧妙地利用它来为多个 `case` 执行相同的代码块。
>    ```javascript
>    switch (day) {
>      case 6: // 周六
>      case 0: // 周日
>        console.log("今天是周末！"); // 周六和周日会共用这段逻辑
>        break;
>      default:
>        console.log("今天是工作日。");
>        break;
>    }
>    ```

#### **循环语句 (Looping Statements)**

循环用于重复执行一段代码。

*   **`for` 循环**
    当你**明确知道循环次数**时，`for` 循环是最佳选择。
    **结构：** `for (初始化变量; 循环条件; 操作表达式)`

    ```javascript
    // 打印 5 次 "Hello, World!"
    for (let i = 0; i < 5; i++) {
      console.log("Hello, World!");
    }
    ```

*   **`while` 循环**
    当你**不确定循环次数**，只知道循环的终止条件时，使用 `while`。它会“先判断，后执行”。

    ```javascript
    let num = 1;
    let sum = 0;
    while (num <= 100) {
      sum += num;
      num++;
    }
    console.log(sum); // 计算 1 到 100 的和
    ```

*   **`do...while` 循环**
    与 `while` 类似，但它保证循环体**至少会执行一次**，因为它“先执行，后判断”。

    ```javascript
    let input;
    do {
      input = prompt("请输入 'yes' 来退出：");
    } while (input !== "yes");
    alert("你成功退出了！");
    ```

*   **`continue` 和 `break`**
    *   `break`: 立即**终止并跳出**整个循环。
    *   `continue`: **跳过本次循环**的剩余代码，直接进入下一次循环。

    ```javascript
    // 打印 1-10 之间所有的奇数
    for (let i = 1; i <= 10; i++) {
      if (i % 2 === 0) {
        continue; // 如果是偶数，跳过本次循环的 console.log
      }
      console.log(i);
    }
    ```

---

### **3. 数组 (Arrays) - 数据的有序集合**

当你想存储一组相关的数据时（比如一个班级所有学生的名字），就需要用到数组。

*   **什么是数组？**
    数组是一个**有序**的、可以包含**任意数据类型**的值的集合。

*   **创建数组**
    最常用、最推荐的方式是使用**数组字面量 `[]`**。

    ```javascript
    let emptyArray = []; // 一个空数组
    let fruits = ['Apple', 'Banana', 'Cherry'];
    let mixedArray = ['text', 123, true, null]; // 可以包含不同类型
    ```

*   **访问数组元素**
    通过**索引 (index)** 来访问数组中的元素。**数组的索引是从 `0` 开始的**。

    ```javascript
    let fruits = ['Apple', 'Banana', 'Cherry'];
    console.log(fruits[0]); // 输出 'Apple'
    console.log(fruits[2]); // 输出 'Cherry'
    console.log(fruits[3]); // 输出 undefined，因为索引超出了范围
    ```

*   **修改数组元素**
    同样通过索引来重新赋值。

    ```javascript
    let fruits = ['Apple', 'Banana', 'Cherry'];
    fruits[1] = 'Blueberry';
    console.log(fruits); // 输出 ['Apple', 'Blueberry', 'Cherry']
    ```

*   **数组的 `length` 属性**
    `length` 属性返回数组中元素的个数。这是数组最重要的属性之一。

    ```javascript
    let fruits = ['Apple', 'Banana', 'Cherry'];
    console.log(fruits.length); // 输出 3
    ```
    `length` 属性是可写的，通过修改它可以改变数组的长度（增加或截断数组），但这通常不是推荐的做法。

*   **遍历数组**
    遍历是指按顺序访问数组中的每一个元素。最经典的方式是使用 `for` 循环。

    ```javascript
    let fruits = ['Apple', 'Banana', 'Cherry'];
    
    for (let i = 0; i < fruits.length; i++) {
      console.log(`我喜欢吃：${fruits[i]}`);
    }
    ```

---

### **DAY 2 综合实战**

好了，理论学习完毕，我们来做一个小练习，把今天学到的所有知识都用起来。

**需求：** 假设你有一个存储了一周每日开销的数组。请计算出总开销和平均每日开销。同时，找出开销最高的是哪一天（假设数组索引0代表周一）。

```javascript
// 1. 数据准备
const weeklyExpenses = [50, 120, 80, 65, 200, 75, 90]; // 从周一到周日
const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

// 2. 初始化变量
let totalExpense = 0;
let maxExpense = -1; // 初始化为一个不可能的最小值
let maxDayIndex = -1;

// 3. 使用 for 循环遍历数组
for (let i = 0; i < weeklyExpenses.length; i++) {
    // 累加总开销
    totalExpense += weeklyExpenses[i];

    // 4. 使用 if 判断找出最大开销
    if (weeklyExpenses[i] > maxExpense) {
        maxExpense = weeklyExpenses[i];
        maxDayIndex = i;
    }
}

// 5. 计算平均开销
const averageExpense = totalExpense / weeklyExpenses.length;

// 6. 使用模板字符串输出结果
console.log(`本周总开销为：${totalExpense} 元`);
console.log(`平均每日开销为：${averageExpense.toFixed(2)} 元`); // toFixed(2) 保留两位小数
console.log(`开销最高的一天是${days[maxDayIndex]}，花费了 ${maxExpense} 元`);

```
这个例子完美地融合了数组的创建和遍历、`for`循环的使用、`if`条件判断、以及我们昨天学的变量和算术运算符。
