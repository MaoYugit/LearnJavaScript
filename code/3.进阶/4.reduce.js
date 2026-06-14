array1 = [1, 2, 3, 4, 5, 1, 6, 5, 1, 5, 9, 1]

const result = array1.reduce((acc, cur) => {
    if (acc[cur]) {
        acc[cur]++;
    } else {
        acc[cur] = 1
    }
    return acc;
}, {})

console.log(result)
