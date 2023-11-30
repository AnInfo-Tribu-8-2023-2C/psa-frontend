export interface Usuario {
  nombre: string
  apellido: string
  legajo: number
}

export interface Cliente {
  id: string
  razon_social: string
  cuit: number
}

export interface Proyecto {
  id: number
  name: string
  description: string
  leader: string
  status: string
  date_created: Date
  date_finished: Date
}

export interface Colaborador {
  id: number
  name: string
  lastname: string
}

export interface Tarea {
  id: string
  nombre: string
  descripcion: string
  fechaIni: Date
  estado: string
  tecnico: string
  horasCalculadas: number
  proyecto: number
}

export interface ContadorTareas {
  total: number
  iniciadas: number
  enProceso: number
  Bloqueadas: number
}


