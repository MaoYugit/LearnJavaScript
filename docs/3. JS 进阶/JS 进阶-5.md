# JS进阶

---

<div style="display: flex; justify-content: space-between;">
  <a href="./JS 进阶-4.md">‹ 上一篇：JS进阶-4</a>
  <a href="./JS 进阶-6.md">下一篇：JS进阶-5 ›</a>
</div>


### 21. 原型对象 `prototype`

#### 核心思想

每个**构造函数**（或者说 `class`）都有一个天生自带的、名为 `prototype` 的**对象**。这个 `prototype` 对象就像一个“**家族技能仓库**”。我们把所有实例都需要**共享**的属性和方法，都放在这个“仓库”里，而不是在构造函数里为每个实例单独创建。

#### 超详细讲解

我们回到之前那个有性能问题的 `Cat` 构造函数。

**之前的问题：**

```javascript
function Cat(name) {
    this.name = name;
    // 每 new 一次，就创建一个新的 meow 函数，浪费内存
    this.meow = function() { console.log("喵~"); };
}
```

**用 `prototype` 解决：**
我们把共享的 `meow` 方法，从构造函数内部“搬家”到 `Cat.prototype` 这个“公共仓库”里。

```javascript
// 构造函数只负责实例独有的属性
function Cat(name) {
    this.name = name;
}

// 把共享的方法，添加到构造函数的 prototype 对象上
Cat.prototype.meow = function() {
    console.log(this.name + " 说：喵~");
};

Cat.prototype.species = "猫科动物"; // 也可以放共享的属性

// --- 创建实例 ---
const cat1 = new Cat("咪咪");
const cat2 = new Cat("花花");

// --- 测试 ---
cat1.meow(); // 输出: 咪咪 说：喵~
cat2.meow(); // 输出: 花花 说：喵~
console.log(cat1.species); // 输出: 猫科动物

// 关键点：它们的 meow 方法和 species 属性是同一个吗？
console.log(cat1.meow === cat2.meow); // true! 共享成功！
console.log(cat1.species === cat2.species); // true!
```

**发生了什么？**
`cat1` 和 `cat2` 在被创建时，它们的内部并没有 `meow` 方法。当代码执行 `cat1.meow()` 时：

1. JS引擎先在 `cat1` 对象**自身**上找，发现没有 `meow`。
2. 于是，JS引擎会顺着一条“神秘通道”（后面会讲，它叫 `__proto__`），去到 `cat1` 的“家族技能仓库”，也就是 `Cat.prototype` 里去找。
3. 在 `Cat.prototype` 里，它找到了 `meow` 方法！于是就执行它。

**重要：** 在 `prototype` 的方法中，`this` 依然指向**调用该方法的实例对象**。当 `cat1.meow()` 执行时，`meow` 里的 `this` 就是 `cat1`；当 `cat2.meow()` 执行时，`this` 就是 `cat2`。

**总结一下：**
`prototype` 是**构造函数**的一个属性，它是一个对象。它的作用是存放所有实例**需要共享的成员（主要是方法）**，以达到节省内存和实现继承的目的。

---

### 22. `constructor` 属性以及应用

#### 核心思想

在每个**原型对象 (`prototype`)** 上，都有一个天生自带的、名为 `constructor` 的属性，它**指回**了这个原型对象所属的**构造函数本身**。

#### 超详细讲解

我们继续看 `Cat.prototype` 这个对象：

```javascript
function Cat(name) {
    this.name = name;
}
// Cat.prototype 是一个对象，我们看看它里面有什么
console.log(Cat.prototype); 
```

在浏览器控制台里展开 `Cat.prototype`，会看到它至少有一个属性：

```
{
    constructor: f Cat(name), // `constructor` 属性指向 Cat 函数自己！
    __proto__: Object
}
```

**这个 `constructor` 属性有什么用？**

1. **身份标识**：它告诉我们，一个对象实例是由哪个构造函数创建的。由于实例可以访问到原型上的属性，所以：
   
   ```javascript
   const cat1 = new Cat("咪咪");
   console.log(cat1.constructor);      // 输出: f Cat(name)
   console.log(cat1.constructor === Cat); // true!
   ```
   
   这让我们可以在不知道对象具体来源时，动态地判断它的“出身”。

2. **创建同类新对象**：在某些场景下，你可能只有一个对象实例，但想用它来创建另一个同类型的实例。
   
   ```javascript
   function createAnother(instance) {
       // 通过实例的 constructor 属性，就能拿到它的构造函数，然后创建新实例
       return new instance.constructor("我是新来的");
   }
   
   const cat1 = new Cat("咪咪");
   const cat3 = createAnother(cat1);
   
   console.log(cat3.name); // 输出: 我是新来的
   console.log(cat3 instanceof Cat); // true
   ```

