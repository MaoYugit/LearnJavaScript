## **DAY 5 - 对象与内存：描述世间万物**

### **1. 什么是对象以及基本使用**

*   **什么是对象 (Object)？**
    对象是一种**复合数据类型**，它允许你将多个**键值对 (key-value pairs)** 存储在一个单一的实体中。你可以把它想象成一个现实世界中的事物：一辆车、一个人、一本书。
    
    *   **属性 (Property):** 描述这个事物特征的名词（键/key），和它的值 (value)。例如：`color: 'red'`。
    *   **方法 (Method):** 描述这个事物能做的动作的动词（键/key），它的值是一个函数。例如：`start: function() { ... }`。
    
*   **创建对象 (对象字面量)**
    在开发中，我们**99%** 的情况都使用对象字面量 `{}` 来创建对象，因为它最简洁、最高效。

    ```javascript
    // 创建一个描述“人”的对象
    const person = {
      // 属性
      name: '张三',
      age: 25,
      isStudent: false,
      // 属性的值可以是数组
      hobbies: ['篮球', '音乐', '编码'],
      // 属性的值甚至可以是另一个对象
      address: {
        city: '北京',
        district: '海淀区'
      }
    };
    
    // 使用对象
    console.log(person.name); // 输出 '张三'
    console.log(person.hobbies[0]); // 输出 '篮球'
    console.log(person.address.city); // 输出 '北京'
    ```

---

### **2. 对象的操作 —— 增、删、改 (Update, Delete, Create)**

*   **修改 (Update):** 直接对已有的属性重新赋值。
*   **增加 (Create):** 对一个不存在的属性进行赋值，JS会自动为你添加这个新属性。
*   **删除 (Delete):** 使用 `delete` 操作符。

```javascript
const car = {
  brand: 'Toyota',
  color: 'blue'
};

// 1. 修改属性
car.color = 'red';
console.log(car.color); // 输出 'red'

// 2. 增加属性
car.year = 2023;
console.log(car.year); // 输出 2023

// 3. 删除属性
delete car.brand;
console.log(car.brand); // 输出 undefined
console.log(car); // { color: 'red', year: 2023 }
```

**重点：** 这些操作都会直接**修改（mutate）**原始对象。

---

### **3. 对象的操作 —— 查 (Read) 的两种方法**

这是面试中关于对象基础的一个高频考点。

*   **点符号 (Dot Notation):** `object.key`
*   **方括号符号 (Bracket Notation):** `object['key']`

> #### **面试官提问：** “请说明在访问对象属性时，点符号和方括号符号的区别，以及各自的应用场景。”
>
> **回答思路：**
> 1. **本质区别：** “最核心的区别在于**方括号符号将键（key）作为字符串来处理**，而点符号则将键作为**字面量（标识符）**来处理。”
>
> 2. **语法与能力：**
>    *   **点符号**更简洁，可读性好，是首选的访问方式。但它有一个限制：**键的名称必须是静态的、合法的标识符**（不能以数字开头，不能包含空格或特殊字符）。
>    *   **方括号符号**功能更强大。因为它将键视为字符串，所以它可以：
>        *   **处理包含非法标识符的键**，比如 `person['full name']` 或 `data['1st-place']`。
>        *   **使用变量作为键**。这是它最强大的应用场景，可以在运行时动态地访问属性。
>
> 3. **举例说明应用场景：**
>
>    ```javascript
>    const person = {
>      name: 'Alice',
>      'favorite-food': 'pizza',
>    };
>       
>    // 场景一：常规访问
>    console.log(person.name); // 'Alice'，使用点符号
>       
>    // 场景二：键包含特殊字符
>    // console.log(person.favorite-food); // 语法错误！JS会把'-'当作减法
>    console.log(person['favorite-food']); // 'pizza'，必须使用方括号
>       
>    // 场景三：动态访问（最重要！）
>    const keyToAccess = 'name';
>    console.log(person.keyToAccess);    // 输出 undefined，因为它试图找一个叫 'keyToAccess' 的属性
>    console.log(person[keyToAccess]);   // 输出 'Alice'，因为它会先计算变量 keyToAccess 的值，得到 'name'，然后访问 person['name']
>    ```
> 4. **总结：** "因此，在日常开发中，如果属性名是固定的且合法的，我们就用点符号以提高可读性。如果属性名是动态的（存储在变量中），或者包含特殊字符，我们就必须使用方括号符号。"

---

### **4. 对象的方法**

当对象的属性值是一个函数时，我们称之为**方法 (Method)**。方法定义了对象的行为。

