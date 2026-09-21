'use strict';

function sayHello(name) {
  console.log("Hello " + name);
}

sayHello(); // "Hello undefined"
sayHello("Peter"); // "Hello Peter"
sayHello("Juan", "Doe"); // "Hello Juan"
console.log(typeof sayHello); // "function"

const sayHello2 = function(name) {
  console.log("Hello " + name);
};
sayHello2("Maria"); // "Hello Maria"

const sayHello3 = (name) => console.log("Hello " + name);
sayHello3("Luis"); // "Hello Luis"

function getTotalPrice(price, tax = price * 0.07) {
    return price + tax;
}

console.log(getTotalPrice(100)); // 107
console.log(getTotalPrice(100, 10)); // 110

// Ámbito variables

let num = 5;
if(num === 5) {
    let num = 10;
}

console.log(num); // 5