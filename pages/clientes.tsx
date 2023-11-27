import {useEffect, useState} from "react";
import ClientGridRow from "@/components/clientGridRow";
import CrearProyectoForm from "@/components/crearProyectoForm";
import 'react-datepicker/dist/react-datepicker';

import 'bootstrap/dist/css/bootstrap.css';

function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">{title}</th>
}

export default function Clientes() {
    const [list, setList] = useState([])
    const [crearProyectoModal, setCrearProyectoModal] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [datos, setDatos] = useState({})

    const guardarDatos = (datos) => {
        setDatos(datos);
        fetch("http://localhost:3001/proyecto", {
            method:'POST',
            body: JSON.stringify(datos),
            headers: {'Content-type' : 'Application/json'}
        } );
        window.location.reload();

    }
  
    useEffect(() => {
        fetch("http://localhost:3001/proyectos")
            .then((res) => {
                console.log(res)
                return res.json()
            })
            .then((data) => {
                setList(data)
            })
    }, [])

    return (
        <>
            {/* ACA EMPIEZA LA GRILLA */}
              
            <div className="container max-w-7xl mx-auto mt-8">
               
                <div className="mb-4">
                    <h1 className="text-3xl font-bold decoration-gray-400">Proyectos</h1>
                </div>
                <div>

                <button 
                onClick={() => setCrearProyectoModal(true)}
                class="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                	Crear Proyecto
                </button>




                    
                    <CrearProyectoForm isOpen={ crearProyectoModal } onClose= { () => setCrearProyectoModal(false) } guardarDatos= {guardarDatos}>
                        <button onClick={() => setCrearProyectoModal(false)}>Guardar</button>
                    </CrearProyectoForm>
                </div>
                
                <div className="flex flex-col" >
                    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full">
                                <thead>
                                <tr>
                                    <HeaderItem title="ID" />
                                    <HeaderItem title="Nombre" />
                                    <HeaderItem title="Descripción" />
                                    <HeaderItem title="Lider" />
                                    <HeaderItem title="Estado" />
                                    <HeaderItem title="Fecha Inicio" />
                                    <HeaderItem title="Fecha Fin" />
                                    <HeaderItem title="Acciones" />
                                </tr>
                                </thead>

                                <tbody>
                                {list.map((cliente) => (
                                    <ClientGridRow key={cliente['id']} cliente={cliente} />
                                ))}

                                    


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
                      
        </>
    )
}
