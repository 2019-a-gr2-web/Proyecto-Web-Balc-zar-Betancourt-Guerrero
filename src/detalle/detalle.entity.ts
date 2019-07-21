import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm'
import { FacturaEntity } from '../factura/factura.entity';
import { LibroEntity } from '../libro/libro.entity';

@Entity('detalle') //Podemos pasr el nombre de la tabla
export class DetalleEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int',
        name: 'cantidad',
        nullable: false
    })
    cantidad: number;

    @Column()
    fk_factura: number;
    @ManyToOne(type => FacturaEntity, factura => factura.detalles)
    @JoinColumn({name:'fk_factura'})
    fkFactura: FacturaEntity;

    @Column()
    fk_libro: number;
    @ManyToOne(type => LibroEntity, libro => libro.detalles)
    @JoinColumn({name:'fk_libro'})
    fkLibro: LibroEntity;
    /*@OneToMany(type => HistorialCategoriaLibroEntity, historialCategoriaLibro => historialCategoriaLibro)
    historialCategoriaLibro: HistorialCategoriaLibroEntity[]*/

}