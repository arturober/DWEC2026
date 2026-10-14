const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Fin'),3000)
});

promise.then(console.log);

function sumaAsync(n1, n2) {
    return new Promise((resolve, reject) => {
        if(n1 < 0 || n2 < 0) reject("No puedo sumar número negativos")
        setTimeout(() => resolve(n1 + n2), Math.random()*2000+1000)
    });
}

sumaAsync(2,5)
.then(r => sumaAsync(r, 10))
.then(r => console.log(r))

sumaAsync(-1, -4)
.then(r => console.log(`Resultado: ${r}`))
.catch(e => console.log(`Error: ${e}`))

const sumasP = [sumaAsync(3,5), sumaAsync(4,8), sumaAsync(10,4)];

Promise.all(sumasP)
.then(r => console.log(`Resultados: ${r.join(', ')}`));

Promise.any(sumasP)
.then(r => console.log(`Suma más rápida: ${r}`));