*   **`this` 关键字:**
    在方法内部，`this` 关键字是一个特殊的指向。**谁调用了这个方法，`this` 就指向谁**。

```javascript
const user = {
  name: 'Bob',
  age: 30,
  // 定义一个 greet 方法
  greet: function() {
    // 这里的 this 指向调用 greet 方法的 user 对象
    console.log(`你好，我是 ${this.name}，今年 ${this.age} 岁。`);
  }
};

user.greet(); // 输出: 你好，我是 Bob，今年 30 岁。
```

---

### **5. 遍历对象**

我们使用 `for...in` 循环来遍历一个对象的所有**可枚举属性 (enumerable properties)**。

```javascript
const student = {
  id: 101,
  name: '小明',
  major: '计算机科学'
};

for (const key in student) {
  // 在循环中，key 是一个字符串，代表对象的属性名
  console.log(`属性名: ${key}, 属性值: ${student[key]}`);
  // 注意：这里必须用方括号 student[key]，因为 key 是一个变量
}
```

> #### **面试官提问（进阶）：** “使用 `for...in` 遍历对象时，有什么需要注意的地方吗？”
>
> **回答思路：** 这个问题考察你是否知道 `for...in` 的一个重要“陷阱”。
>
> 1. **指出问题：** "`for...in` 循环不仅会遍历对象**自身的**属性，还会遍历其**原型链上**的可枚举属性。在大多数情况下，我们只关心对象自身的属性，所以这可能会导致意想不到的结果。"
> 2. **提供解决方案：** "为了避免这个问题，最佳实践是在循环内部使用 `Object.prototype.hasOwnProperty()` 方法进行判断，确保我们只处理对象自身的属性。"
> 3.  **代码示例：**
>
>     ```javascript
>     for (const key in student) {
>       if (student.hasOwnProperty(key)) {
>         console.log(`属性名: ${key}, 属性值: ${student[key]}`);
>       }
>     }
>     ```
>     
> 4. **总结：** "这个检查是一个很好的编程习惯，可以让代码更加健壮和可预测。"
>
> **一个例子：**
> 假设某个库（或者你不小心）修改了所有对象的顶级原型` Object.prototype`：
>
> ```javascript
> Object.prototype.inheritedProperty = '这是一个继承来的属性';
> 
> const student = {
>   name: '李四',
>   score: 95
> };
> 
> for (const key in student) {
>   console.log(key);
> }
> ```
>
> **输出结果会是：**
>
> ```bash
> name
> score
> inheritedProperty // <-- 意料之外的属性被遍历出来了！
> ```
>
> 在大多数业务场景下，我们只想操作 student 对象上直接定义的 name 和 score，而不想处理那个从原型链上“污染”过来的 `inheritedProperty`。这就是面试官想考察你是否了解的“意外结果”。
>
> ## 一个类似实际开发的例子
>
> ### 场景设定
>
> 假设我们正在开发一个简单的游戏。游戏中有不同类型的角色，但所有角色都有一些共同的属性和能力，比如 health (生命值) 和 attack (攻击方法)。我们先创建一个“父类”构造函数 Character 来定义这些通用特性。
>
> 然后，我们再创建一个具体的角色，比如 Warrior (战士)，它继承自 Character，并且拥有自己独特的属性，比如 weapon (武器)。
>
> ### 步骤 1: 创建父构造函数和原型方法
>
> 首先，我们定义所有角色都共有的基础构造函数 Character。为了让所有 Character 的实例共享 attack 这个方法（而不是每个实例都复制一份），我们把 attack 方法定义在 `Character.prototype `上。
>
> ```JavaScript
> // 1. 定义父构造函数
> function Character(name) {
>   this.name = name; // 这是每个实例自身的属性
>   this.health = 100; // 这也是每个实例自身的属性
> }
> 
> // 2. 在 Character 的原型上添加一个共享的方法
> //    这个属性就在原型链上了
> Character.prototype.attack = function() {
>   console.log(`${this.name} 发起了攻击！`);
> };
> 
> // 我们再给原型加一个可枚举的属性，来模拟可能被污染的情况
> Character.prototype.isCharacter = true;
> ```
>
> - name 和 health 是通过 this 直接添加到实例上的，所以它们是**对象自身**的属性。
> - attack 和 `isCharacter` 是添加到 `Character.prototype` 上的，所有由 Character 创建的实例都会通过**原型链**继承它们。
>
> ### 步骤 2: 创建子构造函数并建立继承关系
>
> 现在，我们定义 Warrior 构造函数，并让它继承 Character。
>
> ```javascript
> // 3. 定义子构造函数
> function Warrior(name, weapon) {
>   // 调用父构造函数，继承自身的属性 (name, health)
>   Character.call(this, name);
>   
>   // 添加 Warrior 独有的自身属性
>   this.weapon = weapon;
> }
> 
> // 4. 关键一步：将 Warrior 的原型指向 Character 的一个实例
> //    这样就建立了原型链继承关系
> Warrior.prototype = Object.create(Character.prototype);
> 
> // 修复构造函数指向（可选，但推荐）
> Warrior.prototype.constructor = Warrior;
> ```
>
> ### 步骤 3: 创建实例并使用 for...in 遍历
>
> 现在，我们来创建一个具体的战士实例，然后用 for...in 循环来遍历它的所有属性，看看会发生什么。
>
> ```JavaScript
> // 5. 创建一个战士实例
> const warrior = new Warrior('阿尔萨斯', '霜之哀伤');
> 
> console.log("使用 for...in 循环遍历 warrior 对象:");
> 
> // 6. 开始遍历
> for (const key in warrior) {
>   console.log(`发现属性: ${key}`);
> }
> ```
>
> ### 结果分析
>
> 当你运行上面的代码，你会看到以下输出：
>
> ```bash
> 使用 for...in 循环遍历 warrior 对象:
> 发现属性: name
> 发现属性: health
> 发现属性: weapon
> 发现属性: attack
> 发现属性: isCharacter
> ```
>
> 现在我们来分析这个结果：
>
> - **name**: 这是 warrior **自身**的属性。它是在 Character.call(this, name) 中被添加到 warrior 对象上的。
> - **health**: 这是 warrior **自身**的属性。它也是在 Character.call(this, name) 中被添加的。
> - **weapon**: 这是 warrior **自身**的属性。它是在 Warrior 构造函数中通过 this.weapon = weapon 添加的。
> - **attack**: 这个属性**不是 warrior 自身的**。for...in 循环在 warrior 对象上找不到 attack，于是它沿着原型链向上查找，在 Character.prototype 上找到了它，并将其遍历了出来。
> - **isCharacter**: 这个属性也**不是 warrior 自身的**。和 attack 一样，它也是从原型链 Character.prototype 上被找到并遍历出来的。
>
> ### 如何只遍历自身属性？
>
> 现在，我们使用前面提到的 `hasOwnProperty() `方法来过滤掉原型链上的属性：
>
> ```js
> console.log("\n使用 for...in 配合 hasOwnProperty 过滤后:");
> 
> for (const key in warrior) {
>   if (warrior.hasOwnProperty(key)) {
>     console.log(`发现自身属性: ${key}, 值为: ${warrior[key]}`);
>   }
> }
> ```
>
> 这次的输出结果就变得非常“干净”和可预测了：
>
> ```bash
> 使用 for...in 配合 hasOwnProperty 过滤后:
> 发现自身属性: name, 值为: 阿尔萨斯
> 发现自身属性: health, 值为: 100
> 发现自身属性: weapon, 值为: 霜之哀伤
> ```
>
> 这个例子清晰地展示了 for...in 的行为：它会毫不犹豫地“爬上”原型链，把所有可枚举的属性都找出来。而 hasOwnProperty() 则像一个忠实的守卫，确保只有对象自己的“家庭成员”（自身属性）才能通过检查。
>
> ### 现代 JavaScript 的替代方案
>
> 除了 for...in 配合 `hasOwnProperty`，在现代 `JavaScript (ES6+) `中，有更直接、更推荐的方法来遍历对象自身的属性，面试时如果能提到它们，会是加分项：
>
> - **`Object.keys(obj)`**: 返回一个由对象**自身**可枚举属性名组成的数组。
> - **`Object.values(obj)`**: 返回一个由对象**自身**可枚举属性值组成的数组。
> - **`Object.entries(obj)`**: 返回一个由对象**自身**可枚举的 [键, 值] 对组成的数组。
>
> 使用这些方法，你就可以完全避免 for...in 的原型链问题，因为它们在设计上就不会遍历原型链。
>
> 例如，使用 `Object.keys `可以这样写：
>
> ```js
> Object.keys(student).forEach(key => {
>   console.log(`属性名: ${key}, 属性值: ${student[key]}`);
> });
> ```
>
> 这种方式更简洁，意图也更清晰。

