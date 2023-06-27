// Obtener el formulario y la lista de tareas
const formulario = document.getElementById('formulario');
const listaTareas = document.getElementById('lista-tareas');

// Agregar evento al formulario para agregar tareas
formulario.addEventListener('submit', (event) => {
  event.preventDefault(); // Evitar que se recargue la página
  const tarea = document.getElementById('tarea').value; // Obtener el valor del input
  if (tarea !== '') { // Verificar que la tarea no esté vacía
    const nuevaTarea = document.createElement('li'); // Crear un nuevo elemento li
    const spanTarea = document.createElement('span'); // Crear un nuevo elemento span para el texto de la tarea
    spanTarea.innerText = tarea; // Agregar el texto de la tarea al span
    const botonEliminar = document.createElement('button'); // Crear un nuevo elemento button para eliminar la tarea
    botonEliminar.innerText = 'Eliminar'; // Agregar el texto al botón
    botonEliminar.classList.add('eliminar'); // Agregar la clase 'eliminar' al botón
    nuevaTarea.appendChild(spanTarea); // Agregar el span al li
    nuevaTarea.appendChild(botonEliminar); // Agregar el botón al li
    listaTareas.appendChild(nuevaTarea); // Agregar el li a la lista de tareas
    document.getElementById('tarea').value = ''; // Limpiar el input
  }
});

// Agregar evento a la lista de tareas para eliminar tareas
listaTareas.addEventListener('click', (event) => {
  if (event.target.classList.contains('eliminar')) { // Verificar que el elemento clickeado sea un botón con la clase 'eliminar'
    event.target.parentElement.remove(); // Eliminar el li que contiene el botón
  }
});