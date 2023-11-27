import React from "react";
import Date from '../../components/date'
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import { useRouter } from 'next/router';
 
export default function Proyecto() {

  const route = useRouter()

  function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">{title}</th>
}
 
  //const Id = route.query.ID;
  const Cliente = JSON.parse(route.query.data);

  const [list, setList] = useState([])

  const [open, setOpen] = React.useState(1);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);


 
 
  useEffect(() => {
  fetch(`http://localhost:3001/proyectoTareas/${Cliente['id']}}`)
      .then((res) => {
          return res.json()
      })
      .then((data) => {
          setList(data)
      })
}, [])

  return (
  
<div>
                <br/>
                <div className="mb-4 " >
                  <h1 className="text-3xl font-bold decoration-gray-400"> {Cliente['id']} - {Cliente['Nombre']}</h1>
                  <h4 className="text-2xl font-bold decoration-gray-400"> Listado de Tareas </h4>
                </div>
                <hr/>

                <div className="mb-4 bg-slate-100">
                <b>Descripción:</b> {Cliente['Descripcion']} <br/>
                <b>Estado:</b> {Cliente['Estado']} <br/>
                <b>Técnico Asignado:</b> {Cliente['Tecnico']}<br/>
                <b>Horas Estimadas:</b> {Cliente['HorasCalculadas']}<br/>
                <b>Fecha de Inicio:</b> <Date dateString={Cliente['FechaIni']}/><br/>
                <hr/>
                
                </div>

                <input class="form-control" type="text" value='Tareas' aria-label="Disabled input example" disabled readonly></input>
                

        
               <div className="flex flex-col" >
                    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full">
                                <thead>
                                <tr>
                                    <HeaderItem title="ID" />
                                    <HeaderItem title="Nombre" />
                                    <HeaderItem title="Fecha Inicio" />
                                    <HeaderItem title="Estado" />
                                    <HeaderItem title="Tecnico" />
                                    <HeaderItem title="Horas Estimadas" />
                                    <HeaderItem title="Acciones" />
                                </tr>
                                </thead>

                                <tbody>
                                {list.map((list) => (
                                    

                                   <tr key={`${list['id']}`}>
                                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <div className="flex items-center">{list['id']}</div>
                                      </td>

                                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <div className="flex items-center">{list['Nombre']}</div>
                                      </td>

                                      
            
                                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <div className="text-sm leading-5 text-gray-900"><Date dateString={list['FechaIni']}/></div>
                                      </td>

                                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <div className="text-sm leading-5 text-gray-900">{list['Estado']}</div>
                                      </td>

                                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <div className="text-sm leading-5 text-gray-900">{list['Tecnico']}</div>
                                      </td>
            
                                     <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <div className="text-sm leading-5 text-gray-900" >{list['Horas Estimadas']}</div>
                                      </td>
                                  
                                      <td className="px-6 py-4 whitespace-n0-wrap border-b border-gray-200" >
                                       <div className="inline-flex rounded-md shadow-sm" role='group'>


                                       
  <button class="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
	<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
	  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.747 2.97a.864.864 0 011.177 1.265l-7.904 7.37-1.516.194.653-1.785 7.59-7.044zm2.639-1.366a2.864 2.864 0 00-4-.1L6.62 8.71a1 1 0 00-.26.39l-1.3 3.556a1 1 0 001.067 1.335l3.467-.445a1 1 0 00.555-.26l8.139-7.59a2.864 2.864 0 00.098-4.093zM3.1 3.007c0-.001 0-.003.002-.005A.013.013 0 013.106 3H8a1 1 0 100-2H3.108a2.009 2.009 0 00-2 2.19C1.256 4.814 1.5 7.848 1.5 10c0 2.153-.245 5.187-.391 6.81A2.009 2.009 0 003.108 19H17c1.103 0 2-.892 2-1.999V12a1 1 0 10-2 0v5H3.106l-.003-.002a.012.012 0 01-.002-.005v-.004c.146-1.62.399-4.735.399-6.989 0-2.254-.253-5.37-.4-6.99v-.003zM17 17c-.001 0 0 0 0 0zm0 0z" />
	</svg>

	Editar
  </button>

  <button class="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
	<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
	  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
	</svg>

	Borrar
  </button>

  <button class="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md">
	<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
	  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
	</svg>

	Ver
  </button>



                                      </div>
                                      </td>
                                   </tr>
                                  ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>











  </div>
        
  )
}
