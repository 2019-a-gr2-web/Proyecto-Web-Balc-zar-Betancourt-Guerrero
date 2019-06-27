import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioEntity } from './usuario.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                UsuarioEntity
            ],
            'default'
        )
    ],
    controllers: [UsuarioController],
    providers: [],
    exports: []
})
export class UsuarioModule {

}