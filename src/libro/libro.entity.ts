import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import { CategoriaEntity } from '../categoria/categoria.entity';
import { HistorialCategoriaLibroEntity } from '../historialCategoriaLibro/historialCategoriaLibro.entity';



@Entity('bd_historialCategoriaLibro') //Podemos pasr el nombre de la tabla
export class LibroEntity {

  @PrimaryGeneratedColumn()
  id:number;

  @Column({
    type: 'varchar',
    length: 70,
    name: 'nombre',
  })
  nombre: string;

  @Column({
    type : 'varchar',
    name : ''

  })


  @OneToMany( type => HistorialCategoriaLibroEntity, historialCategoriaLibro => historialCategoriaLibro)
  historialCategoriaLibro: HistorialCategoriaLibroEntity[]



}