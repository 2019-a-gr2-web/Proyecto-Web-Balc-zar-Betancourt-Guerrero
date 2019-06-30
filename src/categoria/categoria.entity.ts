import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import { HistorialCategoriaLibroEntity } from '../historialCategoriaLibro/historialCategoriaLibro.entity';

@Entity('categoria') //Podemos pasr el nombre de la tabla
export class CategoriaEntity {

  @PrimaryGeneratedColumn()
  id:number;

  @Column({
    type: 'nvarchar',
    length: 70,
    name: 'nombre',
    unique: true
  })
  nombre: string;

  @OneToMany( type => HistorialCategoriaLibroEntity, historialCategoriaLibros => historialCategoriaLibros)
  historialCategoriaLibros: HistorialCategoriaLibroEntity[]

}