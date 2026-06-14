// 1. 对象字面量
const myCat = {
    name: "mimi",
    age: 2,
    hobbies: ["睡觉", "吃饭"],
    meow: function() {
        console.log("meow~")
    }
};

console.log(myCat.name);
myCat.meow();


// 2. 构造函数
function Cat(name, age) {
    this.name = name;
    this.age = age;
    this.meow = function() {
        console.log("喵~")
    }
}

const cat1 = new Cat("huahua", 3)
const cat2 = new Cat("pipi", 2)
console.log(cat1.name)
console.log(cat2.name)
cat1.meow()
cat2.meow()


// 3. 类
class Cat3 {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    meow() {
        console.log("meow~~~")
    } 
}

const cat33 = new Cat3("小白", 4);
console.log(cat33.name);
cat33.meow();

// 4. 工厂函数
function createDog(name, age) {
    return {
        name: name,
        age: age,
        wolf: function() {
            console.log("wolf!")
        }
    }
}
const dog1 = createDog("dahuang", 4)
console.log(dog1.name)
dog1.wolf()

// 5. new Object() 构造函数
const dog2 = new Object()
dog2.name = "xiaobai"
dog2.age = 5
dog2.wolf = function() {
    console.log("wang!")
}
console.log(dog2.name)
dog2.wolf()



function Cat33(name, age) {
    this.name = name,
    this.age = age,
    this.meow = function(){
        console.log("meow")
    }
}

class Cat44{
    constructor(name,age) {
        this.name = name,
        this.age = age
    };
    meow = function() {
        console.log("meow")
    }
}