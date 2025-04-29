import { Producto } from './producto';

export interface Despacho {
  id: number;
  codigoSeguimiento: string;
  nombreCompletoCliente: string;
  documentoCliente: number;
  direccionEntrega: string;
  contacto: number;
  estado: string;
  urgente: boolean;
  productos: Producto[]
}
