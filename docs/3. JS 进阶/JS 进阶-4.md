# JS进阶

---

<div style="display: flex; justify-content: space-between;">
  <a href="./JS 进阶-3.md">‹ 上一篇：JS进阶-3</a>
  <a href="./JS 进阶-5.md">下一篇：JS进阶-5 ›</a>
</div>

### 16. 数组 `reduce` 累计方法

`reduce` 是数组方法中最强大、最灵活的一个，但也是初学者最容易感到困惑的一个。我们可以把它想象成一个“浓缩机”或“汇总器”。

#### 核心思想

`reduce` 方法接收一个函数作为累加器，数组中的每个值（从左到右）都会被这个累加器处理，最终将数组**缩减（reduce）**为一个**单一的值**。

#### 超详细讲解

它的完整语法是：`array.reduce(callback(accumulator, currentValue, currentIndex, array), initialValue)`

别被这长长的语法吓到，我们把它拆开看，99%的情况下你只需要关心前两个参数：

* `accumulator` (累加器)：我们叫它 `acc`。它是上一次回调函数执行的返回值。在第一次执行时，它要么是 `initialValue`（如果提供了），要么是数组的第一个元素。
* `currentValue` (当前值)：我们叫它 `cur`。它是数组中正在被处理的那个元素。
* `initialValue` (初始值)：可选。它是累加器第一次执行时的初始值。**强烈建议总是提供这个初始值**，这样可以避免很多边界问题（比如处理空数组）。

**场景一：数组求和 (最经典用法)**

```javascript
const numbers = [10, 20, 30, 40];

// 我们想把它们加起来得到 100
// acc: 累加的结果
// cur: 当前遍历到的数字
const sum = numbers.reduce((acc, cur) => {
    console.log(`当前累加值(acc): ${acc}, 当前数字(cur): ${cur}`);
    return acc + cur; // 本次计算的结果，会成为下一次的 acc
}, 0); // 0 是初始值，第一次执行时，acc 就等于 0

console.log("最终结果:", sum); // 100
```

**执行过程详解：**

1. **初始值:** `acc` 被设置为 `0`。
2. **第一轮:** `cur` 是 `10`。函数执行 `0 + 10`，返回 `10`。这个 `10` 成为下一轮的 `acc`。
3. **第二轮:** `acc` 是 `10`，`cur` 是 `20`。函数执行 `10 + 20`，返回 `30`。这个 `30` 成为下一轮的 `acc`。
4. **第三轮:** `acc` 是 `30`，`cur` 是 `30`。函数执行 `30 + 30`，返回 `60`。这个 `60` 成为下一轮的 `acc`。
5. **第四轮:** `acc` 是 `60`，`cur` 是 `40`。函数执行 `60 + 40`，返回 `100`。
6. 数组遍历完毕，`reduce` 将最后一次的返回值 `100` 作为最终结果。

**场景二：计算数组中元素出现的次数**

```javascript
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];

const fruitCount = fruits.reduce((acc, cur) => {
    if (acc[cur]) {
        acc[cur]++; // 如果这个水果在对象里已经存在，就+1
    } else {
        acc[cur] = 1; // 如果是第一次见到，就设为1
    }
    return acc;
}, {}); // 初始值是一个空对象 {}

console.log(fruitCount); // 输出: { apple: 3, banana: 2, orange: 1 }
```

**总结一下：**
`reduce` 是一个高级工具，它可以完成求和、求积、找最大值、数组去重、数组扁平化等等几乎所有数组遍历能干的事。它的核心就是**“汇总”**，将一个数组浓缩成一个你想要的任何形式的最终值（数字、字符串、对象、甚至另一个数组）。

---

### 17. 数组 `find`、`every` 和 `Array.from`

这些都是ES6+提供的非常实用的数组工具。

#### 1. `find` - 找东西

