export interface Factura {
  id?: number;
  fkUsuario: number;
  numeroTarjeta: number;
  cvc: number;
  fechaCaducidadTarjeta: Date;
  fecha: Date;
  montoTotal: number;
}