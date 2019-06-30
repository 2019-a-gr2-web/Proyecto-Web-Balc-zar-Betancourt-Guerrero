import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { TipoUsuarioService } from '../tipoUsuario/tipoUsuario.service';
import { TipoUsuarioEntity } from '../tipoUsuario/tipoUsuario.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                UsuarioEntity,TipoUsuarioEntity
            ],
            'default'
        )
    ],
    controllers: [UsuarioController],
    providers: [UsuarioService,TipoUsuarioService],
    exports: [UsuarioService]
})
export class UsuarioModule {

}