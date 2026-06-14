function createCounter() {
    let count = 0; // createCount 函数的局部变量

    // 闭包
    return function() {
        count++;
        console.log(count)
    }
}

const counter1 = createCounter() // createCounter() 执行完毕，按道理来说其作用域也应该被销毁

// 但是由于闭包的存在，内部函数依然可以访问到 count
counter1() // 1
counter1() // 2
counter1() // 3

const counter2 = createCounter() // 创建一个新的闭包， 他有自己的 count
counter2() // 1
counter2() // 2
counter2() // 3


for( var i = 1; i <= 3; i++) {
    setTimeout(function(){
        console.log(i);
    }, 1000)
}

for( var i = 1; i <= 3; i++) {
    (function(j) {
        setTimeout(function(){
            console.log(j)
        }, 1000)
    })(i);
}

for( let i = 1; i <= 3; i++) {
    setTimeout(function(){
        console.log(i);
    }, 1000)
}