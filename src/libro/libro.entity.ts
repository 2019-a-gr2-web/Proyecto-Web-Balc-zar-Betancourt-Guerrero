import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { HistorialCategoriaLibroEntity } from '../historialCategoriaLibro/historialCategoriaLibro.entity';
import { DetalleEntity } from '../detalle/detalle.entity';

@Entity('libro')
export class LibroEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'nvarchar',
    length: 70,
    name: 'isbn',
    unique: true
  })
  isbn: string;

  @Column({
    type: 'nvarchar',
    length: 100,
    name: 'titulo',
  })
  titulo: string;

  @Column({
    type: 'nvarchar',
    length: 70,
    name: 'autor',
  })
  autor: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 0,
    name: 'edicion',
    nullable: true,
    default: 1
  })
  edicion: number;

  @Column({
    type: 'nvarchar',
    length: 70,
    name: 'editorial',
  })
  editorial: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'precio',
  })
  precio: number;

  @Column({
    type: 'nvarchar',
    name: 'estado',
    default: "Disponible"
  })
  estado: string;

  @OneToMany(type => HistorialCategoriaLibroEntity,
    historialCategoriaLibros => historialCategoriaLibros,
    {
      //onDelete: "CASCADE",
      //onUpdate: "CASCADE",
    })
  historialCategoriaLibros: HistorialCategoriaLibroEntity[]

  @OneToMany(type => DetalleEntity,
    detalles => detalles,
    {
      //onDelete: "CASCADE",
      //onUpdate: "CASCADE",
    })
  detalles: DetalleEntity[];

}