# JS进阶

---

<div style="display: flex; justify-content: space-between;">
  <a href="./JS 进阶-2.md">下一篇：JS进阶-2 ›</a>
</div>
## 1. 作用域 (Scope) 和 作用域链 (Scope Chain)

**作用域（Scope）** 和 **作用域链（Scope Chain）** 是 JavaScript 中非常核心的概念，它们共同决定了代码在执行过程中如何访问变量和函数。

### 什么是作用域？

**作用域**可以理解为一个独立的区域或空间。在这个空间内声明的变量或函数，只能在这个空间以及其内部嵌套的空间中被访问，外部空间是无法直接访问的。它本质上定义了变量和函数的可访问性，或者说规定了它们的“有效范围”。

作用域的主要作用是：

1.  **隔离变量**：防止不同作用域中的变量相互冲突，避免了变量污染。例如，在不同的函数中可以定义同名变量而不会产生冲突。
2.  **提升安全性**：通过限制对变量的访问，可以更好地控制代码的执行逻辑，将一些内部实现细节隐藏起来。

在 JavaScript 中，主要有以下几种作用域：

*   **全局作用域（Global Scope）**：这是最外层的作用域。在任何函数或代码块之外定义的变量都属于全局作用域，在代码的任何地方都可以被访问到。在浏览器环境中，全局对象通常是 `window`。
*   **函数作用域（Function Scope）**：当在一个函数内部定义变量时，这些变量就处于该函数的作用域内。它们只能在该函数内部以及其嵌套的函数中被访问。
*   **块级作用域（Block Scope）**：这是由 `let` 和 `const` 关键字引入的概念。使用花括号 `{}` 包围的代码块（例如 `if` 语句、`for` 循环）会创建一个块级作用域。在这个块中用 `let` 或 `const` 声明的变量，只在这个块内部有效。

### 什么是作用域链？

当代码在一个作用域中试图访问一个变量时，如果当前作用域内找不到这个变量，JavaScript 引擎就会沿着一个特定的路径去“上一层”作用域中寻找，如果上一层还没找到，就再往上一层找，直到找到全局作用域为止。这个由内向外、逐层嵌套的作用域连接起来的链式结构，就是**作用域链**。

可以把它想象成一个“寻宝”的过程：

1.  **起点**：从当前执行代码所在的作用域开始寻找。
2.  **向外层查找**：如果在当前作用域找不到，就沿着作用域链向上，进入到包含它的父级作用域中去寻找。
3.  **重复过程**：持续这个过程，一层一层地向外查找，直到找到该变量为止。
4.  **终点**：如果一直找到了最外层的全局作用域还是没有找到这个变量，那么程序就会抛出一个引用错误（ReferenceError）。

**举个例子来说明：**

```javascript
var globalVar = "我是全局变量";

function outerFunc() {
  var outerVar = "我是外部函数的变量";

  function innerFunc() {
    var innerVar = "我是内部函数的变量";
    console.log(innerVar);    // 输出: "我是内部函数的变量" (在当前作用域找到)
    console.log(outerVar);    // 输出: "我是外部函数的变量" (在父级作用域找到)
    console.log(globalVar);   // 输出: "我是全局变量" (在全局作用域找到)
  }

  innerFunc();
}

outerFunc();
```

在这个例子中，`innerFunc` 函数内部形成了一个作用域链：

*   **第0层**：`innerFunc` 自己的作用域。
*   **第1层**：`outerFunc` 的作用域。
*   **第2层**：全局作用域。

当 `innerFunc` 中访问 `outerVar` 时，它在自己的作用域里没找到，于是就通过作用域链向上找到了 `outerFunc` 的作用域，并成功访问。访问 `globalVar` 也是同理。

**总结一下**，作用域为变量和函数划定了地盘，而作用域链则是在这些地盘之间寻找变量的路径和规则。理解了这两个概念，对于掌握闭包、变量提升等其他重要的 JavaScript 特性有非常大的帮助。

#### 核心思想

