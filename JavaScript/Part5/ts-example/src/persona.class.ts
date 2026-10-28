export type Rol = "admin" | "usuario" | "invitado";

interface Saluda {
    saluda: () => void
}

export class Persona implements Saluda {
    nombre: string;
    edad: number;
    #rol: Rol; // Solo puede ser "admin", "usuario" o "invitado"

    constructor(nombre: string, edad: number, rol: Rol) {
        this.nombre = nombre;
        this.edad = edad;
        this.#rol = rol;
    }
    
    saluda() {
        console.log(`Hola, me llamo ${this.nombre}`);
    }

    get rol() { return this.#rol; }
}