import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacturaEntity } from "./factura.entity";
import { FacturaService } from "./factura.service";
import { FacturaController } from "./factura.controller";
import { LibroEntity } from "../libro/libro.entity";
import { LibroService } from "../libro/libro.service";

@Module(
    {
        imports: [
            TypeOrmModule.forFeature(
                [
                    FacturaEntity,LibroEntity
                ],
                'default'
            )
        ],
        controllers: [FacturaController],
        providers: [FacturaService,LibroService],
        exports: [FacturaService]
    }
)
export class FacturaModule {

}