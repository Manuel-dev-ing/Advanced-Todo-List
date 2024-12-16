import { tareas, tasks} from "../variables.js";
import UI from "./ui.js";

var ui = new UI();

export default class Tarea {
    constructor(id, titulo, fecha, categoria, isCompleted) {
        this.id = id;
        this.titulo = titulo;
        this.fecha = fecha;
        this.categoria = categoria;
        this.isCompleted = isCompleted;
    }

    guardarTarea(tarea){
        // guardar en el localStorage

        tareas.value = [...tareas.value, tarea]
        
        localStorage.setItem('tareas', JSON.stringify(tareas.value))
        tasks.value = JSON.parse(localStorage.getItem('tareas')) || [];
        
        ui.reiniciarFormulario();
        ui.arrastrarSoltar();    

    }

    ActualizarTarea(tarea){
        let idTarea = parseInt(tarea.id)
        let tareass = tareas.value

        tareass.forEach(task => {

            if (task.id === idTarea) {
              
                task.titulo = document.querySelector('#tituloTarea').value;
                task.categoria = document.querySelector('#categoria').value
                task.fecha = document.querySelector('#fechaVencimiento').value
            }

        })
        localStorage.setItem('tareas', JSON.stringify(tareass))
        tasks.value = JSON.parse(localStorage.getItem('tareas')) || [];
        // tasks = JSON.parse(localStorage.getItem('tareas')) || [];


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
        
        tareas.value.forEach(task => {
            
            if (task.id === idTarea) {
                
                if (task.isCompleted === false) {
                    
                    task.isCompleted = true;        
                
                }else{
                    
                    task.isCompleted = false;        
                
                }
                    
            }
            
        })

        localStorage.setItem('tareas', JSON.stringify(tareas.value))
        tasks.value = JSON.parse(localStorage.getItem('tareas')) || [];

    }
}
