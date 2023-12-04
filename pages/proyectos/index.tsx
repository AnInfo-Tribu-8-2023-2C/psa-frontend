import {useEffect, useState} from "react";
import  ProyectoGridRow  from "@/components/proyectoGridRow";
import ModalCrearProyecto from "@/components/modalCrearProyecto"

function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">{title}</th>
}

export default function Proyectos() {

    const [proyectos, setProyectos] = useState([]);
    const [crearProyectoModal, setCrearProyectoModal] = useState(false);
    const [datos, setDatos] = useState({});

    const guardarDatos = (datos: any) => {
        setDatos(datos);
        fetch("https://psa-backend-projectos.onrender.com/proyecto", {
            method:'POST',
            body: JSON.stringify(datos),
            headers: {'Content-type' : 'Application/json'}
        } );
        window.location.reload();
    }

    useEffect(() => {
        fetch("https://psa-backend-projectos.onrender.com/proyectos")
            .then((res) => {
                console.log(res)
                return res.json()
            })
            .then((data) => {
                setProyectos(data)
            })
    }, [])

    return (
        <>
            {/* ACA EMPIEZA LA GRILLA */}

            <div className="container max-w-7xl mx-auto mt-8">
                <div className="mb-4">
                    <h1 className="text-3xl font-bold decoration-gray-400">Proyectos</h1>
                </div>

                <div className="mb-4">
                    <button
                    onClick={() => setCrearProyectoModal(true)}
                    className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                	        Crear Proyecto
                    </button>
                    <ModalCrearProyecto isOpen={ crearProyectoModal } onClose={ () => setCrearProyectoModal(false) } guardarDatos= {guardarDatos}>
                        <button onClick={() => setCrearProyectoModal(false)}>Guardar</button>
                    </ModalCrearProyecto>
                </div>


                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full">
                                <thead>
                                <tr>
                                    <HeaderItem title="ID" />
                                    <HeaderItem title="Nombre" />
                                    <HeaderItem title="Lider" />
                                    <HeaderItem title="Estado" />
                                    <HeaderItem title="Fecha de creación" />
                                    <HeaderItem title="Fecha Finalización" />
                                    <HeaderItem title="Acciones" />
                                </tr>
                                </thead>

                                <tbody>
                                {proyectos.map((proyecto) => (
                                    <ProyectoGridRow key={proyecto['id']} proyecto={proyecto} />
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