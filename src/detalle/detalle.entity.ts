import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { HistorialCategoriaLibroEntity } from '../historialCategoriaLibro/historialCategoriaLibro.entity';

@Entity('bd_detalle') //Podemos pasr el nombre de la tabla
export class DetalleEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        name: 'cantidad',
        nullable: true
    })
    cantidad: number;

    @ManyToOne( type => DetalleEntity,detalle=>detalle.id)
    pedDet: DetalleEntity;
    /*@OneToMany(type => HistorialCategoriaLibroEntity, historialCategoriaLibro => historialCategoriaLibro)
    historialCategoriaLibro: HistorialCategoriaLibroEntity[]*/

}