* **核心思想：** 遍历数组，**找到并返回第一个**满足你所提供测试函数的元素。如果找不到，就返回 `undefined`。
* **生活化比喻：** 你在一排书架上找一本叫《JavaScript权威指南》的书。你从第一本开始看，只要一找到，你就立刻拿着这本书走人，后面的书你连看都懒得看了。

```javascript
const users = [
    { id: 1, name: "张三", age: 20 },
    { id: 2, name: "李四", age: 25 },
    { id: 3, name: "王五", age: 20 }
];

// 找到 id 为 2 的用户
const userLiSi = users.find(user => user.id === 2);
console.log(userLiSi); // { id: 2, name: '李四', age: 25 }

// 找到第一个年龄为 20 的用户
const first20 = users.find(user => user.age === 20);
console.log(first20); // { id: 1, name: '张三', age: 20 } (找到张三就停了，不会再找王五)

// 找一个不存在的用户
const userZhaoLiu = users.find(user => user.id === 99);
console.log(userZhaoLiu); // undefined
```

#### 2. `every` - 做政审

* **核心思想：** 遍历数组，测试**是否所有元素**都满足你提供的测试函数。如果全部满足，返回 `true`；只要有一个不满足，立刻返回 `false`（并且停止遍历）。
* **生活化比喻：** 检查一箱苹果是不是都是好苹果。你一个一个检查，只要发现一个烂的，你立刻得出结论：“这箱苹果不行！”，然后就不用再检查剩下的了。只有当你检查完最后一个，发现全都是好的，你才能说：“这箱苹果是好的”。

```javascript
const scores = [85, 92, 78, 95];
const allPassed = scores.every(score => score >= 60);
console.log(allPassed); // true (因为所有分数都大于等于60)

const scores2 = [85, 45, 90];
const allPassed2 = scores2.every(score => score >= 60);
console.log(allPassed2); // false (因为检查到45时，就不满足条件了)
```

#### 3. `Array.from()` - 变身真数组

* **核心思想：** 这是一个**静态方法**，能将**类数组对象**（Array-like objects）或**可迭代对象**（iterable objects）转换成一个**真正的数组**。
* **什么是类数组对象？** 就是有 `length` 属性和索引的对象，比如函数里的 `arguments` 对象，或者通过 `document.querySelectorAll` 获取的DOM节点列表。它们看起来像数组，但不能使用 `forEach`, `map` 等数组方法。

```javascript
// 场景一：转换类数组对象
function sumArguments() {
    console.log(arguments); // { '0': 1, '1': 2, '2': 3, length: 3 } (这是个类数组对象)
    // arguments.reduce is not a function (直接用会报错)

    const realArray = Array.from(arguments); // 变身！
    return realArray.reduce((acc, cur) => acc + cur, 0);
}
console.log(sumArguments(1, 2, 3)); // 6

// 场景二：转换字符串
const str = "hello";
const charArray = Array.from(str);
console.log(charArray); // ["h", "e", "l", "l", "o"]

// 场景三：结合第二个参数（映射函数）使用
const fakeArray = { length: 3 }; // 一个空的类数组
// 创建一个长度为3的数组，并且每个元素都是它的索引值
const newArray = Array.from(fakeArray, (item, index) => index);
console.log(newArray); // [0, 1, 2]
```

**总结一下：**

* `find`: 找**一个**就收手。
* `every`: 查**所有**，一票否决。
* `Array.from`: 把“假”的变成**真**的数组。

---

### 18. 字符串常见方法

字符串是JS中最常用的数据类型之一，掌握它的常用方法能极大提高你的开发效率。

#### 1. `slice(startIndex, endIndex)` - 切片

* **功能：** 提取字符串的一部分，并返回一个新字符串，不修改原字符串。
* **参数：** `startIndex`（包含），`endIndex`（不包含）。可以是负数，表示从后往前数。
  
  ```javascript
  const message = "Hello, world!";
  console.log(message.slice(0, 5)); // "Hello" (从索引0到5，不含5)
  console.log(message.slice(7));    // "world!" (从索引7到末尾)
  console.log(message.slice(-6));   // "world!" (从倒数第6个到末尾)
  ```