**一个常见的坑：重写 `prototype`**
有时候为了方便，我们会直接用一个新对象覆盖掉原来的 `prototype`：

```javascript
function Dog(name) { this.name = name; }

Dog.prototype = {
    // 这样写会把原来的 prototype 对象整个替换掉
    // 原来 prototype 里的 constructor 属性也跟着丢了！
    bark: function() { console.log("汪！"); }
};

const dog1 = new Dog("旺财");
console.log(dog1.constructor === Dog); // false!
console.log(dog1.constructor === Object); // true! (因为新对象的 constructor 默认指向 Object)
```

**修正方法：手动指回来**

```javascript
Dog.prototype = {
    constructor: Dog, // 手动把 constructor 指回正确的构造函数
    bark: function() { console.log("汪！"); }
};

const dog2 = new Dog("来福");
console.log(dog2.constructor === Dog); // true! 问题解决。
```

**总结一下：**
`constructor` 属性是原型对象上的一个“回指指针”，它指向关联的构造函数。它主要用于**身份识别**和**创建同类对象**。

---

### 23. 对象原型 `__proto__`

`prototype` 是挂在**构造函数**上的，而 `__proto__` (前后各有两个下划线) 是挂在**每个实例对象**上的。

#### 核心思想

每个**对象实例**都有一个 `__proto__` 属性，它就是我们之前提到的那条“**神秘通道**”。它指向创建该实例的**构造函数的原型对象 (`prototype`)**。

#### 超详细讲解

`__proto__` 是连接“实例”和“公共仓库”的桥梁。

```javascript
function Cat(name) {
    this.name = name;
}
Cat.prototype.species = "猫科动物";

const cat1 = new Cat("咪咪");

// --- 揭开神秘通道的面纱 ---
console.log(cat1.__proto__); // 打印出的内容和 Cat.prototype 完全一样

// 验证一下
console.log(cat1.__proto__ === Cat.prototype); // true!
```

**关系图：**

```
[构造函数]              [原型对象]
  Cat ---------------> Cat.prototype
   ^                        ^
   |                        |
   | .constructor           | .__proto__
   |                        |
   +---------------------- [实例对象]
                             cat1
```

* `Cat` 通过 `.prototype` 指向它的原型对象。
* `Cat.prototype` 通过 `.constructor` 指回 `Cat`。
* 实例 `cat1` 通过 `.__proto__` 指向 `Cat.prototype`。

**`__proto__` 的作用是什么？**
它的唯一作用就是**构成原型链**（下一节讲），让JS引擎在查找属性时，能从实例自身顺着它一路找到原型，再到原型的原型...

**重要提示：**
`__proto__` 是一个非标准的历史遗留属性，虽然现在主流浏览器都支持，但在实际开发中，**不推荐直接操作它**。ES6 提供了标准的替代方法：

* `Object.getPrototypeOf(obj)`: 获取一个对象的原型（等同于 `obj.__proto__`）。
* `Object.setPrototypeOf(obj, proto)`: 设置一个对象的原型。

**总结一下：**
`__proto__` 是**实例对象**的一个内部属性，它指向其构造函数的 `prototype` 对象。它是实现原型继承的**核心链接**。

---

### 24. 原型继承

这是JS在 `class` 出现之前实现继承的经典方式。

#### 核心思想

继承的核心思想是**让一个构造函数（子类）的原型，继承自另一个构造函数（父类）的原型**，从而让子类的实例也能使用父类原型上的方法。

#### 超详细讲解

假设我们有一个 `Animal` 父类，和一个 `Cat` 子类。

```javascript
// 父类
function Animal(name) {
    this.name = name;
    this.sleep = function() { console.log("Zzz..."); };
}
Animal.prototype.eat = function(food) {
    console.log(this.name + " 正在吃 " + food);
};

// 子类
function Cat(name, color) {
    // 步骤一：借用父类构造函数，继承父类的实例属性
    // 使用 call/apply，把 Animal 里的 this 指向当前的 cat 实例
    Animal.call(this, name); 

    this.color = color; // 子类自己的实例属性
}

// 步骤二：实现原型继承 (最关键的一步)
// 让 Cat 的原型指向一个 Animal 的实例。
// 这样 Cat.prototype.__proto__ 就会指向 Animal.prototype
Cat.prototype = Object.create(Animal.prototype);

// 步骤三：修复 constructor 指向
Cat.prototype.constructor = Cat;

// 步骤四：给子类原型添加自己的方法
Cat.prototype.meow = function() {
    console.log("喵~");
};

// --- 测试 ---
const myCat = new Cat("小白", "白色");

myCat.sleep();   // "Zzz..." (继承自 Animal 的实例方法)
myCat.eat("鱼"); // "小白 正在吃 鱼" (继承自 Animal.prototype 的原型方法)
myCat.meow();    // "喵~" (自己的原型方法)
console.log(myCat.name);  // "小白"
console.log(myCat.color); // "白色"
```

