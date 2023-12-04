// pages/index.js
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TarjetaTarea from '../tarjetaTarea';


const KanbanBoard = ({ tasks }:{tasks:any}) => {
  
  // Organize tasks into columns based on their 'estado' property
  
  const iniciados = tasks.filter((objeto : any) => objeto['estado'] === 'Iniciado');
  const enProgreso = tasks.filter((objeto : any) => objeto['estado'] === 'En Proceso');
  const bloqueado = tasks.filter((objeto : any) => objeto['estado'] === 'Bloqueado');
  const finalizado = tasks.filter((objeto : any) => objeto['estado'] === 'Finalizado');

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="flex flex-col col-span-1 bg-gray-300 p-4">
        {/* Contenido de la primera columna */}
            Iniciado   
            
                {iniciados.map((tarea) => (
                                    <TarjetaTarea tarea={tarea} />
                                ))};
 
        </div>
      <div className="col-span-1 bg-blue-300 p-4">
        {/* Contenido de la segunda columna */}
        En proceso
        {enProgreso.map((tarea) => (
                                    <TarjetaTarea tarea={tarea} />
                                ))};
      </div>
      <div className="col-span-1 bg-green-300 p-4">
        {/* Contenido de la tercera columna */}
        Finalizado
        {finalizado.map((tarea) => (
                                    <TarjetaTarea tarea={tarea} />
                                ))};
      </div>
    </div>
  )
  
  
};


export default KanbanBoard;