#### 2. `split(separator)` - 分割

* **功能：** 使用指定的分隔符将一个字符串分割成一个**字符串数组**。
  
  ```javascript
  const csv = "2023,Tesla,Model Y";
  const parts = csv.split(",");
  console.log(parts); // ["2023", "Tesla", "Model Y"]
  const sentence = "I love JavaScript";
  const words = sentence.split(" ");
  console.log(words); // ["I", "love", "JavaScript"]
  
  const letters = "abc".split("");
  console.log(letters); // ["a", "b", "c"]
  ```

#### 3. `toUpperCase()` / `toLowerCase()` - 大小写转换
*   **功能：** 返回一个新的字符串，分别是原字符串的大写或小写版本。
```javascript
const name = "John Doe";
console.log(name.toUpperCase()); // "JOHN DOE"
console.log(name.toLowerCase()); // "john doe"
```



#### 4. `includes(searchString)` / `startsWith(searchString)` / `endsWith(searchString)` - 包含判断

* **功能：** 判断字符串是否包含、以...开头、以...结尾，返回 `true` 或 `false`。
  
  ```javascript
  const url = "https://example.com/profile";
  console.log(url.includes("example"));   // true
  console.log(url.startsWith("https://")); // true
  console.log(url.endsWith("/profile"));   // true
  ```

#### 5. `replace(searchValue, newValue)` - 替换

* **功能：** 返回一个新字符串，其中第一个匹配 `searchValue` 的部分被 `newValue` 替换。
* **注意：** 默认只替换第一个匹配项。要全局替换，需要使用正则表达式和 `g` 标志。
  
  ```javascript
  let greeting = "Good morning, morning!";
  let newGreeting = greeting.replace("morning", "evening");
  console.log(newGreeting); // "Good evening, morning!" (只换了第一个)
  // 全局替换
  let globalGreeting = greeting.replace(/morning/g, "evening");
  console.log(globalGreeting); // "Good evening, evening!"
  ```

#### 6. `trim()` - 去除首尾空白
*   **功能：** 返回一个新字符串，移除了原字符串两端的空白字符（空格、制表符、换行符等）。
```javascript
const userInput = "   my-username   ";
const cleanedInput = userInput.trim();
console.log(`'${cleanedInput}'`); // "'my-username'"
```



---

### 19. 两种编程思想

编程思想是比具体语法更高层次的东西，它指导我们如何组织和构建代码。

#### 1. 面向过程编程 (Procedural Programming)

* **核心思想：** 像一个**食谱**。将解决问题的步骤，一步一步地分解成一系列的**函数**。代码的焦点是**“过程”和“动作”**。数据和操作数据的函数是分离的。
* **生活化比喻：**
  * **任务：** 做一道番茄炒蛋。
  * **面向过程的思路：**
    1. `function 洗番茄()`
    2. `function 切番茄()`
    3. `function 打鸡蛋()`
    4. `function 倒油热锅()`
    5. `function 炒鸡蛋()`
    6. `function 炒番茄()`
    7. `function 放调料()`
    8. `function 出锅()`
  * 数据（番茄、鸡蛋）和动作（洗、切、炒）是分开的，你按照流程依次调用这些函数来完成任务。

#### 2. 面向对象编程 (Object-Oriented Programming, OOP)

* **核心思想：** 像一个**团队**。将现实世界的事物抽象成**对象（Object）**。每个对象都封装了自己的**数据（属性）**和**行为（方法）**。代码的焦点是**“谁（哪个对象）”**在做事情。程序由对象之间的相互协作来完成。
* **生活化比喻：**
  * **任务：** 做一道番茄炒蛋。
  * **面向对象的思路：**
    1. **创建一个“厨师”对象。**
       * **属性：** 姓名、厨艺等级。
       * **方法：** `做饭(食材)`。
    2. **创建一个“番茄”对象。**
       * **属性：** 颜色、重量。
       * **方法：** `被切()`。
    3. **创建一个“鸡蛋”对象。**
       * **属性：** 大小。
       * **方法：** `被打散()`。
  * **执行过程：** 你实例化一个`厨师`对象，然后调用它的`做饭`方法，把`番茄`和`鸡蛋`这两个对象作为参数传进去。所有的具体步骤（洗、切、炒）都被封装在`厨师`的`做饭`方法内部了。你不需要关心细节，你只关心让“厨师”这个对象去完成任务。

