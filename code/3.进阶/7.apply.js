// 求数组中的最大值/最小值
const nums = [5, 1, 9, 3];
const max = Math.max.apply(null, nums);
const max2 = Math.max(...nums)
console.log(max, max2);

// 合并数组（且不产生新数组）
const arr1 = [1, 2];
const arr2 = [3, 4];
Array.prototype.push.apply(arr1, arr2);
console.log(arr1);

// 日志打印
function log() {
    console.log.apply(console, arguments);
}

log('error', '404', 'not found');

/**
 * 手写
 */
Function.prototype.myApply = function(context, argsArray) {
    // 1. 健壮性检查
    if (typeof this !== "function") {
        throw new TypeError('Error: myApply must be called on a function');
    }

    // 2. 处理 context
    if (context === null || context === undefined) {
        context = window;
    } else {
        context = Object(context);
    }

    // 3. 处理参数： 如果没传或者不是数组，要防止报错
    // 注意：原生 apply 支持类数组，这里我们只做简单的数组判断
    if (argsArray && !Array.isArray(argsArray)) {
        throw new TypeError("CreateListFromArrayLike called on no-object");
    }

    const fnSymbol = Symbol("fn");

    context[fnSymbol] = this;

    // 4. 执行函数
    let result;
    if (!argsArray || argsArray.length === 0) {
        // 没有参数直接调用
        result = context[fnSymbol]();
    } else {
        // 有参数则用扩展运算符展开数组（或者是 ES5 的 eval，但面试用扩展运算符即可）
        result = context[fnSymbol](...argsArray)
    }

    delete context[fnSymbol];

    return result;
}