**`Object.create(proto)`** 是实现原型继承的现代标准方法。它会创建一个新对象，并将这个新对象的 `__proto__` 指向你传入的 `proto` 对象。这比 `Cat.prototype = new Animal()` 的旧方法更好，因为它不会执行 `Animal` 的构造函数，避免了不必要的属性创建。

**总结一下：**
JS的原型继承组合了**构造函数借用**（继承实例属性）和**原型链继承**（继承共享方法）两种技术，以达到完整的继承效果。

---

### 25. 原型链 (Prototype Chain) 和 `instanceof`

#### 核心思想

* **原型链：** 当你试图访问一个对象的属性时，JS引擎会先在对象自身上查找。如果找不到，就会通过 `__proto__` 指向的原型对象上查找。如果还找不到，就再通过原型对象的 `__proto__` 继续向上查找，直到找到属性或者到达原型链的终点 `null`。这条由 `__proto__` 串联起来的**查找路径**，就是**原型链**。
* **`instanceof` 运算符：** 用来检测一个**构造函数的 `prototype`** 是否出现在一个**实例对象的原型链**上。

#### 超详细讲解

**原型链的终点**
所有对象的原型链最终都会指向 `Object.prototype`，而 `Object.prototype` 的 `__proto__` 是 `null`，这就是原型链的尽头。

我们用 `myCat` 实例来画出它的完整原型链：

```
myCat (实例)
   |
   | .__proto__
   V
Cat.prototype (Cat的原型)
   |
   | .__proto__
   V
Animal.prototype (Animal的原型)
   |
   | .__proto__
   V
Object.prototype (所有对象的最终原型)
   |
   | .__proto__
   V
null (原型链终点)
```

当执行 `myCat.toString()` 时（`toString`是`Object.prototype`上的方法）：

1. 在 `myCat` 自身找 `toString` -> 找不到。
2. 去 `Cat.prototype` 找 -> 找不到。
3. 去 `Animal.prototype` 找 -> 找不到。
4. 去 `Object.prototype` 找 -> 找到了！执行它。

**`instanceof` 的工作原理**
`instanceof` 就是沿着这条原型链进行检查。

`object instanceof Constructor`

它的检查逻辑是：

1. 查看 `Constructor.prototype` 是否等于 `object.__proto__`？如果是，返回 `true`。
2. 如果不是，再看 `Constructor.prototype` 是否等于 `object.__proto__.__proto__`？如果是，返回 `true`。
3. ...以此类推，沿着原型链一直找下去，直到原型链末端。如果一直没找到，就返回 `false`。

```javascript
const myCat = new Cat("小白", "白色");

console.log(myCat instanceof Cat);      // true (因为 Cat.prototype 在 myCat 的原型链上)
console.log(myCat instanceof Animal);   // true (因为 Animal.prototype 也在 myCat 的原型链上)
console.log(myCat instanceof Object);   // true (因为 Object.prototype 也在 myCat 的原型链上)

function Dog() {}
console.log(myCat instanceof Dog);      // false (因为 Dog.prototype 不在 myCat 的原型链上)
```

**总结一下：**
原型链是JS实现继承的**底层机制**，它定义了属性和方法的**查找顺序**。`instanceof` 是一个**检测工具**，它通过检查原型链来判断一个对象和一个构造函数之间是否存在**继承关系**。

---

现在我们已经理解了JS面向对象编程的底层逻辑。`prototype`, `constructor`, `__proto__` 这“三位一体”的关系，以及它们如何共同构建起强大的原型链继承体系。这是从“会用JS”到“懂JS”的巨大飞跃！

<div style="display: flex; justify-content: space-between;">
  <a href="./JS 进阶-3.md">‹ 上一篇：JS进阶-4</a>
  <a href="./JS 进阶-6.md">下一篇：JS进阶-6 ›</a>
</div>

