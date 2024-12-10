const formulario = document.querySelector('#formulario-tareas');
const inputBuscarTarea = document.querySelector('.buscarTarea');
const listadoTareas = document.querySelector('#listado');

const maincontainer = document.querySelector('.main-container');

var tareas = JSON.parse(localStorage.getItem('tareas')) || [];
console.log(tareas);

eventListeners();

function eventListeners() {
    formulario.addEventListener('submit', agregarTarea)
    maincontainer.addEventListener('click', completarEditar)
    listadoTareas.addEventListener('click', eliminar)
    // item.addEventListener('dragstart', arrastrarSoltar)
    // item.addEventListener('drop', handleDrop)

    document.addEventListener('DOMContentLoaded', () => {
        var userInterface = new UI();
    

        userInterface.mostrarTareas();
        userInterface.buscarTareas();
        userInterface.arrastrarSoltar();

       

        // items.forEach(function(item) {
    
        //     item.addEventListener('dragstart', handleDragStart);
        //     item.addEventListener('dragover', handleDragOver);
        //     // item.addEventListener('dragenter', handleDragEnter);
        //     // item.addEventListener('dragleave', handleDragLeave);
        //     item.addEventListener('dragend', handleDragEnd);
        //     item.addEventListener('drop', handleDrop);
        // })    
    })
}


class UI {
    validarCamposVacios(campo){
        if (campo != undefined) {
            //Mostrando Alerta para inputs vacios

            campo.classList.add('border-danger');
            let nombreAtributo = campo.dataset.name;
    
            let alerta = document.createElement('DIV');
            alerta.textContent = 'El ' +nombreAtributo +' de la tarea es requerido';
    
            alerta.classList.add('alert-danger')
    
            document.querySelector('.main-container').insertBefore(alerta, inputBuscarTarea)
    
            setTimeout(() => {
                alerta.remove();
                campo.classList.remove('border-danger')
    
            }, 3000);

            return;
        }
    }
    
    imprimirAlerta(campo){
       
        let alerta = document.createElement('DIV');
        alerta.textContent = 'Tarea '+ campo +' Correctamente';

        alerta.classList.add('alert-success')

        document.querySelector('.main-container').insertBefore(alerta, inputBuscarTarea)

        setTimeout(() => {
            alerta.remove();

        }, 3000);
    }

    imprimirAlertaFechaValida(){
        let alerta = document.createElement('DIV');
        alerta.textContent = 'Agregue una fecha valida. Selecciona una fecha mayor o igual a la actual.';

        alerta.classList.add('alert-danger')
    
        document.querySelector('.main-container').insertBefore(alerta, inputBuscarTarea)

        setTimeout(() => {

            alerta.remove();

        }, 6000);

    }

    mostrarTareas(){
        tareas.forEach(element => {


            const div = document.createElement('DIV')
            div.classList.add('listadotareas__tarea', 'mb-5')
            div.draggable = true;
            
            const {id, titulo, fecha, categoria, isCompleted} = element

            // const isChecked = isCompleted === true ? 'checked' : '';

            let fechaActual = parseInt(moment().format('DDD'));
            let fechaUsuario = parseInt(moment(fecha).format('DDD'));

            let resultado = fechaUsuario - fechaActual;

            div.innerHTML = `

                <i class="bi bi-grip-vertical"></i>
                <div class="listadotareas__titulo">
                    <input type="hidden" id="tareaId" data-id="${id}" >

                    <input class="cursor-pointer" type="checkbox" id="check" ${isCompleted === true ? 'checked' : ''}>
                    <p class="text-md" id="titulo">${titulo}</p>
                </div

                <div class="listadotareas__atributos">
                    <p id="fecha" class="text-sm">${moment(fecha).endOf('day').fromNow()}</p>
                    <p id="categoria" class="text-sm badge-blue">${categoria}</p>
                </div>

                <div class="listadotareas__acciones">
                    <i id="editar" data-id="${id}" class="cursor-pointer bi bi-pencil" title="Editar tarea"></i>
                    <i id="eliminar" data-id="${id}" class="cursor-pointer bi bi-trash3" title="Eliminar tarea"></i>
                </div>
            
            `;
            listadoTareas.appendChild(div);
            var badgeFecha = div.childNodes[5]
        //    console.log(badgeFecha);
            
            if (resultado >= 3 ) {
                badgeFecha.classList.remove('badge-red');
                badgeFecha.classList.add('badge-green');
            
            }else if (resultado >= 2 && resultado < 3) {
                badgeFecha.classList.remove('badge-green');
                badgeFecha.classList.add('badge-yellow');
            }

            if (resultado <= 1) {
                badgeFecha.classList.remove('badge-green', 'badge-yellow');
                badgeFecha.classList.add('badge-red');
            }

        });
        this.completarTarea();
        // this.arrastrarSoltar();
    }

