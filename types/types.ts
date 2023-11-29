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
  lider: string
  estado: string
  fechaIni: Date
  fechaFin: Date
}

export interface Tarea {
  id: string
  nombre: string
  descripcion: string
}

export interface ContadorTareas {
  total: number
  iniciadas: number
  enProceso: number
  Bloqueadas: number
}


