import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { CategoriaEntity } from '../categoria/categoria.entity';
import { LibroEntity } from '../libro/libro.entity';



@Entity('bd_historialCategoriaLibro') //Podemos pasr el nombre de la tabla
export class HistorialCategoriaLibroEntity {

  @PrimaryGeneratedColumn()
  id: number;

  /*@ManyToOne(type => CategoriaEntity, categoria => categoria.historialCategoriaLibro)
  categoria: number;*/
  @ManyToOne(type => LibroEntity, libro => libro.historialCategoriaLibro)
  libro: number;

}