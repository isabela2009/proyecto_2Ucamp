// Obtener el formulario y la lista de tareas
const formulario = document.getElementById('formulario');
const listaTareas = document.getElementById('lista-tareas');

// Crear el botón de modo claro y oscuro
const modoBoton = document.createElement('button');
modoBoton.innerText = 'Modo Claro';
modoBoton.classList.add('modo-boton', 'modo-oscuro', 'button-estilos'); // Agregar la clase 'button-estilos'

// Agregar el botón al cuerpo del documento
document.body.appendChild(modoBoton);

// Agregar evento de clic al botón
modoBoton.addEventListener('click', () => {
  if (modoBoton.classList.contains('modo-oscuro')) {
    // Cambiar a modo claro
    modoBoton.innerText = 'Modo Oscuro';
    modoBoton.classList.remove('modo-oscuro');
    modoBoton.classList.add('modo-claro');

    // Aplicar estilos de modo claro al documento
    document.body.classList.remove('modo-oscuro');
    document.body.classList.add('modo-claro');
  } else {
    // Cambiar a modo oscuro
    modoBoton.innerText = 'Modo Oscuro';
    modoBoton.classList.remove('modo-claro');
    modoBoton.classList.add('modo-oscuro');

    // Aplicar estilos de modo oscuro al documento
    document.body.classList.remove('modo-claro');
    document.body.classList.add('modo-oscuro');
  }
});

// Cargar tareas almacenadas en Local Storage al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  cargarTareas();
});

// Agregar evento al formulario para agregar tareas
formulario.addEventListener('submit', (event) => {
  event.preventDefault(); // Evitar que se recargue la página
  const tareaInput = document.getElementById('tarea'); // Obtener el input de la tarea
  const tarea = tareaInput.value; // Obtener el valor del input
  if (tarea !== '') { // Verificar que la tarea no esté vacía
    agregarTarea(tarea); // Agregar la tarea a la lista
    tareaInput.value = ''; // Limpiar el input

    // Guardar tarea en Local Storage
    guardarTareaEnLocalStorage(tarea);
  }
});

// Agregar evento a la lista de tareas para eliminar tareas
listaTareas.addEventListener('click', (event) => {
  if (event.target.classList.contains('eliminar')) { // Verificar que el elemento clickeado sea un botón con la clase 'eliminar'
    const tareaElement = event.target.parentElement; // Obtener el elemento li que contiene la tarea
    const tarea = tareaElement.firstChild.innerText; // Obtener el texto de la tarea
    tareaElement.remove(); // Eliminar el li que contiene la tarea

    // Eliminar tarea de Local Storage
    eliminarTareaDeLocalStorage(tarea);
  }
});

// Cargar tareas desde el Local Storage
function cargarTareas() {
  let tareas;
  if (localStorage.getItem('tareas') === null) {
    tareas = [];
  } else {
    tareas = JSON.parse(localStorage.getItem('tareas'));
  }

  tareas.forEach((tarea) => {
    agregarTarea(tarea);
  });
}

// Agregar una tarea a la lista
function agregarTarea(tarea) {
  const nuevaTarea = document.createElement('li'); // Crear un nuevo elemento li
  const spanTarea = document.createElement('span'); // Crear un nuevo elemento span para el texto de la tarea
  spanTarea.innerText = tarea; // Agregar el texto de la tarea al span
  const botonEliminar = document.createElement('button'); // Crear un nuevo elemento button para eliminar la tarea
  botonEliminar.innerText = 'Eliminar'; // Agregar el texto al botón
  botonEliminar.classList.add('eliminar', 'button-estilos'); // Agregar la clase 'eliminar' y 'button-estilos' al botón
  nuevaTarea.appendChild(spanTarea); // Agregar el span al li
  nuevaTarea.appendChild(botonEliminar); // Agregar el botón al li
  listaTareas.appendChild(nuevaTarea); // Agregar el li a la lista de tareas

  const botonEditar = document.createElement('button');
  botonEditar.innerText = 'Editar';
  nuevaTarea.appendChild(botonEditar);
  botonEditar.addEventListener('click', () => {
    editarTarea(spanTarea);
  });
}

// Editar tarea
function editarTarea(spanTarea) {
  const tareaActual = spanTarea.innerText; // Obtener la tarea actual

  // Crear campo de entrada para editar la tarea
  const campoEdicion = document.createElement('input');
  campoEdicion.type = 'text';
  campoEdicion.value = tareaActual;

  // Reemplazar el texto de la tarea con el campo de entrada
  spanTarea.parentNode.replaceChild(campoEdicion, spanTarea);

  // Agregar evento de cambio al campo de entrada
  campoEdicion.addEventListener('change', (event) => {
    const nuevaTarea = event.target.value; // Obtener el nuevo valor de la tarea

    // Crear un nuevo elemento span con el texto actualizado
    const nuevoSpanTarea = document.createElement('span');
    nuevoSpanTarea.innerText = nuevaTarea;

    // Reemplazar el campo de entrada con el nuevo elemento span
    campoEdicion.parentNode.replaceChild(nuevoSpanTarea, campoEdicion);

    // Actualizar tarea en Local Storage
    actualizarTareaEnLocalStorage(tareaActual, nuevaTarea);
  });
}

// Guardar tarea en Local Storage
function guardarTareaEnLocalStorage(tarea) {
  let tareas;
  if (localStorage.getItem('tareas') === null) {
    tareas = [];
  } else {
    tareas = JSON.parse(localStorage.getItem('tareas'));
  }

  tareas.push(tarea);
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Actualizar tarea en Local Storage
function actualizarTareaEnLocalStorage(tareaAnterior, tareaNueva) {
  let tareas;
  if (localStorage.getItem('tareas') === null) {
    tareas = [];
  } else {
    tareas = JSON.parse(localStorage.getItem('tareas'));
  }

  const index = tareas.indexOf(tareaAnterior);
  if (index !== -1) {
    tareas[index] = tareaNueva;
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }
}

// Eliminar tarea de Local Storage
function eliminarTareaDeLocalStorage(tarea) {
  let tareas;
  if (localStorage.getItem('tareas') === null) {
    tareas = [];
  } else {
    tareas = JSON.parse(localStorage.getItem('tareas'));
  }

  const index = tareas.indexOf(tarea);
  if (index !== -1) {
    tareas.splice(index, 1);
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }
}

