import { Module } from "@nestjs/common";
import { LibroController } from "./libro.controller";
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibroEntity } from "./libro.entity";
import { LibroService } from "./libro.service";
import { CategoriaService } from "../categoria/categoria.service";
import { CategoriaEntity } from "../categoria/categoria.entity";
import { HistorialCategoriaLibroService } from "../historialCategoriaLibro/historialCategoriaLibro.service";
import { HistorialCategoriaLibroEntity } from "../historialCategoriaLibro/historialCategoriaLibro.entity";
import { DetalleEntity } from "../detalle/detalle.entity";
import { FacturaEntity } from "../factura/factura.entity";
import { FacturaService } from "../factura/factura.service";
import { DetalleService } from "../detalle/detalle.service";

@Module(
    {
        imports: [
            TypeOrmModule.forFeature(
                [
                    LibroEntity,CategoriaEntity,HistorialCategoriaLibroEntity,DetalleEntity,FacturaEntity
                ],
                'default'
            )
        ],
        controllers: [LibroController],
        providers: [LibroService,CategoriaService,HistorialCategoriaLibroService,FacturaService,DetalleService],
        exports: [LibroService]
    }
)
export class LibroModule {

}