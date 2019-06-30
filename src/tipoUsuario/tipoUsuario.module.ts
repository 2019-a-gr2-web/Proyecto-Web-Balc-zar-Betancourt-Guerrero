import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoUsuarioEntity } from "./tipoUsuario.entity";
import { TipoUsuarioService } from "./tipoUsuario.service";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                TipoUsuarioEntity
            ],
            'default'
        )
    ],
    controllers: [],
    providers: [TipoUsuarioService],
    exports: [TipoUsuarioService]
})
export class TipoUsuarioModule {

}