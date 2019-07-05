import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, JoinColumn } from 'typeorm'
import { CategoriaEntity } from '../categoria/categoria.entity';
import { LibroEntity } from '../libro/libro.entity';

@Entity('historialcategorialibro') //Podemos pasr el nombre de la tabla
export class HistorialCategoriaLibroEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  librofkid:number;
  @ManyToOne(()=> LibroEntity,libro=>libro.historialCategoriaLibros)
  @JoinColumn({ name: 'librofkid' })
  fkLibro?: LibroEntity;

  @Column()
  categoriafkid:number;
  @ManyToOne(()=> CategoriaEntity, categoria=>categoria.historialCategoriaLibros)
  @JoinColumn({ name: 'categoriafkid' })
  fkCategoria: CategoriaEntity;

}