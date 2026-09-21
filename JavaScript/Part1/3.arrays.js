const a = [10, 20, 30, 40, 50];

for(let i in a) {
    console.log(`${i} -> ${a[i]}`);
}

// Equivale a un bucle foreach clásico
for(let n of a) {
    console.log(n);
}

a.forEach((n, i) => console.log(`${i} -> ${a[i]}`));

function changeArray(arr) {
    const arr2 = arr.with(0,9999);
    console.log(arr2);
}
changeArray(a);
console.log(a);