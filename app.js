const { guardarDB,
leerDB
 } = require('./helpers/guardarArchivo');
const { 
    inquirerMenu,
     pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
 } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
//const { mostrarMenu, pausa } = require('./helpers/mensajes');

require('colors');

const main = async() =>{
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if(tareasDB){
        //establecer las tareas
        //TODO: cargarTareas
        tareas.cargarTareasFromArray(tareasDB)
    }
    //await pausa();
    do{
        //opt = await mostrarMenu();
         opt = await inquirerMenu();

         switch(opt){
             case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                console.log(desc);
                break;
             case '2': 
                //console.log(tareas.listadoArr);
                tareas.listadoCompleto();
                break;
             case '3': 
                //console.log(tareas.listadoArr);
                tareas.listarPendientesCompletadas(true);
                break;
             case '4': 
                //console.log(tareas.listadoArr);
                tareas.listarPendientesCompletadas(false);
                break;
            case '5': 
                const ids = await mostrarListadoChecklist(tareas.listadoArr)
                console.log(ids);
                tareas.toggleCompletadas(ids);
             
                break;
            case '6': 
                const id = await listadoTareasBorrar(tareas.listadoArr)
                
                if(id !== '0'){
                    const ok = await confirmar('¿Está seguro');

                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada')
                    }
                }
                break;
            
         }
         guardarDB(tareas.listadoArr);
        // console.log({ opt });
        //const tareas = new Tareas();
        //const tarea = new Tarea('Comida ');
        //tareas._listado[tarea.id] = tarea;
        //console.log(tareas);
        //if( opt !== '0') await pausa();
        await pausa();
        

    }while( opt !== '0');

    //pausa();
}

main();