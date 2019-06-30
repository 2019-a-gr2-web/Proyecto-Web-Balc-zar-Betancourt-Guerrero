export interface Factura {
  id?: number;
  fkUsuario: number;
  numeroTarjeta: number;
  fecha: Date;
  montoTotal: number;
}