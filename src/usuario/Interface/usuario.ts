import { TipoUsuarioEntity } from "../../tipoUsuario/tipoUsuario.entity";

export interface Usuario {
  id?: number;
  fkTipoUsuario?: number;
  //fkTipoUsuario?: TipoUsuarioEntity
  usuario: string;
  contrasenia: string;
  nombre: string;
  apellido: string;
  cedula: number;
}