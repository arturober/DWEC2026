// DO NOT USE VAR!!
const body = document.body;

for(var i = 0; i < 10; i++) {
    const p = document.createElement('p');
    p.textContent = `This is p number ${i}`;
    body.append(p);

    p.addEventListener('click', () => {
        alert(`You clicked on p number ${i}`);
    });
}