| 特点       | 面向过程         | 面向对象                   |
|:-------- |:------------ |:---------------------- |
| **核心**   | 动作、步骤、函数     | 实体、对象、数据和行为的统一体        |
| **组织方式** | 一系列的函数调用     | 对象之间的交互                |
| **优点**   | 简单、直观（对于小任务） | 易维护、易扩展、代码复用性高（对于复杂系统） |
| **缺点**   | 难以维护、扩展性差    | 抽象、有一定学习成本             |

---

### 20. 构造函数实现封装以及存在的问题

这是对前面构造函数知识的深化，涉及到性能问题。

#### 1. 用构造函数实现封装

封装是面向对象的三大特性之一（封装、继承、多态）。它的核心就是把**数据（属性）**和**操作数据的代码（方法）**捆绑在一起，并对外部隐藏内部的实现细节。构造函数天然地实现了这一点。

```javascript
function Cat(name, age) {
    // 属性被封装
    this.name = name;
    this.age = age;
    let _weight = 5; // 这是一个“私有”变量，外部无法直接访问

    // 方法被封装
    this.meow = function() {
        console.log(`我叫 ${this.name}，喵~`);
    };

    this.getWeight = function() {
        return _weight; // 提供一个公共方法来访问“私有”数据
    }
}

const cat1 = new Cat("咪咪", 2);
cat1.meow();
console.log(cat1.name); // 可以访问
// console.log(cat1._weight); // undefined，访问不到，实现了隐藏
console.log(cat1.getWeight()); // 只能通过指定接口访问
```

#### 2. 存在的问题：内存浪费

看起来很完美，但它有一个严重的性能问题。我们再创建一个实例：

```javascript
const cat2 = new Cat("花花", 3);

// 比较一下它们的方法
console.log(cat1.meow === cat2.meow); // 输出: false
```

为什么是 `false`？
因为**每当你 `new` 一个实例，构造函数内部的代码就会完完整整地重新执行一遍**。这意味着，`cat1` 有一个自己的 `meow` 函数，`cat2` 也有一个**全新的、一模一样的** `meow` 函数。

如果有一万只猫，内存里就会有一万个功能完全相同的 `meow` 函数副本。这是一种极大的内存浪费！因为“喵喵叫”这个技能，对于所有猫来说，应该是共享的，而不是每只猫都学一遍。

**如何解决这个问题？**
这就是下一个重要概念——**原型（Prototype）**——要解决的核心问题。我们会把共享的方法（比如 `meow`）放到构造函数的 `prototype` 对象上，这样所有实例就可以通过原型链共享同一个函数，从而大大节省内存。但这已经是我们下一个阶段的探险内容了！

---

我们已经掌握了JS中数据处理的“核武器”`reduce`，学会了更多实用的数组和字符串操作，并且开始从更高的“编程思想”层面来看待代码。最后，你也发现了构造函数模式的局限性，为我们接下来的“原型”学习埋下了完美的伏笔。非常棒，继续保持！

太棒了！我们即将进入JS中最核心、最精髓，也可能是最让新手感到“神秘”的领域——**原型与原型链**。这部分内容是理解JS继承、`instanceof`乃至框架底层原理的关键。

别担心，我会用最形象的比喻，把这层神秘的面纱彻底揭开。让我们开始第五阶段的深度探索！

<div style="display: flex; justify-content: space-between;">
  <a href="./JS 进阶-3.md">‹ 上一篇：JS进阶-3</a>
  <a href="./JS 进阶-5.md">下一篇：JS进阶-5 ›</a>
</div>