* **作用域 (Scope)**：就是一个“地盘”。在这个地盘里声明的变量，只有在地盘内部或者更小的子地盘里才能被访问。出了这个地盘，就没人认识你了。这就像你在自己家里（一个地盘），可以随便使用你的牙刷、毛巾。但你跑到邻居家（另一个地盘），就不能用人家的牙刷了。
* **作用域链 (Scope Chain)**： **作用域链是当查找一个变量时，由当前作用域开始，逐级向上层作用域进行搜索，直至全局作用域为止所形成的链式结构。**就是一个“寻宝路线图”。当你需要使用一个变量时，JS会先在你的当前地盘（比如一个函数内部）找，如果找不到，它就会去你的上级地盘（比如函数外面）找，再找不到，就再去上级的上级地盘找，一直找到最大的“地球村”（全局作用域）。这条从内到外的寻找路径，就是作用域链。

---

## 2. JS 垃圾回收机制 (Garbage Collection)

JavaScript 是一种具有自动垃圾回收机制的语言。这意味着开发者不需要像 C/C++ 那样手动分配和释放内存，JavaScript 引擎会在适当的时候自动为我们完成这些工作。

它的核心思想是“**内存的可达性（Reachability）**”。简单来说，就是从一组“根”对象（比如全局对象、当前调用栈中的变量等）开始，凡是能够被访问到的对象，就是“可达的”或“存活的”，反之则是“不可达的”，也就是垃圾，需要被回收。

目前，JavaScript 引擎中主流的垃圾回收算法有两种：

### 1. 引用计数（Reference Counting）

这是早期的一种比较简单的算法。

*   **工作原理**：它为每个对象维护一个“引用计数器”。当有一个引用指向该对象时，计数器就加 1；当指向它的引用被移除时，计数器就减 1。当计数器变为 0 时，就意味着这个对象再也无法被访问了，可以被回收。
*   **缺点**：它有一个致命的缺陷，就是无法解决**循环引用**的问题。

比如下面这个例子：

```javascript
function createCircularReference() {
  let objA = {};
  let objB = {};

  objA.b = objB; // objB 的引用计数变为 1
  objB.a = objA; // objA 的引用计数变为 1
}

createCircularReference();
// 函数执行完毕后，objA 和 objB 的引用都消失了，
// 但由于它们内部互相引用，它们的引用计数永远不会是 0，
// 导致这部分内存永远无法被回收，造成内存泄漏。
```

因此，现代的 JavaScript 引擎已经不再使用这种算法了。

### 2. 标记-清除（Mark-and-Sweep）

这是目前主流浏览器采用的垃圾回收算法。

*   **工作原理**：这个算法分为两个阶段：
    1.  **标记（Mark）阶段**：垃圾回收器从“根”对象（Roots）开始，递归地遍历所有从根可达的对象，并给它们打上一个“标记”，表示它们是存活的。
    2.  **清除（Sweep）阶段**：垃圾回收器会遍历整个堆内存，将所有没有被标记的对象视为垃圾，并进行回收，释放它们占用的内存。

*   **优点**：它可以很好地解决循环引用的问题。在上面的例子中，`objA` 和 `objB` 虽然互相引用，但它们都无法从全局的“根”对象触及，所以在标记阶段它们不会被标记，最终在清除阶段会被一起回收。

---

### 3.V8 引擎的优化 (分代回收)

为了提高垃圾回收的效率，现代的 JS 引擎（比如 Chrome 的 V8）并不仅仅使用简单的标记-清除，而是采用了一种更精细的策略，叫做**分代回收（Generational Collection）**。

V8 引擎将内存堆分为了两个主要区域：

1.  **新生代（New Generation）**：
    *   **特点**：存放新创建的、生命周期很短的对象。这个区域通常比较小，但垃圾回收非常频繁。
    *   **回收算法（Scavenge）**：它将新生代区域再分为两个等大的空间：From 空间和 To 空间。新对象首先被分配在 From 空间。当 From 空间快满时，就会触发一次回收。回收过程会将 From 空间中所有存活的对象复制到 To 空间，然后清空整个 From 空间。最后，From 空间和 To 空间的角色互换。（to的作用是解决内存碎片等作用）
    *   **对象晋升**：如果一个对象在新生代中经过多次复制后依然存活，它就会被认为是生命周期较长的对象，会被“晋升”到老生代中。

2.  **老生代（Old Generation）**：
    *   **特点**：存放生命周期较长或者体积较大的对象（比如从新生代晋升上来的对象）。垃圾回收的频率相对较低。
    *   **回收算法**：主要使用**标记-清除（Mark-Sweep）**。由于老生代的对象多、存活时间长，一次完整的回收会比较耗时。为了避免“全停顿”（Stop-the-World）时间过长影响应用性能，V8 还引入了**标记-整理（Mark-Compact）**来解决内存碎片问题，以及**增量标记（Incremental Marking）**、**并发标记（Concurrent Marking）**等优化手段，让垃圾回收过程与程序执行交替或并行进行。

