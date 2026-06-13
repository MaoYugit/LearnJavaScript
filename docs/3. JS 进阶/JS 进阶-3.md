# JS进阶

---

<div style="display: flex; justify-content: space-between;">
  <a href="./JS 进阶-2.md">‹ 上一篇：JS进阶-2</a>
  <a href="./JS 进阶-4.md">下一篇：JS进阶-4 ›</a>
</div>

### 11. 构造函数 (Constructor Function)

这个概念是理解JS中“类”和“对象”的基石。

#### 核心思想

**构造函数就是一个“对象蓝图”或“模具”**。它本身是一个普通的函数，但我们以一种特殊的方式（使用 `new` 关键字）来调用它，目的是为了**批量生产结构相同的对象**。

#### 超详细讲解

想象一下，你要开一个宠物店，店里有很多只猫。每只猫都有名字（name）和年龄（age）。

**没有构造函数的笨办法：**
你得一只一只地手动创建。

```javascript
const cat1 = { name: "咪咪", age: 2 };
const cat2 = { name: "花花", age: 3 };
const cat3 = { name: "小黑", age: 1 };
// ... 如果有100只猫，你要写100遍，太可怕了！
```

**使用构造函数的聪明办法：**
我们先设计一个“猫的蓝图”。

```javascript
// 构造函数有一个约定俗成的规矩：函数名首字母大写，以区分普通函数。
function Cat(name, age) {
    // 1. `this` 在这里是一个神奇的关键字。它指向“即将被创建出来的那个新对象”。
    // 2. 下面这两行代码，就是在给这个“未来的新对象”添加属性。
    this.name = name;
    this.age = age;

    // 也可以添加方法
    this.meow = function() {
        console.log(`我叫 ${this.name}，喵~`);
    };

    // 3. 构造函数默认会“隐式地”返回 this，你不需要写 return this;
}

// --- 使用蓝图来生产猫！---
// 使用 `new` 关键字，就像按下了机器的“生产”按钮
const cat1 = new Cat("咪咪", 2);
const cat2 = new Cat("花花", 3);

// --- 检查产品 ---
console.log(cat1.name); // 输出: 咪咪
console.log(cat2.age);  // 输出: 3
cat1.meow();           // 输出: 我叫 咪咪，喵~
cat2.meow();           // 输出: 我叫 花花，喵~
```

**总结一下：**
构造函数就是一个模板。`new` + `构造函数` 这个组合，就是JS里创建特定类型对象实例的经典方式。它解决了“重复创建相似对象”的问题。

好的，面试官您好。

是的，我了解JS中的构造函数。它在JavaScript中是一个非常基础且重要的概念，特别是在涉及到面向对象编程时。

根据我的理解，构造函数本质上是一个普通的函数，但它的特殊之处在于我们如何使用它。 通常，我们会使用 `new` 关键字来调用一个函数，当这么做的时候，这个函数就扮演了“构造函数”的角色。

**构造函数的主要作用是创建和初始化对象**。 当我们需要创建多个具有相同属性和方法的类似对象时，构造函数就非常有用，它可以作为对象的模板，避免了代码的重复。

一个典型的构造函数有以下几个特点：

*   **命名约定**：按照惯例，构造函数的函数名首字母会大写，以此来和普通函数进行区分。
*   **`this` 关键字**：在构造函数内部，`this` 关键字指向的是即将被创建的新对象实例。 我们可以通过 `this` 为这个新对象添加属性和方法。
*   **使用 `new` 调用**：这是构造函数最核心的特征。当使用 `new` 关键字调用一个构造函数时，会发生以下几个步骤：
    1.  在内存中创建一个新的空对象。
    2.  将这个新对象的原型指向构造函数的 `prototype` 属性。
    3.  函数内部的 `this` 会被绑定到这个新对象上。
    4.  执行构造函数内部的代码，为新对象添加属性和方法。
    5.  如果函数没有显式地返回其他对象，那么这个新创建的对象会被自动返回。

给您举一个简单的例子：

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayHello = function() {
    console.log("你好，我叫 " + this.name);
  };
}

// 使用 new 关键字创建 Person 对象的新实例
const person1 = new Person("张三", 25);
const person2 = new Person("李四", 30);

person1.sayHello(); // 输出: 你好，我叫 张三
console.log(person1.age); // 输出: 25

console.log(person1 instanceof Person); // true

```

在这个例子中，`Person` 就是一个构造函数。通过 `new Person()`，我们创建了两个独立的 `Person` 实例，每个实例都有自己独立的 `name` 和 `age` 属性。

总的来说，构造函数是JavaScript实现面向对象编程的一种核心方式（在ES6的 `class` 语法出现之前尤为如此），它为我们提供了一种高效、可复用的方式来创建和组织对象。

您提的这个问题非常好，这正好是JavaScript在面向对象编程方面一个非常核心的演进。

ES6 `class` 语法的出现，可以说是在保留JavaScript核心机制不变的前提下，对构造函数和原型继承模式做了一次非常彻底和友好的“包装”。

可以总结为以下几点变化：

**1. 本质上是“语法糖”**

最重要的一点是，**ES6的 `class` 并不是一个新的东西，它本质上是构造函数和原型继承的语法糖（Syntactic Sugar）**。它的底层实现机制，依然是基于构造函数和 `prototype` 原型链的。也就是说，`class` 写法和传统的构造函数写法，在底层逻辑上是等价的。

我们可以看一个简单的对比：

**ES5 构造函数写法：**

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  console.log("你好，我叫 " + this.name);
};

const p1 = new Person("张三");
p1.sayHello();
```

**ES6 class 写法：**

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log("你好，我叫 " + this.name);
  }
}

const p2 = new Person("李四");
p2.sayHello();

