import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import { HistorialCategoriaLibroEntity } from '../historialCategoriaLibro/historialCategoriaLibro.entity';



@Entity('bd_combo') //Podemos pasr el nombre de la tabla
export class CategoriaEntity {

  @PrimaryGeneratedColumn()
  id:number;

  @Column({
    type: 'varchar',
    length: 70,
    name: 'nombre',
  })
  nombre: string;

  @OneToMany( type => HistorialCategoriaLibroEntity, historialCategoriaLibro => historialCategoriaLibro)
  historialCategoriaLibro: HistorialCategoriaLibroEntity[]

}