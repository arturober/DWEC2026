function saluda(nombre?: string) {
    // El tipo de 'nombre' será: string | undefined
    if(!nombre) {
        console.log("No sé quién eres");
    } else {
        console.log(`Hola ${nombre}`);
    }
}

saluda(); // OK
saluda("Pepe"); // OK

const a = ["perro", "casa", "árbol", "mesa", "coche"];
const palabra = a.find((p) => p.startsWith("z")); // Devuelve string | undefined

// console.log(palabra.toLocaleUpperCase()); // ERROR: 'palabra' is possibly 'undefined'
console.log(palabra?.toLocaleUpperCase()); // Si palabra es undefined, devuelve undefined sin acceder al método

class Persona {
    nombre!: string; // Property 'nombre' has no initializer and is not definitely assigned in the constructor
    edad!: number; // Property 'edad' has no initializer and is not definitely assigned in the constructor

    private constructor() {} // Constructor privado, no se puede invocar fuera

    static crear(nombre: string, edad: number) { // Método constructor estático
        const p = new Persona();
        p.nombre = nombre;
        p.edad = edad;
        return p;
    }

    toString() {
        return `${this.nombre} - ${this.edad}`;
    }
}

const p = Persona.crear("Juan", 23);
console.log(p); // Juan - 23