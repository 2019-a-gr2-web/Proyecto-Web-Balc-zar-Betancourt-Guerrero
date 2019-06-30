export interface Usuario {
  id?: number;
  fkTipoUsuario: number;
  usuario: string;
  contrasenia: string;
  nombre: string;
  apellido: string;
  cedula: number;
}