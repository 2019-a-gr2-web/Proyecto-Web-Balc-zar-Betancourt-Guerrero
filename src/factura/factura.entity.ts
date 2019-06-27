import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { HistorialCategoriaLibroEntity } from '../historialCategoriaLibro/historialCategoriaLibro.entity';

@Entity('bd_factura') //Podemos pasr el nombre de la tabla
export class FacturaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        name: 'numero_tarjeta',
        nullable: true
    })
    numero_tarjeta: number;

    @Column({
        type: 'date',
        name: 'fecha',
        default: '2019-12-12'
    })
    fecha: Date;


    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        name: 'monto_total',
        nullable: true
    })
    monto_total: number;

    /*@OneToMany(type => HistorialCategoriaLibroEntity, historialCategoriaLibro => historialCategoriaLibro)
    historialCategoriaLibro: HistorialCategoriaLibroEntity[]*/

}