const empleadosContainer = document.getElementById('empleados');

// -------------------------------------------> GET 

function get() {
  fetch('https://684a5b37165d05c5d3586cb0.mockapi.io/empleados')
    .then(response => response.json())
    .then(data => {
      empleadosContainer.innerHTML = ''; 
      data.forEach(empleado => {
        const div = document.createElement('div');

        const h2 = document.createElement('h2');
        h2.textContent = empleado.name;

        const img = document.createElement('img');
        img.src = empleado.avatar;
        img.alt = empleado.name;
        img.width = 100;

        const p = document.createElement('p');
        p.textContent = empleado.mail;

        div.appendChild(h2);
        div.appendChild(img);
        div.appendChild(p);
        empleadosContainer.appendChild(div);
      });
    })
    .catch(error => console.error('Error:', error));
}

// -------------------------------------------> LLAMA A LA FUNCION POST DESDE EL BOTON DEL HTML

document.getElementById('crearEmpleadoForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;
  const avatar = document.getElementById('avatar').value;

  post(nombre, correo, avatar);
});

// -------------------------------------------> POST

function post(nombre, correo, avatar) {
  fetch('https://684a5b37165d05c5d3586cb0.mockapi.io/empleados', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: nombre, mail: correo, avatar: avatar })
  })
    .then(response => response.json())
    .then(data => {
      console.log('Empleado creado:', data);
      get();
      document.getElementById('crearEmpleadoForm').reset(); 
    })
    .catch(error => console.error('Error:', error));
}

get();