// typeof Person 结果仍然是 "function"
// p2.__proto__ === Person.prototype  结果依然是 true
```
从这个对比可以看出，`class` 的写法把构造函数逻辑（`constructor`）和原型方法（`sayHello`）都聚合在了一个代码块里，结构更清晰，语义也更明确。

**2. 关键变化和改进**

虽然是语法糖，但 `class` 带来了很多实实在在的好处和规范：

*   **语法更清晰、更符合传统面向对象思想**：`class`、`constructor`、`extends` 这些关键字，让代码的意图一目了然，对于有其他面向对象语言（如Java、C++）背景的开发者来说非常友好。
*   **内置的继承实现**：在ES5中实现继承非常繁琐，需要手动处理原型链（`Object.create()`）和构造函数调用（`Parent.call(this)`）。而ES6的 `class` 通过 `extends` 和 `super` 关键字，让继承变得非常简单和直观。
*   **默认使用严格模式**：`class` 内部的代码会默认在严格模式（Strict Mode）下执行，这有助于我们写出更规范、更健壮的代码，避免一些常见的错误。
*   **不存在变量提升**：函数声明存在变量提升（Hoisting），但 `class` 声明不存在。这意味着你必须先声明 `class`，然后才能使用它，这让代码的行为更加可预测。
*   **静态方法**：通过 `static` 关键字，可以非常方便地为类本身添加静态方法，而不需要像ES5那样直接在构造函数上添加属性（`Person.create = function() {...}`）。
*   **Getter/Setter**：`class` 内部原生支持使用 `get` 和 `set` 关键字来定义属性的存取器，语法更加优雅。

**总结一下：**

ES6的 `class` 并没有废弃或取代构造函数，它更像是一次“升级换代”。它把过去有点零散和晦涩的JavaScript面向对象写法，整合成了一套更现代化、更清晰、更不容易出错的语法规范。

对于现在的开发实践来说，除非需要兼容非常古老的浏览器环境，否则我都会**优先推荐使用 `class` 语法**，因为它在代码的可读性、可维护性和工程化方面都有着巨大的优势。不过，理解其背后的构造函数和原型原理，依然是深入掌握JavaScript这门语言的关键。

```js
// 这样写构造函数逻辑和原型方法不也都是在一个代码块里面吗？
function Person(name) {
	this.name = name;
	this.sayHello = function() {
		console.log("你好，我叫 " + this.name);
};
}
// 所以这部应该算是一个很好的语法糖吧
```

您观察得非常仔细，这是一个非常关键的点，也正好触及了构造函数两种不同实现方式的核心区别。您说的完全正确，您写的这种方式，确实也是把逻辑放在了一个代码块里。

但是，这两种方式在**内存占用**和**功能共享**上有着本质的不同。这恰恰是`class`语法所解决的核心痛点之一。

我们来深入对比一下：

**1. 您提供的方式：方法定义在构造函数内部**

```javascript
function Person(name) {
  this.name = name; // 每个实例独有的属性

  // 每个实例都会创建一个新的、独立的 sayHello 函数
  this.sayHello = function() {
    console.log("你好，我叫 " + this.name);
  };
}

const person1 = new Person("张三");
const person2 = new Person("李四");

// 关键点：每个实例的 sayHello 方法都是一个全新的函数，它们不相等
console.log(person1.sayHello === person2.sayHello); // 输出: false
```

*   **工作原理**：每执行一次 `new Person()`，构造函数内部的代码就会完整地执行一遍。这意味着，`this.sayHello = function() {...}` 这段代码每次都会创建一个**新的函数对象**，并把它赋给新实例的 `sayHello` 属性。
*   **缺点**：**内存浪费**。如果我们创建了1000个 `Person` 实例，内存里就会有1000个功能完全相同但物理地址不同的 `sayHello` 函数。这对于需要大量创建对象的情况来说，是非常低效的。

---

**2. 标准实践方式：方法定义在原型上 (Prototype)**

这也是 `class` 语法所模仿的方式。

```javascript
function Person(name) {
  this.name = name; // 每个实例独有的属性
}

// 所有实例共享同一个 sayHello 函数
Person.prototype.sayHello = function() {
  console.log("你好，我叫 " + this.name);
};

const person1 = new Person("张三");
const person2 = new Person("李四");

// 关键点：所有实例通过原型链共享同一个 sayHello 方法，它们是相等的
console.log(person1.sayHello === person2.sayHello); // 输出: true
```

*   **工作原理**：`sayHello` 函数被定义在 `Person.prototype` 这个对象上，它只被创建**一次**。当我们创建 `person1`、`person2` 实例时，它们的内部原型（`__proto__`）会指向 `Person.prototype`。当调用 `person1.sayHello()` 时，`person1` 自身没有这个方法，就会顺着原型链找到 `Person.prototype` 上的 `sayHello` 方法并执行。
*   **优点**：**内存高效**。无论创建多少个实例，`sayHello` 这个方法在内存中只存在一份。所有实例都共享它。

---

**回到您的问题：“所以这不应该算是一个很好的语法糖吧”**

现在我们再看ES6的`class`：

```javascript
class Person {
  constructor(name) {
    this.name = name; // 这部分代码对应构造函数内部的 this.xxx
  }

  sayHello() {
    // 这部分代码被自动放到了 Person.prototype 上
    console.log("你好，我叫 " + this.name);
  }
}
```

`class` 语法非常巧妙地解决了这个问题：

*   写在 `constructor` 内部的，是**实例独有**的属性。
*   写在 `class` 内部、`constructor` 外部的方法（如 `sayHello`），会被**自动地、优雅地**放置到 `Person.prototype` 上。

所以，`class` 这个语法糖的**巨大价值**在于：它不仅是将代码组织在了一个块里，更重要的是，**它用最清晰的语法，引导开发者使用了最高效、最符合最佳实践的“原型模式”，同时避免了您指出的那种“在构造函数里定义方法”所带来的性能问题。**

它将原本需要分离撰写的构造函数逻辑和原型方法逻辑（`function Person() {}` 和 `Person.prototype.sayHello = function() {}`），真正地合并到了一个代码块中，既清晰又高效。从这个角度看，它绝对是一个非常优秀的语法糖。

---

### 12. `new` 实例化执行过程

`new` 看起来只是一个简单的关键字，但它在背后默默地为你做了四件大事。理解这四步，你就洞悉了JS对象创建的秘密。

#### 核心思想

`new` 是一个自动化的“四步生产线”，它接收一个“蓝图”（构造函数），产出一个“成品”（实例对象）。

#### 超详细讲解

当我们执行 `const cat1 = new Cat("咪咪", 2);` 这行代码时，JS引擎在背后悄悄地做了以下四件事：

1. **创建一个全新的空对象**
   
   * JS在内存中凭空创建了一个崭新的、光秃秃的空对象。
   * `// 伪代码: const newObject = {};`

2. **将新对象的原型链接到构造函数的原型**
   
   * 这是最关键也最抽象的一步。你可以把它理解为“认祖归宗”。
   * 新创建的空对象内部有一个 `__proto__` 属性，`new` 会让这个属性指向构造函数 `Cat` 的 `prototype` 属性。
   * `// 伪代码: newObject.__proto__ = Cat.prototype;`
   * **说人话就是：** “告诉这个新来的小猫，你的‘家族技能’（比如所有猫都会的爬树方法）都记录在 `Cat.prototype` 这个本子上，以后要用就去那里找。” (我们后面会更详细地讲原型)

3. **将构造函数的 `this` 指向这个新对象，并执行构造函数内部的代码**
   
   * `new` 会把构造函数 `Cat` 里的 `this` 强行绑定到第一步创建的那个空对象上。
   * 然后执行函数体里的代码：`this.name = "咪咪";` 和 `this.age = 2;`。
   * 于是，这个原本空空如也的对象，现在就被填充了属性和方法。
   * `// 伪代码: Cat.call(newObject, "咪咪", 2);`

4. **返回这个新对象**
   
   * 如果构造函数里没有手动 `return` 一个其他对象，那么 `new` 命令会自动 `return` 这个已经加工好的新对象（也就是 `newObject`）。
   * 最终，`cat1` 变量就接收到了这个包含了 `name` 和 `age` 属性的新对象。

**生活化比喻：DIY电脑**
你拿着一份“电脑组装说明书”（构造函数 `Cat`）。

1. **第一步：** 你拿出一个空的电脑机箱 (`new` 创建空对象)。
2. **第二步：** 你心里清楚，这台电脑以后要能装Windows系统（将机箱和“标准PC规范”`prototype` 关联起来）。
3. **第三步：** 你打开说明书，按照指示，把CPU、内存条、硬盘（`name`, `age`等参数）装进机箱里（执行构造函数，`this` 就是机箱）。
4. **第四步：** 盖上机箱盖，一台完整的电脑组装好了，可以拿去用了（`return` 这个新对象）。

