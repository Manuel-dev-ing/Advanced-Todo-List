export var tareas = {
    value: JSON.parse(localStorage.getItem('tareas')) || []
  
}

export var tasks = {
    value: [...tareas.value]  
} 

// var tasks = [];

console.log(tareas);


// ui.mostrarTareas()