---

### **6. & 7. 数学内置对象 (`Math`) 与随机数函数**

*   `Math` 是一个JavaScript内置的全局对象，它提供了常用的数学常量和函数。
*   它**不是一个构造函数**，你不能 `new Math()`。
*   **常用方法：**
    *   `Math.random()`: 返回一个 `[0, 1)` 之间的随机浮点数（包含0，不包含1）。
    *   `Math.floor(x)`: 向下取整。`Math.floor(9.9)` 结果是 `9`。
    *   `Math.ceil(x)`: 向上取整。`Math.ceil(9.1)` 结果是 `10`。
    *   `Math.round(x)`: 四舍五入。`Math.round(9.5)` 是 `10`，`Math.round(9.4)` 是 `9`。
    *   `Math.max(a, b, ...)`: 返回一组数中的最大值。
    *   `Math.min(a, b, ...)`: 返回一组数中的最小值。
    *   `Math.PI`: 圆周率。

*   **生成指定范围的随机整数（面试常考手写）**
    **公式：** `Math.floor(Math.random() * (max - min + 1)) + min`

    ```javascript
    // 封装一个函数，生成 [min, max] 范围内的随机整数
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    // 示例：生成 1 到 10 之间的随机数
    const randomNumber = getRandomInt(1, 10);
    console.log(randomNumber);
    ```