**总结一下：**
`new` 不仅仅是“创建”，它是一个包含**创建空对象、链接原型、执行构造、返回对象**的完整流程。

面试官您好，是的，我非常了解 `new` 操作符的执行过程。这是一个在JavaScript面试中非常经典的问题，因为它能很好地考察面试者对 `this`、原型和对象创建这些核心概念的理解深度。

当我们在代码中写下 `const instance = new Constructor(arg1, arg2);` 时，JavaScript引擎在背后会按照以下**四个核心步骤**来执行：

---

**第一步：创建一个新的空对象**

首先，`new` 操作符会在内存中创建一个全新的、空的JavaScript对象。

```javascript
// 伪代码
const obj = {};
```

**第二步：链接到原型**

这个新创建的空对象的内部 `[[Prototype]]` 属性（在浏览器中通常可以通过 `__proto__` 访问）会被设置为构造函数的 `prototype` 对象。这一步是实现方法共享和原型链继承的关键。

```javascript
// 伪代码
obj.__proto__ = Constructor.prototype;
```
这样，新实例 `obj` 就可以访问到定义在 `Constructor.prototype` 上的所有属性和方法了。

**第三步：绑定 `this` 并执行构造函数**

接下来，构造函数 `Constructor` 会被调用。在调用时，函数内部的 `this` 关键字会被**绑定**到第一步创建的那个新对象上。构造函数中的代码（例如 `this.name = name;`）会为这个新对象添加属性。

```javascript
// 伪代码
// 使用 .call 或 .apply 来改变 this 的指向并执行函数
Constructor.call(obj, arg1, arg2);
```

**第四步：返回新对象（或指定对象）**

最后，在构造函数执行完毕后，会进行返回操作。这里有一个重要的规则：

*   **默认情况**：如果构造函数中**没有**显式地使用 `return` 语句，或者 `return` 返回的是一个**非对象类型**的值（如 `string`, `number`, `boolean`, `null`, `undefined`），那么 `new` 操作符会自动地、**隐式地**返回我们在第一步创建的那个新对象。

*   **特殊情况**：如果构造函数中**显式地** `return` 了一个**对象**（包括普通对象、数组、函数等），那么 `new` 操作符将**不会**返回第一步创建的新对象，而是直接返回这个被显式 `return` 的对象。

---

**举例说明**

让我们用一个例子来串联起这四个步骤：

```javascript
function Car(make, model) {
  this.make = make;
  this.model = model;
  // 假设这里没有 return 语句
}

Car.prototype.displayInfo = function() {
  console.log(`这是一辆${this.make}品牌的${this.model}。`);
};

// 执行 new Car('特斯拉', 'Model 3');
const myCar = new Car('特斯拉', 'Model 3');
```

这个过程是这样的：

1.  **创建**：`new` 创建了一个空对象，我们叫它 `carInstance`。 `// const carInstance = {};`
2.  **链接**：`carInstance` 的原型被链接到 `Car.prototype`。 `// carInstance.__proto__ = Car.prototype;`
3.  **执行**：`Car` 函数被调用，`this` 指向 `carInstance`。函数执行后，`carInstance` 变成 `{ make: '特斯拉', model: 'Model 3' }`。
4.  **返回**：`Car` 函数没有显式的 `return` 语句，所以 `new` 操作符自动返回 `carInstance` 对象。最终，这个对象被赋值给了 `myCar`。

所以，当我调用 `myCar.displayInfo()` 时，`myCar` 自身没有这个方法，它会顺着原型链找到 `Car.prototype` 上的 `displayInfo` 方法并成功执行。

为了更深刻地展示我的理解，我们甚至可以手动实现一个函数来模拟 `new` 的行为：

```javascript
function myNew(Constructor, ...args) {
  // 1. 创建一个新对象，并链接到构造函数的原型
  const obj = Object.create(Constructor.prototype);

  // 2. 绑定 this 并执行构造函数
  const result = Constructor.apply(obj, args);

  // 3. 根据构造函数的返回值决定最终的返回值
  // 如果 result 是一个对象，就返回 result，否则返回新创建的 obj
  return result instanceof Object ? result : obj;
}

// 使用我们模拟的 myNew
const myCar2 = myNew(Car, '比亚迪', '汉');
myCar2.displayInfo(); // 输出: 这是一辆比亚迪品牌的汉。
console.log(myCar2 instanceof Car); // true
```

这个 `myNew` 函数就完整地模拟了 `new` 操作符的内部执行流程。

以上就是我对于`new`实例化执行过程的理解。

#### 原型继承

好的，面试官。原型继承是 JavaScript 中最核心、也是最具特色的一个概念。它解释了 JavaScript 对象之间是如何共享属性和方法的，是整个语言面向对象系统的基石。

与传统的“类式继承”（Classical Inheritance，如 Java 或 C++）不同，JavaScript 没有真正的类。JavaScript 的继承是**基于原型（Prototype）的继承**。

简单来说，**原型继承的核心思想是：当一个对象需要一个属性或方法时，如果它自身没有，它会去它的“原型”对象上寻找。如果原型对象上也没有，它会再去原型的“原型”上寻找，以此类推，直到找到为止，或者找到原型链的终点 `null`。**

这个由对象的内部原型（`__proto__`）链接起来的查找路径，就叫做 **原型链（Prototype Chain）**。

---

它是如何工作的？

1.  **每个对象都有一个原型**：几乎所有的 JavaScript 对象在创建时，都会关联到另一个对象，这个被关联的对象就是它的“原型”。这个关联是通过内部属性 `[[Prototype]]`（在浏览器中通常暴露为 `__proto__`）实现的。

2.  **属性查找机制**：当我们试图访问一个对象的属性时（例如 `obj.myProperty`），JavaScript 引擎会：
    a.  首先在 `obj` 对象自身上查找 `myProperty`。
    b.  如果找到，就返回其值。
    c.  如果没找到，就通过 `obj.__proto__` 链接，去它的原型对象上查找 `myProperty`。
    d.  如果原型对象上找到了，就返回其值。
    e.  如果还没找到，就继续沿着原型对象的 `__proto__` 向上查找，重复这个过程。
    f.  这个查找过程会一直持续到原型链的顶端——`Object.prototype` 的原型是 `null`。如果到 `null` 还没找到，就返回 `undefined`。

---

如何实现原型继承？

在 ES6 的 `class` 语法出现之前，我们通常需要手动设置原型链来实现继承。最标准和推荐的方式是使用 `Object.create()`。

让我们用一个经典的例子来说明：

