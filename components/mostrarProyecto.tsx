import styles from "./mostrarProyecto.module.css";

export default function MostrarProyecto( { proyecto, contador} : {proyecto: any, contador:any} ){
        
    return (
        <div className={styles.cajaProyecto}>
            <div className={styles.caja1} >
                <b>ID: </b>{proyecto['id']}<br/>
                <b>Nombre: </b>{proyecto['nombre']}<br/>
                <b>Descripción: </b>{proyecto['descripcion']}<br/>


            </div>

            <div className={styles.caja2}>
                <b>Cantidad de Tareas: {contador}</b>
            
            </div>       
        </div>
    )
}