### 作为开发者，我们应该注意什么？

虽然垃圾回收是自动的，但不良的编码习惯仍然可能导致**内存泄漏**（即无用的内存无法被回收）。作为开发者，我们应该注意：

*   **避免意外的全局变量**：未声明就直接赋值的变量会成为全局变量，很难被回收。
*   **及时清理定时器和事件监听器**：`setInterval` 或 `addEventListener` 如果不手动清除，它们引用的外部变量可能永远不会被回收。
*   **避免过度的闭包**：闭包会使其作用域链中的变量持续存在于内存中，如果滥用，可能导致内存占用过高。
*   **清理对 DOM 节点的引用**：如果一个 DOM 节点已经被从页面上移除了，但 JavaScript 代码中还保留着对它的引用，那么它也无法被回收。

总的来说，JavaScript 的垃圾回收机制是一个自动化的过程，它通过标记清除等算法来识别和回收不再需要的内存。而 V8 引擎通过分代回收等策略对其进行了深度优化。作为开发者，理解其原理能帮助我们写出更高效、更健壮的代码，有效避免内存泄漏问题。

---

## 3. JS 闭包 (Closure)

要理解闭包，可以从三个层面来入手：**是什么**、**为什么**以及**怎么用**。

### 1. 什么是闭包？

从概念上讲，**闭包（Closure）是指一个函数能够记住并访问其所在的词法作用域（Lexical Scope），即使该函数在其词法作用域之外执行时也是如此。**

用更通俗的话来说，就是**一个函数和它被创建时所在的作用域环境的组合体**。这个“环境”包含了该函数可以访问的所有局部变量。当一个函数返回了它内部定义的另一个函数时，闭包就产生了。

这个被返回的内部函数会“携带”着它诞生时的环境，像一个背包一样，无论它将来在哪里被调用，它都可以打开这个背包，使用里面的变量。

### 2. 闭包是如何形成的？

这和我们刚才聊的作用域链有直接关系。

当一个函数被定义时，它的作用域链就已经确定了。当一个嵌套函数（内部函数）被其外部函数返回后，即使外部函数的执行上下文已经销毁了（比如函数调用结束），但由于内部函数的作用域链中仍然保留着对外部函数活动对象（包含了其变量）的引用，所以这部分内存不会被垃圾回收机制回收。

这就形成了一个“封闭”的空间，让内部函数可以持续访问到外部函数的变量。

**让我们来看一个最经典的计数器例子：**

```javascript
function createCounter() {
  let count = 0; // 这个 count 变量就是 createCounter 的局部变量

  // 下面这个被返回的匿名函数，就是一个闭包
  return function() {
    count++;
    console.log(count);
  };
}

const counter1 = createCounter(); // createCounter() 执行完毕，其作用域按理说应该销毁了

// 但是，由于闭包的存在，内部函数依然可以访问到 count
counter1(); // 输出: 1
counter1(); // 输出: 2
counter1(); // 输出: 3

const counter2 = createCounter(); // 创建一个新的闭包，它有自己独立的 count
counter2(); // 输出: 1
```

在这个例子里：
*   `createCounter` 函数创建了一个局部变量 `count`。
*   它返回了一个匿名函数。这个匿名函数就是闭包。
*   当 `createCounter()` 执行完毕后，`counter1` 变量实际上就是那个被返回的匿名函数。
*   因为 `counter1` 这个闭包“记住”了它被创建时的环境，所以它一直能访问和修改 `count` 变量。`count` 变量的生命周期被延长了。
*   `counter2` 是通过再次调用 `createCounter` 创建的，它拥有一个全新的、独立的 `count` 变量，和 `counter1` 互不影响。

### 3. 闭包有什么用处？（实际应用）

理解了闭包是什么，更重要的是要知道它能帮我们解决什么问题。

1.  **数据封装与私有变量（模块化）**：
    这是闭包最核心的用途。就像上面的计数器例子，`count` 变量只能通过返回的函数来访问和修改，外部无法直接触碰 `count`，从而实现了数据的私有化。在没有 `class` 关键字的时代，开发者们广泛使用闭包来模拟面向对象的封装，也就是所谓的**模块模式（Module Pattern）**。

