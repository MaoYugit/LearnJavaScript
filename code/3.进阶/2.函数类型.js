// 1.函数声明
function sum(a, b) {
    return a + b;
}

// 2.函数表达式
const multiply = function(a, b) {
    return a * b
}

// 3.匿名函数
setTimeout(function() {
    console.log("时间到！")
}, 1000)

// 箭头函数
const add = (a, b) => {
    return a + b
}

console.log(add(11, 2))