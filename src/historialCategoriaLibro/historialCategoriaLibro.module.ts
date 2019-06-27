import { Module } from "@nestjs/common";
import { HistorialCategoriaLibroController } from "./historialCategoriaLibro.controller";
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialCategoriaLibroEntity } from "../historialCategoriaLibro/historialCategoriaLibro.entity";

@Module(
    {
        imports: [
            TypeOrmModule.forFeature(
                [
                    HistorialCategoriaLibroEntity
                ],
                'default'
            )
        ],
        controllers: [HistorialCategoriaLibroController],
        providers: [],
        exports: []
    }
)
export class HistorialCategoriaLibroModule {

}