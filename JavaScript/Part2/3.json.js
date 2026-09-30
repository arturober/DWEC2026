const persona = {
  nombre: "Juan",
  edad: 23,
  telefonos: ["543253455", "546054856"],
  direcciones: [
    {
      calle: "Calle perdida 23",
      cp: "54355",
      ciudad: "Albacete",
    },
    {
      calle: "Calle inventada 54",
      cp: "54564",
      ciudad: "Cuenca",
    }
  ],
};

persona.telefonos.push("999888777");
console.log(persona.telefonos.join(" - "));
console.log(persona.direcciones[0].ciudad);
console.log(persona);
