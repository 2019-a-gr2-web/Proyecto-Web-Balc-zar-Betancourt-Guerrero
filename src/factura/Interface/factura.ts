export interface Factura {
  id?: number;
  fk_usuario: number;
  direccionCliente:string;
  numeroTarjeta: string; //string para numeros que empiecen con 0
  cvc: string; //string para que tome numeros como 013
  formaPago:string;
  fechaCaducidadTarjeta: Date;
  fecha: Date;
  montoTotal: number;
}