---

### **8. 简单 (原始) 和引用数据类型 (面试终极 Boss)**

这是理解JavaScript内存管理和变量行为的**基石**。

> #### **面试官提问：** “请解释一下JavaScript中的原始数据类型和引用数据类型，它们在内存中是如何存储的？以及这种差异如何影响变量的赋值和函数传参？”
>
> **回答思路：** 这个问题必须回答得滴水不漏。
>
> 1.  **分类：** "JavaScript的数据类型可以分为两大类：
>     *   **原始数据类型 (Primitives):** 包括 `String`, `Number`, `Boolean`, `null`, `undefined`, `Symbol`, `BigInt`。
>     *   **引用数据类型 (References):** 主要是 `Object` 类型，包括普通对象、`Array`、`Function` 等。"
>
> 2.  **内存存储机制（核心）：**
>     *   "**原始类型**的值直接存储在**栈 (Stack) 内存**中。每个变量都有自己独立的空间，它们的值是**按值访问**的。"
>     *   "**引用类型**的值比较复杂。它的**数据本身**（比如对象的所有属性）存储在**堆 (Heap) 内存**中，而在**栈 (Stack) 内存**中，变量存储的只是一个指向堆中数据的**内存地址（或称为引用）**。"
>
> 3.  **赋值行为的差异（举例说明）：**
>     *   "**原始类型的赋值是‘值的拷贝’**。当把一个原始类型变量赋给另一个变量时，计算机会创建一个全新的值，并把它赋给新变量。之后两个变量**互不影响**。"
>
>       ```javascript
>       let a = 10;
>       let b = a; // b 得到了 a 的值的拷贝 (10)
>       b = 20;    // 修改 b
>       console.log(a); // 输出 10，a 没有受到影响
>       ```
>
>     *   "**引用类型的赋值是‘引用的拷贝’**。当把一个引用类型变量赋给另一个变量时，被拷贝的只是栈中的**内存地址**，而不是堆中的对象本身。结果就是，两个变量现在**指向了同一个堆内存中的对象**。对其中任何一个变量所指向的对象进行修改，都会影响到另一个变量。"
>
>       ```javascript
>       let objA = { value: 10 };
>       let objB = objA; // objB 拷贝了 objA 的内存地址，它们指向同一个对象
>       objB.value = 20; // 通过 objB 修改这个对象
>       console.log(objA.value); // 输出 20，objA 也受到了影响
>       ```
>
> 4.  **对函数传参的影响：** "这个差异同样体现在函数传参上。JavaScript中所有函数的参数都是**按值传递**的。
>     *   当传递**原始类型**时，是把**值的副本**传入函数，函数内部的修改不会影响外部。
>     *   当传递**引用类型**时，是把**内存地址的副本**传入函数。虽然地址是副本，但它和外部变量指向的是同一个堆对象，所以在函数内部修改这个对象的属性，会影响到外部的原始对象。"
>
### **总结**

今天我们已经深入到了JavaScript的“底层逻辑”。你现在应该掌握：

*   **对象的本质：** 它是描述复杂事物的蓝图，是属性和方法的集合。
*   **对象的 CRUD 操作：** 特别是点符号和方括号符号的精妙区别。
*   **`this` 的初步认识：** 谁调用，指向谁。
*   **内存的秘密：** 栈与堆的区别，以及原始类型与引用类型的根本差异。
