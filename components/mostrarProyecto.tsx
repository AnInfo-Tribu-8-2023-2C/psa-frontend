import styles from "./mostrarProyecto.module.css";
import ProgressBar from "./progressBar";

export default function MostrarProyecto( { proyecto,Tareas} : {proyecto: any; Tareas:any} ){
      
    const cantidadTareas = Tareas.length;
    const iniciados = Tareas.filter((objeto : any) => objeto['estado'] === 'Iniciado').length;
    const enProgreso = Tareas.filter((objeto : any) => objeto['estado'] === 'En Proceso').length;
    const bloqueado = Tareas.filter((objeto : any) => objeto['estado'] === 'Bloqueado').length;
    const finalizado = Tareas.filter((objeto : any) => objeto['estado'] === 'Finalizado').length;
    
    return (
        <div className={styles.cajaProyecto}>
            <div className={styles.caja1} >
                <b>ID: </b>{proyecto['id']}<br/>
                <b>Nombre: </b>{proyecto['nombre']}<br/>
                <b>Descripción: </b>{proyecto['descripcion']}<br/>


            </div>

            <div className={styles.caja2}>
                           
                                
                <table className='min-w-full'>
                    <tr >
                        <td>Total de Tareas:    {cantidadTareas}</td>
                        <td></td>
                    </tr> 
                       
                    <tr>
                        <td>Tareas en progreso: {enProgreso}</td>
                        <td style={{width : '70%'}}><ProgressBar totalTasks={cantidadTareas} completedTasks={enProgreso}/></td>
                    </tr>
                    <tr>
                        <td>Tareas en Iniciadas: {iniciados}</td>
                        <td><ProgressBar totalTasks={cantidadTareas} completedTasks={iniciados}/></td>
                    </tr>
                    <tr>
                        <td>Tareas bloquedas: {bloqueado}</td>
                        <td><ProgressBar totalTasks={cantidadTareas} completedTasks={bloqueado}/></td>
                    </tr>
                    <tr>
                        <td>Tareas finalizadas: {finalizado}</td>
                        <td><ProgressBar totalTasks={cantidadTareas} completedTasks={finalizado}/></td>
                    </tr>                
                </table >
                
            </div>       
        </div>
    )
}