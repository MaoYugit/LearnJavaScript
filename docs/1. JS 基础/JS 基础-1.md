# **DAY 1**

**目标：** 理解变量、数据类型等基础概念，能够实现数据类型的转换，具备利用模板字符串渲染表格的能力。

### 1. **JS 简介**

JavaScript（通常缩写为 JS）是一门跨平台、面向对象的脚本语言，主要用于为网页添加交互行为。 它是一种轻量级的编程语言，可以直接嵌入到 HTML 页面中，并由所有现代浏览器执行。

**JavaScript 的主要特点包括：**

*   **解释性脚本语言：** 代码不需要预编译，由浏览器解释执行。
*   **基于原型和头等函数：** 这意味着函数可以被当作变量来处理。
*   **动态类型语言：** 变量的数据类型在运行时确定，而不是在编译时。
*   **为网页添加交互性：** 这是 JavaScript 最初被创造的目的，例如实现复杂的动画、可点击的按钮、弹出菜单等。

JavaScript 现在不仅仅局限于浏览器，通过 Node.js 等技术，它也可以用于服务器端开发，构建完整的 Web 应用程序。

**JavaScript组成：**

- ECMAScript: JavaScript 语言基础
- Web APIs: DOM(页面文档对象模型)   BOM(浏览器对象模型)

### 2. **输入输出语法**

在 JavaScript 中，与用户进行交互以及在不同位置显示数据是通过各种输入输出语句实现的。

**1. 输出语法**

JavaScript 可以通过多种方式输出数据：

*   **`alert()`：弹出警告框**
    *   语法：`alert('要显示的消息')`
    *   作用：在浏览器中弹出一个警告框，向用户显示消息。 这是一种比较简单的输出方式，常用于调试或简单的用户提示。

    ```javascript
    alert('Hello, JavaScript!');
    ```

*   **`console.log()`：在控制台输出**
    *   语法：`console.log('要输出的消息')`
    *   作用：在浏览器的开发者工具的控制台中打印信息。 这是程序员调试代码时最常用的方式。

    ```javascript
    console.log('这是一条在控制台显示的消息');
    ```

*   **`document.write()`：写入 HTML 文档**
    *   语法：`document.write('要写入的内容')`
    *   作用：将内容直接写入到 HTML 文档中。 需要注意的是，如果在页面加载完毕后使用 `document.write()`，它会覆盖整个页面的内容。

    ```javascript
    document.write('<h1>这是一个一级标题</h1>');
    ```
*   **`innerHTML`：写入 HTML 元素**
    *   作用：通过 JavaScript 访问某个 HTML 元素，并更改其内容。

    ```html
    <p id="demo"></p>
    <script>
        document.getElementById("demo").innerHTML = "这是通过 innerHTML 写入的内容";
    </script>
    ```

**2. 输入语法**

*   **`prompt()`：弹出输入框**
    *   语法：`prompt('提示信息')`
    *   作用：弹出一个可供用户输入的对话框。用户输入的内容会作为函数的返回值（字符串类型）。

    ```javascript
    let name = prompt('请输入你的名字：');
    alert('你好, ' + name);
    ```

### 3. **字面量**

在 JavaScript 中，字面量是表示固定值的表达式，它们是直接写在代码中的值，而不是变量。 简单来说，字面量就是所见即所得的值。

常见的字面量类型包括：

*   **数字字面量 (Number Literal):**  可以是整数、浮点数或科学计数法表示的数字。
    
    ```javascript
    100
    3.14
    1.23e5
    ```
    
