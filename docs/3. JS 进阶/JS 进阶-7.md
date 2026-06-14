### 第一篇：彻底掌握 `call`

#### 1. 什么是 `call`？
`call()` 方法调用一个对象的一个方法，以另一个对象替换当前对象。

*   **语法：** `func.call(thisArg, arg1, arg2, ...)`
*   **参数：**
    *   `thisArg`: 在 `func` 函数运行时指定的 `this` 值。
    *   `arg1, arg2, ...`: 指定的参数列表（一个个传，这是它和 `apply` 的唯一区别）。

#### 2. 基础演示（先看怎么用）
```javascript
const person = {
    name: '小明',
    sayHello: function(age, city) {
        console.log(`你好，我是${this.name}，今年${age}岁，来自${city}。`);
    }
};

const anotherPerson = {
    name: '红姐'
};

// 正常调用
person.sayHello(20, '北京'); // 你好，我是小明...

// 使用 call：让 anotherPerson 借用 person 的 sayHello 方法
person.sayHello.call(anotherPerson, 25, '上海'); 
// 输出：你好，我是红姐，今年25岁，来自上海。
```

---

#### 3. 面试官最爱的：底层细节 (Edge Cases)

在面试中，仅仅知道上面的用法是不够的，面试官会问你：

*   **非严格模式下：** 如果第一个参数传 `null` 或 `undefined`，`this` 会指向哪里？
    *   **结论：** 自动指向全局对象（浏览器里是 `window`，Node.js 里是 `global`）。
*   **严格模式下 (`'use strict'`)：**
    *   **结论：** `this` 会严格等于你传的第一个参数（传 `null` 就是 `null`）。
*   **传原始值（数字、字符串等）：**
    *   **结论：** `this` 会指向该原始值的**包装对象**（如传 `1` 变成 `Number` 对象）。

---

#### 4. 高频面试题：手写 `call`
这是衡量一个前端是否及格的标准。面试官通常要求你不能使用原生的 `call` 来实现它。

**实现思路（核心：谁调用，this就指向谁）：**
1. 将函数设为目标对象的一个属性（临时增加一个 key）。
2. 执行该函数。
3. 删除该临时属性。

```javascript
Function.prototype.myCall = function(context, ...args) {
    // 1. 判断 context 是否存在，如果为 null/undefined 则指向 window
    context = context || window;
    
    // 2. 将原始值包装成对象（处理 call(1, ...) 的情况）
    context = Object(context);

    // 3. 给 context 创建一个唯一的属性（避免覆盖原有的属性）
    const fnSymbol = Symbol('fn');
    
    // 4. this 就是当前要调用的那个函数
    context[fnSymbol] = this;

    // 5. 执行函数并接收返回值
    const result = context[fnSymbol](...args);

    // 6. 擦干净屁股，删除临时属性
    delete context[fnSymbol];

    // 7. 返回结果
    return result;
};
```

---

#### 5. 实战开发场景（为什么我们要用它？）

在实际开发中，`call` 出现的频率极高：

**场景 A：精确判断变量类型 (最经典用法)**
`typeof` 无法区分数组和对象。我们会借用 `Object` 原型上的 `toString`：

```javascript
const arr = [1, 2];
console.log(Object.prototype.toString.call(arr)); // "[object Array]"
// 为什么要用 call？因为直接 arr.toString() 调用的是 Array 覆盖后的方法，只返回 "1,2"
```

**场景 B：类数组对象借用数组方法**
例如 DOM 的 `NodeList` 或函数的 `arguments` 并不是真正的数组，不能直接用 `.map()`。

```javascript
function func() {
    // 借用 Array 的 slice 方法，将 arguments 转为真正的数组
    const args = Array.prototype.slice.call(arguments);
    console.log(args.map(x => x * 2));
}
func(1, 2, 3); // [2, 4, 6]
```

**场景 C：ES5 时代的构造函数继承**
在没有 `class` 的年代，这是实现继承的标准做法。

```javascript
function Parent(name) {
    this.name = name;
}

function Child(name, age) {
    // 借用父类的构造函数来初始化子类的属性
    Parent.call(this, name); 
    this.age = age;
}

const boy = new Child('张三', 18);
console.log(boy.name); // 张三
```

---

### 总结 `call` 的精髓
1.  **目的是改变 `this`。**
2.  **参数是平铺传进去的。**
3.  **核心原理是“隐式绑定”：** 把函数作为对象的方法执行，执行完再删掉。

---

### 第二篇：深度掌握 `apply`