    completarTarea(){
        const titulo = document.querySelectorAll('#titulo'); 
        document.querySelectorAll('#check').forEach((chek, index)=> {
            
            if (chek.checked) {
                console.log("is checked");
                titulo[index].classList.add('line');
            }
            else{
                titulo[index].classList.remove('line');
            }
            // chek.addEventListener('change', (evt) =>{
                

            //     if (evt.target.checked) {
            //         titulo[index].classList.add('line');
            //         console.log("is checked");
            //         index.setAttribute('checked', '')
            //         console.log("elemento: ", index);


            //     } else {
            //         titulo[index].classList.remove('line');
                    
            //     }
            
            // })
        })
       
    }

    editarTarea(dataId){
        tareas.forEach(t => {
            const {id, titulo, fecha, categoria} = t
            
            if (id === dataId) {

                document.querySelector('#tituloTarea').value = titulo
                document.querySelector('#fechaVencimiento').value = fecha
                document.querySelector('#categoria').value = categoria
                document.querySelector('#idTarea').value = id

            }

        }) 
    }

    buscarTareas(){     
        
        const tasks = [...tareas];

        inputBuscarTarea.addEventListener('keyup', (event) =>{
            var tarea = event.target.value.toLowerCase()

            if (tarea != "") {
                tareas = tasks.filter(task => task.titulo.includes(tarea));
                this.limpiarListadoTareas();
                this.mostrarTareas();
            }else{

                tareas = JSON.parse(localStorage.getItem('tareas')) || [];
                this.limpiarListadoTareas();
                this.mostrarTareas();

            }
                

        })
    }

    limpiarListadoTareas(){

        while (listadoTareas.firstChild) {
            listadoTareas.removeChild(listadoTareas.firstChild)
        }


    }

    reiniciarFormulario(){
        document.querySelector("input[type='hidden']").removeAttribute("value");
        formulario.reset();
    }

    eliminarTarea(id){
        console.log("Desde eliminar tarea: ", id);

        tareas = tareas.filter(x => x.id !== id)
        
        console.log(tareas);
        
        localStorage.setItem('tareas', JSON.stringify(tareas))
        this.reiniciarFormulario();

    }

    arrastrarSoltar(){
        let items = document.querySelectorAll('.listadotareas .listadotareas__tarea');
      

        items.forEach(function(item) {
    
            item.addEventListener('dragstart', handleDragStart);
            item.addEventListener('dragover', handleDragOver);
            item.addEventListener('dragenter', handleDragEnter);
            item.addEventListener('dragleave', handleDragLeave);
            item.addEventListener('dragend', handleDragEnd);
            item.addEventListener('drop', handleDrop);
        })
    }
   

}

var ui = new UI();
// ui.mostrarTareas()
var tareaObj;

class Tarea {
    constructor(id, titulo, fecha, categoria, isCompleted) {
        this.id = id;
        this.titulo = titulo;
        this.fecha = fecha;
        this.categoria = categoria;
        this.isCompleted = isCompleted;
    }

    guardarTarea(tarea){
        // guardar en el localStorage

        tareas = [...tareas, tarea]
        
        localStorage.setItem('tareas', JSON.stringify(tareas))
    
        console.log("tarea gurdada: ", tareas);
        
        ui.reiniciarFormulario();
        ui.arrastrarSoltar();    

    }

