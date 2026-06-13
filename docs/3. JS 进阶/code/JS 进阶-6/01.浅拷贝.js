const originalObject = {
  a: 1,
  b: {
    c: 2,
  },
};

const cpoiedObject = Object.assign({}, originalObject);

console.log(cpoiedObject);

cpoiedObject.a = 10;
cpoiedObject.b.c = 20;

console.log("After modification:");
console.log("Original Object:", originalObject);
console.log("Copied Object:", cpoiedObject);
