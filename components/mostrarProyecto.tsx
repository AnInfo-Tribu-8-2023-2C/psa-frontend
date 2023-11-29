import styles from "./mostrarProyecto.module.css";

export default function MostrarProyecto( { proyecto } : {proyecto: any} ){
        
    return (
        <div className={styles.cajaProyecto}>
            <div className={styles.caja1} >
                <b>ID: </b>{proyecto['id']}<br/>
                <b>Nombre: </b>{proyecto['nombre']}<br/>
                <b>Descripción: </b>{proyecto['descripcion']}<br/>


            </div>

            <div className={styles.caja2}>
                <b>Reporte</b>
            
            </div>       
        </div>
    )
}