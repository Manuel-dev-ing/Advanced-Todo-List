import { inputBuscarTarea, listadoTareas, formulario } from "../selectores.js";
import { tasks, tareas } from "../variables.js";
import { handleDragStart, handleDragOver, handleDragEnter, handleDragLeave, handleDragEnd, handleDrop, ordenar } from "../funciones.js";


export default class UI {
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
        this.limpiarListadoTareas();
        

        tasks.value.forEach(element => {

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
          
        })
       
    }

    editarTarea(dataId){
        tareas.value.forEach(t => {
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
        
        inputBuscarTarea.addEventListener('keyup', (event) =>{
            var tarea = event.target.value.toLowerCase()
            

            if (tarea != "") {
                tasks.value = tasks.value.filter(task => task.titulo.includes(tarea));
                this.limpiarListadoTareas();
                this.mostrarTareas();
            }else{

                tasks.value = JSON.parse(localStorage.getItem('tareas')) || [];
                // tasks = [...tareas]
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
        document.querySelector('.buscarTarea').value = '';
        formulario.reset();
    }

    eliminarTarea(id){
        console.log("Desde eliminar tarea: ", id);

        tareas.value = tareas.value.filter(x => x.id !== id)
        
        console.log(tareas.value);
        
        localStorage.setItem('tareas', JSON.stringify(tareas.value))
        tasks.value = JSON.parse(localStorage.getItem('tareas')) || [];

        this.reiniciarFormulario();

    }

    arrastrarSoltar(){
        let items = document.querySelectorAll('.listadotareas .listadotareas__tarea');
      
        console.log(items);
        
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