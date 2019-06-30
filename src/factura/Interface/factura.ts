export interface Factura {
  id?: number;
  idUsuario: number;
  numeroTarjeta: string;
  fecha: Date;
  montoTotal: number;
}