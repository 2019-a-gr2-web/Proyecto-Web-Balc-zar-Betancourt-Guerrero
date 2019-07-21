import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleEntity } from "./detalle.entity";
import { DetalleService } from "./detalle.service";

@Module(
    {
        imports: [
            TypeOrmModule.forFeature(
                [
                   DetalleEntity
                ],
                'default'
            )
        ],
        controllers: [],
        providers: [DetalleService],
        exports: [DetalleService]
    }
)
export class DetalleModule {

}