// let name = "Pepe";
// let name2: string;

import { Persona } from "./persona.class";

function saluda(nombre: string) {
  console.log(`Hola ${nombre}`);
}

saluda("Hola");

const nombres: string[] = [];
nombres[0] = "HOla";

let f: (n1: number, n2: number) => number;
f = (n1, n2) => n1 + n2;
console.log(f(3, 4));
f = (n1, n2) => n1 - n2;
console.log(f(3, 4));

type Operacion = (n1: number, n2: number) => number;
const op: Operacion = (n1, n2) => n1 * n2;
console.log(op(3, 4));

function multiplica(n1: number, n2: number) {
  return n1 * n2;
}

function operar(n1: number, n2: number, operacion: Operacion) {
  console.log(`Resultado ${operacion(n1, n2)}`);
}
operar(5, 7, (n1, n2) => n1 ** n2);
operar(5, 7, (n1, n2) => n1 + n2);
operar(5, 7, (n1, n2) => n1 - n2);
operar(5, 7, multiplica);

const elemento = document.getElementById("id1");
if (elemento) console.log(elemento.textContent);

interface Producto {
  nombre: string;
  precio: number;
}

const productos: Producto[] = [
  {
    nombre: "Silla",
    precio: 23.32,
  },
  { nombre: "Mesa", precio: 50 },
];
console.log(productos);

const p = new Persona("Pepe", 23, "invitado");
// console.log(p.#rol);
Object.entries(p).forEach(([k,v]) => console.log(`${k} => ${v}`)); // Recorremos las propiedades del objeto


