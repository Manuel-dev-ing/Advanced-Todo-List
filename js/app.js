import { formulario, maincontainer, listadoTareas } from "./selectores.js";
import { agregarTarea, completarEditar, eliminar, handleDragStart, handleDragOver, handleDragEnter, handleDragLeave, handleDragEnd, handleDrop, ordenar } from "./funciones.js";

import UI from "./clases/ui.js";

eventListeners();

function eventListeners() {
    formulario.addEventListener('submit', agregarTarea)
    maincontainer.addEventListener('click', completarEditar)
    listadoTareas.addEventListener('click', eliminar)

    document.addEventListener('DOMContentLoaded', () => {
        var userInterface = new UI();
    
        userInterface.mostrarTareas();
        userInterface.buscarTareas();
        userInterface.arrastrarSoltar();
    
    })
}
