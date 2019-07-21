import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacturaEntity } from "./factura.entity";
import { FacturaService } from "./factura.service";

@Module(
    {
        imports: [
            TypeOrmModule.forFeature(
                [
                    FacturaEntity
                ],
                'default'
            )
        ],
        controllers: [],
        providers: [FacturaService],
        exports: [FacturaService]
    }
)
export class FacturaModule {

}