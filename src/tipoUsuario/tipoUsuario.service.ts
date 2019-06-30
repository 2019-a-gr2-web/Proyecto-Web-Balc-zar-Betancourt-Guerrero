import { Injectable } from "@nestjs/common";
import { Repository, DeleteResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { TipoUsuarioEntity } from "./tipoUsuario.entity";
import { TipoUsuario } from "./Interface/TipoUsuario";

@Injectable()
export class TipoUsuarioService {
    constructor(@InjectRepository(TipoUsuarioEntity)
    private readonly _tipoUsuariosRepositorio: Repository<TipoUsuarioEntity>) {

        const tipoUsuario1: TipoUsuario = {
            tipo: "Administrador"
        };

        const tipoUsuario2: TipoUsuario = {
            tipo: "Cliente"
        };

        this.registrarTipoUser(tipoUsuario1);
        this.registrarTipoUser(tipoUsuario2);

    }

    registrarTipoUser(tipoUsuario: TipoUsuario) {

        const objetoEntidad = this._tipoUsuariosRepositorio.create(tipoUsuario);

        this._tipoUsuariosRepositorio.save(objetoEntidad).then(
            (dato) => {
                //console.log("tipo user creado: ", dato);
            }
        ).catch(
            (error) => {

            }

        )
    }

    /*recuperarTipoUsuario(idbuscar: number):Promise<TipoUsuarioEntity> {

        this._tipoUsuariosRepositorio.find({ id: idbuscar }).then(
            (dato) => {
                return dato;
            }
        ).catch(
            (error) => {
                return null;
            }
        );
        return null;

    }*/

}