```javascript
// 1. 创建一个 "父构造函数" Animal
function Animal(name) {
  this.name = name;
}

// 在 Animal 的原型上添加一个共享方法
Animal.prototype.eat = function() {
  console.log(this.name + " 正在吃东西。");
};

// 2. 创建一个 "子构造函数" Dog
function Dog(name, breed) {
  // 继承父构造函数的属性 (调用父构造函数，并将 this 指向当前 Dog 实例)
  Animal.call(this, name);
  this.breed = breed;
}

// 3. 实现继承的关键步骤！
// 创建一个新对象，该对象的原型指向 Animal.prototype，
// 然后将这个新对象作为 Dog 的原型。
// 这样就建立了 Dog.prototype 到 Animal.prototype 的链接。
Dog.prototype = Object.create(Animal.prototype);

// 4. 修复构造函数指向 (一个好习惯)
// 因为上一步重写了 Dog.prototype，它的 constructor 属性现在指向了 Animal，我们需要把它指回 Dog。
Dog.prototype.constructor = Dog;


// 在 Dog 的原型上添加它自己的方法
Dog.prototype.bark = function() {
  console.log("汪汪汪！");
};


// 5. 创建实例并测试
const myDog = new Dog("旺财", "哈士奇");

myDog.eat();  // 输出: 旺财 正在吃东西。 (从 Animal.prototype 继承而来)
myDog.bark(); // 输出: 汪汪汪！ (Dog 自己的原型方法)

console.log(myDog instanceof Dog);    // true
console.log(myDog instanceof Animal); // true，这证明了继承关系是成立的
```

在这个例子中，`myDog` 的原型链是这样的：
`myDog` -> `Dog.prototype` -> `Animal.prototype` -> `Object.prototype` -> `null`

当调用 `myDog.eat()` 时，`myDog` 自身没有 `eat` 方法，于是顺着原型链找到了 `Dog.prototype`，发现也没有，再继续向上找到了 `Animal.prototype`，成功找到了 `eat` 方法并执行。

---

**与 ES6 `class` 的关系**

您之前提到的 ES6 `class` 语法，实际上就是对原型继承的一种封装，是一个语法糖。

上面那段复杂的继承代码，用 `class` 可以写成这样：

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    console.log(this.name + " 正在吃东西。");
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // 相当于 Animal.call(this, name)
    this.breed = breed;
  }

  bark() {
    console.log("汪汪汪！");
  }
}

const myDog = new Dog("旺财", "哈士奇");
myDog.eat();
myDog.bark();
```

`extends` 关键字自动完成了我们之前手动做的所有事情：设置原型链（`Object.create()`）、关联父类构造函数（`super()`）等。虽然语法变了，但其**底层实现的核心机制，依然是原型继承和原型链**。

总而言之，原型继承是 JavaScript 的根基，它通过原型链机制实现了对象间的行为共享，是理解 JavaScript 这门语言如何工作的关键所在。

**`__proto__` 和 `prototype`** 是 JavaScript 原型继承中两个最核心、也最容易混淆的概念。我会从它们各自的定义、归属、关系和作用这几个方面，来详细解释一下。

为了方便理解，我们可以先建立一个核心的比喻：

*   **`prototype` (原型对象)**：可以想象成一个**“设计蓝图”**或**“共享仓库”**。
*   **`__proto__` (内部原型)**：可以想象成每个产品内部的一张**“生产说明书”**或者一个**“钥匙”**，这张说明书/钥匙指向了它的设计蓝图。

---

#### 1. `prototype` (原型对象)

#### **它是什么？**
`prototype` 是一个**对象**。

#### **谁拥有它？**
**只有函数（Function）才拥有 `prototype` 属性。** 当您声明一个函数时，JavaScript 会自动为这个函数创建一个 `prototype` 属性，它指向一个空的对象，我们称之为原型对象。普通的对象（除了函数）是没有 `prototype` 属性的。

#### **它的作用是什么？**
它的核心作用是**存放需要被所有实例共享的属性和方法**。这样做最大的好处是**节省内存**。所有由这个函数作为构造函数创建出来的实例，都可以通过原型链访问到这个“共享仓库”里的东西。

#### **举例说明：**

```javascript
// 1. 创建一个构造函数
function Dog(name) {
  this.name = name; // 这是每个实例独有的属性
}

// 2. 在 Dog 函数的 "设计蓝图" (prototype) 上添加一个共享方法
Dog.prototype.bark = function() {
  console.log("汪汪汪！");
};

// Dog.prototype 现在是 { bark: [Function], constructor: Dog }
// 注意：prototype 对象天生自带一个 constructor 属性，指回函数本身

const dog1 = new Dog("旺财");
const dog2 = new Dog("来福");

dog1.bark(); // 输出: 汪汪汪！
dog2.bark(); // 输出: 汪汪汪！

// 验证方法是共享的
console.log(dog1.bark === dog2.bark); // true，因为它们都引用了 Dog.prototype 上的同一个函数
```

---

#### 2. `__proto__` (内部原型)

#### **它是什么？**
`__proto__` 是一个**指向性链接（或指针）**。它不是一个标准属性，但在所有现代浏览器中都被实现了，用于访问一个对象的内部 `[[Prototype]]` 属性。

#### **谁拥有它？**
**JavaScript 中的每一个对象（除了少数特例）都拥有 `__proto__` 属性。**

#### **它的作用是什么？**
它的核心作用是**构成了原型链**。当您访问一个对象的属性或方法时，如果该对象自身找不到，JavaScript 引擎就会沿着 `__proto__` 这条链条向上查找，直到找到为止，或者查到原型链的终点 `null`。

**`__proto__` 的指向是由创建该对象的方式决定的**。当我们使用 `new Constructor()` 创建一个实例时，这个实例的 `__proto__` 就会指向构造函数 `Constructor` 的 `prototype` 对象。

#### **举例说明（接上例）：**

```javascript
const dog1 = new Dog("旺财");

// dog1 这个实例的 "__proto__" 指向了它的 "设计蓝图" —— Dog.prototype
console.log(dog1.__proto__ === Dog.prototype); // true

// 当我们调用 dog1.bark() 时，引擎的查找过程是：
// 1. 在 dog1 对象自身上查找 "bark" 属性。找不到。
// 2. 顺着 dog1.__proto__ 找到 Dog.prototype 对象。
// 3. 在 Dog.prototype 对象上查找 "bark" 属性。找到了！
// 4. 执行这个方法。
```

> **最佳实践提示**：在实际开发中，我们不应该直接去读写 `__proto__` 属性，因为它不是ECMAScript标准。推荐使用标准方法：
>
> *   `Object.getPrototypeOf(obj)`：用来获取一个对象的原型。
> *   `Object.create(proto)`：用来创建一个新对象，并指定其原型。

---

### 总结与关系

现在，我们可以把这两个概念串联起来了：

1.  **关系**：一个实例对象（`instance`）的 `__proto__` 属性，严格指向创建它的那个构造函数（`Constructor`）的 `prototype` 属性。
    `instance.__proto__ === Constructor.prototype`

2.  **分工**：
    *   `prototype` 是站在**构造函数**的角度，用来**定义**未来所有实例的共享蓝图。
    *   `__proto__` 是站在**实例对象**的角度，用来**链接**到自己的蓝图，从而实现属性和方法的查找。

我们可以用一个简单的图来表示这个关系：

```code
                 [Dog 函数]
                     │
                     │ .prototype
                     ▼
[Dog.prototype 对象]  <───────────────┐
  - constructor     │ .__proto__     │ .__proto__
  - bark()          │                │
  - __proto__       │ [dog1 实例]      │ [dog2 实例]
     │              │   - name:"旺财"  │   - name:"来福"
     ▼              │   - __proto__    │   - __proto__
[Object.prototype]  │                │
  - toString()      └────────────────┘
  - ...
     │
     ▼
   null