2.  **创建函数工厂**：
    我们可以利用闭包来创建一系列功能相似但配置不同的函数。

    ```javascript
    function makeSizer(size) {
      return function() {
        document.body.style.fontSize = size + 'px';
      };
    }
    const size12 = makeSizer(12);
    const size14 = makeSizer(14);
    // document.getElementById('size-12').onclick = size12;
    ```

3.  **在循环中保存状态**：
    这是一个经典的面试陷阱。在 `for` 循环中使用 `var` 时，如果不使用闭包，事件监听器或定时器中的回调会共享同一个循环变量。

    ```javascript
    // 错误示范
    for (var i = 1; i <= 3; i++) {
      setTimeout(function() {
        console.log(i); // 会连续输出三个 4
      }, 1000);
    }
    ```
    因为 `setTimeout` 是异步的，当它执行时，循环早已结束，此时 `i` 的值已经是 4。而使用闭包（通常是立即执行函数 IIFE）可以为每次循环创建一个独立的作用域，保存下当时的 `i` 值。当然，在 ES6 中，直接使用 `let` 关键字可以更简单地解决这个问题，因为 `let` 会创建块级作用域。

### 闭包的注意事项

闭包虽然强大，但也有一个需要注意的地方：**内存消耗**。
因为闭包会使其外部作用域的变量一直保存在内存中，无法被垃圾回收。如果滥用闭包，或者闭包引用的对象过大，可能会导致内存占用过高，甚至引发内存泄漏。所以，在不再需要闭包时，可以考虑手动解除对它的引用（例如，`counter1 = null;`），以便垃圾回收器能够回收其占用的内存。

### 总结

闭包是 JavaScript 函数式编程的基石。它赋予了函数一种“记忆”能力，让函数能够封装状态、创建私有数据，并实现许多优雅和强大的编程模式。理解它不仅仅是应对面试，更是写出高质量、模块化 JavaScript 代码的关键。

闭包是JS里一个非常强大、但初学者容易懵圈的概念。我们用一个“魔法背包”的比喻来彻底搞懂它。



---

## 4. 变量和函数提升 (Hoisting)

变量提升（Variable Hoisting）和函数提升（Function Hoisting）是 JavaScript 在代码执行前的一个预处理行为，它深刻地体现了 JavaScript 引擎的工作原理。

简单来说，**提升（Hoisting）就是 JavaScript 引擎在正式执行代码之前，会先将所有用 `var` 声明的变量和函数声明（Function Declaration）“提升”到它们所在作用域的顶部。**

这个“提升”过程是在代码的**编译阶段**完成的，而不是在执行阶段。下面我来分别详细说明一下。

### 一、变量提升 (Variable Hoisting)

变量提升只针对使用 `var` 关键字声明的变量。它的特点是：**只提升声明，不提升赋值**。

这意味着，在代码执行前，`var` 声明的变量会被“登记”在作用域的顶部，并被赋予一个默认值 `undefined`。而真正的赋值操作会保留在原来的位置。

**举个例子：**

```javascript
console.log(myVar); // 输出: undefined
var myVar = "Hello, world!";
console.log(myVar); // 输出: "Hello, world!"
```

对于 JavaScript 引擎来说，它实际看到的代码是这样的：

```javascript
// --- 编译阶段 ---
var myVar; // 变量 myVar 的声明被提升到顶部，并初始化为 undefined

// --- 执行阶段 ---
console.log(myVar); // 此刻 myVar 是 undefined
myVar = "Hello, world!"; // 赋值操作留在原地
console.log(myVar); // 此刻 myVar 被赋值了
```

这就是为什么第一个 `console.log` 会输出 `undefined` 而不是抛出 `ReferenceError`（引用错误）的原因。

#### `let` 和 `const` 的情况

需要特别注意的是，ES6 引入的 `let` 和 `const` **不存在**传统意义上的变量提升。

更准确地说，它们也会被提升，但它们没有被初始化为 `undefined`。它们进入了一个被称为**“暂时性死区”（Temporal Dead Zone, TDZ）**的区域。如果在声明之前尝试访问这些变量，JavaScript 引擎会直接抛出 `ReferenceError`。

```javascript
console.log(myLet); // Uncaught ReferenceError: Cannot access 'myLet' before initialization
let myLet = "Hello";
```

