const a = [10, 20, 30, 40, 50];

for(let i in a) {
    console.log(`${i} -> ${a[i]}`);
}

// Equivale a un bucle foreach clásico
for(let n of a) {
    console.log(n);
}

a.forEach((n, i) => console.log(`${i} -> ${a[i]}`));

const palabras1 = ["mesa", "silla", "armario"];
const palabras2 = ["pera", "manzana", "naranja"];
const palabras3 = palabras1.concat(palabras2, "lápiz", ["boli", "goma"]);
console.log(palabras3);
console.log(palabras3.slice(2,5)); // [ 'armario', 'pera', 'manzana' ]

console.log(palabras3.toSpliced(2, 2, "eliminado1", "eliminado2"));

console.log(a.toReversed()); // [ 50, 40, 30, 20, 10 ]

console.log("--- ORDENAR ARRAYS ---");
const nums = [3, 12, 9, 253, 36, 71, 8];
console.log(nums.toSorted());
console.log(nums.toSorted((n1, n2) => n1 - n2));

console.log("--- OTROS MÉTODOS ---");
let  arr = [1, 2, 3, 4];
let arr2 = arr.with(2, 99); // En lugar de hacer a[2] = 99
console.log(arr); // [1, 2, 3, 4] -> Original
console.log(arr2); // [1, 2, 99, 4] -> Nuevo array con el cambio

console.log(palabras3.map(p => p.length));

console.log("--- SUMA ARRAY ----");
const numeros = [2, 5, 16, 8, 21];
const res = numeros.reduce((total, n) => total + n, 0);
console.log(res); // 52
const res2 = Math.sumPrecise(numeros); // 52 (método nuevo)

cons