```

这个由 `__proto__` 链接起来的链条，就是**原型链**。它是JavaScript实现继承的核心机制。

简单来说，`prototype` 是“生的那一方”定义的规则，而 `__proto__` 是“生出来的那一方”持有的、指向规则的链接。

好的，面试官。原型继承是 JavaScript 中最核心、也是最具特色的一个概念。它解释了 JavaScript 对象之间是如何共享属性和方法的，是整个语言面向对象系统的基石。

与传统的“类式继承”（Classical Inheritance，如 Java 或 C++）不同，JavaScript 没有真正的类。JavaScript 的继承是**基于原型（Prototype）的继承**。

简单来说，**原型继承的核心思想是：当一个对象需要一个属性或方法时，如果它自身没有，它会去它的“原型”对象上寻找。如果原型对象上也没有，它会再去原型的“原型”上寻找，以此类推，直到找到为止，或者找到原型链的终点 `null`。**

这个由对象的内部原型（`__proto__`）链接起来的查找路径，就叫做 **原型链（Prototype Chain）**。

---

### 它是如何工作的？

1.  **每个对象都有一个原型**：几乎所有的 JavaScript 对象在创建时，都会关联到另一个对象，这个被关联的对象就是它的“原型”。这个关联是通过内部属性 `[[Prototype]]`（在浏览器中通常暴露为 `__proto__`）实现的。

2.  **属性查找机制**：当我们试图访问一个对象的属性时（例如 `obj.myProperty`），JavaScript 引擎会：
    a.  首先在 `obj` 对象自身上查找 `myProperty`。
    b.  如果找到，就返回其值。
    c.  如果没找到，就通过 `obj.__proto__` 链接，去它的原型对象上查找 `myProperty`。
    d.  如果原型对象上找到了，就返回其值。
    e.  如果还没找到，就继续沿着原型对象的 `__proto__` 向上查找，重复这个过程。
    f.  这个查找过程会一直持续到原型链的顶端——`Object.prototype` 的原型是 `null`。如果到 `null` 还没找到，就返回 `undefined`。

---

### 如何实现原型继承？

在 ES6 的 `class` 语法出现之前，我们通常需要手动设置原型链来实现继承。最标准和推荐的方式是使用 `Object.create()`。

让我们用一个经典的例子来说明：

```javascript
// 1. 创建一个 "父构造函数" Animal
function Animal(name) {
  this.name = name;
}

// 在 Animal 的原型上添加一个共享方法
Animal.prototype.eat = function() {
  console.log(this.name + " 正在吃东西。");
};

// 2. 创建一个 "子构造函数" Dog
function Dog(name, breed) {
  // 继承父构造函数的属性 (调用父构造函数，并将 this 指向当前 Dog 实例)
  Animal.call(this, name);
  this.breed = breed;
}

// 3. 实现继承的关键步骤！
// 创建一个新对象，该对象的原型指向 Animal.prototype，
// 然后将这个新对象作为 Dog 的原型。
// 这样就建立了 Dog.prototype 到 Animal.prototype 的链接。
Dog.prototype = Object.create(Animal.prototype);

// 4. 修复构造函数指向 (一个好习惯)
// 因为上一步重写了 Dog.prototype，它的 constructor 属性现在指向了 Animal，我们需要把它指回 Dog。
Dog.prototype.constructor = Dog;


// 在 Dog 的原型上添加它自己的方法
Dog.prototype.bark = function() {
  console.log("汪汪汪！");
};


// 5. 创建实例并测试
const myDog = new Dog("旺财", "哈士奇");

myDog.eat();  // 输出: 旺财 正在吃东西。 (从 Animal.prototype 继承而来)
myDog.bark(); // 输出: 汪汪汪！ (Dog 自己的原型方法)

console.log(myDog instanceof Dog);    // true
console.log(myDog instanceof Animal); // true，这证明了继承关系是成立的
```

在这个例子中，`myDog` 的原型链是这样的：
`myDog` -> `Dog.prototype` -> `Animal.prototype` -> `Object.prototype` -> `null`

当调用 `myDog.eat()` 时，`myDog` 自身没有 `eat` 方法，于是顺着原型链找到了 `Dog.prototype`，发现也没有，再继续向上找到了 `Animal.prototype`，成功找到了 `eat` 方法并执行。

---

### 与 ES6 `class` 的关系

您之前提到的 ES6 `class` 语法，实际上就是对原型继承的一种封装，是一个语法糖。

上面那段复杂的继承代码，用 `class` 可以写成这样：

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    console.log(this.name + " 正在吃东西。");
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // 相当于 Animal.call(this, name)
    this.breed = breed;
  }

  bark() {
    console.log("汪汪汪！");
  }
}

const myDog = new Dog("旺财", "哈士奇");
myDog.eat();
myDog.bark();
```

`extends` 关键字自动完成了我们之前手动做的所有事情：设置原型链（`Object.create()`）、关联父类构造函数（`super()`）等。虽然语法变了，但其**底层实现的核心机制，依然是原型继承和原型链**。

总而言之，原型继承是 JavaScript 的根基，它通过原型链机制实现了对象间的行为共享，是理解 JavaScript 这门语言如何工作的关键所在。

---

### 13. 实例成员和静态成员

这个概念区分了什么是“个人财产”，什么是“集体财产”。

#### 核心思想

* **实例成员**：是属于每个**实例对象**私有的属性和方法。就像每个人的身份证号和姓名，是独一无二的。
* **静态成员**：是属于**构造函数（或类）本身**的属性和方法。就像“人类”这个物种的平均身高，是属于整个群体的特征，而不是某个具体的人。

#### 超详细讲解

我们继续用 `Cat` 的例子，这次用 ES6 `class` 语法，因为它更清晰地体现了这个区别。

```javascript
class Cat {
    // --- 实例成员 ---
    // constructor 内部定义的，都是实例成员，通过 this 添加
    constructor(name) {
        this.name = name; // `name` 是实例属性
        this.personalSecret = "我偷偷藏了小鱼干";
    }

    // 直接定义在 class 里的方法，也是实例方法
    meow() {
        console.log(`${this.name} 说：喵~`);
    }

    // --- 静态成员 ---
    // 使用 `static` 关键字定义的，都是静态成员
    static species = "猫科动物"; // `species` 是静态属性

    static sayFamily() { // `sayFamily` 是静态方法
        // 注意：静态方法里不能用 this.name，因为 this 指向 Cat 类本身，而不是某个实例
        console.log("我们都属于" + this.species);
    }
}

// 创建实例
const cat1 = new Cat("小白");
const cat2 = new Cat("小黄");

// --- 访问实例成员 ---
// 必须通过实例对象来访问
console.log(cat1.name); // 输出: 小白
console.log(cat2.personalSecret); // 输出: 我偷偷藏了小鱼干
cat1.meow(); // 输出: 小白 说：喵~

// 你不能通过类来访问实例成员
// console.log(Cat.name); // 报错或 undefined

// --- 访问静态成员 ---
// 必须通过类本身来访问
console.log(Cat.species); // 输出: 猫科动物
Cat.sayFamily();         // 输出: 我们都属于猫科动物

// 你不能通过实例来访问静态成员（虽然某些情况下可以，但不推荐，也不符合规范）
// console.log(cat1.species); // undefined
```

