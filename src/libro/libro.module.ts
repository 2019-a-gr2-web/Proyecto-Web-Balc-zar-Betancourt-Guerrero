import { Module } from "@nestjs/common";
import { LibroController } from "./libro.controller";
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibroEntity } from "./libro.entity";
import { LibroService } from "./libro.service";
import { CategoriaService } from "../categoria/categoria.service";
import { CategoriaEntity } from "../categoria/categoria.entity";
import { HistorialCategoriaLibroService } from "../historialCategoriaLibro/historialCategoriaLibro.service";
import { HistorialCategoriaLibroEntity } from "../historialCategoriaLibro/historialCategoriaLibro.entity";

@Module(
    {
        imports: [
            TypeOrmModule.forFeature(
                [
                    LibroEntity,CategoriaEntity,HistorialCategoriaLibroEntity
                ],
                'default'
            )
        ],
        controllers: [LibroController],
        providers: [LibroService,CategoriaService,HistorialCategoriaLibroService],
        exports: [LibroService]
    }
)
export class LibroModule {

}