#### 1. 什么是 `apply`？
`apply()` 方法的作用和 `call()` **完全一样**：都是为了改变函数运行时的 `this` 指向，并立即执行该函数。

**唯一的区别在于“传参形式”：**
*   **`call`**：参数是一个一个**平铺**进去的。
*   **`apply`**：参数是放在一个**数组**（或类数组对象）里传进去的。

> **记忆秘诀：**
> **A**pply 对应 **A**rray（数组）；
> **C**all 对应 **C**omma（逗号，即平铺传参）。

---

#### 2. 语法
```javascript
func.apply(thisArg, [argsArray])
```
*   `thisArg`: 想要指定的 `this`。
*   `[argsArray]`: 一个数组或者类数组（如 `arguments`）。

---

#### 3. 实战开发场景（为什么需要它？）

在 ES6 的扩展运算符（`...`）普及之前，`apply` 是解决“**数组拍平传参**”问题的唯一救星。

**场景 A：求数组中的最大值/最小值**
`Math.max` 方法不接受数组，它只接受一个个参数：`Math.max(1, 2, 3)`。
如果你有一个数组 `const nums = [5, 1, 9, 3]`：

```javascript
// 过去的做法：借用 apply 自动把数组拆成一个个参数
const max = Math.max.apply(null, nums); 
// 相当于执行了 Math.max(5, 1, 9, 3)

// 现在的做法（ES6）：
const max2 = Math.max(...nums);
```

**场景 B：合并数组（且不产生新数组）**
`concat` 会返回一个新数组，但如果你想直接把 `arr2` 的元素推入 `arr1`：

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];

// 借用 Array.prototype.push
Array.prototype.push.apply(arr1, arr2); 
// 相当于 arr1.push(3, 4)

console.log(arr1); // [1, 2, 3, 4]
```

**场景 C：日志打印（装饰器模式原型）**
当你想要封装一个日志工具，原封不动地转发参数时：

```javascript
function log() {
    // 借用 console.log 打印出当前函数接收到的所有参数
    console.log.apply(console, arguments);
}
log('Error:', '404', 'Not Found');
```

---

#### 4. 面试手写 `apply`

基于你已经写出的 `myCall`，`myApply` 的实现几乎一模一样，只是处理第二个参数时，不需要 `...args` 这种剩余参数语法，而是直接接收一个 `argsArray`。

**你需要注意的细节：**
1.  **判断参数是否为数组**：原生的 `apply` 如果第二个参数不是数组（或类数组），会报错。
2.  **默认值**：如果没传第二个参数，应默认为空数组。

```javascript
Function.prototype.myApply = function(context, argsArray) {
    // 1. 健壮性检查
    if (typeof this !== 'function') {
        throw new TypeError('Error: myApply must be called on a function');
    }

    // 2. 处理 context (与 myCall 一致)
    if (context === null || context === undefined) {
        context = window;
    } else {
        context = Object(context);
    }

    // 3. 处理参数：如果没传或者不是数组，要防止报错
    // 注意：原生 apply 支持类数组，这里我们简单化处理成数组判断
    if (argsArray && !Array.isArray(argsArray)) {
        throw new TypeError('CreateListFromArrayLike called on non-object');
    }
    
    const fnSymbol = Symbol('fn');
    context[fnSymbol] = this;

    // 4. 执行函数
    let result;
    if (!argsArray || argsArray.length === 0) {
        // 没有参数直接调用
        result = context[fnSymbol]();
    } else {
        // 有参数则用扩展运算符展开数组（或者是 ES5 的 eval，但面试用扩展运算符即可）
        result = context[fnSymbol](...argsArray);
    }

    delete context[fnSymbol];
    return result;
};
```

---

#### 5. `call` vs `apply`：我该用哪个？

在实际开发中：
*   **参数数量固定**：用 `call`，代码可读性更好，比如 `changeColor.call(obj, 'red')`。
*   **参数已经在数组里了**：或者参数数量不确定，直接用 `apply`。
*   **现代开发（ES6+）**：绝大多数人更倾向于用 `call` 配合扩展运算符 `...`。
    *   例如：`func.apply(obj, arr)` 逐渐被 `func.call(obj, ...arr)` 取代。

---

#### 总结对比

| 特性          | `call`                    | `apply`                  |
| :------------ | :------------------------ | :----------------------- |
| **改变 this** | 是                        | 是                       |
| **立即执行**  | 是                        | 是                       |
| **传参方式**  | 参数列表（arg1, arg2...） | 单个数组（[arg1, arg2]） |
| **性能**      | 略快（少了一层数组解析）  | 略慢                     |

---

### 第三篇：深度掌握 `bind`

#### 1. 什么是 `bind`？
`bind()` 方法创建一个**新的函数**。在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

**核心区别：**
*   `call` / `apply`：**立即执行**函数，返回函数执行的结果。
*   `bind`：**不立即执行**，而是**返回一个改变了 `this` 后的新函数**。

---

#### 2. 基础演示：预约执行
```javascript
const user = {
    name: '小王',
    sayHi: function(age) {
        console.log(`我是${this.name}，今年${age}岁`);
    }
};

