import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
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

    @ManyToOne(type => FacturaEntity, factura => factura.detalles)
    fkFactura: FacturaEntity;

    @ManyToOne( type => LibroEntity, libro=>libro.detalles)
    fkLibro: LibroEntity;
    /*@OneToMany(type => HistorialCategoriaLibroEntity, historialCategoriaLibro => historialCategoriaLibro)
    historialCategoriaLibro: HistorialCategoriaLibroEntity[]*/

}