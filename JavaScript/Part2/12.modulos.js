import { Persona, ANONIMO } from "./clases/persona.class.js";

const p = new Persona("Ana", 23);
console.log(p);
const p2 = new Persona(ANONIMO, 23);
console.log(p2);
