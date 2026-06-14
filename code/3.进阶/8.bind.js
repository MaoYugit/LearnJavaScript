const user = {
    name: '小王',
    sayHi: function(age) {
        console.log(`我是${this.name}，今年${age}岁`);
    }
};

const newFn = user.sayHi.bind({ name: '老李' }); 

// 注意：此时没有输出，因为函数还没执行
newFn(50); // 输出：我是老李，今年50岁