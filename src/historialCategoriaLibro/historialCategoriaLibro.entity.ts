import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import { CategoriaEntity } from '../categoria/categoria.entity';



@Entity('bd_historialCategoriaLibro') //Podemos pasr el nombre de la tabla
export class HistorialCategoriaLibroEntity {

  @PrimaryGeneratedColumn()
  id:number;

  @ManyToOne(type => CategoriaEntity, categoria=>categoria.historialCategoriaLibro)
  plato: number
  @ManyToOne(type => ComboEntity, combo=>combo.relacion)
  combo: number

}