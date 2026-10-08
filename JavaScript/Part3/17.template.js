const form = document.getElementById("courseForm");
const contenedorCursos = document.querySelector("#coursesContainer");
const imgPreview = document.getElementById("imgPreview");
const cursoTemplate = document.getElementById("card-curso");

function addCurso(curso) {
  const article = cursoTemplate.content.cloneNode(true).firstElementChild;
  article.querySelector("img").src = curso.imagen;
  article.querySelector(".nombre-curso").append(curso.nombre);
  article.querySelector(".descripcion-curso").append(curso.descripcion);
  article
    .querySelector(".precio-curso")
    .append(
      new Intl.NumberFormat("es", { currency: "EUR" }).format(curso.precio),
    );
  contenedorCursos.append(article);
}

form.imagen.addEventListener("change", (e) => {
  const file = e.target.files[0]; // Archivo seleccionado
  if (!file) {
    imgPreview.src = "";
    return;
  }

  // Validamos que el archivo sea .jpg o .png
  if (!/(.jpg|.png)$/.test(file.name)) {
    form.imagen.setCustomValidity("La extensión debe ser .jpg o .png");
    form.imagen.reportValidity(); // Mostramos error al usuario
    return;
  } else {
    form.imagen.setCustomValidity("");
  }

  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);

  fileReader.addEventListener("load", () => {
    imgPreview.src = fileReader.result;
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!form.reportValidity()) return; // Formulario no válido

  const curso = {
    nombre: form.nombre.value,
    precio: +form.precio.value,
    descripcion: form.descripcion.value,
    imagen: imgPreview.src,
  };

  addCurso(curso);
  form.reset();
  imgPreview.src = "";
});
