const student1 = {
    name: "maoyu",
    age: 25,
    scores: {
        math: 96,
        english: 66
    }
}

const copy_student1 = Object.assign(student1)
const copy_student2 = Object.assign({}, student1)
copy_student1.name = "huyufei"
copy_student2.scores.math = 100
copy_student2.name = "111"
console.log(student1)
console.log(copy_student1)
console.log(copy_student2)


/**
 * 手写
 */

// 浅拷贝
function shallowClone(obj){
    if (obj === null || typeof obj !== "object") {
        return obj;
    };

    let clone = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = obj[key];
        }
    };

    return clone;
} 

// 深拷贝
function deepClone(obj) {
    if (obj === null || obj !== "object") {
        return obj;
    };

    let clone = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = deepClone(obj[key]);
        };
    };

    return clone
}