这种设计主要是为了帮助开发者避免在变量声明前就使用变量，从而写出更严谨、更可预测的代码。

### 二、函数提升 (Function Hoisting)

函数提升比变量提升更“彻底”。它会**将整个函数声明（包括函数名和函数体）都提升到作用域的顶部**。

这意味着，你可以在函数声明之前就调用它。

**举个例子：**

```javascript
sayHello(); // 输出: "Hello!"

function sayHello() {
  console.log("Hello!");
}
```

引擎看到的代码等同于：

```javascript
// --- 编译阶段 ---
// 整个 sayHello 函数被提升到顶部
function sayHello() {
  console.log("Hello!");
}

// --- 执行阶段 ---
sayHello(); // 可以正常调用
```

#### 函数表达式 (Function Expression) 不会提升

需要区分的是**函数表达式**。函数表达式本质上是变量赋值，所以它遵循的是变量提升的规则，而不是函数提升。

```javascript
sayHi(); // Uncaught TypeError: sayHi is not a function

var sayHi = function() {
  console.log("Hi!");
};
```

引擎看到的代码是：

```javascript
// --- 编译阶段 ---
var sayHi; // 变量 sayHi 的声明被提升，值为 undefined

// --- 执行阶段 ---
sayHi(); // 尝试执行 undefined()，所以抛出 TypeError
sayHi = function() {
  console.log("Hi!");
};
```
如果用 `let` 来定义，那么就会因为 TDZ 而抛出 `ReferenceError`。

### 提升的优先级

当变量名和函数名相同时，**函数提升的优先级高于变量提升**。

```javascript
console.log(typeof myThing); // 输出: "function"

var myThing = "I am a variable";

function myThing() {
  console.log("I am a function");
}

console.log(typeof myThing); // 输出: "string"
```

引擎的处理流程是：
1.  **编译阶段**：
    *   首先，处理函数声明，`myThing` 被提升并定义为一个函数。
    *   然后，处理变量声明 `var myThing`。因为 `myThing` 已经存在（作为一个函数），`var` 的声明会被忽略。
2.  **执行阶段**：
    *   第一个 `console.log(typeof myThing)` 执行时，`myThing` 仍然是那个被提升的函数。
    *   然后执行赋值语句 `myThing = "I am a variable"`，此时 `myThing` 被重新赋值为字符串。
    *   所以第二个 `console.log(typeof myThing)` 输出 `string`。

### 总结

*   **变量提升**：`var` 声明的变量，只有声明部分被提升，值为 `undefined`；`let` 和 `const` 存在暂时性死区。
*   **函数提升**：函数声明会将整个函数体提升到作用域顶部。
*   **优先级**：函数提升 > 变量提升。

在现代 JavaScript 开发中，我们更推荐使用 `let` 和 `const` 来代替 `var`，并且遵循“先声明后使用”的原则，这样可以有效避免由提升带来的各种意想不到的问题，让代码逻辑更加清晰。

## 5. 函数剩余参数 (Rest Parameters) 和 展开运算符 (Spread Operator)

函数剩余参数（Rest Parameters）和展开运算符（Spread Syntax）都是 ES6 引入的重要特性，虽然使用相同的 `...` 语法，但它们的作用和使用场景是完全相反的。

简单来说，可以这样理解它们的核心区别：
*   **剩余参数 (`...rest`)** 是 **聚合** 或 **收集**，它将多个独立的参数收集到一个数组中。
*   **展开运算符 (`...spread`)** 是 **展开** 或 **打散**，它将一个数组（或其它可迭代对象）打散成多个独立的元素。

下面我来详细解释一下。

### 一、函数剩余参数 (Rest Parameters)

**作用**：用于在函数定义时，将传递给函数的多余的、不确定的参数捕获为一个真正的数组。

**解决了什么问题？**
在 ES6 之前，如果我们想获取函数的所有参数，需要使用一个叫 `arguments` 的对象。但 `arguments` 对象有几个缺点：
1.  它是一个**类数组对象（Array-like）**，而不是真正的数组。它有 `length` 属性，但不能直接使用数组的方法，比如 `map`, `filter`, `forEach` 等，必须先通过 `Array.from(arguments)` 或 `[].slice.call(arguments)` 转换。
2.  它包含所有传入的参数，不方便只获取“剩余”的部分。

