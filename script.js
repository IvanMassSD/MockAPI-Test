const URL = "https://684a5b37165d05c5d3586cb0.mockapi.io/empleados";
const contenedor = document.getElementById("empleados");
const inputBusqueda = document.getElementById("busqueda");
const template = document.getElementById("empleado-template");

let empleadosData = [];

async function cargarEmpleados() {
  try {
    const res = await fetch(URL);
    empleadosData = await res.json();
    mostrarEmpleados(empleadosData);
  } catch (error) {
    contenedor.innerHTML = "<p>Error cargando empleados.</p>";
    console.error("Error:", error);
  }
}

function mostrarEmpleados(lista) {
  contenedor.innerHTML = "";
  lista.forEach(emp => {
    const clone = template.content.cloneNode(true);
    const img = clone.querySelector("img");
    const h2 = clone.querySelector("h2");

    img.src = emp.avatar;
    img.alt = emp.name;
    h2.textContent = emp.name;

    contenedor.appendChild(clone);
  });
}

inputBusqueda.addEventListener("input", () => {
  const texto = inputBusqueda.value.toLowerCase();
  const filtrados = empleadosData.filter(emp =>
    emp.name.toLowerCase().includes(texto)
  );
  mostrarEmpleados(filtrados);
});

cargarEmpleados();
