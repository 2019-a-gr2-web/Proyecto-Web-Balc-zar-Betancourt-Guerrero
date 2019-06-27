import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoUsuarioEntity } from "./tipoUsuario.entity";

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
    providers: [],
    exports: []
})
export class TipoUsuarioModule {

}