而剩余参数完美地解决了这些问题。

**语法和特点**：
*   语法是 `...变量名`。
*   这个变量是一个**真正的数组**，可以直接使用所有数组方法。
*   它必须是函数参数列表中的**最后一个参数**。

**代码示例**：

```javascript
// 需求：写一个 sum 函数，可以计算任意数量参数的和
// 使用剩余参数
function sum(...numbers) {
  // numbers 是一个真正的数组
  console.log(numbers instanceof Array); // 输出: true

  //可以直接使用 reduce 方法
  return numbers.reduce((total, current) => total + current, 0);
}

console.log(sum(1, 2));       // 输出: 3
console.log(sum(1, 2, 3, 4)); // 输出: 10

// 结合普通参数使用
function logPlayerInfo(team, coach, ...players) {
  console.log(`球队: ${team}`);
  console.log(`教练: ${coach}`);
  console.log(`球员: ${players.join(', ')}`);
}

logPlayerInfo("湖人队", "哈姆", "詹姆斯", "戴维斯", "拉塞尔");
// 输出:
// 球队: 湖人队
// 教练: 哈姆
// 球员: 詹姆斯, 戴维斯, 拉塞尔
```

### 二、展开运算符 (Spread Syntax)

**作用**：用于在需要多个元素或参数的地方，将一个数组或可迭代对象“展开”成独立的、逗号分隔的元素序列。

它的应用场景非常广泛：

**1. 在函数调用时传递参数**

```javascript
const numbers = [9, 4, 7, 1];

// 不用展开运算符，需要用 apply
Math.max.apply(null, numbers); // 输出: 9

// 使用展开运算符，代码更直观
const maxNumber = Math.max(...numbers); // 等同于 Math.max(9, 4, 7, 1)
console.log(maxNumber); // 输出: 9
```

**2. 在数组字面量中**

这是它最常用的场景之一，可以极大地简化数组的操作。

*   **数组合并：**

    ```javascript
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];
    const mergedArr = [...arr1, ...arr2, 7, 8]; // 比 arr1.concat(arr2) 更灵活
    console.log(mergedArr); // 输出: [1, 2, 3, 4, 5, 6, 7, 8]
    ```

*   **数组复制（浅拷贝）：**

    ```javascript
    const originalArr = [1, 2, 3];
    const copiedArr = [...originalArr];
    console.log(copiedArr); // 输出: [1, 2, 3]
    console.log(originalArr === copiedArr); // 输出: false (是新的数组引用)
    ```

*   **将字符串转换为数组：**

    ```javascript
    const str = "hello";
    const chars = [...str];
    console.log(chars); // 输出: ['h', 'e', 'l', 'l', 'o']
    ```

**3. 在对象字面量中（ES2018 新增）**

同样可以用于对象的合并和复制。

```javascript
const obj1 = { name: 'Alice', age: 25 };
const obj2 = { city: 'New York', age: 26 };

// 对象合并（同名属性，后面的会覆盖前面的）
const mergedObj = { ...obj1, ...obj2 };
console.log(mergedObj); // 输出: { name: 'Alice', age: 26, city: 'New York' }

// 对象复制（浅拷贝）
const copiedObj = { ...obj1 };
```

### 总结与区分

| 特性     | **剩余参数 (Rest Parameters)**            | **展开运算符 (Spread Syntax)**                           |
| :------- | :---------------------------------------- | :------------------------------------------------------- |
| **本质** | **聚合** (Collect)                        | **展开** (Expand)                                        |
| **方向** | 将**多个、零散的**值 → **收集**成一个数组 | 将**一个**数组/可迭代对象 → **打散**成多个、零散的值     |
| **位置** | **函数定义**的参数列表中                  | **函数调用**的参数中、**数组字面量**中、**对象字面量**中 |
| **示例** | `function fn(...args) {}`                 | `fn(...myArray);` `[...myArray];` `{...myObj};`          |

总而言之，剩余参数和展开运算符是 ES6 提供的非常实用的语法糖，它们让处理不确定参数和操作数组/对象变得前所未有的简洁和直观。虽然它们共用 `...` 符号，但只要记住一个“收”，一个“放”，就能很清晰地将它们区分开来。

---

<div style="display: flex; justify-content: space-between;">
  <a href="./JS 进阶-2.md">下一篇：JS进阶-2 ›</a>
</div>