**总结一下：**

* **实例成员**：定义在 `constructor` 里或直接在 `class` 里写的方法。需要 `new` 一个对象出来，然后用 `对象.成员` 的方式访问。
* **静态成员**：用 `static` 关键字修饰。不需要 `new`，直接用 `类名.成员` 的方式访问。
* 当然，面试官。实例成员和静态成员是面向对象编程中一个非常基础且重要的区分，它决定了属性或方法是属于单个对象实例，还是属于整个类。

  我可以从**归属**、**定义方式**和**使用场景**三个方面来详细解释它们。

  ---

  ### 1. 实例成员 (Instance Members)

  #### **归属**
  实例成员是**属于对象实例**的属性和方法。这意味着，每当我们通过 `new` 关键字创建一个新的对象实例时，这个实例都会拥有自己**独立的一套**实例成员。它们是每个对象独有的，互不影响。

  可以把类想象成一个“汽车设计图”，那么每一个造出来的汽车就是一个实例。**实例成员**就好比每辆车的“车牌号”或“发动机序列号”，它们是每辆车独有的。

  #### **定义方式 (在 ES6 `class` 中)**
  实例成员通常在 `class` 的 `constructor`（构造函数）内部，通过 `this` 关键字来定义。此外，定义在类中、但没有使用 `static` 关键字的方法，也是实例方法，它们会被添加到类的 `prototype`上，供所有实例共享调用。

  #### **代码示例：**

  ```javascript
  class Car {
    constructor(licensePlate, color) {
      // licensePlate 和 color 就是实例属性
      // 它们属于 new 出来的每一个 car 对象
      this.licensePlate = licensePlate;
      this.color = color;
    }
  
    // startEngine() 是一个实例方法
    // 它需要通过一个具体的 car 实例来调用
    startEngine() {
      console.log(`车牌号为 ${this.licensePlate} 的汽车启动了引擎。`);
    }
  }
  
  const car1 = new Car('京A88888', '红色');
  const car2 = new Car('沪B66666', '黑色');
  
  // 访问实例成员
  console.log(car1.licensePlate); // 输出: 京A88888
  console.log(car2.licensePlate); // 输出: 沪B66666
  
  // 调用实例方法
  car1.startEngine(); // 输出: 车牌号为 京A88888 的汽车启动了引擎。
  car2.startEngine(); // 输出: 车牌号为 沪B66666 的汽车启动了引擎。
  ```
  **关键点**：`car1` 的 `licensePlate` 改变不会影响 `car2`。实例方法 `startEngine` 虽然被所有实例共享，但它必须通过实例（`car1.startEngine()`）来调用，因为它内部的 `this` 需要指向一个具体的实例。

  ---

  ### 2. 静态成员 (Static Members)

  #### **归属**
  静态成员是**直接属于类本身**的属性和方法，而不是属于任何一个实例。它们是整个类所共享的，与任何具体的实例无关。

  继续用汽车的例子，**静态成员**就好比这个汽车模型的“设计厂商名称”（如“特斯拉”）或者一个“计算百公里加速的工具方法”。这些信息属于“汽车设计图”本身，而不是某辆具体的车。

  #### **定义方式 (在 ES6 `class` 中)**
  静态成员通过在属性或方法前添加 `static` 关键字来定义。

  #### **代码示例：**

  ```javascript
  class Car {
    // manufacturer 是一个静态属性
    // 它直接属于 Car 这个类
    static manufacturer = '某知名汽车品牌';
  
    constructor(licensePlate) {
      this.licensePlate = licensePlate;
    }
  
    // isCar() 是一个静态方法
    // 它用来判断一个对象是不是 Car 的实例，调用它不需要先 new 一个 car
    static isCar(obj) {
      return obj instanceof Car;
    }
  }
  
  // 访问静态成员：必须通过类名直接访问
  console.log(Car.manufacturer); // 输出: 某知名汽车品牌
  // Car.isCar(...)
  
  const car1 = new Car('京A88888');
  
  // 错误的做法：实例无法访问静态成员
  console.log(car1.manufacturer); // 输出: undefined
  // car1.isCar is not a function
  
  // 正确调用静态方法
  console.log(Car.isCar(car1));   // 输出: true
  console.log(Car.isCar({}));      // 输出: false
  ```
  **关键点**：静态成员不需要 `new` 就可以直接通过类名访问。它们通常用于定义与类相关的常量、工具函数（Utility Functions）或工厂方法。我们非常熟悉的 `Math.random()`、`Date.now()`、`Array.isArray()` 其实就是 `Math`、`Date` 和 `Array` 这几个内置对象的静态方法。

  ---

  ### 总结对比

  | 特性         | 实例成员                                                     | 静态成员                              |
  | :----------- | :----------------------------------------------------------- | :------------------------------------ |
  | **归属**     | 属于每个**对象实例**                                         | 属于**类本身**                        |
  | **定义方式** | 在 `constructor` 中用 `this` 定义属性；直接定义方法          | 在属性/方法前加 `static` 关键字       |
  | **访问方式** | 通过**实例**访问 (`instance.member`)                         | 通过**类名**访问 (`ClassName.member`) |
  | **内存占用** | 每个实例都有一份自己的实例**属性**                           | 只有一份，存在于类上，被所有实例共享  |
  | **使用场景** | 存储每个对象特有的数据（如 `name`, `age`）和操作这些数据的行为 | 定义全局常量、工具函数、工厂方法等    |

  简单来说，判断一个成员应该是实例的还是静态的，就问自己一个问题：**“这个属性或功能，是否需要一个具体的实例存在才能使用？”**

  *   如果**是**（比如获取某辆车的车牌号），那它就是**实例成员**。
  *   如果**否**（比如判断某个东西是不是车），那它就是**静态成员**。

---

### 14. 基本包装类型 (Primitive Wrapper Types)

这是一个JS为了让你方便而设计的“隐身仆人”。

#### 核心思想

JavaScript中有两种数据类型：**基本类型**（string, number, boolean, null, undefined, symbol, bigint）和**引用类型**（Object, Array, Function等）。基本类型本身只是一个简单的值，它没有属性和方法。但JS为了让我们能方便地操作它们，提供了一个“幕后机制”：当你试图对一个基本类型值调用方法时，JS会**临时**地把它包装成一个对应的对象，执行完操作后，再把这个临时对象销毁。

#### 超详细讲解

我们来看一个你肯定写过的代码：

```javascript
let myString = "hello world";
let upperString = myString.toUpperCase(); // 把字符串转为大写
console.log(upperString); // HELLO WORLD
```

**你有没有想过：** `myString` 明明只是一个基本类型的值，为什么它会有 `.toUpperCase()` 这么一个像对象才有的方法呢？

**这就是“基本包装类型”在起作用！** 当你执行 `myString.toUpperCase()` 的那一瞬间，JS引擎在背后做了如下事情：

1. **发现**：你正在对一个字符串（基本类型）执行 `. `操作。
2. **创建临时对象**：JS引擎在内部默默地创建了一个`String`对象的实例。
   `// 伪代码: const tempObj = new String(myString);`
3. **执行方法**：在这个临时对象上调用`toUpperCase()`方法。
   `// 伪代码: const result = tempObj.toUpperCase();`
