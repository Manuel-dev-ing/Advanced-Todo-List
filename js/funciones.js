import UI from "./clases/ui.js";
import Tarea from "./clases/Tarea.js";
import { tareas } from "./variables.js";


var ui = new UI();
var tareaObj;
var dragSrcEl;

export function agregarTarea(e) {
    e.preventDefault()
    moment.locale('es');

    let idTarea = document.querySelector('#idTarea').value

    let id = idTarea === '' ? Date.now() : idTarea;
    

    let titulo = document.querySelector('#tituloTarea').value;
    let fecha = document.querySelector('#fechaVencimiento').value;
    let categoria = document.querySelector('#categoria').value;

    if (titulo === '') {
        let titulo = document.querySelector('#tituloTarea')
        ui.validarCamposVacios(titulo);
        return;
    }
    if (fecha === '') {
        let fecha = document.querySelector('#fechaVencimiento')
        ui.validarCamposVacios(fecha);
        return;
    }

    tareaObj = new Tarea(id, titulo, fecha, categoria);

  
    const tareasObj = {
        id: id,
        titulo: titulo,
        fecha: fecha,
        categoria: categoria,
        isCompleted: false
    }

    let fechaValida = tareaObj.comprobarFechaValida();
    

    if (!fechaValida) {
        ui.imprimirAlertaFechaValida();
        return;
    }
    
    if (idTarea !== '') {
        tareaObj.ActualizarTarea(tareaObj);
        ui.imprimirAlerta('Actualizada');
        ui.mostrarTareas();
        ui.arrastrarSoltar();

        return;
    }

    tareaObj.guardarTarea(tareasObj);
    
    // imprimir mensaje de exito
    ui.imprimirAlerta('Guardada');
    ui.mostrarTareas();
    ui.arrastrarSoltar();

}

export function eliminar(e) {
    
    
    if (e.target.id === 'eliminar') {
        const elemento = e.target
        var dataId = parseInt(elemento.getAttribute('data-id'))
        ui.eliminarTarea(dataId);
        ui.imprimirAlerta('Eliminada');
        ui.mostrarTareas();
        ui.arrastrarSoltar();

        return;
    }

}


export function completarEditar(e) {

    
    if (e.target.id === 'editar') {
        const elemento = e.target
        var dataId = parseInt(elemento.getAttribute('data-id'))
        ui.editarTarea(dataId);
        
        //  e.target.remove();
        return;
    }

    if (e.target.id === 'check') {
        let elemento = e.target.parentElement
        let Id = parseInt(elemento.querySelector('#tareaId').getAttribute('data-id'));
        
        let tarea = tareas.value.find(x => x.id === Id)
        
        const {id, titulo, fecha, categoria, isCompleted} = tarea
        
        const task = new Tarea(id, titulo, fecha, categoria, isCompleted);
        // console.log(task);

        task.completar();
        ui.mostrarTareas();
        ui.arrastrarSoltar();

        // // console.log(elemento);
        return;        
    }

}

export function handleDragStart(e) {

    this.style.opacity = '0.4';
    console.log("handleDragStart");
    

    dragSrcEl = this;

    console.log(dragSrcEl);


    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

export function handleDragEnd(e) {
    this.style.opacity = '1';
   
}

export function handleDragOver(e) {
    e.preventDefault();
    return false;
}

export function handleDragEnter(e) {
    // this.classList.add('over');
}

export function handleDragLeave(e) {
    // this.classList.remove('over');
}

export function handleDrop(e) {
    console.log("frop");
    
    e.stopPropagation();

   if (dragSrcEl !== this) {
     dragSrcEl.innerHTML = this.innerHTML;
     this.innerHTML = e.dataTransfer.getData('text/html');
   }
   
   ordenar();

   return false;
}

export function ordenar() {

    const newArr = [];
    document.querySelectorAll('#tareaId').forEach((item, index) => {
        
        let id = parseInt(item.getAttribute('data-id'));

        let elemento = tareas.value.find(x => x.id === id)
        
        newArr.push(elemento);
    })

    localStorage.setItem('tareas', JSON.stringify(newArr))
    
}