const newFn = user.sayHi.bind({ name: '老李' }); 

// 注意：此时没有输出，因为函数还没执行
newFn(50); // 输出：我是老李，今年50岁
```

---

#### 3. 实战开发场景（为什么它无可替代？）

**场景 A：React/原生 JS 的事件监听**
在类组件或回调函数中，`this` 经常会丢失。
```javascript
const button = {
    content: '点击我',
    click: function() {
        console.log(this.content + ' 被点击了');
    }
};

// 错误写法：此时 this 指向 DOM 元素，输出 undefined
// document.getElementById('btn').addEventListener('click', button.click);

// 正确写法：预先把 this 绑定死在 button 对象上
const boundClick = button.click.bind(button);
document.getElementById('btn').addEventListener('click', boundClick);
```

**场景 B：偏函数（Partial Functions / 柯里化）**
`bind` 不仅可以绑定 `this`，还可以**预置参数**。
```javascript
function multiply(a, b) {
    return a * b;
}

// 预设第一个参数 a 为 2，返回一个“翻倍”函数
const double = multiply.bind(null, 2);

console.log(double(5)); // 10 (2 * 5)
console.log(double(10)); // 20 (2 * 10)
```

---

#### 4. 面试终极挑战：手写 `bind`

手写 `bind` 比前两个难得多。我们需要分步走：

##### 第一步：基础版（处理 this 和参数）
这是 60 分的答案：
```javascript
Function.prototype.myBind = function(context, ...args) {
    const self = this; // 保存原函数（比如 sayHi）

    return function(...newArgs) {
        // args 是 bind 时传的参数，newArgs 是执行时传的参数
        // 把它们合并起来：.apply(context, [参数1, 参数2])
        return self.apply(context, [...args, ...newArgs]);
    }
};
```

##### 第二步：进阶版（处理 `new` 调用 —— 面试加分项）
**这是一个极其刁钻的 JS 特性：**
如果我对一个 `bind` 后的函数使用 `new` 操作符，那么之前绑定的 `this` 会**失效**，`this` 还是会指向 `new` 出来的那个实例。

```javascript
Function.prototype.myBind = function(context, ...args) {
    const self = this;

    const bound = function(...newArgs) {
        // 判断是否是通过 new 调用的
        // 如果是 new 调用的，this 应该是实例本身，而不是 context
        const finalContext = this instanceof bound ? this : context;
        return self.apply(finalContext, [...args, ...newArgs]);
    };

    // 继承原函数的原型（保证实例能找到原函数原型链上的方法）
    bound.prototype = Object.create(self.prototype);

    return bound;
};
```

---

#### 5. `bind` 的三个致命细节（面试必杀技）

1.  **“一次绑定，终身受益”**：
    一个函数被 `bind` 之后，再次对它使用 `call`、`apply` 甚至再次 `bind`，**都无法改变**第一次绑定的 `this` 指向。
    ```javascript
    const fn = function() { console.log(this.name) };
    const boundFn = fn.bind({ name: 'A' }).bind({ name: 'B' });
    boundFn(); // 依然打印 'A'
    ```

2.  **`new` 优先级最高**：
    虽然 `bind` 把 `this` 锁死了，但 `new` 依然可以把它撬开（如上面的手写逻辑所示）。

3.  **性能损耗**：
    `bind` 比 `call` 和 `apply` 稍微慢一点，因为它创建了一个闭包，并返回了一个新函数。在高性能循环中，尽量避免反复 `bind`。

---

### 总结：Call / Apply / Bind 的三剑客对比

| 方法      | 参数传递          | 执行时机     | 返回值     | 常见用途                    |
| :-------- | :---------------- | :----------- | :--------- | :-------------------------- |
| **Call**  | 平铺 (arg1, arg2) | 立即执行     | 函数结果   | 借用方法、继承              |
| **Apply** | 数组 ([args])     | 立即执行     | 函数结果   | 数组传参、借用 Math 方法    |
| **Bind**  | 平铺 (arg1, arg2) | **稍后执行** | **新函数** | 事件监听、固定 this、柯里化 |

---

