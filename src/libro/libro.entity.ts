import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { CategoriaEntity } from '../categoria/categoria.entity';
import { HistorialCategoriaLibroEntity } from '../historialCategoriaLibro/historialCategoriaLibro.entity';

@Entity('bd_libro')
export class LibroEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 70,
    name: 'isbn',
  })
  isbn: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'titulo',
  })
  titulo: string;

  @Column({
    type: 'varchar',
    length: 70,
    name: 'autor',
  })
  autor: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'edicion',
    nullable: true
  })
  edicion: number;

  @Column({
    type: 'varchar',
    length: 70,
    name: 'editorial',
  })
  editorial: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'precio',
    nullable: true
  })
  precio: number;

  @Column({
    type: 'varchar',
    length: 70,
    name: 'estado',
  })
  estado: string;

  @OneToMany(type => HistorialCategoriaLibroEntity, historialCategoriaLibro => historialCategoriaLibro)
  historialCategoriaLibro: HistorialCategoriaLibroEntity[]



}