4. **返回结果**：将方法执行的结果（"HELLO WORLD"）返回给你的变量 `upperString`。
5. **销毁临时对象**：用完之后，立刻把那个临时创建的`tempObj`给扔掉，就好像它从没存在过一样。
   `// 伪代码: tempObj = null;`

所以，你感觉自己是在对一个字符串值调用方法，但实际上是JS帮你创建了一个“隐身的仆人”（临时包装对象）完成了这个任务。

`number` 和 `boolean` 也有对应的包装类型 `Number` 和 `Boolean`。

```javascript
let myNumber = 123.456;
console.log(myNumber.toFixed(2)); // 输出 "123.46"
// 背后也是 new Number(123.456).toFixed(2)
```

**注意：** 千万不要自己手动去创建包装类型的对象！

```javascript
let badString = new String("hello");
console.log(typeof badString); // "object"，而不是 "string"
if (badString) { // 作为对象，它永远是 true
    console.log("这会让人困惑");
}
```

这会带来很多意想不到的麻烦，所以，**永远直接使用基本类型值**，让JS在需要的时候自动为我们进行包装。

**总结一下：**
基本包装类型是JS提供的一种“语法糖”，它让基本类型值“看起来”像对象一样，可以方便地调用各种方法，但其本质仍然是基本类型。

好的，面试官。基本包装类型是 JavaScript 中一个非常巧妙也比较容易让人困惑的后台机制。

**核心概念是：JavaScript 为了方便我们操作基本数据类型（Primitives），在后台提供了一种临时的“对象化”包装。**

我们知道，JavaScript 有 7 种基本数据类型：`String`, `Number`, `Boolean`, `BigInt`, `Symbol`, `null` 和 `undefined`。这些基本类型本身不是对象，所以按理说它们不应该有属性和方法（比如 `.length` 或 `.toUpperCase()`）。

但我们在实际开发中，却可以这样做：

```javascript
let myString = "hello world";
console.log(myString.length); // 11
console.log(myString.toUpperCase()); // "HELLO WORLD"

let myNumber = 123.456;
console.log(myNumber.toFixed(2)); // "123.46"
```

这种现象之所以能发生，就是因为“基本包装类型”在起作用。

---

### 背后的工作流程

当我们试图在一个基本类型的值上访问属性或调用方法时，JavaScript 引擎会在后台**偷偷地**、**临时地**完成以下三个步骤：

1.  **创建包装对象**：根据基本类型的值，创建一个对应的基本包装类型的实例。
    *   对于字符串，会创建 `new String(value)`。
    *   对于数字，会创建 `new Number(value)`。
    *   对于布尔值，会创建 `new Boolean(value)`。

2.  **执行操作**：在新创建的临时对象上执行属性访问或方法调用。

3.  **销毁临时对象**：操作执行完毕后，这个临时创建的包装对象会立即被销毁。

我们用 `myString.toUpperCase()` 来分解这个过程：

```javascript
// 1. 当我们写下这行代码时
let myString = "hello world";
let upperString = myString.toUpperCase();

// 2. JavaScript 引擎在后台的实际操作（伪代码）
// (1) 创建一个 String 类型的实例
let tempWrapper = new String(myString);
// (2) 在这个临时实例上调用方法
let result = tempWrapper.toUpperCase();
// (3) 销毁这个临时实例
tempWrapper = null;
// (4) 将结果返回
upperString = result;
```

正是因为这个后台的自动包装和销毁机制，我们才能用一种看似面向对象的方式去操作基本数据类型，这极大地提升了开发的便利性。

---

### 一个经典的“陷阱”或“考点”

这个“临时性”也导致了一个非常经典的问题：**我们无法为基本类型添加自定义属性和方法**。

```javascript
let s1 = "some text";
s1.color = "red"; // 在这一行，发生了什么？
                  // 1. new String("some text") 被创建
                  // 2. 这个临时对象被添加了 color: "red" 属性
                  // 3. 这个临时对象马上被销毁了！

console.log(s1.color); // undefined
```

当我们试图打印 `s1.color` 时，JavaScript 引擎看到我们又想在基本类型 `s1` 上访问属性，于是它又创建了一个**全新的**、**干净的** `new String("some text")` 临时对象，这个新对象上自然没有 `color` 属性，所以返回 `undefined`。

---

### 总结

*   **基本包装类型**主要有 `String`、`Number` 和 `Boolean` 这三种（注意首字母大写，它们是构造函数）。
*   它们存在的意义，是让基本数据类型能够**像对象一样被调用方法**，这是一种后台的隐式操作，是 JavaScript 的一个“语法糖”。
*   这个过程是**临时的**，导致了我们不能给基本类型动态添加属性。
*   在实际开发中，我们应该**避免**直接使用 `new String()`、`new Number()` 或 `new Boolean()` 来创建对象，因为这会产生一个类型为 `object` 的包装对象，容易在类型判断时（如 `typeof`）造成混淆和错误。我们应该直接使用字面量 `''`, `123`, `true` 来创建基本类型的值。

以上就是我对基本包装类型的理解。

---

### 15. Object 的静态方法

`Object` 是所有对象的“老祖宗”，它本身也提供了一系列非常有用的“工具函数”（静态方法），来帮助我们更好地操作任何对象。

#### 核心思想

这些方法是直接挂在 `Object` 这个构造函数上的，你不需要 `new` 一个对象出来，可以直接用 `Object.方法名()` 的形式调用它们，它们是处理对象的“瑞士军刀”。

#### 超详细讲解

这里介绍几个最常用、最有用的 `Object` 静态方法：

**1. `Object.keys(obj)` - 获取所有键**
返回一个由对象所有**可枚举属性的键名**组成的数组。

```javascript
const car = {
    brand: "Tesla",
    model: "Model 3",
    year: 2023
};

const keys = Object.keys(car);
console.log(keys); // 输出: ["brand", "model", "year"]
```

**2. `Object.values(obj)` - 获取所有值**
返回一个由对象所有**可枚举属性的值**组成的数组。

```javascript
const values = Object.values(car);
console.log(values); // 输出: ["Tesla", "Model 3", 2023]
```

**3. `Object.entries(obj)` - 获取所有键值对**
返回一个由对象所有**可枚举属性的 `[键, 值]` 数组对**组成的数组。这个在循环中特别好用！

```javascript
const entries = Object.entries(car);
console.log(entries);
// 输出:
// [
//   ["brand", "Tesla"],
//   ["model", "Model 3"],
//   ["year", 2023]
// ]

// 完美配合 for...of 和解构
for (const [key, value] of Object.entries(car)) {
    console.log(`${key}: ${value}`);
}
```

**4. `Object.assign(target, ...sources)` - 合并对象**
将一个或多个源对象 (`sources`) 的所有可枚举属性，**复制**到目标对象 (`target`)。它会返回修改后的目标对象。

```javascript
const defaults = { theme: "light", notifications: true };
const userSettings = { notifications: false, timezone: "GMT+8" };

// 将 defaults 和 userSettings 合并到一个新对象 {} 中
const finalSettings = Object.assign({}, defaults, userSettings);

console.log(finalSettings);
// 输出: { theme: "light", notifications: false, timezone: "GMT+8" }
// 注意：同名属性 `notifications`，后面的会覆盖前面的。
```

