const { green } = require("colors");
const Tarea = require("./tarea");
require('colors');

class Tareas {
    _listado = {};
   get listadoArr(){
       const listado = [];
  
       //extrae las llaves, y devuelve un array de todas las llaves
       Object.keys(this._listado).forEach( key =>{
           //console.log('llaves')
           //console.log(key);
           const tarea = this._listado[key];
           listado.push(tarea)
       })
       return listado;
   }
    constructor(){
        this._listado = {};
    }
    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }
    cargarTareasFromArray(tareas = [] ){

        tareas.forEach(
            tarea =>{
                this._listado[tarea.id]= tarea;
            }
        )
        
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto(){
        console.log()
        let salida = '';  
        let count = 0;
        let countColor;
        this.listadoArr.forEach(
            listado =>{
                count = count + 1;
                countColor= `${count}`.green
 
                const estado = (listado.completadoEn) ? 'Completada'.green : 'Pendiente'.red;
                salida = salida + `${countColor}. ${listado.desc} :: ${estado} \n`
                
            });
        console.log(salida);
    }
    listarPendientesCompletadas(completadas = true){
        if(completadas){
            let salida = '';  
            let count = 0;

            this.listadoArr.forEach(
                 listado =>{
                     
                    if (listado.completadoEn){
                    count = count + 1;
                    salida = salida + `${count}. ${listado.desc} \n`
                  }
                    
                 });
                 console.log(salida);
        }
        else{
            let salida = '';  
            let count = 0;

            this.listadoArr.forEach(
                 listado =>{
                     
                    if (!listado.completadoEn ){
                    count = count + 1;
                    salida = salida + `${count}. ${listado.desc} \n`
                  }
                    
                 });
                 console.log(salida);
        }
        }
        toggleCompletadas(ids = []){
            ids.forEach(id =>{
                const tarea = this._listado[id];
                if(!tarea.completadoEn){
                    tarea.completadoEn = new Date().toISOString()
                }
            });
            this.listadoArr.forEach(tarea=>{
                //includes: en el arreglo existe o incluye la tarea.id
                if(!ids.includes(tarea.id)){
                     this._listado[tarea.id].completadoEn = null;
                }
            });
        }
}


module.exports = Tareas;