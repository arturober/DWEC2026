import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
const r1 = readline.createInterface({ input, output });
const nombre = await r1.question("Cómo te llamas?: ");
console.log(`Hola ${nombre}`);
r1.close(); // Finally we close the input/output stream
