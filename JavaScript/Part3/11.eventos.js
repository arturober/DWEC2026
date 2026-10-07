const div = document.getElementById("div1");
const div2 = document.getElementById("div2");
const google = document.getElementById("google");

google.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("No puedes ir a Google");
});

div.addEventListener("mouseenter", () => {
  div.classList.add("activo");
});

div.addEventListener("mouseleave", (s) => {
  div.classList.remove("activo");
});

div.addEventListener("mousemove", (e) => {
  const x = e.x - div.offsetLeft + 1;
  const y = e.y - div.offsetTop + 1;
  div.textContent = `(${x}, ${y})`;
});

div.addEventListener("click", (e) => {
  if(e.ctrlKey) {
    div.style.borderColor = "red";
  }
});

div2.addEventListener("mouseenter", () => {
  div2.classList.add("activo");
});

div2.addEventListener("mouseleave", (s) => {
  div2.classList.remove("activo");
});

div2.addEventListener("mousemove", (e) => {
  const x = e.x - div2.offsetLeft + 1;
  const y = e.y - div2.offsetTop + 1;
  div2.textContent = `(${x}, ${y})`;
});

div2.addEventListener("click", (e) => {
  if(e.ctrlKey) {
    div2.style.borderColor = "red";
  }
});


