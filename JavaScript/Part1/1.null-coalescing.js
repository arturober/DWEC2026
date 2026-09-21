// Operador de fusión nula (nullish coalescing operator) en JavaScript
// El operador ?? devuelve el valor del operando de la izquierda si no es null ni undefined; de lo contrario, devuelve el operando de la derecha.
function saluda(nombre) {
    nombre ??= "Anónimo";
    console.log(`Hola ${nombre}`);
}

saluda("Juan"); // Hola Juan
saluda(); // Hola Anónimo
saluda(null); // Hola Anónimo
saluda(""); // Hola 

const nombre = null;
console.log(nombre ?? "Desconocido"); // Desconocido`