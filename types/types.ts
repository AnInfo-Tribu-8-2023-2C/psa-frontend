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
  id: string
  nombre: string
  descripcion: string
  lider: any
  estado: string
  fechaCreacion: Date
  fechaFinalizacion: Date
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


