import { Injectable } from '@nestjs/common';
import { Repository, DeleteResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioEntity } from './usuario.entity';
import { Usuario } from './Interface/usuario';
import { TipoUsuarioService } from '../tipoUsuario/tipoUsuario.service';
import { TipoUsuarioEntity } from '../tipoUsuario/tipoUsuario.entity';

@Injectable()
export class UsuarioService {

    constructor(@InjectRepository(UsuarioEntity)
    private readonly _usuariosRepositorio: Repository<UsuarioEntity>,
        private readonly _serviceTipoUsuario: TipoUsuarioService) {


        const admin: Usuario = {
            usuario: 'admin',
            contrasenia: 'admin',
            nombre: 'Cesar',
            apellido: 'Pazmino',
            cedula: 1725054975,
            fkTipoUsuario: 1
        }

        //this.registrarAdmin(admin);
       
    }


    buscarUsuario(user: string, password: string): Promise<any[]> {

        return this._usuariosRepositorio.find({ usuario: user, contrasenia: password});

    }

    registrarAdmin(usuarioAdmin: Usuario) {
        const objetoEntidad = this._usuariosRepositorio.create(usuarioAdmin);
        this._usuariosRepositorio.save(objetoEntidad).then(
            (dato) => {
                console.log("admin creado: ", dato);
            }
        ).catch(
            (error) => {

            }
        );
    }


}