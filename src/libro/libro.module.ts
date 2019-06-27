import { Module } from "@nestjs/common";
import { LibroController } from "./libro.controller";
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibroEntity } from "./libro.entity";

@Module(
    {
        imports: [
            TypeOrmModule.forFeature(
                [
                    LibroEntity
                ],
                'default'
            )
        ],
        controllers: [LibroController],
        providers: [],
        exports: []
    }
)
export class LibroModule {

}