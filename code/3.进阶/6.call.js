const person = {
    name: "xiaoming",
    sayHello: function(age, city) {
        console.log(`hello, my name is ${this.name},I am ${age} years old. I am from ${city}.`)
    }
}

const anotherPerson = {
    name: "Mike",
}

person.sayHello(20, "BeiJing")
person.sayHello.call(anotherPerson, 25, "ShangHai")


// 手写 call
Function.prototype.myCall = function(context, ...args) {
    // 1. 判断 context 是否存在，如果为 null / undefined 则指向 window
    context = context || window;

    // 2. 将原始值包装成对象（处理 call(1, ...) 的情况）
    context = Object(context);

    // 3. 给 context 创建一个唯一的属性（避免覆盖原有的属性）
    const fnSymbol = Symbol("fn");

    // 4. this 就是当前要调用的那个函数
    context[fnSymbol] = this;

    // 5. 执行函数并接受返回值
    const result = context[fnSymbol](...args);

    // 6. 删除临时属性
    delete context[fnSymbol];

    // 7. 返回结果
    return result;
}


/**
 * 用法
 */

// 判断变量类型
const arr = [1, 2];
const obj = {
    name: "maoyu"
}
console.log(typeof arr);
console.log(Object.prototype.toString.call(arr)); 
console.log(Object.prototype.toString.call(obj)); 

// 类数组对象借用数组方法
function func() {
    const args = Array.prototype.slice.call(arguments);
    console.log(args.map(x => x * 2));
}
func(1, 2, 3);

// ES5 时代的构造函数继承
function Parent(name) {
    this.name = name;
}

function Child(name, age) {
    Parent.call(this, name);
    this.age = age;
}

const boy = new Child("zhangsan", 18);
console.log(boy.name);