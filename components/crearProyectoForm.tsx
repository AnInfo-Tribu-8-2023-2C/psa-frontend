import { useEffect, useState } from 'react';
//import Datepicker from "react-tailwindcss-datepicker"; 
import Datepicker from 'react-datepicker';
//import Datepicker from "react-datindex.jsepicker"; 
import Date from './date'

const CrearProyectoForm = ({isOpen, onClose, guardarDatos}) => {
    
    const [recursos,setRecursos] = useState([])

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [lider, setLider] = useState("");
    const [estado, setEstado] = useState("");
    const [fechaIni, setFechaIni] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    useEffect ( () => {
        fetch("http://localhost:3001/recursos")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setRecursos(data)
            })
    }, [])
    
    return(

    <div className='modal-container' style={{ display: isOpen ? 'grid': 'none'}}> 
      <div className='modal-body'>
        <button className='modal-close' onClick={onClose}>X</button>
        <h1 className='text-3xl font-bold decoration-gray-400'>Crear Proyecto</h1>  
        <br/>  

        <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">Nombre del Proyecto</span>
            <input 
            onChange={(event)=>{
                setNombre(event.target.value);
            }}
            type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
        </div>

        
        <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">Descripción</span>
            <input 
            onChange={(event)=>{
                setDescripcion(event.target.value);  
            }

            }
            type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
        </div>
        
        <div class="input-group mb-3">
            <label class="input-group-text" for="inputGroupSelect01">Lider del Proyecto</label>
            <select class="form-select" id="inputGroupSelect01"
                onChange={(event)=>{setLider(event.target.value)}}>
                <option selected>...</option>
                {
                    recursos.map( (recurso) => (
                        <option key={recurso['lejajo']} value={recurso['Nombre']+' '+recurso['Apellido']}>{recurso['Nombre']} {recurso['Apellido']}</option>
                    ))
                }
            </select>
        </div>
        
        <div class="input-group mb-3">
            <label class="input-group-text" for="inputGroupSelect01">Estado</label>
            <select class="form-select" id="inputGroupSelect01"
            onChange={(event)=>{setEstado(event.target.value)}}>
                <option selected>...</option>
                <option value="Iniciado">Iniciado</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Bloqueado">Bloqueado</option>
            </select>
        </div>


        <div className='input-group mb-3' >
            <label className='input-group-text' id='inputGroup-sizing-defult'>Fecha de Inicio</label>
            <input 
            onChange={(event)=>{setFechaIni(event.target.value)}}
            type='date' className='datepicker'/>

        </div>        

        <div className='input-group mb-3' >
            <label className='input-group-text' id='inputGroup-sizing-defualt'>Fecha de finalización Estimada</label>
            <input 
            onChange={(event)=>{setFechaFin(event.target.value)}}
            type='date' className='datepicker'/>            
        </div>    


        <button className='inline-block rounded border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10" data-te-ripple-init' onClick={()=> {
            guardarDatos({Nombre: nombre, Descripcion: descripcion,Lider: lider,Estado: estado, FechaIni: fechaIni,FechaFin: fechaFin});
            onClose()}}>
                Guardar
        </button>   

        <button className="inline-block rounded border-2 border-warning px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-warning transition duration-150 ease-in-out hover:border-warning-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-warning-600 focus:border-warning-600 focus:text-warning-600 focus:outline-none focus:ring-0 active:border-warning-700 active:text-warning-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10" data-te-ripple-init 
            onClick={onClose}>
                Cancelar
        </button>

      </div> 
    </div>
    );
}

export default CrearProyectoForm;