    ActualizarTarea(tarea){
        let idTarea = parseInt(tarea.id)

        tareas.forEach(task => {

            if (task.id === idTarea) {
              
                task.titulo = document.querySelector('#tituloTarea').value;
                task.categoria = document.querySelector('#categoria').value
                task.fecha = document.querySelector('#fechaVencimiento').value
            }

        })
        localStorage.setItem('tareas', JSON.stringify(tareas))
        console.log("Tarea Actualizada: ", tareas);

        ui.reiniciarFormulario();
      
    }

    comprobarFechaValida(){
        
        //obtener el mes
        let inputFechaMes = moment(this.fecha).format('M');
        let inputFechaDia = moment(this.fecha).format('DDD');

        let fechaActualMes = moment().format('M');
        let fechaActualDia = moment().format('DDD');

        //Primero comparar por mes
        if (inputFechaMes < fechaActualMes) {
            // console.log("La fecha del usuario es menor que la actual, el mes es menor que el actual");
            return false;

        }else if(inputFechaDia < fechaActualDia){
            // console.log("La fecha del usuario es menor que la actual, el dia es menor que la fecha actual");
            return false;

        }else{
            return true;
        }

    }

    //funcion para completar tarea
    completar(){
        var idTarea = parseInt(this.id) 
        tareas.forEach(task => {

            if (task.id === idTarea) {

                if (task.isCompleted === false) {
                    task.isCompleted = true;        
                    
                }else{

                    task.isCompleted = false;        

                }

            }

        })

        localStorage.setItem('tareas', JSON.stringify(tareas))
        console.log("Tarea Completada");
        


    }
}

function agregarTarea(e) {
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
        ui.limpiarListadoTareas();
        ui.mostrarTareas();
        ui.arrastrarSoltar();

        return;
    }

    tareaObj.guardarTarea(tareasObj);
    
    // imprimir mensaje de exito
    ui.imprimirAlerta('Guardada');
    ui.limpiarListadoTareas();
    ui.mostrarTareas();
    ui.arrastrarSoltar();

}

function eliminar(e) {
    
    
    if (e.target.id === 'eliminar') {
        const elemento = e.target
        var dataId = parseInt(elemento.getAttribute('data-id'))
        console.log("id eliminar: ", dataId);
        ui.eliminarTarea(dataId);
        ui.imprimirAlerta('Eliminada');
        ui.limpiarListadoTareas();
        ui.mostrarTareas();
        ui.arrastrarSoltar();

        return;
    }

}


function completarEditar(e) {

    
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
        let tarea = tareas.find(x => x.id === Id)
        
        const {id, titulo, fecha, categoria, isCompleted} = tarea

        const task = new Tarea(id, titulo, fecha, categoria, isCompleted);

        task.completar();
        ui.limpiarListadoTareas();
        ui.mostrarTareas();
        ui.arrastrarSoltar();

        // console.log(elemento);
        return;        
    }


    


}





function handleDragStart(e) {
    this.style.opacity = '0.4';

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.style.opacity = '1';
   
}

function handleDragOver(e) {
    e.preventDefault();
    return false;
}

function handleDragEnter(e) {
    // this.classList.add('over');
}

function handleDragLeave(e) {
    // this.classList.remove('over');
}

function handleDrop(e) {
    console.log("frop");
    
    e.stopPropagation();

   if (dragSrcEl !== this) {
     dragSrcEl.innerHTML = this.innerHTML;
     this.innerHTML = e.dataTransfer.getData('text/html');
   }
   
   console.log("Accion de soltar");
   ordenar();

   return false;
}

function ordenar() {
    console.log("ordenando...");

    const newArr = [];
    document.querySelectorAll('#tareaId').forEach((item, index) => {
        
        let id = parseInt(item.getAttribute('data-id'));

        let elemento = tareas.find(x => x.id === id)
        console.log(elemento);
        
        newArr.push(elemento);
        
        

    })

    localStorage.setItem('tareas', JSON.stringify(newArr))
    
    console.log("Informacion Ordenada");
    console.log(newArr);
    console.log(tareas);
    
    
}

