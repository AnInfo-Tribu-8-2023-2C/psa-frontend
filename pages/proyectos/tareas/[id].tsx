import {useEffect, useState} from "react";
import  TareaGridRow  from "@/components/tareaGridRow";
import MostrarProyecto from "@/components/mostrarProyecto";
import { Proyecto } from "@/types/types";
import { useRouter } from 'next/router';

function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">{title}</th>
}

export default function Tareas() {
    const [tareas, setTareas] = useState([]);
    const [proyecto, setProyecto] = useState([]);

    const router = useRouter();
    
    const {id} = router.query;

    useEffect(() => {
        fetch(`http://localhost:3001/proyecto/${id}`)
            .then((res) => {
                console.log(res)
                return res.json()
            })
            .then((data) => {
                setProyecto(data[0])
            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:3001/proyectoTareas/${id}`)
            .then((res) => {
                console.log(res)
                return res.json()
            })
            .then((data) => {
                setTareas(data)
            })
    }, []);

    const [contadorTareas, setContadorTareas] = useState(0);


    return (
        <>
            {/* ACA EMPIEZA LA GRILLA */}

            <div className="container max-w-7xl mx-auto mt-8">
                <div className="mb-4">
                    <h1 className="text-3xl font-bold decoration-gray-400">Tareas</h1>
                    <br/>
                    <hr/>
                </div>

                <MostrarProyecto proyecto={proyecto} />

                <div className="mb-4">
                    <button className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                	        Crear Tarea
                    </button>
                </div>

                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full">
                                <thead>
                                <tr>
                                    <HeaderItem title="ID" />
                                    <HeaderItem title="Nombre" />
                                    <HeaderItem title="Descripción" />
                                    <HeaderItem title="Estado" />
                                    <HeaderItem title="Acciones" />
                                </tr>
                                </thead>

                                <tbody>                                
                                {tareas.map((tarea) => (
                                    <TareaGridRow key={tarea['id']} tarea={tarea} />
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