**重要：** `Object.assign` 是一个**浅拷贝**，如果属性值是对象，它只会复制那个对象的引用，而不是复制对象本身。

**5. `Object.freeze(obj)` - 冻结对象**
冻结一个对象。被冻结的对象不能再添加新属性，不能删除已有属性，也不能修改已有属性的值。

```javascript
const user = { name: "张三" };
Object.freeze(user);

user.age = 20; // 尝试添加，静默失败（严格模式下会报错）
user.name = "李四"; // 尝试修改，静默失败
delete user.name; // 尝试删除，静默失败

console.log(user); // 输出: { name: "张三" } (毫无变化)
```

**总结一下：**
`Object` 的静态方法是JS内置的、非常强大的对象工具箱。`keys`, `values`, `entries` 用于遍历，`assign` 用于合并，`freeze` 用于保护数据。熟练使用它们能让你的代码更简洁、更强大。

---

好的，面试官您好。

`Object` 的静态方法是指那些直接挂载在 `Object` 构造函数上，而不是挂载在对象实例上的方法。我们不需要创建一个对象实例，而是直接通过 `Object.methodName()` 的形式来调用它们。这些方法通常提供了一些对对象进行底层操作、检查或转换的工具性功能。

熟练掌握这些方法对于进行高效和精细的对象操作非常重要。为了便于理解和记忆，我习惯将它们按照功能分为以下几大类：

---

### 1. 对象的创建与合并

*   `**Object.create(proto, [propertiesObject])**`
    *   **作用**：创建一个新对象，并使用现有的对象作为新创建对象的原型（`__proto__`）。这是实现原型继承最核心的方法。
    *   **示例**：
        ```javascript
        const animal = {
          eat: function() { console.log('I am eating.'); }
        };
        const dog = Object.create(animal);
        dog.eat(); // 输出: I am eating.
        ```

*   `**Object.assign(target, ...sources)**`
    *   **作用**：将一个或多个源对象（`sources`）的所有**可枚举**的自有属性，复制到目标对象（`target`）。它执行的是**浅拷贝**。常用于合并对象或给对象赋默认值。
    *   **示例**：
        ```javascript
        const defaults = { a: 1, b: 2 };
        const options = { b: 3, c: 4 };
        const merged = Object.assign({}, defaults, options);
        // merged is { a: 1, b: 3, c: 4 }
        ```

*   `**Object.fromEntries(iterable)**`
    *   **作用**：将一个键值对（`[key, value]`）的数组或其它可迭代对象，转换为一个新对象。它是 `Object.entries()` 的逆操作。
    *   **示例**：
        ```javascript
        const entries = [['name', 'Alice'], ['age', 25]];
        const person = Object.fromEntries(entries);
        // person is { name: 'Alice', age: 25 }
        ```

---

### 2. 属性的遍历与检查

*   `**Object.keys(obj)**`
    *   **作用**：返回一个由对象**自身**的、**可枚举**的、**字符串类型**的属性名组成的数组。
    *   **示例**：`Object.keys({a: 1, b: 2})` 返回 `['a', 'b']`

*   `**Object.values(obj)**`
    *   **作用**：返回一个由对象**自身**的、**可枚举**的属性值组成的数组。
    *   **示例**：`Object.values({a: 1, b: 2})` 返回 `[1, 2]`

*   `**Object.entries(obj)**`
    *   **作用**：返回一个由对象**自身**的、**可枚举**的键值对 `[key, value]` 组成的数组。
    *   **示例**：`Object.entries({a: 1, b: 2})` 返回 `[['a', 1], ['b', 2]]`

*   `**Object.getOwnPropertyNames(obj)**`
    *   **作用**：返回一个由对象**自身**的**所有**属性名（包括**不可枚举**的，但不包括 Symbol 类型的）组成的数组。
    *   **示例**：
        ```javascript
        const obj = {};
        Object.defineProperty(obj, 'a', { value: 1, enumerable: false });
        Object.keys(obj); // []
        Object.getOwnPropertyNames(obj); // ['a']
        ```

*   `**Object.hasOwn(obj, prop)**` (ES2022 新增)
    *   **作用**：判断一个属性是否为对象**自身**的属性（而不是继承来的）。这是 `obj.hasOwnProperty()` 的推荐替代方案，因为它更安全（例如可以用于 `Object.create(null)` 创建的对象）。
    *   **示例**：
        ```javascript
        const obj = { a: 1 };
        Object.hasOwn(obj, 'a'); // true
        Object.hasOwn(obj, 'toString'); // false (继承来的)
        ```

---

### 3. 对象状态的控制（防止修改）

这一组方法用于增强对象的“健壮性”，将其变为不同程度的“只读”状态。

*   `**Object.preventExtensions(obj)**`
    *   **作用**：让一个对象变得不可扩展，即**不能再添加新属性**。
    *   `Object.isExtensible(obj)`：检查对象是否可扩展。

*   `**Object.seal(obj)**`
    *   **作用**：密封一个对象。密封后，**不能添加新属性**、**不能删除现有属性**，且现有属性的**配置（configurable）变为 false**。但属性值（value）是**可以修改**的。
    *   `Object.isSealed(obj)`：检查对象是否被密封。

*   `**Object.freeze(obj)**`
    *   **作用**：冻结一个对象。这是最严格的级别，冻结后，**不能添加、删除、修改任何属性**（包括属性值和配置）。
    *   `Object.isFrozen(obj)`：检查对象是否被冻结。

---

### 4. 属性描述符与原型

*   `**Object.defineProperty(obj, prop, descriptor)**`
    *   **作用**：在一个对象上直接定义一个新属性，或修改一个现有属性，并返回该对象。可以精细控制属性的 `value`, `writable`, `enumerable`, `configurable`。

*   `**Object.getOwnPropertyDescriptor(obj, prop)**`
    *   **作用**：返回指定对象上一个自有属性对应的属性描述符。

*   `**Object.getPrototypeOf(obj)**`
    *   **作用**：返回指定对象的原型。这是获取对象原型的标准方法，推荐使用它替代 `__proto__`。

*   `**Object.setPrototypeOf(obj, prototype)**`
    *   **作用**：设置一个指定对象的原型。

### 5. 值的比较

*   `**Object.is(value1, value2)**`
    *   **作用**：判断两个值是否为相同的值。它与 `===` 的行为基本一致，但有两个特殊之处：
        1.  能正确处理 `NaN`：`Object.is(NaN, NaN)` 返回 `true`。
        2.  能区分 `+0` 和 `-0`：`Object.is(-0, +0)` 返回 `false`。
    *   **示例**：
        ```javascript
        Object.is(5, 5);       // true
        Object.is(NaN, NaN); // true
        5 === 5;             // true
        NaN === NaN;         // false
        ```

总而言之，`Object` 的这些静态方法为我们提供了强大而精细的工具，用于创建、管理、检查和保护对象。熟练掌握它们，是深入理解 JavaScript 面向对象编程和进行高质量开发的基石。

---

<div style="display: flex; justify-content: space-between;">
  <a href="./JS 进阶-2.md">‹ 上一篇：JS进阶-2</a>
  <a href="./JS 进阶-4.md">下一篇：JS进阶-4 ›</a>
</div>
