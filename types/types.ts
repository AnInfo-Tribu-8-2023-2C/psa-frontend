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
export interface Producto {
  id: string
  nombre: string
  versiones: number
}

export interface VersionProducto {
  id: string
  version: string,
  fechaModificacion: Date,
}

export interface Proyecto {
  id: string
  nombre: string
  descripcion: string
  lider: string
  estado: string
  fechaIni: Date
  fechaFin: Date
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

export interface TicketDeProducto {
  id: string
  nombre: string
  descripcion: string
  fechaInicial: Date
  fechaModificacion: Date
  estado: string
  horasCalculadas: number
  proyecto?: number
  version?: number
}


