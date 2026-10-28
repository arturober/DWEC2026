class Almacen<T> {
    elemento: T;

    constructor(elemento: T) {
        this.elemento = elemento;
    }
}

const almacen: Almacen<string> = new Almacen("Arroz");
const almacen2: Almacen<Date> = new Almacen(new Date());
const almacen3 = new Almacen(23);

console.log(almacen);
console.log(almacen2);
console.log(almacen3);

almacen2.elemento.getDate();