*   **字符串字面量 (String Literal):** 由单引号 `' '` 或双引号 `" "` 包围的零个或多个字符。
    ```javascript
    'Hello'
    "JavaScript"
    ```
    **模板字面量 (Template Literal):** 使用反引号 (`` ` ``) 包围，可以嵌入变量和表达式，并且可以跨行书写。
    
    ```javascript
    let name = '小明';
    let message = `你好, ${name}!`; // 在字符串中嵌入变量
    console.log(message); // 输出: 你好, 小明!
    ```
    
*   **布尔字面量 (Boolean Literal):** 只有两个值：`true` 和 `false`。
    ```javascript
    true
    false
    ```

*   **对象字面量 (Object Literal):** 由花括号 `{}` 包围的一组键值对。
    ```javascript
    {
      name: '张三',
      age: 20
    }
    ```

*   **数组字面量 (Array Literal):** 由方括号 `[]` 包围的一组值。
    ```javascript
    [1, 2, 'apple', true]
    ```

### 4. **变量**

变量是用于存储数据值的容器。 在 JavaScript 中，你可以使用 `var`、`let` 关键字来声明变量。

**1. 声明变量**

在 JavaScript 中创建变量的过程称为“声明”变量。

*   **使用 `var` 关键字:** (ES5 及之前)
    ```javascript
    var age; // 声明一个名为 age 的变量
    ```

*   **使用 `let` 关键字:** (ES6 新增)
    `let` 声明的变量只在其所在的代码块内有效（块级作用域）。
    ```javascript
    let name; // 声明一个名为 name 的变量
    ```

**2. 变量赋值**

使用等号 `=` 为变量赋值。
```javascript
let age;
age = 18; // 为 age 变量赋值为 18

let name = '李四'; // 声明的同时进行赋值
```

**3. 变量的命名规则**

*   变量名可以包含字母、数字、下划线 `_` 和美元符号 `$`。
*   必须以字母、下划线 `_` 或美元符号 `$` 开头。
*   JavaScript 对大小写敏感（`y` 和 `Y` 是两个不同的变量）。
*   不能使用 JavaScript 的关键字和保留字作为变量名。

**4. `var` 和 `let` 的区别**

*   **作用域:** `var` 声明的变量是函数作用域或全局作用域，而 `let` 声明的变量是块级作用域。
*   **变量提升:** `var` 声明的变量存在变量提升（可以在声明前使用，值为 `undefined`），而 `let` 不存在变量提升。

### 5. **常量**

常量用于声明一个只读的命名常量，一旦声明，其值就不能再被修改。 在 JavaScript 中，使用 `const` 关键字来声明常量。

**1. 声明常量**

```javascript
const PI = 3.14159;
```

**2. 常量的特点**

*   **必须在声明时初始化：** 声明常量时必须同时赋值。
*   **值不能被重新赋值：** 尝试修改常量的值会导致错误。
*   **块级作用域：** 与 `let` 类似，`const` 声明的常量也具有块级作用域。

**注意：** 当常量被赋值为一个对象时，对象内部的属性是可以被修改的，只是常量本身引用的对象地址不能改变。

### 6. **数据类型**

JavaScript 是一种动态类型语言，这意味着变量的数据类型不是在声明时指定的，而是在运行时根据赋给它的值自动确定。

JavaScript 的数据类型分为两大类：**原始类型 (Primitive types)** 和 **对象类型 (Object types)**。

**1. 原始数据类型**

原始类型的值是不可变的。

*   **String (字符串):** 用于表示文本数据，由单引号或双引号包围。
    ```javascript
    let greeting = "Hello, World!";
    ```
*   **Number (数字):** 表示整数或浮点数。
    ```javascript
    let count = 100;
    let price = 99.9;
    ```
*   **Boolean (布尔):** 只有 `true` 和 `false` 两个值。
    ```javascript
    let isStudent = true;
    ```*   **Undefined (未定义):** 表示变量已声明但未赋值。
    ```javascript
    let x;
    console.log(x); // 输出: undefined
    ```
*   **Null (空):** 表示一个空值或“无”的对象引用。
    ```javascript
    let car = null;
    ```
*   **Symbol (符号):** (ES6 新增) 表示唯一的、不可变的值。
*   **BigInt:** 用于表示任意大的整数。

**2. 对象数据类型**

*   **Object (对象):** 是一个包含属性和方法的集合。
    ```javascript
    let person = {
      firstName: "John",
      lastName: "Doe"
    };
    ```

**`typeof` 操作符**

你可以使用 `typeof` 操作符来查看一个变量或值的数据类型。

```javascript
typeof "Hello"  // 返回 "string"
typeof 123      // 返回 "number"
typeof true     // 返回 "boolean"
typeof undefined // 返回 "undefined"
typeof null     // 返回 "object" (这是一个历史遗留问题)
```

### 7. **数据类型的转换**

在 JavaScript 中，数据类型转换分为 **强制（显式）类型转换** 和 **自动（隐式）类型转换**。

**1. 转换为字符串类型 (String)**

*   **`String()` 函数:** 可以将任何类型的值转换为字符串。
    ```javascript
    let num = 123;
    let strNum = String(num); // "123"
    ```
*   **`toString()` 方法:**  (null 和 undefined 没有此方法)
    ```javascript
    let bool = true;
    let strBool = bool.toString(); // "true"
    ```
*   **拼接字符串:** 使用 `+` 运算符与一个空字符串相加，可以实现隐式转换。
    
    ```javascript
    let value = 10;
    let strValue = value + ""; // "10"
    ```

**2. 转换为数字类型 (Number)**

*   **`Number()` 函数:** 可以将其他类型的值转换为数字。
    *   字符串：如果字符串是纯数字，则转换为对应的数字；否则，转换为 `NaN` (Not a Number)。
    *   布尔值：`true` 转换为 `1`，`false` 转换为 `0`。
    *   `null`：转换为 `0`。
    *   `undefined`：转换为 `NaN`。
*   **`parseInt()` 和 `parseFloat()` 函数:** 用于从字符串中解析出整数和浮点数。
*   **一元加号 `+`:**  可以触发隐式数字转换。
    ```javascript
    let str = "123";
    let num = +str; // 123
    ```
    
    **加号作为正号解析可以转换成数字型，任何数字和字符串相加的结果都是字符串**，其他运算符号的情况都是转变为数字。

**3. 转换为布尔类型 (Boolean)**

*   **`Boolean()` 函数:** 可以将任何类型的值转换为布尔值。
    *   以下值会转换为 `false`：
        *   `""` (空字符串)
        *   `0`
        *   `NaN`
        *   `null`
        *   `undefined`
    *   所有其他值都会转换为 `true`。

### 8. **算术运算符**

算术运算符用于执行数学运算。

| 运算符 | 描述       | 示例                          |
| :----- | :--------- | :---------------------------- |
| `+`    | 加法       | `x = y + 2`                   |
| `-`    | 减法       | `x = y - 2`                   |
| `*`    | 乘法       | `x = y * 2`                   |
| `/`    | 除法       | `x = y / 2`                   |
| `%`    | 取余 (模)  | `x = y % 2`                   |
| `++`   | 自增       | `x++` 或 `++x`                |
| `--`   | 自减       | `x--` 或 `--x`                |
| `**`   | 求幂 (ES7) | `x = 2 ** 3` (即 2 的 3 次方) |

**加法运算符的特殊性**

*   当两个操作数都是数字时，进行数学上的加法运算。
*   当其中一个操作数是字符串时，`+` 运算符会执行字符串拼接操作，将另一个操作数也转换为字符串。

```javascript
let a = 10 + 5;     // a 的值为 15
let b = "Hello" + " World"; // b 的值为 "Hello World"
let c = "今年是" + 2024; // c 的值为 "今年是2024"
```

**自增 (++) 和自减 (--)**

*   **前置（`++i` 或 `--i`）：** 先进行自增或自减运算，然后再返回值。
*   **后置（`i++` 或 `i--`）：** 先返回值，然后再进行自增或自减运算。

```javascript
let i = 1;
let j = i++; // j 的值为 1, i 的值为 2

let m = 1;
let n = ++m; // n 的值为 2, m 的值为 2
```
