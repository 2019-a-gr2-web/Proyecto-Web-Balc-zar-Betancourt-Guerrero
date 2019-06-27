import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaEntity } from './categoria.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                CategoriaEntity
            ],
            'default'
        )
    ],
    controllers: [],
    providers: [],
    exports: []
})
export class CategoriaModule {

}