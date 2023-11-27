import Modal1 from './Modal1';
import { useState } from 'react';

const Modales = () => {

    const [mostrar, setMostrar] = useState(false);
    const [verContador, setVerContador] = useState(false);
 
    return(
         <div className='w-100'>
            <h1>Modales</h1>
            <button className='btn btn-success' onClick={()=> setMostrar(true)} >mostrar</button>
            <Modal1 isOpen={ mostrar} onClose= { () => setMostrar(false) }>
                <p>Mostrar este mensaje</p>
            </Modal1>
            <button className='btn btn-success' onClick={()=> setVerContador(true)} >Contador</button>
            <Modal1 isOpen={ verContador } onClose= { () => setVerContador(false) }>
                <p>Contador</p>
            </Modal1>
         </div>   
    )
}

export default Modales;
