export interface Usuario {
  nombre: string
  apellido: string
  legajo: number
}

export interface Cliente {
  id: string
  "razon social": string
  cuit: number
}
export interface Producto {
  id: string
  name: string
  description: string
  createdAt: string
  productVersions: VersionProducto[]
}

export interface VersionProducto {
  id: string
  name: string,
  description: string,
  creationDate: string
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
}

export interface ContadorTareas {
  total: number
  iniciadas: number
  enProceso: number
  Bloqueadas: number
}

export interface TicketDeProducto {
  id: string;
  title: string;
  client: string;
  state: EstadoTicket;
  description: string;
  severity: SeveridadTicket;
  tasks: Tarea[];
  createdAt: Date;
  updatedAt: Date;
}

export enum EstadoTicket {
  ABIERTO = 'Abierto',
  ENPROGRESO = 'En Progreso',
  ENIMPLEMENTACION = 'En Implementacion',
  CERRADO = 'Cerrado',
  BLOQUEADO = 'Bloqueado',
  ENDESARROLLO = 'En Desarrollo', // se crea para desarrollo=???
  ESPERADECLIENTE = 'Espera de Cliente',
}

export enum SeveridadTicket {
  S1 = "S1",
  S2 = "S2",
  S3 = "S3",
  S4 = "S4",
}


