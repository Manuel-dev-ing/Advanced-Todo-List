

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

    const arr = [];
    document.querySelectorAll('#tareaId').forEach((item, index) => {
        
        let id = parseInt(item.getAttribute('data-id'));
        console.log(id);            

        let elemento = tareas.find(x => x.id === id)
        
        
        arr.push(elemento);
        
    })
    console.log(arr);
    localStorage.setItem('tareas', JSON.stringify(arr))
    console.log("Informacion Actualizada");
    
    
}


let items = document.querySelectorAll('.listadotareas .listadotareas__tarea');
items.forEach(function(item) {
    
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('dragenter', handleDragEnter);
    item.addEventListener('dragleave', handleDragLeave);
    item.addEventListener('dragend', handleDragEnd);
    item.addEventListener('drop', handleDrop);
})


document.addEventListener('DOMContentLoaded', (event)=>{
    
  

})














