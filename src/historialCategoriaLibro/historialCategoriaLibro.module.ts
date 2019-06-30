import { Module } from "@nestjs/common";
import { HistorialCategoriaLibroController } from "./historialCategoriaLibro.controller";
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialCategoriaLibroEntity } from "../historialCategoriaLibro/historialCategoriaLibro.entity";
import { HistorialCategoriaLibroService } from "./historialCategoriaLibro.service";

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
        providers: [HistorialCategoriaLibroService],
        exports: [HistorialCategoriaLibroService]
    }
)
export class HistorialCategoriaLibroModule {

}