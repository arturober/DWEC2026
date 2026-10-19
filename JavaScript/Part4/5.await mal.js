const boton = document.getElementById("boton");

function getNumeroTarde() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(24), 10000);
    });
}

const num = await getNumeroTarde();
console.log(`Número recibido: ${num}`);

boton.addEventListener("click", () => alert("Click en el botón"));